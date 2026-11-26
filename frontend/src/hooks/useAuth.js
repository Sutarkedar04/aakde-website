import { useMemo, useSyncExternalStore } from 'react'
import { api } from '../lib/api'
import { getUserRaw, subscribeAuth, signOut } from '../lib/access' // same file as in Login.jsx

export default function useAuth() {
  const raw = useSyncExternalStore(subscribeAuth, getUserRaw, () => null)

  const user = useMemo(() => {
    try {
      return JSON.parse(raw)
    } catch {
      return null
    }
  }, [raw])

  const logout = async () => {
    try {
      await api('/auth/logout', { method: 'POST' }) // ends the session on the server
    } catch {
      // even if the server is unreachable, sign out in the browser
    }
    signOut()
  }

  return { user, isLoggedIn: Boolean(raw), logout }
}