import { useLayoutEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap } from '../lib/gsap'
import HeroChart from './HeroChart'
import { DASH, DIGITS } from './ui'
import { heroStats } from '../data'

/*
  How the effect works (same idea as the reference site):
  - The dark hero is ONE full-size layer. Scrolling animates its clip-path from "show everything"
    to a small centered card. Nothing is scaled; the layer is simply cropped from all sides.
  - Inside that same layer, a dashboard card sits exactly where the card ends up, hidden at first.
    When the crop reaches the card size, the hero text has faded out and the dashboard fades in.
  - The light background, dotted grid lines, headline and pillars sit behind the layer and
    fade in around the card.
*/
const STAGE_H = 'h-[calc(100svh-72px)] min-h-[560px]'

const pillars = [
  { n: '01', title: 'Quantitative thinking', text: 'Statistics and modeling applied to real business problems.' },
  { n: '02', title: 'Analytics and intelligence', text: 'Predictive models, dashboards and AI that support decisions.' },
  { n: '03', title: 'Education and development', text: 'Training for students and professionals in analytics and finance.' },
]

const hide = 'invisible opacity-0' // GSAP's autoAlpha reveals these

export default function Hero() {
  const stage = useRef(null)
  const layer = useRef(null)
  const copy = useRef(null)
  const dash = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    const q = gsap.utils.selector(stage)

    mm.add(
      {
        desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
      },
      (ctx) => {
        const { desktop } = ctx.conditions
        // Final card rectangle (must match the classes on the dashboard wrapper below)
        const card = desktop ? 'inset(6% 34% 6% 34% round 24px)' : 'inset(22% 6% 6% 6% round 20px)'

        gsap.set(layer.current, { clipPath: 'inset(0% 0% 0% 0% round 0px)' })
        gsap.set(q('.reveal'), { y: 24 })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage.current,
            start: 'top 72px', // just under the navbar
            end: '+=230%',     // scroll distance of the whole animation
            pin: true,
            scrub: 0.8,        // smooths the animation behind the scrollbar
            anticipatePin: 1,
          },
        })

        tl.to(layer.current, { clipPath: card, duration: 1, ease: 'power2.inOut' }, 0)
          .to(copy.current, { autoAlpha: 0, x: -40, duration: 0.4, ease: 'power1.out' }, 0.1)
          .to(q('.gridline'), { autoAlpha: 1, duration: 0.3, stagger: 0.04 }, 0.6)
          .to(dash.current, { autoAlpha: 1, duration: 0.3 }, 0.8)
          .to(q('.c-line'), { strokeDashoffset: 0, duration: 0.7 }, 0.95)
          .to(q('.c-dot'), { opacity: 1, duration: 0.1, stagger: 0.05 }, 1.0)
          .to(q('.c-area'), { opacity: 1, duration: 0.3 }, 1.2)
          .to(q('.reveal'), { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.12, ease: 'power1.out' }, 1.0)
          .to(q('.c-forecast'), { opacity: 1, duration: 0.25 }, 1.65)
          .to(q('.c-now'), { opacity: 1, duration: 0.1 }, 1.85)
      }
    )
    // Reduced motion: nothing is pinned or cropped. The hero simply stays as a normal section.

    return () => mm.revert()
  }, [])

  return (
    <section id="home">
      {/* Light stage (behind): gradient, dotted grid, headline and pillars */}
      <div
        ref={stage}
        data-theme="light"
        className={`relative overflow-hidden bg-dawn text-main ${STAGE_H}`}
      >
        {/* Dotted grid lines */}
        <div aria-hidden="true" className="hidden lg:block">
          <span className={`gridline absolute inset-x-[3%] top-[6%] border-t ${DASH} ${hide}`} />
          <span className={`gridline absolute inset-x-[3%] bottom-[6%] border-t ${DASH} ${hide}`} />
          <span className={`gridline absolute inset-y-[3%] left-[34%] border-l ${DASH} ${hide}`} />
          <span className={`gridline absolute inset-y-[3%] left-[66%] border-l ${DASH} ${hide}`} />
          <span className={`gridline absolute left-[3%] top-[6%] h-2 w-2 -translate-y-1/2 bg-accent ${hide}`} />
          <span className={`gridline absolute left-[34%] top-[6%] h-2 w-2 -translate-y-1/2 bg-accent ${hide}`} />
        </div>

        {/* Headline (left on desktop, top on mobile) */}
        <div className="absolute inset-x-[6%] top-[3%] flex flex-col justify-between lg:inset-x-auto lg:bottom-[6%] lg:left-[3%] lg:right-[67%] lg:top-[6%] lg:py-8">
          <h2 className={`reveal font-display text-2xl font-semibold tracking-tight lg:text-4xl xl:text-5xl ${hide}`}>
            From complex data to clear decisions
          </h2>
          <p className={`reveal hidden max-w-sm text-soft lg:block ${hide}`}>
            We combine statistics, risk analytics, machine learning and quantitative finance to deliver practical solutions.
          </p>
        </div>

        {/* Three pillars (desktop only) */}
        <div className="absolute bottom-[6%] left-[67%] right-[3%] top-[6%] hidden flex-col lg:flex">
          {pillars.map((p) => (
            <div key={p.n} className={`reveal flex-1 border-t ${DASH} px-8 pt-6 ${hide}`}>
              <span className="inline-block bg-black px-2 py-1 font-display text-xs font-semibold text-white">{p.n}</span>
              <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 max-w-xs text-soft">{p.text}</p>
            </div>
          ))}
        </div>

        {/* Dark hero layer: gets cropped into the card */}
        <div
          ref={layer}
          data-theme="dark"
          className="absolute inset-0 overflow-hidden bg-navy text-main"
        >
          {/* Decorative field of numbers ("aakde" means numbers) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 select-none overflow-hidden break-all font-mono text-[13px] leading-[1.35] tracking-[0.35em] text-white/[0.07] mask-[radial-gradient(75%_85%_at_72%_40%,black,transparent)]"
          >
            {DIGITS}
          </div>

          {/* Hero text */}
          <div ref={copy} className={`wrap relative flex flex-col ${STAGE_H}`}>
            <div className="flex flex-1 flex-col justify-center">
              <p className="mb-5 animate-[rise_.8s_both] font-display text-lg font-semibold text-accent">
                AAKDE <span className="ml-1 font-dev text-highlight">आकडे</span>
              </p>
              <h1 className="max-w-4xl animate-[rise_.8s_.1s_both] text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
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
              <div className="mt-6 grid animate-[rise_.8s_.6s_both] grid-cols-2 gap-x-6 gap-y-5 border-t border-dashed border-white/20 pt-5 lg:grid-cols-4">
                {heroStats.map(({ label, value, note }) => (
                  <div key={label}>
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-soft sm:text-xs">{label}</p>
                    <p className="mt-1 font-display text-2xl font-semibold leading-none tracking-tight sm:text-3xl">{value}</p>
                    <p className="mt-1.5 hidden font-mono text-xs text-soft sm:block">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dashboard card: sits where the card ends up (same percentages as the clip above) */}
          <div
            ref={dash}
            className={`absolute inset-x-[6%] bottom-[6%] top-[22%] flex flex-col px-6 py-7 lg:inset-x-[34%] lg:inset-y-[6%] lg:px-9 ${hide}`}
          >
            <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.18em]">
              <span>Risk forecast</span>
              <span className="text-soft">Illustrative</span>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-dashed border-white/20 pt-5 text-xs font-medium uppercase tracking-[0.18em]">
              <span>Actual vs forecast</span>
              <span className="flex items-center gap-4 text-soft">
                <span className="flex items-center gap-1.5"><i className="h-2 w-2 bg-actual" />Actual</span>
                <span className="flex items-center gap-1.5"><i className="h-2 w-2 bg-forecast" />Forecast</span>
              </span>
            </div>
            <div className="my-5 min-h-0 flex-1">
              <HeroChart />
            </div>
            <a href="#services" className="flex items-stretch gap-1 text-xs font-semibold uppercase tracking-[0.18em]">
              <span className="flex-1 bg-white/15 py-4 text-center transition hover:bg-white/25">Explore services</span>
              <span className="grid w-14 place-items-center bg-white/15"><ArrowRight size={18} /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}