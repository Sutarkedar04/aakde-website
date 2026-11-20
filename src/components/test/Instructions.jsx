import { DASH } from '../ui'
import { Legend } from './status'

export default function Instructions({ test, onStart }) {
  const { questions, duration, marks } = test
  const facts = [
    ['Questions', questions.length],
    ['Duration', `${duration} minutes`],
    ['Correct answer', `+${marks.correct}`],
    ['Wrong answer', `−${marks.wrong}`],
    ['Not attempted', '0'],
  ]

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-soft">{test.exam} mock test</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{test.title}</h1>
      </div>

      <dl className={`grid grid-cols-2 border-y ${DASH} sm:grid-cols-5`}>
        {facts.map(([label, value]) => (
          <div key={label} className="p-4">
            <dt className="text-xs uppercase tracking-[0.12em] text-soft">{label}</dt>
            <dd className="mt-1 font-display text-lg font-semibold">{value}</dd>
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