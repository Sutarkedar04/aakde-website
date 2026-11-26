import { COOKIE, findSessionUser } from '../lib/session.js'

// Runs on every request: sets req.user to the signed-in user, or null
export async function loadUser(req, _res, next) {
  req.user = await findSessionUser(req.cookies?.[COOKIE])
  next()
}

export function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Please sign in.' })
  next()
}

// Example: router.get('/admin/messages', requireRole('STAFF', 'ADMIN'), handler)
export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Please sign in.' })
  if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'You do not have access to this.' })
  next()
}