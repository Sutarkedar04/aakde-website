import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data'
import logo from '../assets/aakde_logo.png'

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

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-base/85 backdrop-blur-md">
      <div className="wrap flex h-18 items-center justify-between gap-6">
        <a href="#home" aria-label="AAKDE home" className="shrink-0">
          <img src={logo} alt="AAKDE" className="h-10 w-auto" />
        </a>

        <nav
          aria-label="Main"
          className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-18 flex-col border-b border-line bg-base px-6 pb-5 md:static md:flex md:flex-row md:gap-7 md:border-0 md:bg-transparent md:p-0`}
        >
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className={`border-b-2 py-3 text-sm transition md:py-1.5 ${
                active === l.id ? 'border-accent text-main' : 'border-transparent text-main/70 hover:text-main'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button className="text-main md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}