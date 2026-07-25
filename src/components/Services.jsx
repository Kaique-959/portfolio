import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Services() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const cardsRef = useRef([])

  useGSAP(() => {
    const cards = cardsRef.current
    if (cards.length === 0) return

    const total = cards.length
    const step = 1 / total

    cards.forEach((card, i) => {
      gsap.set(card, { opacity: 0, scale: 0.92 })

      gsap.to(card, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: pinRef.current,
          start: `top+=${i * 60} top`,
          end: `top+=${(i + 1) * 60 + 30} top`,
          scrub: 1.5,
        },
      })
    })

    ScrollTrigger.create({
      trigger: pinRef.current,
      start: 'top top',
      end: `+=${total * 100}%`,
      pin: true,
      anticipatePin: 1,
    })

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      background: 'var(--bg)',
    }}>
      <div className="container" style={{
        paddingTop: '60px',
        paddingBottom: '20px',
        textAlign: 'center',
      }}>
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

      <div ref={pinRef} style={{
        height: '100vh',
        position: 'sticky',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'relative',
          width: 'min(420px, 90vw)',
          height: 'min(320px, 70vh)',
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
                boxShadow: i === 0 ? '0 4px 24px rgba(0,0,0,0.06)' : '0 2px 12px rgba(0,0,0,0.04)',
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

      <div style={{ height: `${content.services.length * 100}vh` }} />
    </section>
  )
}
