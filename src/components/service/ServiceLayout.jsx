import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import useScrollEffects from '../../hooks/useScrollEffects'
import Blend from '../Blend'
import SectionHead from '../SectionHead'
import { DIGITS } from '../ui'
import logo from '../../assets/aakde_logo.png'

/*
  The frame every service page shares: navy header and title, a smooth fade, then the About text.
  Each page passes its own words and puts its own sections inside as children.
*/
export default function ServiceLayout({ name, word, subtitle, tagline, ctas, aboutHeading, about, children }) {
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
            {name} <span className="font-dev text-highlight">({word})</span>
          </h1>
          <p className="mt-5 max-w-2xl animate-[rise_.8s_.2s_both] font-display text-xl font-medium md:text-2xl">{subtitle}</p>
          <p className="mt-4 max-w-xl animate-[rise_.8s_.3s_both] text-lg text-soft">{tagline}</p>
          {ctas && (
            <div className="mt-10 flex animate-[rise_.8s_.4s_both] flex-wrap gap-3.5">
              {ctas.map((c) => (
                <Link key={c.label} to={c.to} className={`btn ${c.ghost ? 'btn-ghost' : 'btn-primary'}`}>{c.label}</Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Blend from="var(--color-steel)" to="var(--color-paper)" />

      <section data-theme="light" className="bg-paper pb-24 pt-4 text-main">
        <div className="wrap grid gap-20">
          <SectionHead n="01" label="About" title={aboutHeading} mb="mb-0">{about}</SectionHead>
          {children}
          <Link to="/" className="btn btn-primary justify-self-start">Back to home</Link>
        </div>
      </section>
    </>
  )
}