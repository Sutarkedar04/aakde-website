import ServiceLayout from '../../../components/service/ServiceLayout'
import { CardsBlock } from '../../../components/service/ServiceBlocks'
import MockTests from '../components/MockTests'
import useAuth from '../../../hooks/useAuth'

export default function Sarav() {
  // A hook must be called inside the component, never at the top of the file
  const { isLoggedIn, ready } = useAuth()

  return (
    <ServiceLayout
      name="SARAV"
      word="सराव"
      subtitle="Mock tests for statistics, data science and competitive exams"
      tagline="Practice with purpose. Perform with confidence."
      ctas={
        ready && !isLoggedIn
          ? [
              { label: 'Join now', to: '/register' },
              { label: 'Sign in', to: '/login', ghost: true },
            ]
          : undefined
      }
      aboutHeading="About SARAV"
      about="SARAV (सराव) means practice. Pick an exam, read its guide, then try a demo mock test."
    >
      <CardsBlock
        title="How SARAV works"
        items={[
          { title: 'Choose an exam', text: 'Open an exam to read its pattern and how to prepare.' },
          { title: 'Take the demo test', text: 'Start a timed 20-minute demo with a question palette.' },
          { title: 'Review your result', text: 'See your score and an answer key with explanations.' },
        ]}
      />
      <MockTests />
    </ServiceLayout>
  )
}