import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const styles = {
  section: {
    padding: '128px 0',
  },
  header: {
    maxWidth: '560px',
    marginBottom: '80px',
  },
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'var(--accent)',
    marginBottom: '16px',
    display: 'block',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: 1,
    marginBottom: '20px',
  },
  subtitle: {
    color: 'var(--muted)',
    lineHeight: 1.6,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '20px',
  },
  cardWide: {
    gridColumn: 'span 7',
  },
  cardNarrow: {
    gridColumn: 'span 5',
  },
  card: {
    background: 'var(--surface)',
    borderRadius: 'var(--radius)',
    padding: '32px',
    border: '1px solid var(--border)',
    transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'default',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'rgba(212, 168, 83, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    fontSize: '1.25rem',
    color: 'var(--accent)',
  },
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '12px',
    letterSpacing: '-0.02em',
  },
  cardDesc: {
    fontSize: '0.875rem',
    color: 'var(--muted)',
    lineHeight: 1.6,
    marginBottom: '20px',
    flex: 1,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  tag: {
    fontSize: '0.75rem',
    padding: '4px 10px',
    borderRadius: '100px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border)',
    color: 'var(--muted)',
  },
}

const icons = ['✦', '◆', '◈', '▲', '●', '◆', '✦', '◈']

export default function Services() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useGSAP(() => {
    cardsRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, { scope: sectionRef })

  const layoutOrder = ['wide', 'narrow', 'narrow', 'wide', 'wide', 'narrow', 'narrow', 'wide']

  return (
    <section id="services" ref={sectionRef} style={styles.section}>
      <div className="container">
        <div className="section-header" style={styles.header}>
          <span style={styles.eyebrow}>What I do</span>
          <h2 style={styles.title}>Services & Expertise</h2>
          <p style={styles.subtitle}>
            I lead brands, teams, and projects — creating design, web, and digital solutions
            that help businesses grow.
          </p>
        </div>

        <div style={styles.grid}>
          {content.services.map((service, i) => {
            const isWide = layoutOrder[i] === 'wide'
            return (
              <div
                key={i}
                ref={(el) => cardsRef.current[i] = el}
                style={{
                  ...styles.card,
                  ...(isWide ? styles.cardWide : styles.cardNarrow),
                  gridColumn: isWide ? 'span 7' : 'span 5',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212,168,83,0.3)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(212,168,83,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={styles.cardIcon}>{icons[i]}</div>
                <h3 style={styles.cardTitle}>{service.title}</h3>
                <p style={styles.cardDesc}>{service.description}</p>
                <div style={styles.tags}>
                  {service.tags.map((tag, j) => (
                    <span key={j} style={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
