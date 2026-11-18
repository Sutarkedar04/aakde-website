import { DIGITS } from './ui'

const STAGE_H = 'h-[88svh] min-h-[520px]'

export default function Hero() {
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
          <h1 className="max-w-3xl animate-[rise_.8s_.1s_both] text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
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