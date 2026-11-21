import { expertise } from '../data'
import SectionHead from './SectionHead'
import Badge from './Badge'
import { DASH } from './ui'

export default function Expertise() {
  return (
    <section id="expertise" data-theme="light" className="relative overflow-hidden bg-paper py-20 md:py-24 text-main">
      <div aria-hidden="true" data-speed="0.2" className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-bright/20 blur-3xl will-change-transform" />
      <div className="wrap relative">
        <SectionHead n="01" label="Expertise" title="Core analytics expertise" />
        <div className={`grid border-y ${DASH} sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-dashed lg:divide-main/25`}>
          {expertise.map(({ icon: Icon, title, text }, i) => (

              <article key={title} data-reveal className="p-8 transition-colors hover:bg-main/3 max-lg:border-b max-lg:border-dashed max-lg:border-main/25 max-lg:last:border-b-0 sm:max-lg:nth-3:border-b-0">
                <Badge n={i + 1} />
                <Icon size={28} strokeWidth={1.6} className="mb-5 mt-8 text-bright" />
                <h3 className="mb-2.5 text-lg font-semibold">{title}</h3>
                <p className="text-soft">{text}</p>
              </article>
          ))}
        </div>
      </div>
    </section>
  )
}