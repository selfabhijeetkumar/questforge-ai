import { AI_PROVIDERS_CONFIG, getProviderPriorityList } from '../config/aiProviders.js'
import { geminiProvider, GeminiProvider } from './providers/geminiProvider.js'
import { groqProvider, GroqProvider } from './providers/groqProvider.js'
import { nvidiaProvider, NvidiaProvider } from './providers/nvidiaProvider.js'
import { extractStructuredFieldsFromText } from './ocrService.js'

export class AIProviderManager {
  constructor(providers = null) {
    this.providers = providers || {
      gemini: geminiProvider,
      groq: groqProvider,
      nvidia: nvidiaProvider
    }

    // Provider state tracking
    this.cooldowns = new Map() // providerId -> timestamp
    this.lastErrors = new Map() // providerId -> { message, at }
    this.lastUsed = new Map()   // providerId -> timestamp
  }

  isProviderInCooldown(providerId) {
    const until = this.cooldowns.get(providerId)
    if (!until) return false
    if (Date.now() > until) {
      this.cooldowns.delete(providerId)
      return false
    }
    return true
  }

  setProviderCooldown(providerId, durationMs = 60000) {
    this.cooldowns.set(providerId, Date.now() + durationMs)
  }

  getStatus() {
    const priority = getProviderPriorityList()
    const primary = AI_PROVIDERS_CONFIG.primaryProvider
    const failoverEnabled = AI_PROVIDERS_CONFIG.failoverEnabled

    const providersStatus = {}
    let anyConfigured = false

    for (const [id, provider] of Object.entries(this.providers)) {
      const isConfigured = provider.isConfigured()
      if (isConfigured) anyConfigured = true

      const inCooldown = this.isProviderInCooldown(id)
      let status = 'UNCONFIGURED'
      if (isConfigured) {
        status = inCooldown ? 'COOLDOWN' : 'READY'
      }

      providersStatus[id] = {
        name: provider.name,
        id: provider.id,
        isConfigured,
        model: provider.config?.model || 'default',
        status,
        lastUsedAt: this.lastUsed.get(id) || null,
        lastError: this.lastErrors.get(id)?.message || null,
        cooldownRemainingSeconds: inCooldown ? Math.ceil((this.cooldowns.get(id) - Date.now()) / 1000) : 0
      }
    }

    return {
      primaryProvider: primary,
      failoverEnabled,
      priorityOrder: priority,
      timeoutMs: AI_PROVIDERS_CONFIG.timeoutMs,
      maxRetries: AI_PROVIDERS_CONFIG.maxRetries,
      activeMode: anyConfigured ? 'Multi-Provider AI Active' : 'Deterministic Demonstration Fallback',
      hasConfiguredProviders: anyConfigured,
      providers: providersStatus
    }
  }

  /**
   * Executes structured request with failover across prioritized providers.
   */
  async executeWithFailover({ systemPrompt, userContent, timeout = AI_PROVIDERS_CONFIG.timeoutMs }) {
    const priority = getProviderPriorityList()
    const failoverEnabled = AI_PROVIDERS_CONFIG.failoverEnabled
    const maxRetries = AI_PROVIDERS_CONFIG.maxRetries

    const attempts = []

    for (let i = 0; i < priority.length; i++) {
      const providerId = priority[i]
      const provider = this.providers[providerId]

      if (!provider) continue

      // If failover is disabled and this is not the primary, stop immediately
      if (i > 0 && !failoverEnabled) {
        break
      }

      // Check if credentials exist
      if (!provider.isConfigured()) {
        attempts.push({
          provider: providerId,
          skipped: true,
          reason: 'MISSING_CREDENTIALS',
          message: `${provider.name} is not configured.`
        })
        continue
      }

      // Check cooldown
      if (this.isProviderInCooldown(providerId)) {
        attempts.push({
          provider: providerId,
          skipped: true,
          reason: 'COOLDOWN',
          message: `${provider.name} is temporarily in cooldown following a previous rate-limit or service issue.`
        })
        continue
      }

      // Attempt request with retries
      let retriesLeft = maxRetries
      let lastResult = null

      while (retriesLeft >= 0) {
        lastResult = await provider.generateStructuredResponse({
          systemPrompt,
          userContent,
          timeout
        })

        if (lastResult.success) {
          this.lastUsed.set(providerId, new Date().toISOString())
          return {
            ...lastResult,
            attempts: [...attempts, { provider: providerId, success: true, durationMs: lastResult.durationMs }]
          }
        }

        // Handle failure
        this.lastErrors.set(providerId, { message: lastResult.error, at: new Date().toISOString() })

        // If rate limited or quota exceeded, place in cooldown immediately without wasting retries
        if (lastResult.errorCode === 'RATE_LIMITED') {
          this.setProviderCooldown(providerId, 60000)
          break
        }

        // If authentication error, do not retry
        if (lastResult.errorCode === 'AUTHENTICATION_ERROR' || lastResult.errorCode === 'MODEL_UNSUPPORTED') {
          break
        }

        if (!lastResult.retryable) {
          break
        }

        retriesLeft--
      }

      attempts.push({
        provider: providerId,
        success: false,
        errorCode: lastResult?.errorCode || 'FAILED',
        error: lastResult?.error || 'Unknown error',
        durationMs: lastResult?.durationMs || 0
      })
    }

    return {
      success: false,
      allProvidersExhausted: true,
      attempts,
      error: 'All configured AI providers failed or were unavailable. Falling back to deterministic rule engine.'
    }
  }

  /**
   * High-level document entity extraction using failover AI with deterministic fallback.
   */
  async extractDocumentEntities(extractedText, documentCategory = 'Document') {
    if (!extractedText || extractedText.trim().length === 0) {
      return {
        aiAvailable: false,
        source: 'DETERMINISTIC_EMPTY',
        mode: 'Deterministic Empty Input',
        fields: extractStructuredFieldsFromText(''),
        providerInfo: { provider: null, model: null }
      }
    }

    const systemPrompt = `You are a strict document extraction assistant for scholarship application verification.
Extract only explicit factual data from the document text provided (Category: "${documentCategory}").
Do not guess, extrapolate, or invent information. If a field is not present in the text, return null.

Required JSON Schema:
{
  "fullName": string or null,
  "dob": string (DD/MM/YYYY or YYYY-MM-DD) or null,
  "annualIncome": number (in INR without commas) or null,
  "percentageMarks": number (e.g. 84.5) or null,
  "institutionName": string or null,
  "idNumber": string or null,
  "summary": string (concise 1-sentence factual summary)
}`

    const userContent = `Document text to analyze:
"""
${extractedText.slice(0, 4000)}
"""`

    const aiResult = await this.executeWithFailover({
      systemPrompt,
      userContent
    })

    if (aiResult.success && aiResult.content) {
      const parsed = aiResult.content
      return {
        aiAvailable: true,
        source: `AI_${aiResult.provider.toUpperCase()}`,
        mode: `${aiResult.provider.toUpperCase()} AI Extraction (${aiResult.model})`,
        providerInfo: {
          provider: aiResult.provider,
          model: aiResult.model,
          durationMs: aiResult.durationMs,
          usage: aiResult.usage
        },
        fields: {
          fullName: parsed.fullName || null,
          dob: parsed.dob || null,
          annualIncome: typeof parsed.annualIncome === 'number' ? parsed.annualIncome : null,
          percentageMarks: typeof parsed.percentageMarks === 'number' ? parsed.percentageMarks : null,
          institutionName: parsed.institutionName || null,
          idNumber: parsed.idNumber || null,
          summary: parsed.summary || null,
          extractionMethod: `AI_${aiResult.provider.toUpperCase()}`
        }
      }
    }

    // Failover fallback to deterministic extraction
    const fallbackFields = extractStructuredFieldsFromText(extractedText, documentCategory)
    return {
      aiAvailable: false,
      source: 'DETERMINISTIC_RULES',
      mode: 'Deterministic Demonstration Fallback',
      notice: aiResult.error || 'All AI providers unavailable or unconfigured. Reverted to deterministic pattern extraction.',
      providerInfo: {
        provider: null,
        model: null,
        attempts: aiResult.attempts || []
      },
      fields: fallbackFields
    }
  }
}

export const aiProviderManager = new AIProviderManager()
