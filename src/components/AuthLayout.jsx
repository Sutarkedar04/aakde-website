import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function AuthLayout({ title, subtitle, footer, children }) {
  return (
    <div data-theme="dark" className="relative flex min-h-svh flex-col overflow-hidden bg-navy text-main">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-sky-400/15 blur-3xl" />
      <header className="wrap relative flex h-18 items-center justify-between">
        <Link to="/" aria-label="AAKDE home" className="font-display text-xl font-bold tracking-wide">
          AAKDE<span className="ml-2 font-dev text-lg text-highlight">आकडे</span>
        </Link>
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-main/70 transition hover:text-main">
          <ArrowLeft size={16} /> Back to home
        </Link>
      </header>
      <main className="wrap relative grid flex-1 place-items-center py-12">
        <div className="w-full max-w-md animate-[rise_.8s_both] rounded-3xl border border-white/10 bg-black/30 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm md:p-10">
          <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-soft">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-6 text-center text-sm text-soft">{footer}</p>
        </div>
      </main>
    </div>
  )
}