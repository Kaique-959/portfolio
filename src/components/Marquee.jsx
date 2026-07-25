import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import useScrollReveal from '../hooks/useScrollReveal'
import { content } from '../data/content'

const items = [
  { value: content.ticker[0].value, label: content.ticker[0].label },
  { value: content.ticker[1].value, label: content.ticker[1].label },
  { value: content.ticker[2].value, label: content.ticker[2].label },
  { value: content.ticker[3].value, label: content.ticker[3].label },
]

export default function Marquee() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(() => {
    if (!trackRef.current) return
    const doubled = [...items, ...items]
    const total = doubled.length * 160

    gsap.to(trackRef.current, {
      x: -total / 2,
      ease: 'none',
      duration: 30,
      repeat: -1,
    })

    const el = sectionRef.current
    const enter = () => gsap.to(trackRef.current, { timeScale: 0.2, duration: 0.4 })
    const leave = () => gsap.to(trackRef.current, { timeScale: 1, duration: 0.8 })
    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, { scope: sectionRef })

  const doubled = [...items, ...items]

  return (
    <section ref={sectionRef} style={{
      padding: '24px 0',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      overflow: 'hidden',
      background: 'var(--surface)',
    }}>
      <div ref={trackRef} style={{
        display: 'flex',
        gap: '48px',
        width: 'max-content',
        paddingLeft: '24px',
      }}>
        {doubled.map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--accent)',
            }}>
              {item.value}
            </span>
            <span style={{
              fontSize: '0.85rem',
              color: 'var(--muted)',
            }}>
              {item.label}
            </span>
            <span style={{
              width: '3px', height: '3px',
              borderRadius: '50%',
              background: 'var(--muted)',
              opacity: 0.3,
              marginLeft: '8px',
            }} />
          </div>
        ))}
      </div>
    </section>
  )
}
