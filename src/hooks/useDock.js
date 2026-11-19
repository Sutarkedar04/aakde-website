import { useEffect } from 'react'
import { gsap } from '../lib/gsap'

/*
  macOS dock magnification for a row of items (based on the CodePen).
  Items near the pointer grow, lift upward and nudge their neighbours aside, following a cosine curve.

  peak   largest scale of the item under the pointer
  rise   extra upward lift in px for that item (on top of the lift that comes from growing)
  spread how much the neighbours slide sideways (1 = the CodePen's amount; lower = less sideways movement)

  Desktop with a mouse only, and not when the visitor prefers reduced motion.
*/
export default function useDock(ref, { peak = 1.6, rise = 4, spread = 0.35 } = {}) {
  useEffect(() => {
    const dock = ref.current
    if (!dock) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)', () => {
      const items = [...dock.children].filter((el) => el.offsetWidth > 0) // skip anything hidden at this size
      if (items.length < 2) return

      // Origin at the bottom edge, like the dock: items grow upward and the baseline stays put
      gsap.set(items, { transformOrigin: '50% 100%' })
      // quickTo reuses one tween per item instead of creating new ones on every mouse move
      const opts = { duration: 0.3, ease: 'power1.out' }
      const xTo = items.map((el) => gsap.quickTo(el, 'x', opts))
      const yTo = items.map((el) => gsap.quickTo(el, 'y', opts))
      const scaleTo = items.map((el) => gsap.quickTo(el, 'scale', opts))

      const onMove = (e) => {
        const pointer = e.clientX - dock.getBoundingClientRect().left
        // Link widths differ, so measure the real centres (offsetLeft ignores transforms)
        const centers = items.map((el) => el.offsetLeft + el.offsetWidth / 2)
        const min = (centers[centers.length - 1] - centers[0]) / (centers.length - 1) // average spacing
        if (!min) return
        const max = min * peak
        const bound = min * Math.PI

        items.forEach((_, i) => {
          const distance = centers[i] - pointer
          let x, y, scale
          if (-bound < distance && distance < bound) {
            const rad = (distance / min) * 0.5
            const k = Math.cos(rad) // 1 under the pointer, fading to 0 at the edge
            scale = 1 + (peak - 1) * k
            x = 2 * (max - min) * Math.sin(rad) * spread
            y = -rise * k
          } else {
            scale = 1
            x = (-bound < distance ? 2 : -2) * (max - min) * spread
            y = 0
          }
          xTo[i](x)
          yTo[i](y)
          scaleTo[i](scale)
        })
      }
      const onLeave = () => items.forEach((_, i) => { xTo[i](0); yTo[i](0); scaleTo[i](1) })

      dock.addEventListener('mousemove', onMove)
      dock.addEventListener('mouseleave', onLeave)
      return () => {
        dock.removeEventListener('mousemove', onMove)
        dock.removeEventListener('mouseleave', onLeave)
      }
    })

    return () => mm.revert()
  }, [ref, peak, rise, spread])
}