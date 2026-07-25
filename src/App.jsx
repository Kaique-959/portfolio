import LiquidMetalHero from './components/ui/liquid-metal-hero'
import Nav from './components/Nav'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Awards from './components/Awards'
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
          title="Tecnologia que funciona enquanto você dorme"
          subtitle="Desenvolvedor e fundador da Kalefi_Org, baseado em Brasília. Construo sistemas que rodam em produção todo dia — de bots de atendimento a pipelines de prospecção."
          primaryCtaLabel="Ver projetos"
          secondaryCtaLabel="Falar comigo"
          onPrimaryCtaClick={scrollTo('portfolio')}
          onSecondaryCtaClick={scrollTo('contact')}
          features={[
            "Fundador Kalefi_Org",
            "Automação com IA",
            "Sites que convertem",
          ]}
        />
        <Marquee />
        <Services />
        <Awards />
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
