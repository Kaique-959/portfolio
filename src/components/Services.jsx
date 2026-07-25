import useScrollReveal from '../hooks/useScrollReveal'
import { content } from '../data/content'

const icons = ['✦', '◆', '⟡', '⊚', '◇', '▣', '⊡', '◈']

export default function Services() {
  const sectionRef = useScrollReveal({ stagger: 0.08 })

  return (
    <section id="services" ref={sectionRef} className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Habilidades</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}>
            O que eu faço
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
        }}>
          {content.services.map((service, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                padding: '28px',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-hover)'
                e.currentTarget.style.boxShadow = 'var(--glass-shadow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--accent)',
                fontFamily: 'var(--font-display)',
                marginBottom: '8px',
                letterSpacing: '0.02em',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                fontWeight: 600,
                marginBottom: '8px',
                letterSpacing: '-0.01em',
              }}>
                {service.title}
              </h3>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--muted)',
                lineHeight: 1.6,
                marginBottom: '16px',
                maxWidth: '100%',
              }}>
                {service.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {service.tags.slice(0, 3).map((tag, j) => (
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
