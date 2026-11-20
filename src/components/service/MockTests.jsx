import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAttempts } from '../../testsApi'
import { tests } from '../../tests'
import { DASH } from '../ui'

export default function MockTests() {
  const [attempts, setAttempts] = useState([])
  useEffect(() => { getAttempts().then(setAttempts) }, [])

  return (
    <div>
      <div data-reveal className="mb-10 max-w-2xl">
        <h3 className="text-2xl font-semibold md:text-3xl">Mock tests</h3>
        <p className="mt-3 text-soft">Timed tests with a question palette, instant results and an answer key with explanations.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {tests.map((t) => {
          const mine = attempts.filter((a) => a.testId === t.id)
          const best = mine.length ? Math.max(...mine.map((a) => a.score)) : null
          return (
            <article key={t.id} data-reveal className={`flex flex-col border ${DASH} p-7`}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-soft">{t.exam}</p>
              <h4 className="mt-3 font-display text-xl font-semibold text-accent">{t.title}</h4>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-soft">
                <li>{t.questions.length} questions</li>
                <li>{t.duration} minutes</li>
                <li>Negative marking</li>
              </ul>
              {best !== null && <p className="mt-4 text-sm font-medium">Best score: {best} / {t.questions.length * t.marks.correct}</p>}
              <Link to={`/sarav/test/${t.id}`} className="btn btn-primary mt-6 self-start">{best !== null ? 'Take it again' : 'Start test'}</Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}