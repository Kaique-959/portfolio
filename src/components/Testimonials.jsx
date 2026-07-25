import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const styles = {
  track: {
    display: 'flex',
    gap: '24px',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'none',
    paddingBottom: '8px',
  },
  card: {
    minWidth: '420px',
    maxWidth: '480px',
    flexShrink: 0,
    scrollSnapAlign: 'start',
    background: 'var(--bg)',
    borderRadius: 'var(--radius-lg)',
    padding: '32px',
    border: '1px solid var(--border)',
  },
  quote: {
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: 'var(--muted)',
    marginBottom: '20px',
    fontStyle: 'italic',
  },
  name: {
    fontWeight: 600,
    marginBottom: '2px',
  },
  role: {
    fontSize: '0.8rem',
    color: 'var(--muted)',
  },
  dots: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    marginTop: '28px',
  },
  dot: (a) => ({
    width: '8px', height: '8px', borderRadius: '50%',
    background: a ? 'var(--fg)' : 'var(--border)',
    border: 'none', cursor: 'pointer', padding: 0,
    transition: 'background 0.2s ease',
  }),
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const cards = Array.from(track.children)
      let closest = 0, min = Infinity
      cards.forEach((c, i) => {
        const d = Math.abs(c.getBoundingClientRect().left - track.getBoundingClientRect().left)
        if (d < min) { min = d; closest = i }
      })
      setActive(closest)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (i) => {
    const card = trackRef.current?.children[i]
    if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' }); setActive(i) }
  }

  useGSAP(() => {
    gsap.fromTo(sectionRef.current.querySelectorAll('[data-t]'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
  }, { scope: sectionRef })

  return (
    <section id="testimonials" ref={sectionRef} className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Depoimentos</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            O que dizem
          </h2>
        </div>
      </div>

      <div style={{ paddingLeft: 'max(24px, calc((100% - 1200px) / 2))' }}>
        <div ref={trackRef} style={styles.track}>
          {content.testimonials.map((t, i) => (
            <div key={i} data-t style={styles.card}>
              <p style={styles.quote}>"{t.text}"</p>
              <div style={styles.name}>{t.name}</div>
              <div style={styles.role}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div style={styles.dots}>
          {content.testimonials.map((_, i) => (
            <button key={i} style={styles.dot(active === i)} onClick={() => scrollTo(i)}
              aria-label={`Depoimento ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
