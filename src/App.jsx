import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Awards from './components/Awards'
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
      <main>
        <Hero />
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
