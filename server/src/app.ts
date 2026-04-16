import express from 'express'
import cors from 'cors'
import prisma from './lib/prisma.js'
const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)

app.use(express.json())

app.get('/api/health', async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`

  res.status(200).json({
    message: 'BookEase API is running',
    database: 'connected',
  })
})

export default app
