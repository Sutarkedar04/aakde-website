import { useRef } from 'react'
import SectionHead from './SectionHead'
import useWordReveal from '../hooks/useWordReveal'
import { DIGITS } from './ui'

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useWordReveal(textRef, { sectionRef })

  return (
    <section
      ref={sectionRef}
      id="about"
      data-theme="dark"
      className="relative overflow-hidden bg-navy py-20 text-main lg:flex lg:min-h-[calc(100svh-72px)] lg:items-center lg:py-0"
    >
      <div
        aria-hidden="true"
        data-digits
        className="pointer-events-none absolute inset-x-0 inset-y-[-15%] select-none overflow-hidden break-all font-mono text-[13px] leading-[1.35] tracking-[0.35em] text-white/6 will-change-transform mask-[radial-gradient(70%_70%_at_30%_50%,black,transparent)]"
      >
        {DIGITS}
      </div>

      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div
          aria-hidden="true"
          data-logo
          className="bg-linear-to-br from-white to-accent bg-clip-text font-dev text-[clamp(6rem,16vw,12rem)] font-bold leading-[1.35] text-transparent will-change-transform"
        >
          आकडे
        </div>

        <div>
          <SectionHead n="02" label="About AAKDE" title="Bringing intelligence to ideas, learning and action." mb="mb-8" />

          <div ref={textRef} className="space-y-4 text-soft">
            <p>
              AAKDE is an intelligence-driven organization bringing together knowledge, technology and expertise across diverse domains.
            </p>
            <p>
              Through assessment platforms, professional training, project consulting and project support, we create opportunities, deliver solutions and enable growth.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}