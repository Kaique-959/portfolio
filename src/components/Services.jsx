import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Services() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current, start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })

    const cards = sectionRef.current.querySelectorAll('.service-card')
    gsap.fromTo(cards, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="services" ref={sectionRef} className="section" style={{ position: 'relative', background: 'var(--bg)' }}>
      <div className="container">
        <div ref={headerRef} style={{ marginBottom: '60px', textAlign: 'left' }}>
          <span className="eyebrow">/ Serviços, Habilidades, Capacidades</span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px',
          }}>
            O que eu faço de melhor?
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '600px' }}>
            Lidero marcas, equipes e projetos — criando soluções de design, web, vídeo e marketing que ajudam negócios a crescer e fazer um impacto real.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px',
          textAlign: 'left',
        }}>
          {content.services.map((service, i) => (
            <div
              key={i}
              className="service-card"
              style={{
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-hover)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)',
                textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px',
              }}>
                {String(i + 1).padStart(2, '0')}.
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.15rem',
                fontWeight: 600, marginBottom: '12px', letterSpacing: '-0.01em',
              }}>
                {service.title}
              </h3>
              <p style={{
                fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6,
                marginBottom: '16px',
              }}>
                {service.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {service.tags.slice(0, 4).map((tag, j) => (
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