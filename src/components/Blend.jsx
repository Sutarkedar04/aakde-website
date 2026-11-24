const N = 33 // colour stops: many small steps avoid visible bands
const K = 10 // steps in each edge fade
const ease = (p) => p * p * (3 - 2 * p)
const r = (n) => Math.round(n * 1000) / 1000

/*
  The strip keeps its small height (className), so the gap between two sections does not grow.
  The gradient is drawn taller: it reaches `above` px into the section before it and `below` px into the
  section after it, and fades out at both ends. Keep both values smaller than the empty padding at that edge.

  For a seamless join, `from` must be the colour at the BOTTOM of the section before,
  and `to` the colour at the TOP of the section after:
    bg-navy      top night   bottom steel
    bg-dawn      top mist    bottom paper
    bg-paper-haze  top paper bottom haze
    bg-haze-paper  top haze  bottom paper
    bg-paper-mist  top paper bottom mist
    bg-paper     paper all through
*/
export default function Blend({ from, to, className = 'h-16 md:h-24', above = 48, below = 48 }) {
  const colour = Array.from({ length: N }, (_, i) => {
    const p = i / (N - 1)
    return `color-mix(in oklab, ${to} ${r(ease(p) * 100)}%, ${from}) ${r(p * 100)}%`
  }).join(', ')

  const up = above > 0
    ? Array.from({ length: K + 1 }, (_, k) => `rgba(0,0,0,${r(ease(k / K))}) ${r((above * k) / K)}px`)
    : ['#000 0px']
  const down = below > 0
    ? Array.from({ length: K + 1 }, (_, k) => `rgba(0,0,0,${r(1 - ease(k / K))}) calc(100% - ${r(below * (1 - k / K))}px)`)
    : ['#000 100%']
  const fade = `linear-gradient(to bottom, ${[...up, ...down].join(', ')})`

  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute inset-x-0 z-[1]"
        style={{
          top: -above,
          bottom: -below,
          background: `linear-gradient(to bottom, ${colour})`,
          maskImage: fade,
          WebkitMaskImage: fade,
        }}
      />
    </div>
  )
}