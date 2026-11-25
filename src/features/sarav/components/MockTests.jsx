import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { tests } from '../data/tests'
import { exams } from '../data/exams'
import { ScrollTrigger } from '../../../lib/gsap'
import ExamDetails from './ExamDetails'
import { DASH } from '../../../components/ui'
import { canTakeDemo } from '../../../lib/access'

export default function MockTests() {
  // All exams start closed, so the whole list is visible
  const [openId, setOpenId] = useState(null)

  // Opening or closing a row changes the page height, so re-measure the scroll animations
  useEffect(() => { ScrollTrigger.refresh() }, [openId])

  return (
    <div>
      <div data-reveal className="mb-10 max-w-2xl">
        <h3 className="text-2xl font-semibold md:text-3xl">Examinations</h3>
        <p className="mt-3 text-soft">
          Choose an examination to read about it, or start its demo test straight away.
        </p>
      </div>

      <ul className={`border-t ${DASH}`}>
        {exams.map((e) => {
          const demo = tests.find((t) => t.exam === e.id) // the first test of the exam is its demo
          const isOpen = openId === e.id
          const locked = demo && !canTakeDemo(e.id) // free demo already used: ask to sign in
          return (
            <li key={e.id} data-reveal className={`border-b ${DASH}`}>
              <div className="flex items-center gap-3 md:gap-4">
                <h4 className="min-w-0 flex-1">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`exam-${e.id}`}
                    onClick={() => setOpenId(isOpen ? null : e.id)}
                    className="flex w-full items-center gap-4 py-5 text-left transition-colors hover:bg-main/3"
                  >
                    <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-bright" />
                    <span className="flex-1 text-lg font-medium">{e.name}</span>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </h4>

                {demo ? (
                  <Link
                    to={locked ? '/login' : `/sarav/test/${demo.id}`}
                    state={locked ? { from: `/sarav/test/${demo.id}`, reason: 'demo-limit' } : undefined}
                    aria-label={locked ? `Sign in to keep practising ${e.name}` : `Start the demo test for ${e.name}`}
                    className="btn btn-primary shrink-0 px-4 py-2 text-sm"
                  >
                    {locked ? 'Sign in to continue' : 'Demo test'}
                  </Link>
                ) : (
                  <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.15em] text-soft">Coming soon</span>
                )}
              </div>

              {isOpen && (
                <div id={`exam-${e.id}`} className="pb-10 md:pl-14">
                  <ExamDetails exam={e} />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}