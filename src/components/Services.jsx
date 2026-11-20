import { Link } from 'react-router-dom'
import { services } from '../data'
import SectionHead from './SectionHead'
import Badge from './Badge'
import { DASH } from './ui'

// Same order as the cards in data.js: each card opens its own page
const paths = ['/services/sarav', '/services/kaushalya', '/services/paramarsh', '/services/sahyog']

export default function Services() {
  return (
    <section id="services" data-theme="light" className="bg-paper-haze py-28 text-main">
      <div className="wrap">
        <SectionHead n="03" label="Services" title="Solutions and services" />
        <div className={`grid border-t ${DASH} md:grid-cols-2`}>
          {services.map(({ word, title, text }, i) => (
            <Link
              key={title}
              to={paths[i]}
              data-reveal
              className={`relative block overflow-hidden border-b ${DASH} p-8 transition-colors hover:bg-main/3 md:min-h-72 md:p-10 md:odd:border-r`}
            >
              <Badge n={i + 1} />
              <h3 className="mt-8 max-w-xs text-xl font-semibold">{title}</h3>
              <p className="mt-3 max-w-xs text-soft">{text}</p>
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