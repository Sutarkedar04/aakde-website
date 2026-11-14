export default function Badge({ n, strong = true }) {
  return <span className={`badge ${strong ? 'font-semibold' : ''}`}>{String(n).padStart(2, '0')}</span>
}
