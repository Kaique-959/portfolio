import { useRef } from 'react'
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '16px',
  },
  card: {
    background: 'var(--bg)',
    borderRadius: 'var(--radius)',
    padding: '28px',
    border: '1px solid var(--border)',
    transition: 'border-color 0.3s ease, transform 0.3s ease',
    cursor: 'default',
  },
  badge: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(212,168,83,0.1)',
    border: '1px solid rgba(212,168,83,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    fontSize: '0.8rem',
    color: 'var(--accent)',
  },
  awardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '6px',
  },
  org: {
    fontSize: '0.875rem',
    color: 'var(--muted)',
  },
  date: {
    fontSize: '0.75rem',
    color: 'var(--accent)',
    marginTop: '12px',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
  },
}

export default function Awards() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useGSAP(() => {
    gsap.fromTo(
      cardsRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="awards" ref={sectionRef} style={styles.section}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Recognition</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '16px' }}>
            Awards & Honors
          </h2>
          <p style={{ color: 'var(--muted)', maxWidth: '40ch' }}>
            Recognition for work that pushes creative and technical boundaries.
          </p>
        </div>

        <div style={styles.grid}>
          {content.awards.map((award, i) => (
            <div
              key={i}
              ref={(el) => cardsRef.current[i] = el}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,168,83,0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={styles.badge}>★</div>
              <h3 style={styles.awardTitle}>{award.title}</h3>
              <p style={styles.org}>{award.organization}</p>
              <div style={styles.date}>{award.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
