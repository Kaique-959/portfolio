import useScrollReveal from '../hooks/useScrollReveal'
import { content } from '../data/content'

export default function Awards() {
  const sectionRef = useScrollReveal({ stagger: 0.06 })

  return (
    <section id="awards" ref={sectionRef} className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Reconhecimento</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Conquistas
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '12px',
        }}>
          {content.awards.map((award, i) => (
            <div key={i} style={{
              background: 'var(--bg)', borderRadius: 'var(--radius)',
              padding: '24px', border: '1px solid var(--border)',
              transition: 'border-color 0.2s ease',
            }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>
                {award.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{award.organization}</p>
              <div style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 500, marginTop: '12px' }}>
                {award.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
