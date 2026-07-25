import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    alignItems: 'start',
  },
  field: {
    display: 'flex', flexDirection: 'column', gap: '6px',
  },
  label: {
    fontSize: '0.8rem', fontWeight: 500, color: 'var(--muted)',
    textTransform: 'uppercase', letterSpacing: '0.06em',
  },
  input: {
    padding: '14px 16px', borderRadius: 'var(--radius)',
    background: 'var(--bg)', border: '1px solid var(--border)',
    color: 'var(--fg)', fontFamily: 'var(--font-body)', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.2s ease', width: '100%',
  },
  textarea: {
    padding: '14px 16px', borderRadius: 'var(--radius)',
    background: 'var(--bg)', border: '1px solid var(--border)',
    color: 'var(--fg)', fontFamily: 'var(--font-body)', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.2s ease', width: '100%',
    resize: 'vertical', minHeight: '120px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  socialLink: {
    width: '44px', height: '44px', borderRadius: '50%',
    border: '1px solid var(--border)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--muted)', transition: 'all 0.2s ease',
    fontSize: '0.85rem', fontWeight: 600,
  },
  success: {
    padding: '20px', borderRadius: 'var(--radius)',
    background: 'var(--accent-subtle)',
    border: '1px solid rgba(37,99,235,0.15)',
    color: 'var(--accent)', textAlign: 'center',
  },
}

export default function Contact() {
  const sectionRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)

  useGSAP(() => {
    gsap.fromTo(sectionRef.current.querySelectorAll('[data-c]'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
  }, { scope: sectionRef })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
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

        <div style={styles.grid}>
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
              <a href={content.social.github} target="_blank" rel="noopener noreferrer" style={styles.socialLink}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--fg)'; e.currentTarget.style.color = 'var(--fg)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}>
                GH
              </a>
              <a href={content.social.linkedin} target="_blank" rel="noopener noreferrer" style={styles.socialLink}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--fg)'; e.currentTarget.style.color = 'var(--fg)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}>
                LI
              </a>
            </div>
          </div>

          <div data-c>
            {submitted ? (
              <div style={styles.success}>Obrigado pela mensagem! Respondo em breve.</div>
            ) : (
              <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.field}>
                  <label style={styles.label}>Nome</label>
                  <input style={styles.input} type="text" placeholder="Seu nome" required
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Email</label>
                  <input style={styles.input} type="email" placeholder="seu@email.com" required
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Mensagem</label>
                  <textarea style={styles.textarea} placeholder="Fala sobre seu projeto..." required
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

        <div data-c style={{
          textAlign: 'center', marginTop: '80px', paddingTop: '32px',
          borderTop: '1px solid var(--border)', color: 'var(--muted)', fontSize: '0.85rem',
        }}>
          &copy; {new Date().getFullYear()} Kaique Calefi. Todos os direitos reservados.
        </div>
      </div>
    </section>
  )
}
