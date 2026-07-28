import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'
import { GradientButton } from '@/components/ui/gradient-button'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Portfolio() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const ctaRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(gridRef.current?.children || [], { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
    })
    gsap.fromTo(ctaRef.current, { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.3,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
    })
  }, { scope: sectionRef })

  return (
    <section id="portfolio" ref={sectionRef} className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">/ Projetos</span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '12px',
          }}>
            Trabalhos selecionados
          </h2>
        </div>

        <div ref={gridRef} style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px',
        }}>
          {content.projects.map((project, i) => (
            <a key={i} href={project.url} target="_blank" rel="noopener noreferrer"
              style={{
                background: 'var(--bg)', borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)', overflow: 'hidden',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
                display: 'block', position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-hover)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                height: '200px', background: 'var(--surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: '2.5rem',
                  fontWeight: 700, color: 'var(--muted)', opacity: 0.12,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, var(--bg) 0%, transparent 50%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }} className="hover-overlay" />
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.05rem',
                  fontWeight: 600, marginBottom: '6px', letterSpacing: '-0.01em',
                }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div ref={ctaRef} style={{
          marginTop: '32px', padding: '24px',
          background: 'var(--bg)', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '16px',
        }}>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
              Atualizado em Julho, 2026
            </p>
            <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--fg)', marginTop: '4px' }}>
              Quer ver tudo que já fiz?
            </p>
          </div>
          <GradientButton asChild>
            <a href="https://github.com/Kaique-959" target="_blank" rel="noopener noreferrer">
              Ver portfólio completo →
            </a>
          </GradientButton>
        </div>
      </div>
    </section>
  )
}
