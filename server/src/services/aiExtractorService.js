import { GoogleGenerativeAI } from '@google/generative-ai'
import { config } from '../config/env.js'
import { extractStructuredFieldsFromText } from './ocrService.js'

let genAI = null
if (config.geminiApiKey) {
  try {
    genAI = new GoogleGenerativeAI(config.geminiApiKey)
  } catch (e) {
    console.warn('[AI Service] Failed to initialize GoogleGenerativeAI client:', e.message)
  }
}

/**
 * Extracts structured fields from document text using Gemini AI when configured,
 * or safely falls back to deterministic rule-based extraction.
 */
export async function extractWithAIOrFallback(extractedText, documentCategory = 'Document') {
  if (!extractedText || extractedText.trim().length === 0) {
    return {
      aiAvailable: false,
      mode: config.isDemonstrationMode ? 'Deterministic Demonstration Mode' : 'AI Mode (Empty Input)',
      fields: extractStructuredFieldsFromText(''),
      source: 'DETERMINISTIC_EMPTY'
    }
  }

  // Fallback if no Gemini API Key is configured
  if (!config.geminiApiKey || !genAI) {
    return {
      aiAvailable: false,
      mode: 'Deterministic Demonstration Mode',
      notice: 'Gemini API key is not configured. Extraction powered by deterministic pattern recognition.',
      fields: extractStructuredFieldsFromText(extractedText, documentCategory),
      source: 'DETERMINISTIC_RULES'
    }
  }

  // Attempt controlled Gemini extraction
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.1
      }
    })

    const prompt = `You are a document extraction assistant for scholarship verification.
Extract only explicit factual data from the following document text (Category: "${documentCategory}").
Do not guess, extrapolate, or invent information. If a field is not present in the text, return null.

Text to inspect:
"""
${extractedText.slice(0, 4000)}
"""

Respond ONLY with valid JSON conforming to this schema:
{
  "fullName": string or null,
  "dob": string (DD/MM/YYYY or YYYY-MM-DD) or null,
  "annualIncome": number (in INR) or null,
  "percentageMarks": number (e.g. 84.5) or null,
  "institutionName": string or null,
  "idNumber": string or null,
  "summary": string (concise 1-sentence factual description of the document)
}`

    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise((_, reject) => setTimeout(() => reject(new Error('AI extraction timeout (8s)')), 8000))
    ])

    const responseText = result.response.text()
    const parsed = JSON.parse(responseText)

    return {
      aiAvailable: true,
      mode: 'Gemini AI Structured Extraction',
      fields: {
        fullName: parsed.fullName || null,
        dob: parsed.dob || null,
        annualIncome: typeof parsed.annualIncome === 'number' ? parsed.annualIncome : null,
        percentageMarks: typeof parsed.percentageMarks === 'number' ? parsed.percentageMarks : null,
        institutionName: parsed.institutionName || null,
        idNumber: parsed.idNumber || null,
        summary: parsed.summary || null,
        extractionMethod: 'GEMINI_AI'
      },
      source: 'GEMINI_1.5_FLASH'
    }
  } catch (err) {
    console.warn('[AI Service Warning] Gemini extraction encountered an issue, falling back to deterministic parser:', err.message)
    return {
      aiAvailable: false,
      mode: 'Deterministic Fallback (AI Unavailable)',
      notice: `Gemini API query failed (${err.message}). Reverted to deterministic pattern extraction.`,
      fields: extractStructuredFieldsFromText(extractedText, documentCategory),
      source: 'DETERMINISTIC_FALLBACK'
    }
  }
}
