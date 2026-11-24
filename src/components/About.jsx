import { useRef } from 'react'
import SectionHead from './SectionHead'
import useWordReveal from '../hooks/useWordReveal'

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useWordReveal(textRef, { sectionRef })

  return (
    <section
      ref={sectionRef}
      id="about"
      data-theme="light"
      className="relative overflow-hidden bg-paper py-20 text-main lg:flex lg:min-h-[calc(100svh-72px)] lg:items-center lg:py-0"
    >
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        {/* transform-none! keeps the word fixed in place: nothing can move it, whatever the scroll animation does */}
        <div
          aria-hidden="true"
          data-logo
          className="transform-none! bg-linear-to-br from-accent to-highlight bg-clip-text font-dev text-[clamp(6rem,16vw,12rem)] font-bold leading-[1.35] text-transparent"
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