import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const styles = {
  section: {
    padding: '128px 0',
  },
  list: {
    maxWidth: '720px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  item: {
    borderBottom: '1px solid var(--border)',
  },
  question: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    textAlign: 'left',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    fontWeight: 500,
    color: 'var(--fg)',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    transition: 'color 0.2s ease',
    gap: '16px',
  },
  icon: (open) => ({
    fontSize: '1.25rem',
    color: 'var(--accent)',
    transition: 'transform 0.3s ease',
    transform: open ? 'rotate(45deg)' : 'rotate(0)',
    flexShrink: 0,
  }),
  answer: {
    overflow: 'hidden',
    maxHeight: 0,
    transition: 'max-height 0.3s ease, padding 0.3s ease',
  },
  answerInner: {
    paddingBottom: '20px',
    color: 'var(--muted)',
    lineHeight: 1.7,
    fontSize: '0.9rem',
    maxWidth: '55ch',
  },
}

function FaqItem({ faq, i }) {
  const [open, setOpen] = useState(false)
  const answerRef = useRef(null)

  return (
    <div style={styles.item}>
      <button
        style={styles.question}
        onClick={() => setOpen(!open)}
        onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
        onMouseLeave={(e) => { if (!open) e.target.style.color = 'var(--fg)' }}
      >
        {faq.q}
        <span style={styles.icon(open)}>+</span>
      </button>
      <div
        ref={answerRef}
        style={{
          ...styles.answer,
          maxHeight: open ? '200px' : '0',
        }}
      >
        <div style={styles.answerInner}>{faq.a}</div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('[data-faq]'),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="faq" ref={sectionRef} style={styles.section}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <span className="eyebrow">FAQ</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '16px' }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={styles.list}>
          {content.faq.map((faq, i) => (
            <div key={i} data-faq>
              <FaqItem faq={faq} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
