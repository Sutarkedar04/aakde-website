import ServiceLayout from '../../../components/service/ServiceLayout'
import MockTests from '../components/MockTests'
import { CardsBlock } from '../../../components/service/ServiceBlocks'

export default function Sarav() {
  return (
    <ServiceLayout
      name="SARAV"
      word="सराव"
      subtitle="Mock Test Platform for Quantitative Aptitude, Entrance and Competitive Examinations"
      tagline="Practice with purpose. Perform with confidence."
      ctas={[
        { label: 'Join now', to: '/register' },
        { label: 'Sign in', to: '/login', ghost: true },
      ]}
      aboutHeading="About SARAV"
      about="SARAV (सराव), meaning practice, is AAKDE’s mock test platform designed to help students strengthen quantitative aptitude and prepare for competitive and entrance examinations through structured mock tests and performance analytics."
    >
      <CardsBlock
  title="How SARAV works"
  items={[
    { title: 'Choose an exam', text: 'Read the exam guide, then open its demo test.' },
    { title: 'Set up your test', text: 'Pick the number of questions and the time limit that suit you.' },
    { title: 'Review your result', text: 'See your score and an answer key with explanations.' },
  ]}
/>
      <MockTests />
    </ServiceLayout>
  )
}