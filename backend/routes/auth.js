import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { randomUUID } from 'node:crypto'
import { db } from '../db.js'
import { dummyHash, hashPassword, verifyPassword } from '../lib/password.js'
import { COOKIE, cookieOptions, createSession, destroySession, publicUser } from '../lib/session.js'
import { utcText } from '../lib/time.js'

const router = Router()
const P = db.orm.public

// Slows down password guessing and fake sign-ups
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts. Please try again in a few minutes.' },
})

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const clean = (value) => String(value ?? '').trim()

function validateRegister(body) {
  const name = clean(body.name)
  const email = clean(body.email).toLowerCase()
  const phone = clean(body.phone)
  const password = String(body.password ?? '')
  const errors = {}
  if (name.length < 2 || name.length > 100) errors.name = 'Enter your name.'
  if (!EMAIL.test(email) || email.length > 254) errors.email = 'Enter a valid email address.'
  if (phone && !/^[0-9+\-\s]{7,15}$/.test(phone)) errors.phone = 'Enter a valid mobile number.'
  if (password.length < 8) errors.password = 'Use at least 8 characters.'
  else if (password.length > 128) errors.password = 'Use at most 128 characters.'
  return { values: { name, email, phone, password }, errors }
}

const startSession = async (res, user, req) => {
  const token = await createSession(user.id, req.get('user-agent'))
  res.cookie(COOKIE, token, cookieOptions())
}

// POST /api/auth/register  { name, email, password, phone? }
router.post('/register', limiter, async (req, res) => {
  const { values, errors } = validateRegister(req.body ?? {})
  if (Object.keys(errors).length) return res.status(400).json({ errors })

  const taken = { errors: { email: 'An account with this email already exists.' } }
  if (await P.User.where({ email: values.email }).first()) return res.status(409).json(taken)

  let user
  try {
    user = await P.User.create({
      id: randomUUID(),
      email: values.email,
      name: values.name,
      ...(values.phone && { phone: values.phone }),
      passwordHash: await hashPassword(values.password),
      updatedAt: utcText(),
    })
  } catch (err) {
    // Two sign-ups with the same email at the same moment: the database's unique rule catches the second
    if (/unique|duplicate/i.test(String(err?.message))) return res.status(409).json(taken)
    throw err
  }

  await startSession(res, user, req)
  res.status(201).json({ user: publicUser(user) })
})

// POST /api/auth/login  { email, password }
router.post('/login', limiter, async (req, res) => {
  const email = clean(req.body?.email).toLowerCase()
  const password = String(req.body?.password ?? '')

  const user = email ? await P.User.where({ email }).first() : null
  const passwordOk = password.length <= 128 && (await verifyPassword(password, user?.passwordHash ?? dummyHash))

  // Same message for a wrong email and a wrong password, so nobody can test which emails exist
  if (!user || !passwordOk) return res.status(401).json({ error: 'Wrong email or password.' })
  if (user.status !== 'ACTIVE') return res.status(403).json({ error: 'This account is suspended. Please contact support.' })

  await startSession(res, user, req)
  res.json({ user: publicUser(user) })
})

// POST /api/auth/logout
router.post('/logout', async (req, res) => {
  await destroySession(req.cookies?.[COOKIE])
  res.clearCookie(COOKIE, { ...cookieOptions(), maxAge: undefined })
  res.json({ ok: true })
})

// GET /api/auth/me  -> { user } or { user: null }, so the frontend can ask "who am I?" on page load
router.get('/me', (req, res) => {
  res.json({ user: req.user ? publicUser(req.user) : null })
})

export default router