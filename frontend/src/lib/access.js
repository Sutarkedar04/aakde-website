const USER = 'aakde.user'
const USED = 'aakde.freeDemos.v1'
const EVENT = 'aakde:auth'

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

// Tells React components that the signed-in user changed
const notify = () => window.dispatchEvent(new Event(EVENT))

export const isLoggedIn = () => !!read(USER, null)
export const signIn = (user = {}) => {
  localStorage.setItem(USER, JSON.stringify(user))
  notify()
}
export const signOut = () => {
  localStorage.removeItem(USER)
  notify()
}

// Used by useAuth: the raw stored text stays the same until the user really changes
export const getUserRaw = () => localStorage.getItem(USER)
export function subscribeAuth(callback) {
  window.addEventListener(EVENT, callback)
  window.addEventListener('storage', callback) // sign-in or sign-out in another tab
  return () => {
    window.removeEventListener(EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

export const hasUsedFreeDemo = (examId) => read(USED, []).includes(examId)

export function markFreeDemoUsed(examId) {
  const used = read(USED, [])
  if (!used.includes(examId)) localStorage.setItem(USED, JSON.stringify([...used, examId]))
}

export const canTakeDemo = (examId) => isLoggedIn() || !hasUsedFreeDemo(examId)