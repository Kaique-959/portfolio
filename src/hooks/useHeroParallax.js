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
            { id: '1', yPercent: 8 },
            { id: '2', yPercent: 38, xPercent: 18, scale: 1.04 },
            { id: '3', yPercent: 14, xPercent: 4, opacity: 0.92 },
            { id: '4', yPercent: 8, xPercent: -2, opacity: 0.94 },
          ]

          layers.forEach(({ id, yPercent, ...vars }) => {
            const elements = root.querySelectorAll(`[data-parallax-layer="${id}"]`)
            if (!elements.length) return

            timeline.to(elements, {
              ...vars,
              yPercent: yPercent * intensity,
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
