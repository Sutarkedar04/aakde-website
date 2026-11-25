import { DASH } from '../ui'

// A highlighted panel (optionally with small fact chips)
export function Feature({ label, title, text, facts }) {
  return (
    <div data-reveal className={`border ${DASH} p-8 md:p-10`}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-soft">{label}</p>
      <h3 className="text-2xl font-semibold md:text-3xl">{title}</h3>
      <p className="mt-4 max-w-2xl text-soft">{text}</p>
      {facts && (
        <ul className="mt-8 flex flex-wrap gap-3">
          {facts.map((f) => (
            <li key={f} className={`border ${DASH} px-4 py-2 text-sm font-medium`}>{f}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

// A title with rows
export function ListBlock({ title, items }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
      <h3 data-reveal className="text-2xl font-semibold md:text-3xl">{title}</h3>
      <ul className={`border-t ${DASH}`}>
        {items.map((item) => (
          <li key={item} data-reveal className={`flex items-center gap-4 border-b ${DASH} py-4`}>
            <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-bright" />
            <span className="text-lg">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// A grid of small cards: items = [{ title, text }]
export function CardsBlock({ title, text, items }) {
  return (
    <div>
      <div data-reveal className="mb-10 max-w-2xl">
        <h3 className="text-2xl font-semibold md:text-3xl">{title}</h3>
        {text && <p className="mt-3 text-soft">{text}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} data-reveal className={`border ${DASH} p-7 transition-colors hover:bg-main/3`}>
            {/* Removed the top badge row. Moved "Coming soon" to the title line. */}
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-display text-lg font-semibold text-accent">{item.title}</h4>
              {item.soon && <span className="mt-1 shrink-0 text-[11px] font-semibold uppercase tracking-[0.15em] text-soft">Coming soon</span>}
            </div>
            <p className="mt-2 text-soft">{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}