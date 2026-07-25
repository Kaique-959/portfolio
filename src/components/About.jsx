import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function About() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const techRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(imgRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } })
    gsap.fromTo(textRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } })
    gsap.fromTo(techRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: techRef.current, start: 'top 95%', toggleActions: 'play none none reverse' } })
  }, { scope: sectionRef })

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="about" ref={sectionRef} className="section">
      <div className="container">
        <span className="eyebrow">/ Sobre Mim</span>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center',
        }}>
          <div ref={imgRef} style={{
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            aspectRatio: '4/5', background: 'var(--surface)',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', color: 'var(--muted)',
            }}>
              👤
            </div>
          </div>

          <div>
            <div ref={textRef}>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px',
              }}>
                Criativo na <span style={{ color: 'var(--accent)' }}>Prática</span>
              </h2>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '20px', color: 'var(--fg)' }}>
                {content.about.bio}
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '32px' }}>
                {content.about.bio2}
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => scrollTo('contact')} className="btn btn-primary">
                  Falar comigo
                  <span className="icon-arrow">→</span>
                </button>
                <button onClick={() => scrollTo('portfolio')} className="btn btn-outline">
                  Ver projetos
                </button>
                {/* TODO: Adicionar botão "Baixar CV" quando o PDF estiver pronto */}
              </div>
            </div>

            <div ref={techRef} style={{
              display: 'flex', flexWrap: 'wrap', gap: '4px',
              paddingTop: '24px', marginTop: '24px', borderTop: '1px solid var(--border)',
              fontSize: '0.85rem', color: 'var(--muted)',
            }}>
              {content.about.techStack.map((item, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ margin: '0 8px', opacity: 0.3 }}>/</span>}
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
