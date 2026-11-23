import { DIGITS } from './ui'

const STAGE_H = 'h-[88svh] min-h-[520px]'

export default function Hero() {
  return (
    <section id="home" data-theme="dark" className={`relative overflow-hidden bg-navy text-main ${STAGE_H}`}>
      {/* Parallax digits */}
      <div
        aria-hidden="true"
        data-speed="0.3"
        className="pointer-events-none absolute inset-x-0 inset-y-[-20%] select-none overflow-hidden break-all font-mono text-[13px] leading-[1.35] tracking-[0.35em] text-white/[0.07] will-change-transform mask-[radial-gradient(75%_85%_at_72%_40%,black,transparent)]"
      >
        {DIGITS}
      </div>

      {/* Main wrapper: Centered as a single block, no longer stretched */}
      <div className={`wrap relative flex flex-col justify-center ${STAGE_H}`}>
        
        <div>
          {/* Brand Name */}
          <p className="mb-4 animate-[rise_.8s_both] font-display text-4xl font-bold leading-[1.1] tracking-tight text-main md:text-6xl">
            AAKDE <span className="ml-2 text-accent font-dev">आकडे</span>
          </p>
          
          {/* Heading */}
          <h1 className="max-w-3xl animate-[rise_.8s_.1s_both] text-2xl font-semibold leading-[1.2] tracking-tight text-soft md:text-3xl">
            Intelligence for better decisions
          </h1>
          
          <div className="mt-10 flex animate-[rise_.8s_.3s_both] flex-wrap gap-3.5">
            <a href="#services" className="btn btn-primary">Explore services</a>
            <a href="#contact" className="btn btn-ghost">Get in Touch</a>
          </div>
        </div>

        {/* The bottom text: uses a tight margin (mt-10) instead of being pushed by flex-1 */}
        <div className="mt-10 animate-[rise_.8s_.45s_both]">
          <p className="max-w-lg text-lg text-soft">
            Bringing knowledge, technology and expertise together to empower better decisions.
          </p>
        </div>

      </div>
    </section>
  )
}