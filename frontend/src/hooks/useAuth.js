import { useMemo, useSyncExternalStore } from 'react'
import { api } from '../lib/api'
import { getUserRaw, isAuthReady, subscribeAuth, signOut } from '../lib/access'

export default function useAuth() {
  const raw = useSyncExternalStore(subscribeAuth, getUserRaw, () => null)
  const ready = useSyncExternalStore(subscribeAuth, isAuthReady, () => false)

  const user = useMemo(() => {
    try {
      return raw ? JSON.parse(raw) : null
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

  return { user, isLoggedIn: Boolean(raw), ready, logout }
}