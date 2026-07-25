import useScrollReveal from '../hooks/useScrollReveal'
import { content } from '../data/content'

export default function Portfolio() {
  const sectionRef = useScrollReveal({ stagger: 0.1 })

  return (
    <section id="portfolio" ref={sectionRef} className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Projetos</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
            Trabalhos selecionados
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px',
        }}>
          {content.projects.map((project, i) => (
            <a
              key={i}
              href={project.url}
              target="_blank" rel="noopener noreferrer"
              style={{
                background: 'var(--bg)', borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)', overflow: 'hidden',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
                display: 'block',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{
                height: '240px', background: 'var(--surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: '3rem',
                  fontWeight: 700, color: 'var(--muted)', opacity: 0.1,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px', letterSpacing: '-0.01em' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.tags.map((tag, j) => (
                    <span key={j} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
