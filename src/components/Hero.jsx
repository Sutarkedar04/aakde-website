import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { DIGITS } from './ui'

gsap.registerPlugin(SplitText)

const STAGE_H = 'h-[88svh] min-h-[520px]'

export default function Hero() {
  const headingRef = useRef(null)
  const splitRef = useRef(null)

  useEffect(() => {
    const el = headingRef.current
    if (!el) return

    // Split once into words + chars
    const split = SplitText.create(el, { type: 'chars, words' })
    splitRef.current = split

    // Hide the original text until chars are ready (prevents flash)
    gsap.set(el, { autoAlpha: 1 })

    // One-shot entrance: chars fly in from random Y / rotation
    gsap.from(split.chars, {
      yPercent: 'random(-200, 200)',
      rotation: 'random(-20, 20)',
      opacity: 0,
      ease: 'back.out(1.2)',
      duration: 1,
      stagger: 0.02,
      // No repeat, no yoyo, no scrollTrigger → runs only on mount/refresh
    })

    return () => {
      split.revert()
      splitRef.current = null
    }
  }, [])

  return (
    <section id="home" data-theme="dark" className={`relative overflow-hidden bg-navy text-main ${STAGE_H}`}>
      {/* Parallax digits: same pattern as About, slightly faster (0.15 -> 0.2) */}
      <div
        aria-hidden="true"
        data-speed="0.3"
        className="pointer-events-none absolute inset-x-0 inset-y-[-20%] select-none overflow-hidden break-all font-mono text-[13px] leading-[1.35] tracking-[0.35em] text-white/[0.07] will-change-transform mask-[radial-gradient(75%_85%_at_72%_40%,black,transparent)]"
      >
        {DIGITS}
      </div>

      <div className={`wrap relative flex flex-col ${STAGE_H}`}>
        <div className="flex flex-1 flex-col justify-center">
          <p className="mb-5 animate-[rise_.8s_both] font-display text-lg font-semibold text-soft">
            AAKDE <span className="ml-1 font-dev text-soft">आकडे</span>
          </p>
          <h1
            ref={headingRef}
            className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl"
            style={{ visibility: 'hidden' }} // revealed by GSAP once split is ready
          >
            Intelligence for better decisions
          </h1>
          <div className="mt-10 flex animate-[rise_.8s_.3s_both] flex-wrap gap-3.5">
            <a href="#services" className="btn btn-primary">Explore services</a>
            <a href="#contact" className="btn btn-ghost">Contact us</a>
          </div>
        </div>

        <div className="pb-8">
          <p className="max-w-md animate-[rise_.8s_.45s_both] text-lg text-soft">
            We turn complex data into clear, actionable intelligence so individuals and organizations can decide with confidence.
          </p>
        </div>
      </div>
    </section>
  )
}