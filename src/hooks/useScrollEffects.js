import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

export default function useScrollEffects() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 1. Reveal Animation
      gsap.set('[data-reveal]', { autoAlpha: 0, y: 28 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', overwrite: true }),
      })

      // 2. Parallax Animation
      gsap.utils.toArray('[data-speed]').forEach((el) => {
        const speed = parseFloat(el.dataset.speed)
        gsap.fromTo(
          el,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: 'none',
            scrollTrigger: { 
              trigger: el.closest('section, footer') || el, 
              start: 'top bottom', 
              end: 'bottom top', 
              scrub: true,
              // ADDED: Ensure parallax recalculates when pins are added/removed
              invalidateOnRefresh: true 
            },
          }
        )
      })
    })

    // 3. Refresh logic
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    
    // ADDED: Give the browser a tiny moment to paint the pinned layout before refreshing
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setTimeout(() => ScrollTrigger.refresh(), 100)
      })
    }

    return () => {
      window.removeEventListener('load', refresh)
      mm.revert()
    }
  }, [])
}