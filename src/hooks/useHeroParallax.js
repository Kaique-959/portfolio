import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useHeroParallax(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const triggerElement = root.querySelector('[data-parallax-layers]')
    if (!triggerElement) return undefined

    const media = gsap.matchMedia()

    media.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 767px)',
      },
      (context) => {
        const { motion, mobile } = context.conditions || {}
        if (!motion) return undefined

        const intensity = mobile ? 0.65 : 1
        const gsapContext = gsap.context(() => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: triggerElement,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })

          const shader = triggerElement.querySelector('[data-parallax-layer="2"]')
          if (!shader) return

          timeline.to(shader, {
            xPercent: 22 * intensity,
            yPercent: 55 * intensity,
            ease: 'power2.inOut',
            force3D: true,
          }, 0)
        }, root)

        const images = Array.from(root.querySelectorAll('img'))
        const refresh = () => ScrollTrigger.refresh()
        images.forEach((image) => {
          if (!image.complete) image.addEventListener('load', refresh)
        })

        const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
          window.cancelAnimationFrame(refreshId)
          images.forEach((image) => image.removeEventListener('load', refresh))
          gsapContext.revert()
        }
      },
    )

    return () => media.revert()
  }, [rootRef])
}
