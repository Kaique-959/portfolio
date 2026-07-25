import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'
import HeroCanvas from './HeroCanvas'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const styles = {
  section: {
    position: 'relative',
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    padding: '0 24px',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 'var(--max-width)',
    width: '100%',
    margin: '0 auto',
    paddingTop: '80px',
  },
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'var(--accent)',
    marginBottom: '24px',
    display: 'block',
  },
  name: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.5rem, 7vw, 7rem)',
    fontWeight: 700,
    letterSpacing: '-0.04em',
    lineHeight: 0.9,
    color: 'var(--fg)',
    marginBottom: '8px',
  },
  nameAccent: {
    background: 'linear-gradient(135deg, var(--fg) 0%, var(--accent) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.5rem)',
    color: 'var(--muted)',
    maxWidth: '40ch',
    marginBottom: '40px',
    lineHeight: 1.6,
  },
  actions: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
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
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }
    )
    .fromTo(
      actionsRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
      '-=0.3'
    )
  }, { scope: sectionRef })

  return (
    <section id="hero" ref={sectionRef} style={styles.section}>
      <HeroCanvas />
      <div style={styles.content}>
        <div ref={textRef}>
          <span style={styles.eyebrow}>Creative Designer & Developer</span>
          <h1 style={styles.name}>
            Kaique<br />
            <span style={styles.nameAccent}>Calefi</span>
          </h1>
          <p style={styles.subtitle}>
            {content.tagline}
          </p>
        </div>
        <div ref={actionsRef} style={styles.actions}>
          <a href="#portfolio" className="btn btn-primary">
            View my work
            <span className="icon-arrow">→</span>
          </a>
          <a href="#contact" className="btn btn-outline">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
