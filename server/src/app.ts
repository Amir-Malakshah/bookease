import express from 'express'
import cors from 'cors'
import prisma from './lib/prisma.js'
import authRoutes from './modules/auth/auth.routes.js'
import clientRoutes from './modules/clients/clients.routes.js'
import serviceRoutes from './modules/services/services.routes.js'
import appointmentRoutes from './modules/appointments/appointments.routes.js'
import dashboardRoutes from './modules/dashboard/dashboard.routes.js'
const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin))

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
)

app.use(express.json())

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'BookEase API is live',
  })
})

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`

    res.status(200).json({
      message: 'BookEase API is running',
      database: 'connected',
    })
  } catch (error) {
    console.error('Health check DB error:', error)

    res.status(500).json({
      message: 'BookEase API is running',
      database: 'not connected',
    })
  }
})

app.use('/api/auth', authRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/dashboard', dashboardRoutes)

export default app
