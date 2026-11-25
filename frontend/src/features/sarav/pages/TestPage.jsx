import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Instructions from '../components/Instructions'
import TestRunner from '../components/TestRunner'
import Result from '../components/Result'
import { scoreTest } from '../lib/scoring'
import { buildTest, configFromParams } from '../lib/buildTest'
import { getTest, saveAttempt } from '../testsApi'
import { canTakeDemo, isLoggedIn, markFreeDemoUsed } from '../../../lib/access'
import logo from '../../../assets/aakde_logo.png'

/* One page, three steps: instructions -> test -> result */
export default function TestPage() {
  const { id } = useParams()
  const [sp] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  // undefined = still loading, null = not found
  const [base, setBase] = useState(undefined)
  useEffect(() => {
    let live = true
    setBase(undefined)
    getTest(id).then((t) => live && setBase(t?.questions?.length ? t : null))
    return () => { live = false }
  }, [id])

  // The version of the test the student chose (questions and time come from the URL)
  const query = sp.toString()
  const test = useMemo(() => (base ? buildTest(base, configFromParams(sp)) : null), [base, query]) // eslint-disable-line react-hooks/exhaustive-deps

  const [step, setStep] = useState('instructions')
  const [outcome, setOutcome] = useState(null)
  const [round, setRound] = useState(0) // changes on every attempt so the test starts fresh

  if (base === undefined) {
    return (
      <main data-theme="light" className="grid min-h-svh place-items-center bg-paper p-6 text-main">
        <p role="status" className="text-soft">Loading test…</p>
      </main>
    )
  }

  if (!test) {
    return (
      <main data-theme="light" className="grid min-h-svh place-items-center bg-paper p-6 text-center text-main">
        <div>
          <h1 className="text-3xl font-semibold">Test not found</h1>
          <Link to="/services/sarav" className="btn btn-primary mt-8">Back to SARAV</Link>
        </div>
      </main>
    )
  }

  // A guest gets one free demo per exam. Any later attempt goes to sign in.
  // Only checked on the instructions step, so a test in progress or its result is never interrupted.
  if (step === 'instructions' && !canTakeDemo(test.exam)) {
    return <Navigate to="/login" replace state={{ from: location.pathname, reason: 'demo-limit' }} />
  }

  const submit = async (responses, timeTaken) => {
    const result = scoreTest(test, responses)
    await saveAttempt({ testId: test.id, score: result.score, maxScore: result.maxScore, timeTaken, date: new Date().toISOString() })
    setOutcome({ responses, result, timeTaken })
    setStep('result')
    window.scrollTo({ top: 0 })
  }
  const exit = () => {
    if (window.confirm('Leave the test? Your answers will be lost.')) navigate('/services/sarav')
  }
  const start = () => {
    if (!isLoggedIn()) markFreeDemoUsed(test.exam) // the free chance is used when the test begins
    setStep('running')
    window.scrollTo({ top: 0 })
  }
  const retake = () => { setOutcome(null); setRound((r) => r + 1); setStep('instructions'); window.scrollTo({ top: 0 }) }

  return (
    <div data-theme="light" className="min-h-svh bg-paper text-main">
      <header data-theme="dark" className="bg-navy text-main">
        <div className="wrap flex h-18 items-center justify-between gap-4">
          <img src={logo} alt="AAKDE" className="h-10 w-auto" />
          <p className="hidden truncate font-display text-sm font-semibold sm:block">{test.title}</p>
          {step === 'running' ? (
            <button type="button" onClick={exit} className="text-sm text-main/70 transition hover:text-main">Exit test</button>
          ) : (
            <Link to="/services/sarav" className="text-sm text-main/70 transition hover:text-main">Back to SARAV</Link>
          )}
        </div>
      </header>

      <main className="wrap py-10 md:py-14">
        {step === 'instructions' && <Instructions test={test} onStart={start} />}
        {step === 'running' && <TestRunner key={round} test={test} onSubmit={submit} />}
        {step === 'result' && <Result test={test} {...outcome} onRetake={retake} />}
      </main>
    </div>
  )
}