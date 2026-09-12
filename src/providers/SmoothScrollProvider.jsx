import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // scroll nativo e reveals entregando o estado final sem percorrer o movimento
      gsap.globalTimeline.timeScale(200)
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
    })

    const updateScrollTrigger = () => ScrollTrigger.update()
    const updateLenis = (time) => lenis.raf(time * 1000)
    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh())

    lenis.on('scroll', updateScrollTrigger)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      lenis.off('scroll', updateScrollTrigger)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  return children
}
