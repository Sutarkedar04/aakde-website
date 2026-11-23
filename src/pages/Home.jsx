import useScrollEffects from '../hooks/useScrollEffects'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Blend from '../components/Blend'
import About from '../components/About'
import Expertise from '../components/Expertise'
import Services from '../components/Services'
import Values from '../components/Values'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  useScrollEffects()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/*<Blend className="h-16 md:h-24" from="var(--color-steel)" to="var(--color-night)" />*/}
        <About />
        <Blend className="h-16 md:h-24" from="var(--color-steel)" to="var(--color-paper)" />
        <Expertise />
        <Services />
        <Values />
        <Contact />
      </main>
      <Blend className="h-16 md:h-24" from="var(--color-mist)" to="var(--color-night)" />
      <Footer />
    </>
  )
}