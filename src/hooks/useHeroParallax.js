import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useHeroParallax(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const shader = root.querySelector('[data-parallax-layer="2"]')
    if (!shader) return undefined

    const media = gsap.matchMedia()

    media.add(
      {
        mobile: '(max-width: 767px)',
        desktop: '(min-width: 768px)',
      },
      (context) => {
        const { mobile } = context.conditions || {}

        const gsapContext = gsap.context(() => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          })

          const nameLeft = root.querySelector('.hero-title-first')
          const nameRight = root.querySelector('.hero-title-last')
          const actions = root.querySelector('[data-parallax-layer="4"]')
          const shaderX = () => mobile
            ? Math.min(96, window.innerWidth * 0.18)
            : Math.min(420, window.innerWidth * 0.25)

          timeline.to(shader, {
            x: shaderX,
            y: mobile ? 48 : 70,
            scale: mobile ? 1.04 : 1.08,
            ease: 'power2.inOut',
            force3D: true,
          }, 0)

          if (nameLeft) {
            timeline.to(nameLeft, {
              xPercent: mobile ? -4 : -8,
              yPercent: mobile ? 6 : 10,
              opacity: 0.65,
              ease: 'power2.inOut',
              force3D: true,
            }, 0)
          }

          if (nameRight) {
            timeline.to(nameRight, {
              xPercent: mobile ? 4 : 8,
              yPercent: mobile ? 6 : 10,
              opacity: 0.65,
              ease: 'power2.inOut',
              force3D: true,
            }, 0)
          }

          if (actions) {
            timeline.to(actions, {
              yPercent: mobile ? 10 : 18,
              opacity: 0,
              ease: 'power2.inOut',
              force3D: true,
            }, 0)
          }
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
