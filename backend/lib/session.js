import { createHash, randomBytes, randomUUID } from 'node:crypto'
import { db } from '../db.js'
import { toTime, utcText } from './time.js'

const P = db.orm.public
const DAYS = Number(process.env.SESSION_DAYS ?? 7)
const sha256 = (text) => createHash('sha256').update(text).digest('hex')

export const COOKIE = 'aakde_session'

export const cookieOptions = () => {
  const isProd = process.env.NODE_ENV === 'production'
  return {
    httpOnly: true, // JavaScript on the page cannot read it
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd, // HTTPS only on the live site (required when sameSite is 'none')
    path: '/',
    maxAge: DAYS * 24 * 60 * 60 * 1000,
  }
}

// The browser gets a random token. The database only keeps its hash, so a leaked database cannot be used to sign in.
export async function createSession(userId, userAgent) {
  const token = randomBytes(32).toString('base64url')
  await P.Session.create({
    id: randomUUID(),
    userId,
    tokenHash: sha256(token),
    ...(userAgent && { userAgent: userAgent.slice(0, 255) }),
    expiresAt: utcText(new Date(Date.now() + DAYS * 24 * 60 * 60 * 1000)),
  })
  return token
}

// Returns the signed-in user for a cookie value, or null
export async function findSessionUser(token) {
  if (!token) return null
  const tokenHash = sha256(token)
  const session = await P.Session.where({ tokenHash }).first()
  if (!session) return null
  if (toTime(session.expiresAt) <= Date.now()) {
    await P.Session.where({ tokenHash }).delete()
    return null
  }
  const user = await P.User.where({ id: session.userId }).first()
  return user && user.status === 'ACTIVE' ? user : null
}

export async function destroySession(token) {
  if (token) await P.Session.where({ tokenHash: sha256(token) }).delete()
}

// What the browser is allowed to see about a user
export const publicUser = (u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  role: u.role,
  emailVerified: Boolean(u.emailVerifiedAt),
})