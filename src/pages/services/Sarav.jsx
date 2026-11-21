import ServiceLayout from '../../components/service/ServiceLayout'
import MockTests from '../../components/service/MockTests'

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
      <MockTests />
    </ServiceLayout>
  )
}