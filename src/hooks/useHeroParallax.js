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

          const layers = [
            { layer: '1', yPercent: 70 },
            { layer: '2', yPercent: 55 },
            { layer: '3', yPercent: 40 },
            { layer: '4', yPercent: 10 },
          ]

          layers.forEach(({ layer, yPercent }) => {
            const elements = triggerElement.querySelectorAll(`[data-parallax-layer="${layer}"]`)
            if (!elements.length) return

            const properties = {
              yPercent: yPercent * intensity,
              ease: 'power2.inOut',
              force3D: true,
            }

            if (layer === '2') {
              properties.xPercent = 22 * intensity
            }

            timeline.to(elements, properties, 0)
          })
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
