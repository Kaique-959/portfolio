import { useState, useRef, useEffect } from 'react'
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
  track: {
    display: 'flex',
    gap: '24px',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    paddingBottom: '8px',
    cursor: 'grab',
    scrollBehavior: 'smooth',
  },
  card: {
    minWidth: '400px',
    maxWidth: '450px',
    flexShrink: 0,
    scrollSnapAlign: 'start',
    background: 'var(--bg)',
    borderRadius: 'var(--radius)',
    padding: '32px',
    border: '1px solid var(--border)',
    userSelect: 'none',
  },
  quote: {
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: 'var(--muted)',
    marginBottom: '20px',
    fontStyle: 'italic',
  },
  author: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.95rem',
    fontWeight: 600,
    marginBottom: '2px',
  },
  authorRole: {
    fontSize: '0.8rem',
    color: 'var(--accent)',
  },
  dots: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    marginTop: '32px',
  },
  dot: (active) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: active ? 'var(--accent)' : 'var(--border)',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    padding: 0,
  }),
}

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const isDragging = useRef(false)

  const scrollTo = (idx) => {
    const card = trackRef.current?.children[idx]
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
      setActiveIdx(idx)
    }
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onScroll = () => {
      const cards = Array.from(track.children)
      let closest = 0
      let closestDist = Infinity
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect()
        const dist = Math.abs(rect.left - track.getBoundingClientRect().left)
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      })
      setActiveIdx(closest)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('[data-testimonial]'),
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="testimonials" ref={sectionRef} style={styles.section}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Testimonials</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '16px' }}>
            What People Say
          </h2>
        </div>
      </div>

      <div style={{ paddingLeft: 'max(24px, calc((100% - 1280px) / 2))' }}>
        <div ref={trackRef} style={styles.track}
          onMouseDown={() => { isDragging.current = true }}
          onMouseUp={() => { isDragging.current = false }}
          onMouseLeave={() => { isDragging.current = false }}
        >
          {content.testimonials.map((t, i) => (
            <div key={i} data-testimonial style={styles.card}>
              <p style={styles.quote}>"{t.text}"</p>
              <div>
                <div style={styles.author}>{t.name}</div>
                <div style={styles.authorRole}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div style={styles.dots}>
          {content.testimonials.map((_, i) => (
            <button
              key={i}
              style={styles.dot(activeIdx === i)}
              onClick={() => scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
