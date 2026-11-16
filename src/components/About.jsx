import SectionHead from './SectionHead'
import { DIGITS } from './ui'

export default function About() {
  return (
    <section id="about" data-theme="dark" className={`relative overflow-hidden py-28 text-main bg-navy`}>
      <div
        aria-hidden="true"
        data-speed="0.15"
        className="pointer-events-none absolute inset-x-0 inset-y-[-15%] select-none overflow-hidden break-all font-mono text-[13px] leading-[1.35] tracking-[0.35em] text-white/6 will-change-transform mask-[radial-gradient(70%_70%_at_30%_50%,black,transparent)]"
      >
        {DIGITS}
      </div>
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div
          aria-hidden="true"
          data-speed="-0.08"
          className="bg-linear-to-br from-white to-accent bg-clip-text font-dev text-[clamp(6rem,16vw,12rem)] font-bold leading-none text-transparent will-change-transform"
        >
          आकडे
        </div>
        <div>
          <SectionHead n="02" label="About" title="About AAKDE" mb="mb-8" />
          <div className="space-y-4 text-soft">
            <p data-reveal>
              AAKDE comes from the Marathi word for “numbers”. We believe every business problem can be understood and
              solved through quantitative thinking. We combine statistics, risk analytics, machine learning and
              quantitative finance to deliver practical solutions.
            </p>
            <p data-reveal>
              Our mission is to bridge the gap between theory and practice in quantitative analytics, giving individuals
              and organizations the resources, expertise and support to thrive in a data-driven world.
            </p>
          </div>
          <div data-reveal className="mt-8 border border-dashed border-main/25 p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em]">
              <span className="font-dev text-highlight">आकडे</span> · Marathi
            </p>
            <p className="mt-2 text-soft">Numbers. The belief that clear thinking about data leads to better decisions.</p>
          </div>
        </div>
      </div>
    </section>
  )
}