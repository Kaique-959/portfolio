import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function useScrollReveal(config = {}) {
  const ref = useRef(null)

  const {
    y = 30,
    duration = 0.6,
    stagger = 0.08,
    start = 'top 82%',
    toggleActions = 'play none none reverse',
    ease = 'power3.out',
    delay = 0,
  } = config

  useGSAP(() => {
    const target = ref.current
    if (!target) return

    const children = target.children
    const targets = children.length ? Array.from(children) : [target]

    gsap.fromTo(
      targets,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease,
        delay,
        scrollTrigger: { trigger: target, start, toggleActions },
      }
    )
  }, { scope: ref })

  return ref
}
