import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gap: '24px',
  },
  card: {
    background: 'var(--bg)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
    overflow: 'hidden',
    transition: 'border-color 0.2s ease, transform 0.2s ease',
    display: 'block',
  },
  media: {
    height: '240px',
    background: 'var(--surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  projectNum: {
    fontFamily: 'var(--font-display)',
    fontSize: '3rem',
    fontWeight: 700,
    color: 'var(--muted)',
    opacity: 0.1,
  },
  body: {
    padding: '24px',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '8px',
    letterSpacing: '-0.01em',
  },
  desc: {
    fontSize: '0.85rem',
    color: 'var(--muted)',
    lineHeight: 1.6,
    marginBottom: '16px',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  viewMore: {
    textAlign: 'center',
    marginTop: '48px',
  },
}

export default function Portfolio() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useGSAP(() => {
    gsap.fromTo(cardsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } })
  }, { scope: sectionRef })

  return (
    <section id="portfolio" ref={sectionRef} className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Projetos</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
            Trabalhos selecionados
          </h2>
        </div>

        <div style={styles.grid}>
          {content.projects.map((project, i) => (
            <a
              key={i}
              ref={(el) => cardsRef.current[i] = el}
              href={project.url}
              target="_blank" rel="noopener noreferrer"
              style={styles.card}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={styles.media}>
                <span style={styles.projectNum}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div style={styles.body}>
                <h3 style={styles.title}>{project.title}</h3>
                <p style={styles.desc}>{project.description}</p>
                <div style={styles.tags}>
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
