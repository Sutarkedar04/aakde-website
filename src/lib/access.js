/*
  Who may take a demo test.
  A guest gets ONE free demo per exam. After that they need to sign in or register.

  This is stored in the browser (localStorage), so it is a gentle limit, not real security:
  clearing site data or using a private window resets it. A real limit needs the backend.

  Login.jsx and Register.jsx should call signIn(user) when they succeed. Until real login exists,
  nobody can pass the limit. To test it, run in the browser console:
    localStorage.setItem('aakde.user', '{}')           // act as signed in
    localStorage.removeItem('aakde.user')               // act as a guest
    localStorage.removeItem('aakde.freeDemos.v1')       // give the free demos back
*/
const USER = 'aakde.user'
const USED = 'aakde.freeDemos.v1'

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

export const isLoggedIn = () => !!read(USER, null)
export const signIn = (user = {}) => localStorage.setItem(USER, JSON.stringify(user))
export const signOut = () => localStorage.removeItem(USER)

export const hasUsedFreeDemo = (examId) => read(USED, []).includes(examId)

export function markFreeDemoUsed(examId) {
  const used = read(USED, [])
  if (!used.includes(examId)) localStorage.setItem(USED, JSON.stringify([...used, examId]))
}

// Signed-in users always can. Guests can until they have used the free demo of that exam.
export const canTakeDemo = (examId) => isLoggedIn() || !hasUsedFreeDemo(examId)