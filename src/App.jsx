import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import LiquidMetalHero from './components/ui/liquid-metal-hero'
import Nav from './components/Nav'
import Services from './components/Services'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: true })

    const handleLenisScroll = () => {
      ScrollTrigger.update()
    }

    const handleTicker = (time) => {
      lenis.raf(time * 1000)
    }

    lenis.on('scroll', handleLenisScroll)
    gsap.ticker.add(handleTicker)
    gsap.ticker.lagSmoothing(0)

    const handleLoad = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('load', handleLoad)
      lenis.off('scroll', handleLenisScroll)
      gsap.ticker.remove(handleTicker)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
    }
  }, [])

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
