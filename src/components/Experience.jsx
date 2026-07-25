import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Experience() {
  const sectionRef = useRef(null)
  const listRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(listRef.current?.children || [], { y: 15, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
    })
  }, { scope: sectionRef })

  return (
    <section id="experience" ref={sectionRef} className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">/ Carreira</span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px',
          }}>
            Experiência
          </h2>
        </div>

        {/* TODO: Adicionar botão "Baixar CV" quando o PDF estiver pronto */}

        <div ref={listRef} style={{ maxWidth: '700px', margin: '0 auto' }}>
          {content.experience.map((exp, i) => (
            <div key={i}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'baseline', padding: '20px 0',
              }}>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600,
                    marginBottom: '2px',
                  }}>
                    {exp.role}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{exp.company}</p>
                </div>
                <span style={{
                  fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 500,
                  whiteSpace: 'nowrap', marginLeft: '24px',
                }}>
                  {exp.period}
                </span>
              </div>
              {i < content.experience.length - 1 && (
                <div style={{ height: '1px', background: 'var(--border)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
