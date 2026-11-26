import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

// Passwords are hashed with scrypt, which ships with Node (nothing to install).
// The settings are stored inside each hash, so they can be raised later without breaking old passwords.
const scryptAsync = promisify(scrypt)
const N = 2 ** 15
const R = 8
const P = 3
const KEY_LENGTH = 64
const MAX_MEMORY = 64 * 1024 * 1024

export async function hashPassword(password) {
  const salt = randomBytes(16)
  const hash = await scryptAsync(password, salt, KEY_LENGTH, { N, r: R, p: P, maxmem: MAX_MEMORY })
  return ['scrypt', N, R, P, salt.toString('base64'), hash.toString('base64')].join('$')
}

export async function verifyPassword(password, stored) {
  const [scheme, n, r, p, saltB64, hashB64] = String(stored).split('$')
  if (scheme !== 'scrypt' || !saltB64 || !hashB64) return false
  const expected = Buffer.from(hashB64, 'base64')
  const actual = await scryptAsync(password, Buffer.from(saltB64, 'base64'), expected.length, {
    N: Number(n), r: Number(r), p: Number(p), maxmem: MAX_MEMORY,
  })
  return timingSafeEqual(actual, expected)
}

// Checked when an email is unknown, so a wrong email takes as long as a wrong password
export const dummyHash = await hashPassword(randomBytes(8).toString('hex'))