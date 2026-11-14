const W = 420, H = 360, PAD = 20
const actual = [0.18, 0.24, 0.2, 0.33, 0.3, 0.46, 0.42, 0.58, 0.55, 0.7]
const forecast = [0.7, 0.74, 0.82, 0.78, 0.9]

const total = actual.length + forecast.length - 1
const x = (i) => PAD + (i * (W - PAD * 2)) / (total - 1)
const y = (v) => H - PAD - v * (H - PAD * 2)
const pts = (arr, offset = 0) => arr.map((v, i) => `${x(i + offset)},${y(v)}`)

export default function HeroChart() {
  const line = pts(actual)
  const future = pts(forecast, actual.length - 1)
  const area = `${line.join(' ')} ${x(actual.length - 1)},${H - PAD} ${PAD},${H - PAD}`
  const last = actual.length - 1

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="Line chart of actual values with a dashed forecast">
      <defs>
        <linearGradient id="hero-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--color-actual)' }} stopOpacity="0.3" />
          <stop offset="1" style={{ stopColor: 'var(--color-actual)' }} stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: total }, (_, i) => (
        <g key={i}>
          <line x1={x(i)} x2={x(i)} y1={PAD} y2={H - PAD} className="stroke-white/20 [stroke-dasharray:2_6]" />
          <circle cx={x(i)} cy={PAD} r="1.5" className="fill-white/50" />
        </g>
      ))}
      <polygon points={area} fill="url(#hero-fill)" className="c-area opacity-0" />
      <polyline
        points={line.join(' ')}
        pathLength="1"
        className="c-line fill-none stroke-actual stroke-[2.5] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:1] [stroke-dashoffset:1]"
      />
      <polyline points={future.join(' ')} className="c-forecast fill-none stroke-forecast stroke-[2.5] [stroke-dasharray:6_6] opacity-0" />
      {actual.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="3" className="c-dot fill-[#0a2523] stroke-actual stroke-[1.5] opacity-0" />
      ))}
      <circle cx={x(last)} cy={y(actual[last])} r="6" className="c-now fill-forecast opacity-0">
        <animate attributeName="r" values="6;9;6" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}