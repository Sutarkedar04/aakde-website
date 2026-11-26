import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, User } from 'lucide-react'
import useAuth from '../hooks/useAuth'

export default function AccountMenu() {
  const { user, isLoggedIn, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const box = useRef(null)
  const navigate = useNavigate()

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

  if (!isLoggedIn) return null

  const name = user?.name || 'Account'
  const initial = name.trim().charAt(0).toUpperCase()

  const handleLogout = async () => {
    setOpen(false)
    await logout()
    navigate('/')
  }

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Account menu"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-line py-1 pl-1 pr-1 transition hover:bg-main/10 sm:pr-3"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-accent font-display text-sm font-semibold text-accent-ink">
          {initial}
        </span>
        <span className="hidden max-w-28 truncate text-sm text-main sm:inline">{name.split(' ')[0]}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-3 w-64 rounded-xl border border-line bg-base p-2 shadow-2xl shadow-black/30">
          <div className="border-b border-line px-3 py-2">
            <p className="truncate text-sm font-semibold text-main">{name}</p>
            {user?.email && <p className="truncate text-xs text-soft">{user.email}</p>}
          </div>
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-main/80 transition hover:bg-main/10 hover:text-main"
          >
            <User size={16} aria-hidden="true" /> My profile
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-main/80 transition hover:bg-main/10 hover:text-main"
          >
            <LogOut size={16} aria-hidden="true" /> Log out
          </button>
        </div>
      )}
    </div>
  )
}