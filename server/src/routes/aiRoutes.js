import express from 'express'
import { aiProviderManager } from '../services/aiProviderManager.js'

const router = express.Router()

/**
 * GET /api/ai/status
 * Returns sanitized status and health information for all configured AI providers.
 * Strictly avoids leaking secret API keys or internal infrastructure credentials.
 */
router.get('/ai/status', (req, res) => {
  const status = aiProviderManager.getStatus()
  res.status(200).json({
    status: 'success',
    data: status
  })
})

export default router
