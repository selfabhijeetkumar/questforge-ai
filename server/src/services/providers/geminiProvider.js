import { GoogleGenerativeAI } from '@google/generative-ai'
import { AI_PROVIDERS_CONFIG } from '../../config/aiProviders.js'

export class GeminiProvider {
  constructor(config = AI_PROVIDERS_CONFIG.gemini) {
    this.name = 'Google Gemini'
    this.id = 'gemini'
    this.config = config
    this.client = null
    if (this.config.apiKey) {
      try {
        this.client = new GoogleGenerativeAI(this.config.apiKey)
      } catch (err) {
        console.warn('[GeminiProvider] Client init warning:', err.message)
      }
    }
  }

  isConfigured() {
    return Boolean(this.config.apiKey && this.config.apiKey.trim() !== '')
  }

  async generateStructuredResponse({ systemPrompt, userContent, timeout = 30000 }) {
    const startTime = Date.now()

    if (!this.isConfigured() || !this.client) {
      return {
        success: false,
        provider: this.id,
        model: this.config.model,
        errorCode: 'MISSING_CREDENTIALS',
        error: 'Google Gemini API key is not configured in environment (GEMINI_API_KEY).',
        retryable: false,
        durationMs: Date.now() - startTime
      }
    }

    try {
      const model = this.client.getGenerativeModel({
        model: this.config.model,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.1
        }
      })

      const fullPrompt = `${systemPrompt ? systemPrompt + '\n\n' : ''}${userContent}`

      const requestPromise = model.generateContent(fullPrompt)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          const timeoutErr = new Error(`Gemini request timed out after ${timeout}ms`)
          timeoutErr.code = 'TIMEOUT'
          reject(timeoutErr)
        }, timeout)
      })

      const result = await Promise.race([requestPromise, timeoutPromise])
      const text = result.response.text()

      let content
      try {
        content = JSON.parse(text)
      } catch (parseErr) {
        return {
          success: false,
          provider: this.id,
          model: this.config.model,
          errorCode: 'MALFORMED_JSON',
          error: `Gemini returned invalid JSON: ${parseErr.message}`,
          rawResponse: text,
          retryable: true,
          durationMs: Date.now() - startTime
        }
      }

      return {
        success: true,
        provider: this.id,
        model: this.config.model,
        content,
        usage: {
          promptTokens: result.response.usageMetadata?.promptTokenCount || null,
          completionTokens: result.response.usageMetadata?.candidatesTokenCount || null
        },
        durationMs: Date.now() - startTime
      }
    } catch (err) {
      const durationMs = Date.now() - startTime
      const errMsg = err.message || ''

      if (err.code === 'TIMEOUT' || errMsg.includes('timed out')) {
        return {
          success: false,
          provider: this.id,
          model: this.config.model,
          errorCode: 'TIMEOUT',
          error: errMsg,
          retryable: true,
          durationMs
        }
      }

      if (errMsg.includes('429') || errMsg.toLowerCase().includes('quota') || errMsg.toLowerCase().includes('rate limit')) {
        return {
          success: false,
          provider: this.id,
          model: this.config.model,
          errorCode: 'RATE_LIMITED',
          error: 'Gemini quota or rate limit exceeded.',
          retryable: false,
          durationMs
        }
      }

      if (errMsg.includes('401') || errMsg.includes('403') || errMsg.toLowerCase().includes('api key not valid') || errMsg.toLowerCase().includes('permission denied')) {
        return {
          success: false,
          provider: this.id,
          model: this.config.model,
          errorCode: 'AUTHENTICATION_ERROR',
          error: 'Gemini authentication failed (API key invalid or unauthorized).',
          retryable: false,
          durationMs
        }
      }

      return {
        success: false,
        provider: this.id,
        model: this.config.model,
        errorCode: 'PROVIDER_ERROR',
        error: errMsg,
        retryable: true,
        durationMs
      }
    }
  }
}

export const geminiProvider = new GeminiProvider()
