// Loads the exams and demo tests from the frontend data files into the database.
// Run from the backend folder: npm run db:seed
// Safe to run again: exams are updated, tests that already exist are skipped.
import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { db } from '../db.js'
import { exams as examData } from '../../frontend/src/features/sarav/data/exams.js'
import { tests as testData } from '../../frontend/src/features/sarav/data/tests.js'

// Decimal columns take numbers as text
const dec = (n, places) => Number(n).toFixed(places)

// Timestamp columns take UTC text such as 2026-11-26 09:10:48.497, not a Date
const now = () => new Date().toISOString().replace('T', ' ').replace('Z', '')

async function seedExams() {
  const ids = new Map() // slug -> id
  for (const [i, e] of examData.entries()) {
    const guide = JSON.parse(
      JSON.stringify({
        text: e.text,
        facts: e.facts,
        pattern: e.pattern,
        steps: e.steps,
        faqs: e.faqs,
        note: e.note,
      })
    )
    const fields = {
      name: e.name,
      guide,
      sortOrder: i,
      status: 'PUBLISHED',
      updatedAt: now(),
    }
    const existing = await db.orm.public.Exam.where({ slug: e.id }).first()
    if (existing) {
      await db.orm.public.Exam.where({ id: existing.id }).update(fields)
      ids.set(e.id, existing.id)
    } else {
      const id = randomUUID()
      await db.orm.public.Exam.create({ id, slug: e.id, ...fields })
      ids.set(e.id, id)
    }
  }
  return ids
}

async function seedTopics() {
  const names = new Set(testData.flatMap((t) => t.questions.map((q) => q.topic)))
  const ids = new Map() // name -> id
  for (const name of names) {
    const existing = await db.orm.public.Topic.where({ name }).first()
    if (existing) {
      ids.set(name, existing.id)
    } else {
      const id = randomUUID()
      await db.orm.public.Topic.create({ id, name })
      ids.set(name, id)
    }
  }
  return ids
}

async function seedTests(examIds, topicIds) {
  let created = 0
  let skipped = 0
  for (const t of testData) {
    const examId = examIds.get(t.exam)
    if (!examId) throw new Error(`Test "${t.id}" points to an unknown exam "${t.exam}"`)
    if (await db.orm.public.Test.where({ slug: t.id }).first()) {
      skipped++
      continue
    }
    // One transaction per test: either the whole test is saved, or none of it
    await db.transaction(async (tx) => {
      const testId = randomUUID()
      await tx.orm.public.Test.create({
        id: testId,
        examId,
        slug: t.id,
        title: t.title,
        access: 'FREE_DEMO',
        priceInPaise: 0,
        currency: 'INR',
        durationMinutes: t.duration,
        status: 'PUBLISHED',
        updatedAt: now(),
      })
      for (const [position, q] of t.questions.entries()) {
        const questionId = randomUUID()
        await tx.orm.public.Question.create({
          id: questionId,
          topicId: topicIds.get(q.topic),
          type: 'SINGLE_CHOICE',
          text: q.text,
          explanation: q.explanation,
          difficulty: 'MEDIUM',
          status: 'PUBLISHED',
          updatedAt: now(),
        })
        for (const [index, text] of q.options.entries()) {
          await tx.orm.public.QuestionOption.create({
            id: randomUUID(),
            questionId,
            position: index,
            text,
            isCorrect: index === q.answer,
          })
        }
        await tx.orm.public.TestQuestion.create({
          testId,
          questionId,
          position,
          marks: dec(t.marks.correct, 3),
          negativeMarks: dec(t.marks.wrong, 6),
        })
      }
    })
    created++
  }
  return { created, skipped }
}

try {
  const examIds = await seedExams()
  const topicIds = await seedTopics()
  const { created, skipped } = await seedTests(examIds, topicIds)
  console.log(
    `Seed finished: ${examIds.size} exams, ${topicIds.size} topics, ${created} tests added, ${skipped} already there.`
  )
} catch (err) {
  console.error('Seed failed:', err)
  process.exitCode = 1
} finally {
  await db.close() // without this the script never exits
}
