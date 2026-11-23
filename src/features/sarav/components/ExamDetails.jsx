import Badge from '../../../components/Badge'
import { ScrollTrigger } from '../../../lib/gsap'
import { DASH } from '../../../components/ui'

const heading = 'mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-soft'

// Everything about one exam: overview, facts, pattern, guidance, FAQs and its demo tests (children).
export default function ExamDetails({ exam, topics = [], children }) {
  const { text, facts, pattern, steps, faqs, note } = exam

  return (
    <div className="space-y-10">
      <p className="max-w-2xl text-soft">
        {text || 'Details and mock tests for this examination will be added soon.'}
      </p>

      {facts && (
        <section>
          <h5 className={heading}>At a glance</h5>
          <dl className={`grid border-t ${DASH} sm:grid-cols-2 sm:gap-x-10`}>
            {facts.map(([label, value]) => (
              <div key={label} className={`border-b ${DASH} py-3`}>
                <dt className="text-sm text-soft">{label}</dt>
                <dd className="mt-1 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {pattern && (
        <section>
          <h5 className={heading}>Exam pattern</h5>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[30rem] text-left text-sm">
              <thead>
                <tr className={`border-y ${DASH}`}>
                  {pattern.columns.map((c) => <th key={c} scope="col" className="py-3 pr-4 font-semibold">{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {pattern.rows.map((row) => (
                  <tr key={row[0]} className={`border-b ${DASH}`}>
                    {row.map((cell, j) => <td key={j} className="py-3 pr-4">{cell}</td>)}
                  </tr>
                ))}
                {pattern.totals?.map((row) => (
                  <tr key={row[0]} className={`border-b ${DASH} font-semibold`}>
                    {row.map((cell, j) => <td key={j} className="py-3 pr-4">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pattern.notes && (
            <ul className="mt-5 space-y-2 text-soft">
              {pattern.notes.map((n) => (
                <li key={n} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-bright" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {steps && (
        <section>
          <h5 className={heading}>How to prepare</h5>
          <ol className={`border-t ${DASH}`}>
            {steps.map((s, i) => (
              <li key={s.title} className={`flex gap-4 border-b ${DASH} py-4`}>
                <Badge n={i + 1} />
                <div>
                  <p className="font-medium">{s.title}</p>
                  <p className="mt-1 text-soft">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section>
        <h5 className={heading}>Demo mock tests</h5>
        {children ? (
          <>
            {topics.length > 0 && (
              <p className="mb-5 text-sm text-soft">Topics covered: {topics.join(', ')}.</p>
            )}
            {children}
          </>
        ) : (
          <p className="text-soft">A demo test for this examination is coming soon.</p>
        )}
      </section>

      {faqs && (
        <section>
          <h5 className={heading}>Frequently asked questions</h5>
          <div className={`border-t ${DASH}`}>
            {faqs.map((f) => (
              <details key={f.q} onToggle={() => ScrollTrigger.refresh()} className={`group border-b ${DASH} py-4`}>
                <summary className="cursor-pointer list-none font-medium marker:hidden">{f.q}</summary>
                <p className="mt-2 text-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {note && <p className="text-sm text-soft">{note}</p>}
    </div>
  )
}