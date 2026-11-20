import { useEffect, useRef, useState } from 'react'
import { DASH } from '../ui'
import { Legend, STATUS_CLASS, statusOf } from './status'

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
const ghostBtn = 'btn border border-main/30 text-main hover:bg-main/10'

export default function TestRunner({ test, onSubmit }) {
  const { questions, duration } = test
  const n = questions.length

  const [responses, setResponses] = useState(() =>
    Object.fromEntries(questions.map((q, i) => [q.id, { answer: null, marked: false, visited: i === 0 }]))
  )
  const [cur, setCur] = useState(0)
  const [left, setLeft] = useState(Math.round(duration * 60))
  const [confirming, setConfirming] = useState(false)

  const responsesRef = useRef(responses) // the timer needs the latest answers when it submits
  responsesRef.current = responses
  const startRef = useRef(Date.now())
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    const seconds = Math.min(Math.round(duration * 60), Math.round((Date.now() - startRef.current) / 1000))
    onSubmit(responsesRef.current, seconds)
  }

  // Countdown from a fixed end time, so it stays correct even if the tab is throttled
  useEffect(() => {
    const end = startRef.current + duration * 60000
    const id = setInterval(() => {
      const remaining = Math.max(0, Math.round((end - Date.now()) / 1000))
      setLeft(remaining)
      if (remaining === 0) finish()
    }, 500)
    return () => clearInterval(id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Warn before the page is refreshed or closed
  useEffect(() => {
    const warn = (e) => e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [])

  const q = questions[cur]
  const r = responses[q.id]
  const patch = (id, p) => setResponses((all) => ({ ...all, [id]: { ...all[id], ...p } }))
  const go = (i) => {
    const j = Math.max(0, Math.min(n - 1, i))
    setCur(j)
    patch(questions[j].id, { visited: true })
  }
  const saveNext = () => { patch(q.id, { marked: false }); go(cur + 1) }
  const markNext = () => { patch(q.id, { marked: true }); go(cur + 1) }

  const counts = Object.values(responses).reduce(
    (c, x) => { c[statusOf(x)]++; return c },
    { answered: 0, 'answered-marked': 0, marked: 0, 'not-answered': 0, 'not-visited': 0 }
  )
  const answeredTotal = counts.answered + counts['answered-marked']

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-6 mb-8 flex items-center justify-between border-b border-line bg-paper/90 px-6 py-3 backdrop-blur-md">
        <p className="text-sm font-medium text-soft">Question {cur + 1} of {n}</p>
        <p role="timer" className={`font-display text-2xl font-semibold tabular-nums ${left <= 60 ? 'text-danger' : ''}`}>{fmt(left)}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Question */}
        <div>
          <div className={`border ${DASH} p-6 md:p-8`}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-soft">{q.topic}</p>
            <h2 className="text-xl font-semibold leading-snug md:text-2xl">{q.text}</h2>
            <div role="radiogroup" aria-label="Options" className="mt-6 grid gap-3">
              {q.options.map((opt, i) => {
                const selected = r.answer === i
                return (
                  <label
                    key={i}
                    className={`flex cursor-pointer items-start gap-3 p-4 transition-colors ${
                      selected ? 'border border-solid border-primary bg-primary/5' : `border ${DASH} hover:bg-main/3`
                    }`}
                  >
                    <input type="radio" name={q.id} checked={selected} onChange={() => patch(q.id, { answer: i })} className="mt-1.5 accent-primary" />
                    <span><span className="mr-2 font-semibold text-soft">{String.fromCharCode(65 + i)}.</span>{opt}</span>
                  </label>
                )
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className={ghostBtn} onClick={() => go(cur - 1)} disabled={cur === 0}>Previous</button>
            <button type="button" className={ghostBtn} onClick={() => patch(q.id, { answer: null })} disabled={r.answer == null}>Clear response</button>
            <button type="button" className={ghostBtn} onClick={markNext}>Mark for Review &amp; Next</button>
            <button type="button" className="btn btn-primary" onClick={saveNext}>Save &amp; Next</button>
          </div>
        </div>

        {/* Palette */}
        <aside className={`h-fit border ${DASH} p-6`}>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em]">Question palette</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((x, i) => {
              const s = statusOf(responses[x.id])
              return (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Question ${i + 1}`}
                  aria-current={i === cur ? 'true' : undefined}
                  className={`relative grid h-10 w-10 place-items-center rounded text-sm font-semibold ${STATUS_CLASS[s]} ${i === cur ? 'ring-2 ring-primary ring-offset-2 ring-offset-paper' : ''}`}
                >
                  {i + 1}
                  {s === 'answered-marked' && <i className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-success" />}
                </button>
              )
            })}
          </div>
          <div className={`mt-6 border-t ${DASH} pt-6`}><Legend /></div>
          <button type="button" className="btn btn-primary mt-6 w-full" onClick={() => setConfirming(true)}>Submit test</button>
        </aside>
      </div>

      {confirming && (
        <div role="dialog" aria-modal="true" aria-label="Submit test" className="fixed inset-0 z-20 grid place-items-center bg-deep/60 p-6">
          <div className="w-full max-w-md bg-paper p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold">Submit test?</h2>
            <p className="mt-2 text-soft">You cannot change your answers after submitting.</p>
            <dl className={`mt-6 grid grid-cols-2 gap-y-3 border-y ${DASH} py-5 text-sm`}>
              <dt className="text-soft">Answered</dt><dd className="text-right font-semibold">{answeredTotal}</dd>
              <dt className="text-soft">Not answered</dt><dd className="text-right font-semibold">{counts['not-answered'] + counts.marked}</dd>
              <dt className="text-soft">Not visited</dt><dd className="text-right font-semibold">{counts['not-visited']}</dd>
              <dt className="text-soft">Marked for review</dt><dd className="text-right font-semibold">{counts.marked + counts['answered-marked']}</dd>
            </dl>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" className={ghostBtn} onClick={() => setConfirming(false)}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={finish}>Submit now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}