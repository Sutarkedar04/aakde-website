// Content for the four service pages (the cards on the home page still use `services` from data.js).
// Section kinds: 'feature' (highlight panel), 'list' (rows; ordered: true numbers them), 'cards' (grid)
export const servicePages = [
  {
    slug: 'sarav',
    name: 'SARAV',
    word: 'सराव',
    subtitle: 'Mock Test Platform for Quantitative Aptitude, Entrance and Competitive Examinations',
    tagline: 'Practice with purpose. Perform with confidence.',
    ctas: [
      { label: 'Join now', to: '/register' },
      { label: 'Sign in', to: '/login', ghost: true },
    ],
    about: {
      heading: 'About SARAV',
      text: 'SARAV (सराव), meaning practice, is AAKDE’s mock test platform designed to help students strengthen quantitative aptitude and prepare for competitive and entrance examinations through structured mock tests and performance analytics.',
    },
    sections: [
      {
        kind: 'feature',
        label: 'Current examination',
        title: 'Indian Statistical Service (ISS)',
        text: 'Comprehensive mock tests covering statistics, probability, mathematics, and quantitative aptitude relevant to the ISS examination.',
      },
      {
        kind: 'list',
        title: 'Upcoming examinations',
        items: [
          'ACET (Actuarial Common Entrance Test)',
          'MBA Entrance Examinations',
          'SET (State Eligibility Test)',
          'NET (National Eligibility Test)',
          'Additional quantitative and competitive examinations',
        ],
      },
    ],
  },
  {
    slug: 'kaushalya',
    name: 'KAUSHALYA',
    word: 'कौशल्य',
    subtitle: 'Analytics Training & Skill Development',
    tagline: 'Build industry-ready capabilities in analytics, risk, and data science.',
    about: {
      heading: 'About KAUSHALYA',
      text: 'KAUSHALYA (कौशल्य), meaning skill, is AAKDE’s professional development platform focused on building industry-relevant capabilities in quantitative analytics, risk analytics, data science, and programming.',
    },
    sections: [
      {
        kind: 'feature',
        label: 'Flagship program',
        title: 'Advanced Credit Risk & Analytics Program',
        text: 'A flagship program designed to develop practical expertise in credit risk modeling and portfolio analysis used by banks, NBFCs and fintech companies.',
        facts: ['200 hours', '5 months', 'Offline program', 'Industry-aligned curriculum', 'Batch size: 30'],
      },
      {
        kind: 'cards',
        title: 'Focused programs for practical skill development',
        text: 'Industry-oriented short-term courses designed to build practical skills in programming, data analysis, machine learning, and applied artificial intelligence.',
        items: [
          { title: 'SQL for Data Analysis', text: 'Learn to query, transform, and analyze data using SQL.' },
          { title: 'Python Programming', text: 'Build a strong programming foundation for analytics and automation.' },
          { title: 'Excel for Data Analysis', text: 'Master data cleaning, analysis, and reporting using advanced Excel.' },
          { title: 'Machine Learning', text: 'Develop predictive models using supervised and unsupervised techniques.' },
          { title: 'AI Applications', text: 'Explore practical applications of artificial intelligence across industries.' },
        ],
      },
    ],
  },
  {
    slug: 'paramarsh',
    name: 'PARAMARSH',
    word: 'परामर्श',
    subtitle: 'Analytics Consulting Services',
    tagline: 'Quantitative solutions for complex business problems.',
    about: {
      heading: 'About PARAMARSH',
      text: 'We help organizations leverage data and analytics to solve critical business challenges.',
    },
    sections: [
      {
        kind: 'list',
        title: 'Consulting areas',
        items: ['Credit Risk Modeling', 'Probability of Default Estimation', 'Predictive Analytics', 'Forecasting Models', 'Portfolio Risk Analysis'],
      },
      {
        kind: 'list',
        title: 'Engagement approach',
        ordered: true,
        items: ['Problem Assessment', 'Solution Design', 'Model Development', 'Implementation Support', 'Ongoing Advisory'],
      },
    ],
  },
  {
    slug: 'sahyog',
    name: 'SAHYOG',
    word: 'सहयोग',
    subtitle: 'Project Support & Talent Solutions',
    tagline: 'Skilled analytics professionals for research, modeling, and implementation.',
    about: {
      heading: 'About SAHYOG',
      text: 'We provide experienced analytics professionals to support data science, risk modeling, and research initiatives.',
    },
    sections: [
      {
        kind: 'list',
        title: 'Support areas',
        items: ['Data Science Projects', 'Risk Modeling', 'Research Assignments', 'Python Development'],
      },
      {
        kind: 'list',
        title: 'Engagement models',
        items: ['Short-Term Assignments', 'Long-Term Support', 'Remote Collaboration', 'Onsite Deployment'],
      },
    ],
  },
]