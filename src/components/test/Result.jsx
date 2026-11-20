import { Link } from 'react-router-dom'
import { DASH } from '../ui'

const fmtTime = (s) => `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`

export default function Result({ test, result, responses, timeTaken, onRetake }) {
  const stats = [
    ['Correct', result.correct],
    ['Wrong', result.wrong],
    ['Not attempted', result.skipped],
    ['Accuracy', `${result.accuracy}%`],
    ['Time taken', fmtTime(timeTaken)],
  ]

  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-soft">{test.title}</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Your result</h1>
        <p className="mt-6 font-display text-6xl font-bold tracking-tight text-accent">
          {result.score} <span className="text-2xl font-semibold text-soft">/ {result.maxScore}</span>
        </p>
      </div>

      <dl className={`grid grid-cols-2 border-y ${DASH} sm:grid-cols-5`}>
        {stats.map(([label, value]) => (
          <div key={label} className="p-4">
            <dt className="text-xs uppercase tracking-[0.12em] text-soft">{label}</dt>
            <dd className="mt-1 font-display text-lg font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      <section>
        <h2 className="mb-5 text-xl font-semibold">Topic-wise analysis</h2>
        <ul className="space-y-4">
          {Object.entries(result.byTopic).map(([topic, t]) => (
            <li key={topic}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-medium">{topic}</span>
                <span className="text-soft">{t.correct} / {t.total} correct</span>
              </div>
              <div className="h-2 bg-haze"><div className="h-full bg-bright" style={{ width: `${(t.correct / t.total) * 100}%` }} /></div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-5 text-xl font-semibold">Answer key</h2>
        <ol className="space-y-5">
          {test.questions.map((q, i) => {
            const given = responses[q.id]?.answer
            return (
              <li key={q.id} className={`border ${DASH} p-6`}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-soft">Question {i + 1} · {q.topic}</p>
                <p className="font-semibold">{q.text}</p>
                <ul className="mt-4 grid gap-2 text-sm">
                  {q.options.map((opt, j) => {
                    const isCorrect = j === q.answer
                    const isWrongPick = j === given && !isCorrect
                    return (
                      <li key={j} className={`px-3 py-2 ${isCorrect ? 'border border-success font-semibold text-success' : isWrongPick ? 'border border-danger font-semibold text-danger' : `border ${DASH}`}`}>
                        {String.fromCharCode(65 + j)}. {opt}
                        {isCorrect && ' (correct answer)'}
                        {isWrongPick && ' (your answer)'}
                      </li>
                    )
                  })}
                </ul>
                {given == null && <p className="mt-3 text-sm text-soft">You did not attempt this question.</p>}
                <p className="mt-4 text-sm text-soft"><span className="font-semibold text-main">Explanation: </span>{q.explanation}</p>
              </li>
            )
          })}
        </ol>
      </section>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onRetake} className="btn btn-primary">Retake test</button>
        <Link to="/services/sarav" className="btn border border-main/30 text-main hover:bg-main/10">Back to SARAV</Link>
      </div>
    </div>
  )
}