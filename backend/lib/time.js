// Prisma 8 timestamp columns take and return UTC text such as "2026-11-26 09:10:48.497".

export const utcText = (date = new Date()) => date.toISOString().replace('T', ' ').replace('Z', '')

// Turns whatever the database returns (text or a Date) into milliseconds.
// Text without a time zone is UTC.
export function toTime(value) {
  if (value instanceof Date) return value.getTime()
  const text = String(value).trim().replace(' ', 'T')
  const hasZone = /(Z|[+-]\d{2}(:?\d{2})?)$/i.test(text.slice(10)) // look after the date part only
  return Date.parse(hasZone ? text : `${text}Z`)
}