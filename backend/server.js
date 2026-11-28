import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { db } from './db.js'
import examRoutes from './routes/exams.js'
import cookieParser from 'cookie-parser'
import { loadUser } from './middleware/auth.js'
import authRoutes from './routes/auth.js'

const app = express()
app.set('trust proxy', 1) // Required behind Render's HTTPS reverse proxy

const allowedOrigins = (process.env.FRONTEND_ORIGIN ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
)
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

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Something went wrong' })
})

const port = process.env.PORT ?? 4000
app.listen(port, () => {
  console.log(`API running on port ${port}`)
})