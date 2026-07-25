import { useRef, useCallback } from 'react'
import { gsap } from 'gsap'

export default function useMagneticEffect(radius = 60, strength = 0.25) {
  const ref = useRef(null)
  const xTo = useRef(null)
  const yTo = useRef(null)

  const init = useCallback(() => {
    if (!ref.current || xTo.current) return
    xTo.current = gsap.quickTo(ref.current, 'x', { duration: 0.4, ease: 'power2.out' })
    yTo.current = gsap.quickTo(ref.current, 'y', { duration: 0.4, ease: 'power2.out' })
  }, [])

  const onMouseMove = useCallback((e) => {
    init()
    if (!ref.current || !xTo.current || !yTo.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < radius) {
      const max = strength * Math.min(rect.width, rect.height)
      xTo.current(dx * (max / radius))
      yTo.current(dy * (max / radius))
    }
  }, [radius, strength, init])

  const onMouseLeave = useCallback(() => {
    if (xTo.current) xTo.current(0)
    if (yTo.current) yTo.current(0)
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
