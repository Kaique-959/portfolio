import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'
import { GradientButton } from '@/components/ui/gradient-button'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const WHATSAPP_NUMBER = '5518981993718'

function buildWhatsAppUrl(name, email, message) {
  const lines = [
    'Olá, Kaique!',
    '',
    'Vim pelo seu portfólio e gostaria de conversar sobre um projeto.',
    '',
    `Nome: ${name}`,
    `Email: ${email}`,
    '',
    'Mensagem:',
    message,
  ]

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
}

export default function Contact() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('[data-c]'),
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    )
  }, { scope: sectionRef })

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    if (!name || !email || !message) {
      form.reportValidity()
      return
    }

    const whatsappUrl = buildWhatsAppUrl(name, email, message)
    const popup = window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    if (!popup) {
      window.location.assign(whatsappUrl)
    }
  }

  const inputBase = {
    padding: '14px 16px',
    borderRadius: 'var(--radius)',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    color: 'var(--fg)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    width: '100%',
  }

  return (
    <section id="contact" ref={sectionRef} className="section contact-section">
      <div className="container">
        <div className="section-header" data-c>
          <span className="eyebrow">Contato</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            {content.contact.cta}
          </h2>
        </div>

        <div className="contact-grid">
          <div data-c>
            <p style={{ color: 'var(--muted)', lineHeight: 1.75, maxWidth: '40ch', marginBottom: '32px' }}>
              Tem um projeto, campanha ou vídeo para produzir? Mande uma mensagem que respondo assim que possível.
            </p>

            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 500, marginBottom: '4px' }}>Email</div>
              <a href={`mailto:${content.contact.email}`} style={{ color: 'var(--accent)' }}>
                {content.contact.email}
              </a>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {[
                { label: 'GitHub', shortcut: 'GH', url: content.social.github },
                { label: 'LinkedIn', shortcut: 'LI', url: content.social.linkedin },
              ].map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="contact-social"
                >
                  <span aria-hidden="true">{s.shortcut}</span>
                </a>
              ))}
            </div>

            <GradientButton variant="variant" asChild>
              <a
                href={content.social.whatsapp || `https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Preferir WhatsApp
              </a>
            </GradientButton>
          </div>

          <div data-c>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-field">
                <label htmlFor="contact-name" className="contact-label">Nome</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome"
                  required
                  style={inputBase}
                  onFocus={(event) => { event.currentTarget.style.borderColor = 'var(--accent)' }}
                  onBlur={(event) => { event.currentTarget.style.borderColor = 'var(--border)' }}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email" className="contact-label">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  required
                  style={inputBase}
                  onFocus={(event) => { event.currentTarget.style.borderColor = 'var(--accent)' }}
                  onBlur={(event) => { event.currentTarget.style.borderColor = 'var(--border)' }}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message" className="contact-label">Mensagem</label>
                <textarea
                  id="contact-message"
                  name="message"
                  autoComplete="off"
                  placeholder="Fala sobre seu projeto..."
                  required
                  style={{ ...inputBase, resize: 'vertical', minHeight: '120px' }}
                  onFocus={(event) => { event.currentTarget.style.borderColor = 'var(--accent)' }}
                  onBlur={(event) => { event.currentTarget.style.borderColor = 'var(--border)' }}
                />
              </div>

              <GradientButton type="submit">
                Continuar no WhatsApp
              </GradientButton>
            </form>
          </div>
        </div>

        <div data-c className="contact-footer">
          &copy; {new Date().getFullYear()} Kaique Calefi. Todos os direitos reservados.
        </div>
      </div>

      <style>{`
        .contact-section {
          background:
            radial-gradient(circle at 20% 16%, rgba(194, 78, 46, 0.06), transparent 36%),
            #FAFAF8;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(48px, 7vw, 80px);
          align-items: start;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .contact-label {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .contact-social {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .contact-social:hover,
        .contact-social:focus-visible {
          border-color: var(--fg);
          color: var(--fg);
        }

        .contact-whatsapp {
          display: inline-flex;
          align-items: center;
          margin-top: 24px;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--accent);
          font-size: 0.88rem;
          font-weight: 600;
          transition: border-color 200ms, background 200ms, color 200ms;
        }

        .contact-whatsapp:hover,
        .contact-whatsapp:focus-visible {
          border-color: var(--accent);
          background: var(--accent-subtle);
          color: var(--accent-hover);
        }

        .contact-footer {
          text-align: center;
          color: var(--muted);
          font-size: 0.85rem;
          margin-top: 80px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
        }

        @media (max-width: 767px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }
      `}</style>
    </section>
  )
}
