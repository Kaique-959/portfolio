import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const cardW = 320
const cardH = 230
const cols = 3
const gapX = 24
const gapY = 24

const trajectories = [
  { x: -1.2, y: -1, r: -3 },
  { x: 0, y: -1.1, r: 1.5 },
  { x: 1.2, y: -1, r: 2.5 },
  { x: -1.3, y: 0, r: -2 },
  { x: 1.3, y: 0, r: -1.5 },
  { x: -1.2, y: 1, r: 3 },
  { x: 0, y: 1.1, r: -2 },
  { x: 1.2, y: 1, r: 2 },
]

export default function Services() {
  const sectionRef = useRef(null)
  const stackRef = useRef(null)
  const cardsRef = useRef({})
  const headerRef = useRef(null)
  const readyRef = useRef(false)

  useGSAP(() => {
    if (readyRef.current) return
    readyRef.current = true

    const keys = Object.keys(cardsRef.current)
    if (keys.length === 0) return

    keys.forEach((key, i) => {
      const el = cardsRef.current[key]
      const t = trajectories[i % trajectories.length]
      const baseX = (i % cols) * (cardW + gapX)
      const baseY = Math.floor(i / cols) * (cardH + gapY)
      const stackR = (i - keys.length / 2) * 2.5

      gsap.set(el, {
        x: 0, y: 0, rotation: stackR, scale: 0.92,
        opacity: 0, position: 'absolute',
        left: '50%', top: '50%',
        marginLeft: -(cardW / 2), marginTop: -(cardH / 2),
        width: cardW, height: cardH,
      })

      gsap.to(el, {
        opacity: 1, scale: 0.95, duration: 0.3,
        delay: i * 0.06, ease: 'power2.out',
        scrollTrigger: {
          trigger: stackRef.current,
          start: 'top 85%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to(el, {
        x: baseX, y: baseY, rotation: t.r, scale: 1, opacity: 1,
        duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 15%',
          scrub: 0.8,
        },
      })
    })

    gsap.fromTo(headerRef.current, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current, start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: sectionRef })

  const gridH = Math.ceil(content.services.length / cols) * (cardH + gapY)

  return (
    <section id="services" ref={sectionRef} style={{
      padding: '140px 0 100px', minHeight: '100vh', position: 'relative',
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div ref={headerRef} style={{ marginBottom: '60px' }}>
          <p style={{
            fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '8px',
          }}>
            Top performing
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1,
          }}>
            Habilidades
          </h2>
        </div>

        <div ref={stackRef} style={{
          position: 'relative', height: gridH, width: '100%',
          maxWidth: cols * (cardW + gapX), margin: '0 auto',
        }}>
          {content.services.map((service, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              style={{
                background: 'var(--bg)', borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)', padding: '24px',
                overflow: 'hidden', position: 'absolute',
              }}
            >
              <p style={{
                fontSize: '0.7rem', fontWeight: 600, color: 'var(--accent)',
                fontFamily: 'var(--font-display)', marginBottom: '6px',
                letterSpacing: '0.02em',
              }}>
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1rem',
                fontWeight: 600, marginBottom: '6px', letterSpacing: '-0.01em',
              }}>
                {service.title}
              </h3>
              <p style={{
                fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5,
                marginBottom: '12px', maxWidth: '100%',
              }}>
                {service.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {service.tags.slice(0, 3).map((tag, j) => (
                  <span key={j} className="tag" style={{ fontSize: '0.7rem', padding: '3px 8px' }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
