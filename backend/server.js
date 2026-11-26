import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { db } from './db.js'
import examRoutes from './routes/exams.js'
import cookieParser from 'cookie-parser'
import { loadUser } from './middleware/auth.js'
import authRoutes from './routes/auth.js'


const app = express()
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN.split(',').map((s) => s.trim()),
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(loadUser)
app.use('/api/auth', authRoutes)

app.get('/api/health', async (_req, res) => {
  try {
    const exams = await db.orm.public.Exam.all()
    res.json({ ok: true, exams: exams.length })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: err.message })
  }
})
app.use('/api', examRoutes)

// Any error in a route returns JSON instead of a crashed request
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Something went wrong' })
})

const port = process.env.PORT ?? 4000
app.listen(port, (err) => {
  if (err) {
    console.error('Failed to start:', err)
    process.exit(1)
  }
  console.log(`API running on http://localhost:${port}`)
})