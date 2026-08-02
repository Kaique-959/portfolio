import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return undefined

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      syncTouch: false,
    })

    const handleScroll = () => ScrollTrigger.update()
    const updateLenis = (time) => lenis.raf(time * 1000)
    const refreshScrollTrigger = () => ScrollTrigger.refresh()
    const refreshFrame = window.requestAnimationFrame(refreshScrollTrigger)

    lenis.on('scroll', handleScroll)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)
    window.addEventListener('load', refreshScrollTrigger)

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      window.removeEventListener('load', refreshScrollTrigger)
      lenis.off('scroll', handleScroll)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  return children
}
