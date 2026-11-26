import { Router } from 'express'
import { db } from '../db.js'

const router = Router()
const P = db.orm.public

// GET /api/exams  -> all published exams
router.get('/exams', async (_req, res) => {
  const exams = await P.Exam.where({ status: 'PUBLISHED' })
    .orderBy((e) => e.sortOrder.asc())
    .all()

  res.json(
    exams.map((e) => ({
      id: e.slug, // the frontend uses the slug as the exam id
      name: e.name,
      ...(e.guide ?? {}), // text, facts, pattern, steps, faqs, note
    }))
  )
})

// GET /api/exams/:slug/tests  -> published tests of one exam
router.get('/exams/:slug/tests', async (req, res) => {
  const exam = await P.Exam.where({ slug: req.params.slug }).first()
  if (!exam || exam.status !== 'PUBLISHED') {
    return res.status(404).json({ error: 'Exam not found' })
  }

  const tests = await P.Test.where({ examId: exam.id, status: 'PUBLISHED' })
    .orderBy((t) => t.createdAt.asc())
    .all()

  const result = []
  for (const t of tests) {
    const { total } = await P.TestQuestion.where({ testId: t.id }).aggregate((agg) => ({
      total: agg.count(),
    }))
    result.push({
      id: t.slug,
      exam: exam.slug,
      title: t.title,
      duration: t.durationMinutes,
      access: t.access,
      price: t.priceInPaise / 100,
      questionCount: total,
    })
  }
  res.json(result)
})

// GET /api/tests/:slug  -> one test with its questions, WITHOUT correct answers
router.get('/tests/:slug', async (req, res) => {
  const test = await P.Test.where({ slug: req.params.slug }).first()
  if (!test || test.status !== 'PUBLISHED') {
    return res.status(404).json({ error: 'Test not found' })
  }

  const links = await P.TestQuestion.where({ testId: test.id })
    .orderBy((l) => l.position.asc())
    .all()

  const questions = await Promise.all(
    links.map(async (link) => {
      const q = await P.Question.where({ id: link.questionId })
        .include('options', (o) => o.orderBy((x) => x.position.asc()))
        .first()

      return {
        id: q.id,
        text: q.text,
        type: q.type,
        marks: Number(link.marks),
        negativeMarks: Number(link.negativeMarks),
        // only id and text: isCorrect and explanation are never sent
        options: q.options.map((opt) => ({ id: opt.id, text: opt.text })),
      }
    })
  )

  res.json({
    id: test.slug,
    title: test.title,
    duration: test.durationMinutes,
    instructions: test.instructions,
    questions,
  })
})

export default router
