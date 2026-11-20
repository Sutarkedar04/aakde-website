import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAttempts } from '../../testsApi'
import { tests } from '../../tests'
import { planFromQuestions } from '../../lib/buildTest'
import { DASH } from '../ui'

function TestCard({ t, best }) {
  const nav = useNavigate()
  const total = t.questions.length
  const [q, setQ] = useState(total)
  const [m, setM] = useState(t.duration)

  const normal = planFromQuestions(t, q).minutes // normal pace for this many questions
  const start = () =>
    nav(`/sarav/test/${t.id}?q=${q}&t=${m}&seed=${Date.now() % 1e9}`)

  return (
    <article data-reveal className={`flex flex-col border ${DASH} p-7`}>
      <h4 className="font-display text-xl font-semibold text-accent">{t.title}</h4>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-soft">
        <li>Full test: {total} questions</li>
        <li>{t.duration} minutes</li>
        <li>Negative marking</li>
      </ul>
      {best !== null && <p className="mt-4 text-sm font-medium">Best score: {best}%</p>}

      <label className="mt-6 block text-sm font-medium">
        <span className="flex justify-between">
          <span>Number of questions</span>
          <span className="text-soft">{q}</span>
        </span>
        <input
          type="range"
          className="mt-2 block w-full accent-accent"
          min={1}
          max={total}
          value={q}
          onChange={(e) => setQ(+e.target.value)}
        />
      </label>

      <label className="mt-5 block text-sm font-medium">
        <span className="flex justify-between">
          <span>Time limit (minutes)</span>
          <span className="text-soft">{m}</span>
        </span>
        <input
          type="range"
          className="mt-2 block w-full accent-accent"
          min={1}
          max={t.duration}
          value={m}
          onChange={(e) => setM(+e.target.value)}
        />
      </label>

      <p aria-live="polite" className="mt-3 text-sm text-soft">
        You will get <strong className="text-main">{q} questions</strong> in{' '}
        <strong className="text-main">{m} minutes</strong>.
        {m !== normal && (
          <>
            {' '}Normal pace is {normal} min.{' '}
            <button type="button" onClick={() => setM(normal)} className="font-medium text-accent underline">
              Use normal pace
            </button>
          </>
        )}
      </p>

      <button type="button" onClick={start} className="btn btn-primary mt-6 self-start">
        {best !== null ? 'Take it again' : 'Start test'}
      </button>
    </article>
  )
}

export default function MockTests() {
  const [attempts, setAttempts] = useState([])
  useEffect(() => { getAttempts().then(setAttempts) }, [])

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
      <div data-reveal>
        <h3 className="text-2xl font-semibold md:text-3xl">Mock tests</h3>
        <p className="mt-3 max-w-sm text-soft">
          Timed tests with a question palette, instant results and an answer key with explanations. Choose how many
          questions to attempt, or how much time you have.
        </p>
      </div>

      <div className="grid gap-4">
        {tests.map((t) => {
          // Compare by percentage, because attempts can now have different lengths
          const pct = (a) => Math.round((a.score / (a.maxScore || t.questions.length * t.marks.correct)) * 100)
          const mine = attempts.filter((a) => a.testId === t.id)
          const best = mine.length ? Math.max(...mine.map(pct)) : null
          return <TestCard key={t.id} t={t} best={best} />
        })}
      </div>
    </div>
  )
}