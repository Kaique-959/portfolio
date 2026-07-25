import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'
import FooterMarquee from './FooterMarquee'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Contact() {
  const sectionRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('[data-c]'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
    )
  }, { scope: sectionRef })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const inputBase = {
    padding: '14px 16px', borderRadius: 'var(--radius)',
    background: 'var(--bg)', border: '1px solid var(--border)',
    color: 'var(--fg)', fontFamily: 'var(--font-body)', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.2s ease', width: '100%',
  }

  return (
    <section id="contact" ref={sectionRef} className="section">
      <div className="container">
        <div className="section-header" data-c>
          <span className="eyebrow">Contato</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
            {content.contact.cta}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          <div data-c>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, maxWidth: '40ch', marginBottom: '32px' }}>
              Tem um projeto em mente ou quer só trocar uma ideia? Mande uma mensagem que respondo assim que possível.
            </p>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 500, marginBottom: '4px' }}>Email</div>
              <a href={`mailto:${content.contact.email}`} style={{ color: 'var(--accent)' }}>
                {content.contact.email}
              </a>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {[
                { label: 'GH', url: content.social.github },
                { label: 'LI', url: content.social.linkedin },
              ].map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    border: '1px solid var(--border)', display: 'inline-flex',
                    alignItems: 'center', justifyContent: 'center',
                    color: 'var(--muted)', transition: 'all 0.2s ease',
                    fontSize: '0.85rem', fontWeight: 600,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--fg)'; e.currentTarget.style.color = 'var(--fg)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div data-c>
            {submitted ? (
              <div style={{
                padding: '20px', borderRadius: 'var(--radius)',
                background: 'var(--accent-subtle)', border: '1px solid rgba(194,78,46,0.15)',
                color: 'var(--accent)', textAlign: 'center',
              }}>
                Obrigado pela mensagem! Respondo em breve.
              </div>
            ) : (
              <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Nome</label>
                  <input style={inputBase} type="text" placeholder="Seu nome" required
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
                  <input style={inputBase} type="email" placeholder="seu@email.com" required
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Mensagem</label>
                  <textarea style={{ ...inputBase, resize: 'vertical', minHeight: '120px' }} placeholder="Fala sobre seu projeto..." required
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Enviar mensagem
                  <span className="icon-arrow">→</span>
                </button>
              </form>
            )}
          </div>
        </div>

        <div data-c>
          <FooterMarquee />
        </div>

        <div data-c style={{
          textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem',
        }}>
          &copy; {new Date().getFullYear()} Kaique Calefi. Todos os direitos reservados.
        </div>
      </div>
    </section>
  )
}
