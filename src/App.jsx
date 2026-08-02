import LiquidMetalHero from './components/ui/liquid-metal-hero'
import Nav from './components/Nav'
import Services from './components/Services'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Nav />

      <main id="main-content">
        <LiquidMetalHero
          badge="Disponível para novos projetos"
          firstName="Kaique"
          lastName="Calefi"
          kickerLeft="Desenvolvedor, Editor & Fundador"
          kickerRight="Brasília, DF"
          primaryCtaLabel="Ver projetos"
          secondaryCtaLabel="Falar comigo"
          primaryCtaHref="#portfolio"
          secondaryCtaHref="#contact"
        />

        <Services />
        <About />
        <Portfolio />
        <Experience />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
    </>
  )
}
