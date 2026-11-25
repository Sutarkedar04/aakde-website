import { DASH } from '../../../components/ui'
import { exams } from '../data/exams'
import { Legend } from './status'

// Show marks the way people write them: 1, 0.25, 1/3, 2/3. Never a long decimal.
function fmt(n) {
  const abs = Math.abs(n)
  const thirds = Math.round(abs * 3)
  if (Math.abs(abs * 3 - thirds) < 1e-6 && thirds % 3 !== 0) return `${thirds}/3`
  return String(Math.round(abs * 100) / 100)
}

export default function Instructions({ test, onStart }) {
  const { questions, duration, marks } = test
  const examName = exams.find((e) => e.id === test.exam)?.name ?? test.exam
  const facts = [
    ['Questions', questions.length],
    ['Duration', `${duration} minutes`],
    ['Correct', `+${fmt(marks.correct)}`],
    ['Wrong', marks.wrong > 0 ? `−${fmt(marks.wrong)}` : 'No penalty'],
    ['Not attempted', '0'],
  ]

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-soft">{examName}</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{test.title}</h1>
      </div>

      <dl className={`grid grid-cols-2 border-y ${DASH} sm:grid-cols-5`}>
        {facts.map(([label, value]) => (
          <div key={label} className="flex min-w-0 flex-col justify-between gap-1 p-4">
            <dt className="text-xs uppercase tracking-[0.12em] text-soft">{label}</dt>
            <dd className="font-display text-lg font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Before you begin</h2>
        <ul className="list-disc space-y-2 pl-5 text-soft marker:text-bright">
          <li>The timer starts when you press Start test, and the test submits by itself when time is up.</li>
          <li>Choose an option to answer. Use Clear response to remove your choice.</li>
          <li>Save &amp; Next moves on. Mark for Review &amp; Next flags a question to come back to. A marked question that you answered still counts.</li>
          <li>Use the question palette to jump to any question.</li>
          <li>Do not refresh or close the page during the test. Your answers are only kept once you submit.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Question palette</h2>
        <Legend />
      </section>

      <button type="button" onClick={onStart} className="btn btn-primary">Start test</button>
    </div>
  )
}