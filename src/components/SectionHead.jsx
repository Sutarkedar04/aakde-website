import Badge from './Badge'


export default function SectionHead({ n, label, title, children, mb = 'mb-10 md:mb-12' }) {
  return (
    <div className={`max-w-3xl ${mb}`}>
      <p data-reveal className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-soft">
        <Badge n={n} strong={false} />
        {label}
      </p>
      <h2 data-reveal className="text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      {children && <p data-reveal className="mt-5 max-w-[52ch] text-lg text-soft">{children}</p>}
    </div>
  )
}