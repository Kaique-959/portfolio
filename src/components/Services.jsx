import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const cardW = 320
const cardH = 220
const gapX = 24
const gapY = 24
const cols = 3

const trajectories = [
  { x: -1, y: -1, r: -3 },
  { x: 0, y: -1, r: 1 },
  { x: 1, y: -1, r: 2 },
  { x: -1, y: 0, r: -2 },
  { x: 1, y: 0, r: -1 },
  { x: -1, y: 1, r: 3 },
  { x: 0, y: 1, r: -1.5 },
  { x: 1, y: 1, r: 1.5 },
]

export default function Services() {
  const sectionRef = useRef(null)
  const stackRef = useRef(null)
  const cardsRef = useRef({})
  const headerRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useGSAP(() => {
    if (!ready) return

    const cards = cardsRef.current
    const keys = Object.keys(cards)
    if (keys.length === 0) return

    const stackCenter = { x: 0, y: 0 }

    keys.forEach((key, i) => {
      const el = cards[key]
      const t = trajectories[i % trajectories.length]
      const baseX = (i % cols) * (cardW + gapX)
      const baseY = Math.floor(i / cols) * (cardH + gapY)
      const stackX = stackCenter.x - (keys.length - 1 - i) * 4
      const stackY = stackCenter.y - i * 3
      const stackR = (i - keys.length / 2) * 2

      gsap.set(el, {
        x: stackX,
        y: stackY,
        rotation: stackR,
        opacity: 0,
        scale: 0.95,
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -(cardW / 2),
        marginTop: -(cardH / 2),
        width: cardW,
        height: cardH,
      })

      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        delay: i * 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stackRef.current,
          start: 'top 85%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to(el, {
        x: baseX,
        y: baseY,
        rotation: t.r,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 10%',
          scrub: 0.7,
        },
      })
    })

    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: sectionRef, dependencies: [ready] })

  const headerStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
  }

  return (
    <section id="services" ref={sectionRef} style={{
      padding: '140px 0 100px',
      minHeight: '100vh',
      position: 'relative',
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div ref={headerRef} style={{ marginBottom: '60px' }}>
          <span className="eyebrow">Habilidades</span>
          <h2 style={headerStyle}>O que eu faço</h2>
        </div>

        <div ref={stackRef} style={{
          position: 'relative',
          height: Math.ceil(content.services.length / cols) * (cardH + gapY),
          width: '100%',
          maxWidth: cols * (cardW + gapX),
          margin: '0 auto',
        }}>
          {content.services.map((service, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              style={{
                background: 'var(--bg)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                padding: '24px',
                cursor: 'default',
                position: 'absolute',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-hover)'
                e.currentTarget.style.boxShadow = 'var(--glass-shadow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--accent)',
                fontFamily: 'var(--font-display)',
                marginBottom: '8px',
                letterSpacing: '0.02em',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                fontWeight: 600,
                marginBottom: '8px',
                letterSpacing: '-0.01em',
              }}>
                {service.title}
              </h3>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--muted)',
                lineHeight: 1.6,
                marginBottom: '16px',
                maxWidth: '100%',
              }}>
                {service.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {service.tags.slice(0, 3).map((tag, j) => (
                  <span key={j} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
