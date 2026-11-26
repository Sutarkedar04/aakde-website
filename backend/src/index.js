import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { db } from './db.js'

const app = express()
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }))
app.use(express.json())

app.get('/api/health', async (_req, res) => {
  const { total } = await db.orm.public.Exam.aggregate((agg) => ({
    total: agg.count(),
  }))
  res.json({ ok: true, exams: total })
})

const port = process.env.PORT ?? 4000
app.listen(port, () => console.log(`API running on http://localhost:${port}`))