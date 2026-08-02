import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    const onScroll = () => {
      const cards = Array.from(track.children)
      if (cards.length === 0) return
      let closest = 0
      let min = Infinity
      cards.forEach((c, i) => {
        const d = Math.abs(c.getBoundingClientRect().left - track.getBoundingClientRect().left)
        if (d < min) {
          min = d
          closest = i
        }
      })
      setActive(closest)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (i) => {
    const card = trackRef.current?.children[i]
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
      setActive(i)
    }
  }

  useGSAP(() => {
    gsap.fromTo(sectionRef.current.querySelectorAll('[data-t]'), { y: 20, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
    })
  }, { scope: sectionRef })

  const showDots = content.testimonials.length > 1

  return (
    <section id="testimonials" ref={sectionRef} className="section testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Depoimentos</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            O que dizem
          </h2>
        </div>
      </div>

      <div className="testimonial-track-wrap">
        <div ref={trackRef} className="testimonial-track">
          {content.testimonials.map((t, i) => (
            <article key={i} data-t className="testimonial-card">
              <p className="testimonial-quote">“{t.text}”</p>
              <div className="testimonial-name">{t.name}</div>
              <div className="testimonial-role">{t.role}</div>
            </article>
          ))}
        </div>
      </div>

      {showDots && (
        <div className="container">
          <div className="testimonial-dots" role="tablist">
            {content.testimonials.map((t, i) => (
              <button
                key={i}
                type="button"
                className="testimonial-dot-button"
                aria-label={`Depoimento ${i + 1}`}
                aria-current={active === i ? 'true' : 'false'}
                onClick={() => scrollTo(i)}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        .testimonials-section {
          background:
            radial-gradient(circle at 70% 20%, rgba(194, 78, 46, 0.06), transparent 36%),
            #FAFAF8;
        }

        .testimonial-track-wrap {
          padding-left: max(20px, calc((100% - 1200px) / 2));
          padding-right: 20px;
        }

        .testimonial-track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 8px;
        }

        .testimonial-track::-webkit-scrollbar {
          display: none;
        }

        .testimonial-card {
          min-width: min(86vw, 420px);
          max-width: 480px;
          flex-shrink: 0;
          scroll-snap-align: start;
          padding: 32px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: 0 14px 40px rgba(20, 20, 20, 0.05);
        }

        .testimonial-quote {
          font-size: 0.95rem;
          line-height: 1.75;
          color: var(--muted);
          margin-bottom: 24px;
        }

        .testimonial-name {
          font-weight: 600;
          margin-bottom: 2px;
          color: var(--fg);
        }

        .testimonial-role {
          font-size: 0.8rem;
          color: var(--muted);
        }

        .testimonial-dots {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 28px;
        }

        .testimonial-dot-button {
          width: 44px;
          height: 32px;
          display: inline-grid;
          place-items: center;
          border-radius: 999px;
          background: #fff;
          border: 1px solid #141414;
          cursor: pointer;
          transition: background-color 220ms ease, color 220ms ease, width 220ms ease;
        }

        .testimonial-dot-button::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #141414;
          transition: background 200ms ease;
        }

        .testimonial-dot-button:hover,
        .testimonial-dot-button:focus-visible,
        .testimonial-dot-button[aria-current="true"] {
          background: #141414;
        }

        .testimonial-dot-button:hover::before,
        .testimonial-dot-button:focus-visible::before,
        .testimonial-dot-button[aria-current="true"]::before {
          background: #fff;
        }
      `}</style>
    </section>
  )
}
