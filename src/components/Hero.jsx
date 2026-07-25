import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'
import HeroCanvas from './HeroCanvas'
import MagneticButton from './MagneticButton'

export default function Hero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const eyebrowRef = useRef(null)
  const nameRef = useRef(null)
  const taglineRef = useRef(null)
  const actionsRef = useRef(null)
  const scrollRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(canvasRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2 })
      .fromTo(eyebrowRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.6')
      .fromTo(nameRef.current.children, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, '-=0.3')
      .fromTo(taglineRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
      .fromTo(actionsRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.2')
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.1')
  }, { scope: sectionRef })

  return (
    <section id="hero" ref={sectionRef} style={{
      position: 'relative', minHeight: '100dvh', display: 'flex', alignItems: 'center',
      overflow: 'hidden', padding: '80px 24px 120px',
    }}>
      <div ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <HeroCanvas />
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 'var(--max-width)', width: '100%', margin: '0 auto' }}>
        <span ref={eyebrowRef} style={{
          fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)',
          marginBottom: '20px', display: 'block',
        }}>
          {content.hero.subtitle}
        </span>

        <h1 ref={nameRef} style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 8vw, 7rem)',
          fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.92, marginBottom: '20px',
        }}>
          <span style={{ display: 'block' }}>{content.name.split(' ')[0]}</span>
          <span style={{ display: 'block' }}>{content.name.split(' ').slice(1).join(' ')}</span>
        </h1>

        <p ref={taglineRef} style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', color: 'var(--muted)',
          maxWidth: '45ch', marginBottom: '40px', lineHeight: 1.7,
        }}>
          {content.tagline}
        </p>

        <div ref={actionsRef} style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <MagneticButton href="#services" className="btn btn-primary">
            {content.hero.cta}
            <span className="icon-arrow">→</span>
          </MagneticButton>
          <MagneticButton href="#contact" className="btn btn-ghost">
            {content.hero.secondaryCta}
          </MagneticButton>
        </div>
      </div>

      <div ref={scrollRef} style={{
        position: 'absolute', bottom: '100px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        color: 'var(--muted)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>
        <span>Role para ver mais</span>
        <div style={{ width: '1px', height: '40px', background: 'var(--border)' }} />
      </div>
    </section>
  )
}
