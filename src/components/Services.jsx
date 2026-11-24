import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { services, servicesIntro } from '../data'
import SectionHead from './SectionHead'
import Badge from './Badge'
import { DASH } from './ui'

/*
  Large screens: four panels in one row. The panel you hover or focus opens up to show its text and link,
  and the others narrow down. The row has a fixed height, so the whole section fits on one screen.
  Smaller screens: ordinary cards with everything visible.
*/
export default function Services() {
  const [active, setActive] = useState(0)

  return (
    <section id="services" data-theme="light" className="bg-paper-haze py-16 text-main lg:py-10">
      <div className="wrap">
        <SectionHead n="04" label="Platforms & Services" title="Explore the AAKDE ecosystem." mb="mb-8">
          {servicesIntro}
        </SectionHead>

        <div className={`grid border-t ${DASH} md:grid-cols-2 lg:flex lg:h-[clamp(21rem,48svh,28rem)] lg:border-b`}>
          {services.map(({ slug, word, icon: Icon, title, text, cta }, i) => {
            const open = active === i
            return (
              <Link
                key={slug}
                to={`/services/${slug}`}
                data-reveal
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                style={{ flexGrow: open ? 3.2 : 1 }}
                className={`group relative flex flex-col overflow-hidden border-b ${DASH} p-7 transition-[flex-grow,background-color] duration-500 ease-out hover:bg-main/3 md:min-h-72 md:p-8 md:odd:border-r lg:min-h-0 lg:min-w-0 lg:basis-0 lg:border-b-0 lg:border-r lg:last:border-r-0 ${
                  open ? 'lg:bg-main/[0.04]' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge n={i + 1} />
                  <Icon size={24} strokeWidth={1.6} aria-hidden="true" className="shrink-0 text-bright" />
                </div>

                {/* lg:pt-6 keeps a long title from touching the badge row in a narrow panel */}
                <div className="relative mt-8 lg:mt-auto lg:pt-6">
                  <h3 className="max-w-md text-xl font-semibold">{title}</h3>
                  {/* On large screens this part fades in when the panel opens. It keeps a fixed width so the text does not re-wrap while the panel grows. */}
                  <div className={`transition duration-500 lg:w-[21rem] ${open ? '' : 'lg:translate-y-3 lg:opacity-0'}`}>
                    <p className="mt-3 max-w-md text-soft">{text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      {cta}
                      <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>

                {/* Big faint word. On large screens only the open panel shows it, because a narrow panel is too small to hold it */}
                <span
                  aria-hidden="true"
                  data-speed="0.12"
                  className={`pointer-events-none absolute -bottom-4 right-4 select-none font-dev text-[7rem] font-bold leading-none text-main/[0.07] will-change-transform transition-opacity duration-500 lg:text-[5.5rem] ${
                    open ? '' : 'lg:opacity-0'
                  }`}
                >
                  {word}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}