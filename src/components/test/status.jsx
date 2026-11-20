// Question states and their colours (palette: green answered, amber skipped, deep blue marked, grey unseen)
export const STATUS_CLASS = {
  answered: 'bg-success text-white',
  'answered-marked': 'bg-secondary text-white',
  marked: 'bg-secondary text-white',
  'not-answered': 'bg-warning text-main',
  'not-visited': 'bg-haze text-main',
}

const LEGEND = [
  ['answered', 'Answered'],
  ['not-answered', 'Not answered'],
  ['not-visited', 'Not visited'],
  ['marked', 'Marked for review'],
  ['answered-marked', 'Answered and marked for review'],
]

export const statusOf = (r) =>
  r.answer != null && r.marked ? 'answered-marked' : r.marked ? 'marked' : r.answer != null ? 'answered' : r.visited ? 'not-answered' : 'not-visited'

export function Legend() {
  return (
    <ul className="grid gap-3 text-sm">
      {LEGEND.map(([status, label]) => (
        <li key={status} className="flex items-center gap-3">
          <span className={`relative h-6 w-6 shrink-0 rounded ${STATUS_CLASS[status]}`}>
            {status === 'answered-marked' && <i className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-success" />}
          </span>
          {label}
        </li>
      ))}
    </ul>
  )
}