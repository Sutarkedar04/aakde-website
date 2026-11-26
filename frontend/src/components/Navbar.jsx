import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { navLinks, services } from '../data'
import useDock from '../hooks/useDock'
import logo from '../assets/aakde_logo.png'
import AccountMenu from './AccountMenu'

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

const ids = navLinks.map((l) => l.id)

const linkBase = 'border-b-2 py-3 text-sm transition-colors md:py-1.5'
const on = 'border-accent text-main'
const off = 'border-transparent text-main/70 hover:text-main'

// "Services" opens a menu with one link per service. Add a service in data.js and it shows up here.
function ServicesMenu({ label, highlighted, pathname, onNavigate }) {
  const [open, setOpen] = useState(false)
  const box = useRef(null)

  useEffect(() => { setOpen(false) }, [pathname])

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!box.current?.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center gap-1.5 ${linkBase} md:w-auto ${highlighted || open ? on : off}`}
      >
        {label}
        <ChevronDown size={14} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul className="pb-2 pl-4 md:absolute md:left-1/2 md:top-full md:z-20 md:mt-3 md:w-72 md:-translate-x-1/2 md:rounded-xl md:border md:border-line md:bg-base md:p-2 md:pl-2 md:pb-2 md:shadow-2xl md:shadow-black/30">
          {services.map(({ slug, name, word }) => {
            const to = `/services/${slug}`
            return (
              <li key={slug}>
                <Link
                  to={to}
                  aria-current={pathname === to ? 'page' : undefined}
                  onClick={() => { setOpen(false); onNavigate() }}
                  className={`flex items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm transition hover:bg-main/10 hover:text-main ${
                    pathname === to ? 'text-main' : 'text-main/80'
                  }`}
                >
                  <span>{name}</span>
                  {word && <span aria-hidden="true" className="font-dev text-highlight">{word}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  const navRef = useRef(null)
  const { pathname } = useLocation()
  useDock(navRef) // dock-style magnification on hover (desktop)

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-base/85 backdrop-blur-md">
      <div className="wrap flex h-18 items-center justify-between gap-6 md:grid md:grid-cols-[1fr_auto_1fr]">
        <a href="/#home" aria-label="AAKDE home" className="shrink-0 md:justify-self-start">
          <img src={logo} alt="AAKDE" className="h-10 w-auto" />
        </a>

        <nav
          ref={navRef}
          aria-label="Main"
          className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-18 flex-col border-b border-line bg-base px-6 pb-5 md:relative md:inset-auto md:flex md:flex-row md:gap-7 md:justify-self-center md:border-0 md:bg-transparent md:p-0`}
        >
          {navLinks.map((l) => {
            if (l.id === 'services') {
              return (
                <ServicesMenu
                  key={l.id}
                  label={l.label}
                  pathname={pathname}
                  highlighted={pathname.startsWith('/services/') || (pathname === '/' && active === l.id)}
                  onNavigate={() => setOpen(false)}
                />
              )
            }

            // "Contact" opens the contact page directly; the other links scroll to their section on the home page
            const isContact = l.id === 'contact'
            const Item = isContact ? Link : 'a'
            const target = isContact ? { to: '/contact' } : { href: `/#${l.id}` }

            return (
              <Item
                key={l.id}
                {...target}
                onClick={() => setOpen(false)}
                className={`${linkBase} ${pathname === '/' && active === l.id ? on : off}`}
              >
                {l.label}
              </Item>
            )
          })}
        </nav>

        <div className="flex items-center gap-3 md:justify-self-end">
          <AccountMenu />
          <button
            className="text-main md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  )
}