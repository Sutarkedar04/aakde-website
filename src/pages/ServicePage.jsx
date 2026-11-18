import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import useScrollEffects from '../hooks/useScrollEffects'
import Blend from '../components/Blend'
import Badge from '../components/Badge'
import SectionHead from '../components/SectionHead'
import { DASH, DIGITS } from '../components/ui'
import logo from '../assets/aakde_logo.png'
import { servicePages } from '../servicePages'

/* ---------- Section blocks (chosen by `kind` in servicePages.js) ---------- */

function Feature({ label, title, text, facts }) {
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

function ListBlock({ title, items, ordered }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
      <h3 data-reveal className="text-2xl font-semibold md:text-3xl">{title}</h3>
      <ul className={`border-t ${DASH}`}>
        {items.map((item, i) => (
          <li key={item} data-reveal className={`flex items-center gap-4 border-b ${DASH} py-4`}>
            {ordered ? <Badge n={i + 1} /> : <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-bright" />}
            <span className="text-lg">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CardsBlock({ title, text, items }) {
  return (
    <div>
      <div data-reveal className="mb-10 max-w-2xl">
        <h3 className="text-2xl font-semibold md:text-3xl">{title}</h3>
        {text && <p className="mt-3 text-soft">{text}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <article key={item.title} data-reveal className={`border ${DASH} p-7 transition-colors hover:bg-main/3`}>
            <Badge n={i + 1} />
            <h4 className="mt-6 font-display text-lg font-semibold text-accent">{item.title}</h4>
            <p className="mt-2 text-soft">{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

const blocks = { feature: Feature, list: ListBlock, cards: CardsBlock }

/* ---------- Page ---------- */

function ServiceView({ service }) {
  useScrollEffects()

  return (
    <>
      <section data-theme="dark" className="relative overflow-hidden bg-navy text-main">
        <div
          aria-hidden="true"
          data-speed="0.15"
          className="pointer-events-none absolute inset-x-0 inset-y-[-15%] select-none overflow-hidden break-all font-mono text-[13px] leading-[1.35] tracking-[0.35em] text-white/6 will-change-transform mask-[radial-gradient(70%_70%_at_70%_40%,black,transparent)]"
        >
          {DIGITS}
        </div>

        {/* Same simple header as the login and register pages */}
        <header className="wrap relative flex h-18 items-center justify-between">
          <Link to="/" aria-label="AAKDE home" className="shrink-0">
            <img src={logo} alt="AAKDE" className="h-10 w-auto" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-main/70 transition hover:text-main">
            <ArrowLeft size={16} /> Back to home
          </Link>
        </header>

        <div className="wrap relative py-20 md:py-28">
          <p className="mb-5 animate-[rise_.8s_both] font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent">by AAKDE</p>
          <h1 className="animate-[rise_.8s_.1s_both] text-5xl font-bold tracking-tight md:text-7xl">
            {service.name} <span className="font-dev text-highlight">({service.word})</span>
          </h1>
          <p className="mt-5 max-w-2xl animate-[rise_.8s_.2s_both] font-display text-xl font-medium md:text-2xl">{service.subtitle}</p>
          <p className="mt-4 max-w-xl animate-[rise_.8s_.3s_both] text-lg text-soft">{service.tagline}</p>
          {service.ctas && (
            <div className="mt-10 flex animate-[rise_.8s_.4s_both] flex-wrap gap-3.5">
              {service.ctas.map((c) => (
                <Link key={c.label} to={c.to} className={`btn ${c.ghost ? 'btn-ghost' : 'btn-primary'}`}>{c.label}</Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Blend from="var(--color-steel)" to="var(--color-paper)" />

      <section data-theme="light" className="bg-paper pb-24 pt-4 text-main">
        <div className="wrap space-y-20">
          <SectionHead n="01" label="About" title={service.about.heading} mb="mb-0">{service.about.text}</SectionHead>
          {service.sections.map((s, i) => {
            const Block = blocks[s.kind]
            return <Block key={i} {...s} />
          })}
          <Link to="/" className="btn btn-primary">Back to home</Link>
        </div>
      </section>
    </>
  )
}

export default function ServicePage() {
  const { slug } = useParams()
  const service = servicePages.find((s) => s.slug === slug)

  if (!service) {
    return (
      <main className="wrap py-32 text-center">
        <h1 className="text-4xl font-semibold">Service not found</h1>
        <Link to="/" className="btn btn-primary mt-8">Back to home</Link>
      </main>
    )
  }
  // key={slug} remounts the view when the service changes, so the animations run again
  return <ServiceView key={slug} service={service} />
}