import LiquidMetalHero from './components/ui/liquid-metal-hero'
import Nav from './components/Nav'
import Services from './components/Services'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'

const scrollTo = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <LiquidMetalHero
          badge="Disponível para novos projetos"
          firstName="Kaique"
          lastName="Calefi"
          kickerLeft="Desenvolvedor & Fundador"
          kickerRight="Brasília, DF"
          primaryCtaLabel="Ver projetos"
          secondaryCtaLabel="Falar comigo"
          onPrimaryCtaClick={scrollTo('portfolio')}
          onSecondaryCtaClick={scrollTo('contact')}
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
