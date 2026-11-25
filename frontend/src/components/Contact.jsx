import { Link } from 'react-router-dom'
import SectionHead from './SectionHead'

export default function Contact() {
  return (
    <section id="contact" data-theme="light" className="relative overflow-hidden bg-paper-mist py-20 md:py-24 text-main">
      <div aria-hidden="true" data-speed="0.18" className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-bright/20 blur-3xl will-change-transform" />
      <div className="wrap relative">
        <SectionHead label="Contact" title="Tell us what you are working on" mb="mb-8">
          Share a few details and we will get back to you.
        </SectionHead>
        <Link to="/contact" data-reveal className="btn btn-primary">Send us a message</Link>
      </div>
    </section>
  )
}