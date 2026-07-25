import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
  },
  card: {
    background: 'var(--surface)',
    borderRadius: 'var(--radius-lg)',
    padding: '32px',
    border: '1px solid var(--border)',
    transition: 'border-color 0.2s ease',
  },
  icon: {
    fontSize: '1.5rem',
    marginBottom: '16px',
    color: 'var(--accent)',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '10px',
    letterSpacing: '-0.01em',
  },
  desc: {
    fontSize: '0.9rem',
    color: 'var(--muted)',
    lineHeight: 1.7,
    marginBottom: '20px',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
}

const icons = ['⊡', '◈', '⟡', '⊚', '◇', '▣', '⊡', '◈']

export default function Services() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useGSAP(() => {
    gsap.fromTo(
      cardsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
    )
  }, { scope: sectionRef })

  return (
    <section id="services" ref={sectionRef} className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Serviços</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
            O que eu faço
          </h2>
        </div>

        <div style={styles.grid}>
          {content.services.map((service, i) => (
            <div
              key={i}
              ref={(el) => cardsRef.current[i] = el}
              style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={styles.icon}>{icons[i % icons.length]}</div>
              <h3 style={styles.title}>{service.title}</h3>
              <p style={styles.desc}>{service.description}</p>
              <div style={styles.tags}>
                {service.tags.map((tag, j) => (
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
