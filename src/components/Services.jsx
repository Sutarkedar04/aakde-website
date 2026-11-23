import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { services, servicesIntro } from '../data'
import SectionHead from './SectionHead'
import Badge from './Badge'
import { DASH } from './ui'

export default function Services() {
  return (
    <section id="services" data-theme="light" className="bg-paper-haze py-20 md:py-24 text-main">
      <div className="wrap">
        <SectionHead n="04" label="Platforms & Services" title="Explore the AAKDE ecosystem.">
          {servicesIntro}
        </SectionHead>
        <div className={`grid border-t ${DASH} md:grid-cols-2`}>
          {services.map(({ slug, word, icon: Icon, title, text, cta }, i) => (
            <Link
              key={slug}
              to={`/services/${slug}`}
              data-reveal
              className={`group relative flex flex-col overflow-hidden border-b ${DASH} p-8 transition-colors hover:bg-main/3 md:min-h-72 md:p-10 md:odd:border-r`}
            >
              <div className="flex items-center justify-between">
                <Badge n={i + 1} />
                <Icon size={24} strokeWidth={1.6} aria-hidden="true" className="text-bright" />
              </div>
              <h3 className="mt-8 max-w-md text-xl font-semibold">{title}</h3>
              <p className="mt-3 max-w-md text-soft">{text}</p>
              <span className="relative mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent">
                {cta}
                <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </span>
              <span
                aria-hidden="true"
                data-speed="0.12"
                className="pointer-events-none absolute -bottom-4 right-4 select-none font-dev text-[7rem] font-bold leading-none text-main/[0.07] will-change-transform"
              >
                {word}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}