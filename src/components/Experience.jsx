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
  timeline: {
    position: 'relative',
    maxWidth: '800px',
    margin: '0 auto',
  },
  line: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: '1px',
    background: 'var(--border)',
    transform: 'translateX(-50%)',
  },
  item: {
    display: 'flex',
    gap: '40px',
    marginBottom: '48px',
    position: 'relative',
  },
  itemLeft: {
    flex: 1,
    textAlign: 'right',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'var(--accent)',
    border: '2px solid var(--bg)',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '4px',
    zIndex: 1,
  },
  itemRight: {
    flex: 1,
  },
  period: {
    fontSize: '0.8rem',
    color: 'var(--accent)',
    fontWeight: 500,
    fontFamily: 'var(--font-body)',
    marginBottom: '8px',
  },
  role: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.125rem',
    fontWeight: 600,
    marginBottom: '4px',
  },
  company: {
    fontSize: '0.875rem',
    color: 'var(--muted)',
    marginBottom: '8px',
  },
  desc: {
    fontSize: '0.875rem',
    color: 'var(--muted)',
    lineHeight: 1.6,
    maxWidth: '35ch',
  },
}

export default function Experience() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

  useGSAP(() => {
    itemsRef.current.forEach((el, i) => {
      const direction = i % 2 === 0 ? -30 : 30
      gsap.fromTo(el,
        { x: direction, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section id="experience" ref={sectionRef} style={styles.section}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <span className="eyebrow">Career</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '16px' }}>
            Work Experience
          </h2>
        </div>

        <div style={styles.timeline}>
          <div style={styles.line} />

          {content.experience.map((exp, i) => (
            <div
              key={i}
              ref={(el) => itemsRef.current[i] = el}
              style={styles.item}
            >
              <div style={styles.itemLeft}>
                <div style={styles.period}>{exp.period}</div>
              </div>
              <div style={styles.dot} />
              <div style={styles.itemRight}>
                <h3 style={styles.role}>{exp.role}</h3>
                <p style={styles.company}>{exp.company}</p>
                <p style={styles.desc}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
