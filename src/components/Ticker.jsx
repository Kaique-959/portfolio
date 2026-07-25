import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const styles = {
  section: {
    padding: '40px 0',
    borderTop: '1px solid var(--border)',
    borderBottom: '1px solid var(--border)',
    overflow: 'hidden',
    background: 'var(--surface)',
  },
  track: {
    display: 'flex',
    gap: '80px',
    width: 'max-content',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    whiteSpace: 'nowrap',
  },
  value: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    fontWeight: 700,
    color: 'var(--accent)',
    letterSpacing: '-0.03em',
  },
  label: {
    fontSize: '0.875rem',
    color: 'var(--muted)',
  },
  divider: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'var(--accent)',
    opacity: 0.3,
  },
}

export default function Ticker() {
  const trackRef = useRef(null)
  const sectionRef = useRef(null)

  useGSAP(() => {
    const items = content.ticker
    const doubled = [...items, ...items]
    const totalWidth = doubled.length * 200

    gsap.to(trackRef.current, {
      x: -totalWidth / 2,
      ease: 'none',
      duration: 25,
      repeat: -1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        invalidateOnRefresh: true,
      },
    })

    sectionRef.current.addEventListener('mouseenter', () => {
      gsap.to(trackRef.current, { timeScale: 0.3, duration: 0.4 })
    })
    sectionRef.current.addEventListener('mouseleave', () => {
      gsap.to(trackRef.current, { timeScale: 1, duration: 0.8 })
    })
  }, { scope: sectionRef })

  const doubled = [...content.ticker, ...content.ticker]

  return (
    <section ref={sectionRef} style={styles.section}>
      <div ref={trackRef} style={styles.track}>
        {doubled.map((item, i) => (
          <div key={i} style={styles.item}>
            <span style={styles.value}>{item.value}</span>
            <span style={styles.label}>{item.label}</span>
            {i < doubled.length - 1 && <span style={styles.divider} />}
          </div>
        ))}
      </div>
    </section>
  )
}
