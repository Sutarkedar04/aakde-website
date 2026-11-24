import ServiceLayout from '../../../components/service/ServiceLayout'
import { CardsBlock } from '../../../components/service/ServiceBlocks'
import MockTests from '../components/MockTests'

export default function Sarav() {
  return (
    <ServiceLayout
      name="SARAV"
      word="सराव"
      subtitle="Mock tests for statistics, data science and competitive exams"
      tagline="Practice with purpose. Perform with confidence."
      ctas={[
        { label: 'Join now', to: '/register' },
        { label: 'Sign in', to: '/login', ghost: true },
      ]}
      aboutHeading="About SARAV"
      about="SARAV (सराव) means practice. Pick an exam, read its guide, then try a demo mock test."
    >
      <CardsBlock
        title="How SARAV works"
        items={[
          { title: 'Choose an exam', text: 'Open an exam to read its pattern and how to prepare.' },
          { title: 'Set up your test', text: 'Pick the number of questions and the time limit that suit you.' },
          { title: 'Review your result', text: 'See your score and an answer key with explanations.' },
        ]}
      />
      <MockTests />
    </ServiceLayout>
  )
}