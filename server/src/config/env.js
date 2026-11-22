import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from server root or repo root
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
  maxFileSizeMb: parseInt(process.env.MAX_FILE_SIZE_MB, 10) || 10,
  allowedFileTypes: (process.env.ALLOWED_FILE_TYPES || 'application/pdf,image/jpeg,image/png').split(','),
  isDemonstrationMode: !process.env.GEMINI_API_KEY
}

export function validateEnv() {
  const warnings = []
  if (!config.geminiApiKey) {
    warnings.push('GEMINI_API_KEY is not set. Running in High-Fidelity Deterministic Demonstration Mode.')
  }
  if (!config.supabaseUrl) {
    warnings.push('SUPABASE_URL is not set. Using secure in-memory/session storage fallback.')
  }
  return { valid: true, warnings }
}
