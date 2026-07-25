import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '12px',
  },
  card: {
    background: 'var(--surface)',
    borderRadius: 'var(--radius)',
    padding: '24px',
    border: '1px solid var(--border)',
    transition: 'border-color 0.2s ease',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '4px',
  },
  org: {
    fontSize: '0.85rem',
    color: 'var(--muted)',
  },
  date: {
    fontSize: '0.78rem',
    color: 'var(--accent)',
    fontWeight: 500,
    marginTop: '12px',
  },
}

export default function Awards() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useGSAP(() => {
    gsap.fromTo(cardsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.06,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
    )
  }, { scope: sectionRef })

  return (
    <section id="awards" ref={sectionRef} className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Reconhecimento</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Conquistas
          </h2>
        </div>

        <div style={styles.grid}>
          {content.awards.map((award, i) => (
            <div key={i} ref={(el) => cardsRef.current[i] = el} style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <h3 style={styles.title}>{award.title}</h3>
              <p style={styles.org}>{award.organization}</p>
              <div style={styles.date}>{award.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
