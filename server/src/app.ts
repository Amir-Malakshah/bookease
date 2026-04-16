import express from 'express'
import cors from 'cors'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)

app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    message: 'BookEase API is running',
  })
})

export default app
