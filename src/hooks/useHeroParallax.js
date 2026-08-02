import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useHeroParallax(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const media = gsap.matchMedia()

    media.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 767px)',
      },
      (context) => {
        const { motion, mobile } = context.conditions || {}
        if (!motion) return undefined

        const intensity = mobile ? 0.55 : 1
        const gsapContext = gsap.context(() => {
          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })

          const layers = [
            { id: '1', movement: 0.14 },
            { id: '2', movement: 0.1 },
            { id: '3', movement: 0.065 },
            { id: '4', movement: 0.025 },
          ]

          layers.forEach(({ id, movement }) => {
            const elements = root.querySelectorAll(`[data-parallax-layer="${id}"]`)
            if (!elements.length) return

            timeline.to(elements, {
              y: () => window.innerHeight * movement * intensity,
              force3D: true,
            }, 0)
          })
        }, root)

        const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
          window.cancelAnimationFrame(refreshId)
          gsapContext.revert()
        }
      },
    )

    return () => media.revert()
  }, [rootRef])
}
