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
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    alignItems: 'center',
  },
  imageWrap: {
    position: 'relative',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    aspectRatio: '4/5',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    fontFamily: 'var(--font-display)',
    fontSize: '4rem',
    color: 'var(--accent)',
    opacity: 0.3,
  },
  bio: {
    fontSize: '1.125rem',
    lineHeight: 1.8,
    color: 'var(--fg)',
    maxWidth: '45ch',
    marginBottom: '24px',
  },
  bio2: {
    color: 'var(--muted)',
    lineHeight: 1.7,
    maxWidth: '45ch',
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
    fontSize: '2rem',
    fontWeight: 700,
    color: 'var(--accent)',
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
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const statsRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(imageRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      }
    )

    gsap.fromTo(textRef.current,
      { x: 60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      }
    )

    gsap.fromTo(statsRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: statsRef.current, start: 'top 90%', toggleActions: 'play none none reverse' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="about" ref={sectionRef} style={styles.section}>
      <div className="container">
        <span className="eyebrow">About</span>
        <div style={styles.grid}>
          <div ref={imageRef} style={styles.imageWrap}>
            <span style={styles.imagePlaceholder}>KC</span>
          </div>

          <div>
            <div ref={textRef}>
              <p style={styles.bio}>{content.about.bio}</p>
              <p style={styles.bio2}>{content.about.bio2}</p>
              <a href="#contact" className="btn btn-primary">
                Let's talk
                <span className="icon-arrow">→</span>
              </a>
            </div>

            <div ref={statsRef} style={styles.stats}>
              {content.ticker.map((stat, i) => (
                <div key={i}>
                  <div style={styles.statValue}>{stat.value}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
