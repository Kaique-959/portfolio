import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'
import HeroCanvas from './HeroCanvas'

const styles = {
  section: {
    position: 'relative',
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    padding: '80px 24px 120px',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 'var(--max-width)',
    width: '100%',
    margin: '0 auto',
  },
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--muted)',
    marginBottom: '20px',
    display: 'block',
  },
  name: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.8rem, 8vw, 7rem)',
    fontWeight: 700,
    letterSpacing: '-0.04em',
    lineHeight: 0.92,
    marginBottom: '20px',
  },
  tagline: {
    fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
    color: 'var(--muted)',
    maxWidth: '45ch',
    marginBottom: '40px',
    lineHeight: 1.7,
  },
  actions: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  scrollHint: {
    position: 'absolute',
    bottom: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--muted)',
    fontSize: '0.75rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  scrollLine: {
    width: '1px',
    height: '40px',
    background: 'var(--border)',
  },
}

export default function Hero() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const actionsRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(
      textRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 }
    ).fromTo(
      actionsRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
      '-=0.2'
    )
  }, { scope: sectionRef })

  return (
    <section id="hero" ref={sectionRef} style={styles.section}>
      <HeroCanvas />
      <div style={styles.content}>
        <div ref={textRef}>
          <span style={styles.eyebrow}>{content.hero.subtitle}</span>
          <h1 style={styles.name}>
            {content.name.split(' ')[0]}<br />
            {content.name.split(' ').slice(1).join(' ')}
          </h1>
          <p style={styles.tagline}>{content.tagline}</p>
        </div>
        <div ref={actionsRef} style={styles.actions}>
          <a href="#portfolio" className="btn btn-primary">
            {content.hero.cta}
            <span className="icon-arrow">→</span>
          </a>
          <a href="#contact" className="btn btn-ghost">
            {content.hero.secondaryCta}
          </a>
        </div>
      </div>
      <div style={styles.scrollHint}>
        <span>Role para ver mais</span>
        <div style={styles.scrollLine} />
      </div>
    </section>
  )
}
