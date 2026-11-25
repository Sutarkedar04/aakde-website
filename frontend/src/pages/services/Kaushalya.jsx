import ServiceLayout from '../../components/service/ServiceLayout'
import { CardsBlock, Feature } from '../../components/service/ServiceBlocks'

export default function Kaushalya() {
  return (
    <ServiceLayout
      name="Skill Development"
      word=" कौशल्य "
      subtitle="Analytics Training & Skill Development"
      tagline="Build industry-ready capabilities in analytics, risk, and data science."
      aboutHeading="About KAUSHALYA"
      about="KAUSHALYA (कौशल्य), meaning skill, is AAKDE’s professional development platform focused on building industry-relevant capabilities in quantitative analytics, risk analytics, data science, and programming."
    >
      <Feature
        label="Flagship program"
        title="Advanced Credit Risk & Analytics Program"
        text="A flagship program designed to develop practical expertise in credit risk modeling and portfolio analysis used by banks, NBFCs and fintech companies."
        facts={['200 hours', '5 months', 'Offline program', 'Industry-aligned curriculum', 'Batch size: 30']}
      />
      <CardsBlock
        title="Focused programs for practical skill development"
        text="Industry-oriented short-term courses designed to build practical skills in programming, data analysis, machine learning, and applied artificial intelligence."
        items={[
          { title: 'SQL for Data Analysis', text: 'Learn to query, transform, and analyze data using SQL.' },
          { title: 'Python Programming', text: 'Build a strong programming foundation for analytics and automation.' },
          { title: 'Excel for Data Analysis', text: 'Master data cleaning, analysis, and reporting using advanced Excel.' },
          { title: 'Machine Learning', text: 'Develop predictive models using supervised and unsupervised techniques.' },
          { title: 'AI Applications', text: 'Explore practical applications of artificial intelligence across industries.' },
        ]}
      />
      <CardsBlock
        title="Learning resources"
        items={[
          { title: 'Courses', text: 'Short-term programs and the flagship credit risk program, listed above.' },
          { title: 'Lecture videos', text: 'Recorded lessons for self-paced learning.', soon: true },
          { title: 'E-content', text: 'Digital study material.', soon: true },
          { title: 'Books', text: 'Books and reading lists.', soon: true },
        ]}
      />
    </ServiceLayout>
  )
}