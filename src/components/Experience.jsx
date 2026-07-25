import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const styles = {
  inner: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  item: {
    display: 'flex',
    gap: '32px',
    paddingBottom: '40px',
    position: 'relative',
    borderLeft: '1px solid var(--border)',
    paddingLeft: '32px',
    marginLeft: '12px',
  },
  dot: {
    position: 'absolute',
    left: '-5px',
    top: '4px',
    width: '9px',
    height: '9px',
    borderRadius: '50%',
    background: 'var(--fg)',
  },
  period: {
    fontSize: '0.8rem',
    color: 'var(--accent)',
    fontWeight: 500,
    marginBottom: '4px',
  },
  role: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '2px',
  },
  company: {
    fontSize: '0.85rem',
    color: 'var(--muted)',
    marginBottom: '8px',
  },
  desc: {
    fontSize: '0.88rem',
    color: 'var(--muted)',
    lineHeight: 1.7,
  },
}

export default function Experience() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

  useGSAP(() => {
    itemsRef.current.forEach((el, i) => {
      gsap.fromTo(el, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } })
    })
  }, { scope: sectionRef })

  return (
    <section id="experience" ref={sectionRef} className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Carreira</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Experiência
          </h2>
        </div>

        <div style={styles.inner}>
          {content.experience.map((exp, i) => (
            <div key={i} ref={(el) => itemsRef.current[i] = el} style={styles.item}>
              <div style={styles.dot} />
              <div>
                <div style={styles.period}>{exp.period}</div>
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
