import { Sigma, Database, ShieldCheck, Lightbulb, Target, ArrowUpRight, Activity, Plus } from 'lucide-react'

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

export const expertiseIntro =
  'Our work draws on quantitative methods, technology and applied problem-solving across learning and organizational needs.'

export const expertise = [
  { icon: Sigma, tag: 'Quantitative Methods', title: 'Statistical Thinking', text: 'Statistical reasoning, modelling and quantitative methods for structured analysis and sound interpretation.' },
  { icon: Database, tag: 'Data & Technology', title: 'Data Science', text: 'Data handling, programming and computational techniques to support analytical work and learning.' },
  { icon: ShieldCheck, tag: 'Risk & Finance', title: 'Risk & Financial Analytics', text: 'Quantitative approaches to credit risk, financial analysis and risk-related decision-making.' },
  { icon: Lightbulb, tag: 'Applied Solutions', title: 'Problem Solving', text: 'Applying relevant knowledge, tools and skills to address defined project and organizational requirements.' },
]

export const servicesIntro =
  'Four distinct offerings, connected by one purpose: bringing the right knowledge, tools and capabilities to every requirement.'

export const services = [
  { slug: 'sarav', name: 'MOCK TEST PLATFORM', word: 'सराव', icon: Target, title: 'Mock Test Platform', text: 'Prepare for competitive examinations through structured mock tests, practice assessments and performance evaluation in Statistics, Data Science, GATE and other relevant examinations.', cta: 'Explore the Platform' },
  { slug: 'kaushalya', name: 'SKILL DEVELOPMENT', word: 'कौशल्य', icon: ArrowUpRight, title: 'Analytics Training & Skill Development', text: 'Develop practical, industry-relevant skills through structured training in credit risk analytics, statistics, Python, machine learning and quantitative methods.', cta: 'Explore Training' },
  { slug: 'paramarsh', name: 'PROJECT CONSULTING', word: 'परामर्श', icon: Activity, title: 'Project Consulting', text: 'Turn complex business challenges into practical solutions through statistical analysis, quantitative modelling, data science and technical expertise.', cta: 'Discuss a Project' },
  { slug: 'sahyog', name: 'PROJECT SUPPORT', word: 'सहयोग', icon: Plus, title: 'Project Support', text: 'Strengthen your projects with skilled professionals and technical resources aligned with your project scope, required competencies and delivery needs.', cta: 'Discuss Project Support' },
]

export const values = [
  { title: 'Strategy', text: 'Thoughtful direction shaped by clear objectives and informed decisions.' },
  { title: 'Innovation', text: 'Exploring relevant ideas, methods and technologies to create better outcomes.' },
  { title: 'Growth', text: 'Developing people, knowledge and capabilities through continuous learning.' },
  { title: 'Mentorship', text: 'Sharing knowledge and guidance to help others build confidence and capability.' },
  { title: 'Accountability', text: 'Working with integrity, transparency and responsibility.' },
]