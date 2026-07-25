import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const CARD_W = 400
const CARD_H = 280

export default function Services() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const spacerRef = useRef(null)
  const cardsRef = useRef([])
  const headerRef = useRef(null)

  useGSAP(() => {
    const cards = cardsRef.current
    if (cards.length === 0) return
    const total = cards.length

    gsap.set(pinRef.current, { height: '100vh' })
    gsap.set(cards, { opacity: 0, scale: 0.9, y: 30 })

    ScrollTrigger.create({
      trigger: spacerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinRef.current,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress
        cards.forEach((card, i) => {
          const cardStart = i / total
          const cardEnd = (i + 0.7) / total
          const localP = gsap.utils.clamp(0, 1, (p - cardStart) / (cardEnd - cardStart))
          gsap.set(card, {
            opacity: localP,
            scale: 0.9 + 0.1 * localP,
            y: 30 * (1 - localP),
          })
        })
      },
    })

    gsap.fromTo(headerRef.current, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current, start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} style={{ position: 'relative', background: 'var(--bg)' }}>
      <div className="container" ref={headerRef} style={{ paddingTop: '60px', paddingBottom: '20px' }}>
        <p style={{
          fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase',
          letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '8px',
        }}>
          Top performing
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
          fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, textAlign: 'left',
        }}>
          Habilidades
        </h2>
      </div>

      <div ref={pinRef} style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
      }}>
        <div className="container" style={{ width: '100%' }}>
          <div style={{
            position: 'relative',
            width: Math.min(CARD_W, '85vw'),
            height: Math.min(CARD_H, '60vh'),
          }}>
            {content.services.map((service, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'var(--bg)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: content.services.length - i,
                }}
              >
                <p style={{
                  fontSize: '0.7rem', fontWeight: 600, color: 'var(--accent)',
                  fontFamily: 'var(--font-display)', marginBottom: '8px',
                  letterSpacing: '0.02em',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.15rem',
                  fontWeight: 600, marginBottom: '10px', letterSpacing: '-0.01em',
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6,
                  marginBottom: 'auto', maxWidth: '100%',
                }}>
                  {service.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                  {service.tags.slice(0, 3).map((tag, j) => (
                    <span key={j} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={spacerRef} style={{ height: `${content.services.length * 120}vh` }} />
    </section>
  )
}
