import ServiceLayout from '../../components/service/ServiceLayout'
import { CardsBlock, ListBlock } from '../../components/service/ServiceBlocks'

export default function Paramarsh() {
  return (
    <ServiceLayout
      name="PARAMARSH"
      word="परामर्श"
      subtitle="Analytics Consulting Services"
      tagline="Quantitative solutions for complex business problems."
      aboutHeading="About PARAMARSH"
      about="We help organizations leverage data and analytics to solve critical business challenges."
    >
      <ListBlock
        title="Consulting areas"
        items={['Credit Risk Modeling', 'Probability of Default Estimation', 'Predictive Analytics', 'Forecasting Models', 'Portfolio Risk Analysis']}
      />
      <ListBlock
        title="Engagement approach"
        ordered
        items={['Problem Assessment', 'Solution Design', 'Model Development', 'Implementation Support', 'Ongoing Advisory']}
      />
      <CardsBlock
        title="Insights"
        items={[
          { title: 'Use cases', text: 'How analytics solves business problems.', soon: true },
          { title: 'Case studies', text: 'Detailed studies of analytics projects.', soon: true },
          { title: 'White papers', text: 'In-depth papers on analytics and risk.', soon: true },
          { title: 'Blogs', text: 'Articles and updates.', soon: true },
        ]}
      />
    </ServiceLayout>
  )
}