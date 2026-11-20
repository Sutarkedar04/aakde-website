import ServiceLayout from '../../components/service/ServiceLayout'
import { CardsBlock, ListBlock } from '../../components/service/ServiceBlocks'
import { expertise } from '../../data'

export default function Sahyog() {
  return (
    <ServiceLayout
      name="SAHYOG"
      word="सहयोग"
      subtitle="Project Support & Talent Solutions"
      tagline="Skilled analytics professionals for research, modeling, and implementation."
      aboutHeading="About SAHYOG"
      about="We provide experienced analytics professionals to support data science, risk modeling, and research initiatives."
    >
      <ListBlock title="Support areas" items={['Data Science Projects', 'Risk Modeling', 'Research Assignments', 'Python Development']} />
      <ListBlock title="Engagement models" items={['Short-Term Assignments', 'Long-Term Support', 'Remote Collaboration', 'Onsite Deployment']} />
      <CardsBlock title="Expertise" items={expertise.map(({ title, text }) => ({ title, text }))} />
    </ServiceLayout>
  )
}