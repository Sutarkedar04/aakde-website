import { tests as local } from './tests'

/*
  Where tests and attempts come from. Today: the local tests.js file and the browser's localStorage.
  With a backend, replace the functions below (the rest of the app does not change):
    getTests    = () => fetch('/api/tests').then((r) => r.json())
    getTest     = (id) => fetch(`/api/tests/${id}`).then((r) => (r.ok ? r.json() : null))
    getAttempts = () => fetch('/api/attempts').then((r) => r.json())
    saveAttempt = (a) => fetch('/api/attempts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(a) }).then((r) => r.json())
*/

export async function getTests() {
  return local
}

export async function getTest(id) {
  return local.find((t) => t.id === id) ?? null
}

const KEY = 'aakde.attempts.v1'

export async function getAttempts() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? []
  } catch {
    return []
  }
}

export async function saveAttempt(attempt) {
  const all = await getAttempts()
  localStorage.setItem(KEY, JSON.stringify([...all, attempt]))
  return attempt
}