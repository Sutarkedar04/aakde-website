import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { getAttempts } from '../../testsApi'
import { tests } from '../../tests'
import { exams } from '../../exams'
import { planFromQuestions } from '../../lib/buildTest'
import { ScrollTrigger } from '../../lib/gsap'
import Badge from '../Badge'
import ExamDetails from './ExamDetails'
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

  // Open the first exam that already has a test, so a demo is visible right away
  const [openId, setOpenId] = useState(() => exams.find((e) => tests.some((t) => t.exam === e.id))?.id ?? null)

  // Opening or closing a row changes the page height, so re-measure the scroll animations
  useEffect(() => { ScrollTrigger.refresh() }, [openId])

  return (
    <div>
      <div data-reveal className="mb-10 max-w-2xl">
        <h3 className="text-2xl font-semibold md:text-3xl">Examinations</h3>
        <p className="mt-3 text-soft">
          Choose an examination to read about it and practise with a demo mock test.
        </p>
      </div>

      <ul className={`border-t ${DASH}`}>
        {exams.map((e, i) => {
          const list = tests.filter((t) => t.exam === e.id)
          const isOpen = openId === e.id
          return (
            <li key={e.id} data-reveal className={`border-b ${DASH}`}>
              <h4>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`exam-${e.id}`}
                  onClick={() => setOpenId(isOpen ? null : e.id)}
                  className="flex w-full items-center gap-4 py-5 text-left transition-colors hover:bg-main/3"
                >
                  <Badge n={i + 1} />
                  <span className="flex-1 text-lg font-medium">{e.name}</span>
                  <span className="hidden text-[11px] font-semibold uppercase tracking-[0.15em] text-soft sm:block">
                    {list.length ? `${list.length} test${list.length > 1 ? 's' : ''}` : 'Coming soon'}
                  </span>
                  <ChevronDown
                    size={20}
                    aria-hidden="true"
                    className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </h4>

              {isOpen && (
                <div id={`exam-${e.id}`} className="pb-10 md:pl-14">
                  <ExamDetails exam={e} topics={[...new Set(list.flatMap((t) => t.questions.map((q) => q.topic)))]}>
                    {list.length > 0 && (
                      <div className="grid gap-4 lg:grid-cols-2">
                        {list.map((t) => {
                          // Compare by percentage, because attempts can have different lengths
                          const pct = (a) => Math.round((a.score / (a.maxScore || t.questions.length * t.marks.correct)) * 100)
                          const mine = attempts.filter((a) => a.testId === t.id)
                          const best = mine.length ? Math.max(...mine.map(pct)) : null
                          return <TestCard key={t.id} t={t} best={best} />
                        })}
                      </div>
                    )}
                  </ExamDetails>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}