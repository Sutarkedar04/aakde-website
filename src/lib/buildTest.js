// Pace comes from the test itself, so changing tests.js keeps this working.
const EPS = 1e-9
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n))

export const pace = (test) => test.duration / test.questions.length // minutes per question

export const planFromQuestions = (test, n) => {
  const q = clamp(Math.round(n), 1, test.questions.length)
  return { questions: q, minutes: Math.max(1, Math.ceil(q * pace(test) - EPS)) }
}

export const planFromMinutes = (test, m) => {
  const minutes = clamp(Math.round(m), 1, test.duration)
  return { questions: clamp(Math.floor(minutes / pace(test) + EPS), 1, test.questions.length), minutes }
}

// Small seeded random generator: same seed gives the same questions
function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const configFromParams = (sp) => ({
  q: Number(sp.get('q')) || undefined,
  t: Number(sp.get('t')) || undefined,
  seed: Number(sp.get('seed')) || 1,
})

// Returns a copy of the test with the chosen number of questions and duration
export function buildTest(test, { q, t, seed = 1 } = {}) {
  const total = test.questions.length
  const n = q ? clamp(Math.round(q), 1, total) : total
  const minutes = t ? clamp(Math.round(t), 1, test.duration) : planFromQuestions(test, n).minutes
  if (n === total) return { ...test, duration: minutes }

  const rand = rng(seed)
  const order = new Map(test.questions.map((x, i) => [x.id, i]))
  const picked = test.questions
    .map((x) => [rand(), x])
    .sort((a, b) => a[0] - b[0])
    .slice(0, n)
    .map(([, x]) => x)
    .sort((a, b) => order.get(a.id) - order.get(b.id)) // keep the original order
  return { ...test, duration: minutes, questions: picked }
}