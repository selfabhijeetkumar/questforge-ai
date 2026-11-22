import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from './config/env.js'
import { apiLimiter } from './middleware/rateLimiter.js'
import { errorHandler } from './middleware/errorHandler.js'
import healthRoutes from './routes/healthRoutes.js'

const app = express()

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))

// Explicit CORS
app.use(cors({
  origin: [config.clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// JSON & URL-encoded Body Parsers
app.use(express.json({ limit: '15mb' }))
app.use(express.urlencoded({ extended: true, limit: '15mb' }))

// Rate limiting on /api routes
app.use('/api', apiLimiter)

// Mount Routes
app.use('/api', healthRoutes)

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: `API endpoint ${req.method} ${req.originalUrl} not found.`
  })
})

// Centralized error handler
app.use(errorHandler)

export default app
