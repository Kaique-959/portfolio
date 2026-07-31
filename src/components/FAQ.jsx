import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function Item({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="faq-item">
      <button
        id={`faq-button-${index}`}
        type="button"
        className="faq-question"
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        onClick={(event) => {
          event.currentTarget.blur()
          setOpen((value) => !value)
        }}
        onMouseEnter={(event) => { event.currentTarget.style.color = 'var(--accent)' }}
        onMouseLeave={(event) => { if (!open) event.currentTarget.style.color = 'var(--fg)' }}
      >
        {faq.q}
        <span className={`faq-icon ${open ? 'faq-icon-open' : ''}`} aria-hidden="true">+</span>
      </button>

      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-button-${index}`}
        hidden={!open}
        className="faq-panel"
      >
        <p className="faq-answer">{faq.a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(sectionRef.current.querySelectorAll('[data-f]'), { y: 15, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
    })
  }, { scope: sectionRef })

  return (
    <section id="faq" ref={sectionRef} className="section faq-section">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <span className="eyebrow">FAQ</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Perguntas frequentes
          </h2>
        </div>

        <div className="faq-list">
          {content.faq.map((faq, i) => (
            <div key={faq.q} data-f>
              <Item faq={faq} index={i} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .faq-section {
          background: var(--surface);
        }

        .faq-list {
          max-width: 700px;
          margin: 0 auto;
        }

        .faq-item + .faq-item {
          margin-top: 2px;
        }

        .faq-item {
          border-bottom: 1px solid var(--border);
        }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          justify-content: space-between;
          padding: 20px 0;
          min-height: 44px;
          text-align: left;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 500;
          color: var(--fg);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .faq-icon {
          font-size: 1.2rem;
          color: var(--muted);
          flex-shrink: 0;
          transition: transform 0.3s ease;
          transform: rotate(0deg);
        }

        .faq-icon-open {
          transform: rotate(45deg);
        }

        .faq-panel {
          overflow: hidden;
          transition: max-height 0.3s ease;
          max-height: 0;
        }

        .faq-panel:not([hidden]) {
          max-height: 240px;
        }

        .faq-answer {
          padding-bottom: 20px;
          color: var(--muted);
          line-height: 1.72;
          font-size: 0.92rem;
        }
      `}</style>
    </section>
  )
}
