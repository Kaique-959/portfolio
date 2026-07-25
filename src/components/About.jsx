import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    alignItems: 'center',
  },
  textCol: {},
  imageWrap: {
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    aspectRatio: '4/5',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    fontFamily: 'var(--font-display)',
    fontSize: '3rem',
    color: 'var(--muted)',
    opacity: 0.2,
  },
  bio: {
    fontSize: '1.05rem',
    lineHeight: 1.8,
    marginBottom: '20px',
    color: 'var(--fg)',
  },
  bio2: {
    color: 'var(--muted)',
    lineHeight: 1.7,
    marginBottom: '32px',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    paddingTop: '24px',
    borderTop: '1px solid var(--border)',
  },
  statValue: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.8rem',
    fontWeight: 700,
    color: 'var(--fg)',
    letterSpacing: '-0.03em',
  },
  statLabel: {
    fontSize: '0.8rem',
    color: 'var(--muted)',
    marginTop: '4px',
  },
}

export default function About() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const statRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(imgRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } })
    gsap.fromTo(textRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } })
    if (statRef.current) {
      gsap.fromTo(statRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: statRef.current, start: 'top 90%', toggleActions: 'play none none reverse' } })
    }
  }, { scope: sectionRef })

  return (
    <section id="about" ref={sectionRef} className="section">
      <div className="container">
        <span className="eyebrow">Sobre</span>
        <div style={styles.grid}>
          <div ref={imgRef} style={styles.imageWrap}>
            <span style={styles.placeholder}>KC</span>
          </div>
          <div>
            <div ref={textRef}>
              <p style={styles.bio}>{content.about.bio}</p>
              <p style={styles.bio2}>{content.about.bio2}</p>
              <a href="#contact" className="btn btn-primary">
                Vamos conversar
                <span className="icon-arrow">→</span>
              </a>
            </div>
            <div ref={statRef} style={styles.stats}>
              <div>
                <div style={styles.statValue}>{content.ticker[0].value}</div>
                <div style={styles.statLabel}>{content.ticker[0].label}</div>
              </div>
              <div>
                <div style={styles.statValue}>{content.ticker[1].value}</div>
                <div style={styles.statLabel}>{content.ticker[1].label}</div>
              </div>
              <div>
                <div style={styles.statValue}>{content.ticker[2].value}</div>
                <div style={styles.statLabel}>{content.ticker[2].label}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
