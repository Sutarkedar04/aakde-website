import { values } from '../data'
import SectionHead from './SectionHead'
import Badge from './Badge'
import { DASH } from './ui'

export default function Values() {
  return (
    <section id="values" data-theme="light" className="bg-haze-paper py-20 md:py-24 text-main">
      <div className="wrap">
        <SectionHead label="Our Values" title="The principles behind our work." />
        <div className={`grid border-y ${DASH} max-lg:divide-y max-lg:divide-dashed max-lg:divide-main/25 lg:grid-cols-5 lg:divide-x lg:divide-dashed lg:divide-main/25`}>
          {values.map(({ title, text }, i) => (
            <div key={title} data-reveal className="p-7 transition-colors hover:bg-main/3">
              
              <h3 className="mb-2.5 text-lg font-semibold">{title}</h3>
              <p className="text-soft">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}