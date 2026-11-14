const STEPS = [0, 0.104, 0.352, 0.648, 0.896, 1]

export default function Blend({ from, to, className = 'h-40 md:h-64' }) {
  const stops = STEPS.map((t, i) => `color-mix(in oklab, ${to} ${t * 100}%, ${from}) ${i * 20}%`).join(', ')
  return <div aria-hidden="true" className={className} style={{ background: `linear-gradient(to bottom, ${stops})` }} />
}