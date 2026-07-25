import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const styles = {
  section: {
    padding: '128px 0',
    background: 'var(--surface)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    alignItems: 'start',
  },
  info: {},
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: 500,
    color: 'var(--muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  input: {
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
  },
  textarea: {
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
    resize: 'vertical',
    minHeight: '120px',
  },
  socialLinks: {
    display: 'flex',
    gap: '16px',
    marginTop: '32px',
  },
  socialLink: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--muted)',
    transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
    fontSize: '1.1rem',
    cursor: 'pointer',
  },
  success: {
    padding: '20px',
    borderRadius: 'var(--radius)',
    background: 'rgba(212,168,83,0.08)',
    border: '1px solid rgba(212,168,83,0.2)',
    color: 'var(--accent)',
    textAlign: 'center',
  },
}

export default function Contact() {
  const sectionRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('[data-animate]'),
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: sectionRef })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="contact" ref={sectionRef} style={styles.section}>
      <div className="container">
        <div className="section-header" data-animate>
          <span className="eyebrow">Contact</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '16px' }}>
            {content.contact.cta}
          </h2>
        </div>

        <div style={styles.grid}>
          <div data-animate>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, maxWidth: '40ch', marginBottom: '32px' }}>
              Have a project in mind or just want to say hello? Send me a message
              and I will get back to you as soon as possible.
            </p>

            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 500, marginBottom: '4px' }}>Email</div>
              <a href={`mailto:${content.contact.email}`} style={{ color: 'var(--fg)', fontSize: '1rem' }}>
                {content.contact.email}
              </a>
            </div>

            <div style={styles.socialLinks}>
              <a href={content.social.github} target="_blank" rel="noopener noreferrer"
                style={styles.socialLink}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                GH
              </a>
              <a href={content.social.linkedin} target="_blank" rel="noopener noreferrer"
                style={styles.socialLink}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                LI
              </a>
            </div>
          </div>

          <div data-animate>
            {submitted ? (
              <div style={styles.success}>
                Thanks for reaching out! I will get back to you soon.
              </div>
            ) : (
              <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.field}>
                  <label style={styles.label}>Name</label>
                  <input
                    style={styles.input}
                    type="text"
                    placeholder="Your name"
                    required
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Email</label>
                  <input
                    style={styles.input}
                    type="email"
                    placeholder="your@email.com"
                    required
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Message</label>
                  <textarea
                    style={styles.textarea}
                    placeholder="Tell me about your project..."
                    required
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Send Message
                  <span className="icon-arrow">→</span>
                </button>
              </form>
            )}
          </div>
        </div>

        <div data-animate style={{
          textAlign: 'center',
          marginTop: '80px',
          paddingTop: '32px',
          borderTop: '1px solid var(--border)',
          color: 'var(--muted)',
          fontSize: '0.85rem',
        }}>
          &copy; {new Date().getFullYear()} Kaique Calefi. All rights reserved.
        </div>
      </div>
    </section>
  )
}
