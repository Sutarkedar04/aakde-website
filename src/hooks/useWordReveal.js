import { useLayoutEffect } from 'react'
import { gsap } from '../lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Pins the whole section while words reveal. The logo and digits move during the pin.
export default function useWordReveal(textRef, { sectionRef, distance = '+=150%', from = 0.15 } = {}) {
  useLayoutEffect(() => {
    const text = textRef.current
    const section = sectionRef.current
    if (!text || !section) return

    const mm = gsap.matchMedia()
    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        pin: '(min-width: 1024px) and (min-height: 480px)',
      },
      (ctx) => {
        const { motion, pin } = ctx.conditions
        if (!motion) return

        const q = gsap.utils.selector(section)
        const split = new SplitText(text.querySelectorAll('p'), { type: 'words' })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: pin
            ? {
                trigger: section,
                start: 'top top+=72', // below the 72px sticky navbar
                end: distance,
                pin: true,
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              }
            : { trigger: text, start: 'top 85%', end: 'bottom 35%', scrub: true },
        })

        tl.from(split.words, { opacity: from, stagger: 0.1, duration: 0.5 }, 0)
        tl.from(q('[data-after]'), { autoAlpha: 0, y: 20, duration: 1 }, '>-0.3') // Marathi box after the text

        if (pin) {
          const total = tl.duration()
          tl.fromTo(q('[data-logo]'), { yPercent: 12 }, { yPercent: -12, duration: total }, 0)
          tl.fromTo(q('[data-digits]'), { yPercent: -6 }, { yPercent: 6, duration: total }, 0)
        }

        return () => split.revert()
      }
    )

    return () => mm.revert()
  }, [textRef, sectionRef, distance, from])
}