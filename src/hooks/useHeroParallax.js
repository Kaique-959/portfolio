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
          const shaderVisual = shader.firstElementChild || shader
          const nameLeftVisual = nameLeft?.firstElementChild || nameLeft
          const nameRightVisual = nameRight?.firstElementChild || nameRight
          const kickerLeft = root.querySelector('.hero-kickers span:first-child')
          const kickerRight = root.querySelector('.hero-kickers span:last-child')
          const actions = root.querySelector('[data-parallax-layer="4"]')

          timeline.to(shaderVisual, {
            scale: mobile ? 1.05 : 1.1,
            transformOrigin: '50% 50%',
            ease: 'power2.inOut',
            force3D: true,
          }, 0)

          if (nameLeftVisual) {
            timeline.set(nameLeftVisual, { display: 'inline-block' }, 0)
            timeline.to(nameLeftVisual, {
              xPercent: mobile ? -4 : -8,
              opacity: 0.65,
              ease: 'power2.inOut',
              force3D: true,
            }, 0)
          }

          if (nameRightVisual) {
            timeline.set(nameRightVisual, { display: 'inline-block' }, 0)
            timeline.to(nameRightVisual, {
              xPercent: mobile ? 4 : 8,
              opacity: 0.65,
              ease: 'power2.inOut',
              force3D: true,
            }, 0)
          }

          if (kickerLeft) {
            timeline.to(kickerLeft, {
              xPercent: mobile ? -8 : -18,
              opacity: 0.7,
              ease: 'power2.inOut',
              force3D: true,
            }, 0)
          }

          if (kickerRight) {
            timeline.to(kickerRight, {
              xPercent: mobile ? 8 : 18,
              opacity: 0.7,
              ease: 'power2.inOut',
              force3D: true,
            }, 0)
          }

          if (actions) {
            timeline.to(actions, {
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
