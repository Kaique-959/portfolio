import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const styles = {
  list: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  item: {
    borderBottom: '1px solid var(--border)',
  },
  q: {
    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px 0', textAlign: 'left', fontFamily: 'var(--font-body)',
    fontSize: '1rem', fontWeight: 500, color: 'var(--fg)', cursor: 'pointer',
    background: 'none', border: 'none', gap: '16px',
    transition: 'color 0.2s ease',
  },
  icon: (o) => ({
    fontSize: '1.2rem', color: 'var(--muted)', flexShrink: 0,
    transition: 'transform 0.3s ease', transform: o ? 'rotate(45deg)' : 'rotate(0)',
  }),
  answer: (o) => ({
    overflow: 'hidden', maxHeight: o ? '200px' : '0',
    transition: 'max-height 0.3s ease',
  }),
  aInner: {
    paddingBottom: '20px', color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.9rem',
  },
}

function Item({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={styles.item}>
      <button style={styles.q} onClick={() => setOpen(!open)}
        onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
        onMouseLeave={(e) => { if (!open) e.target.style.color = 'var(--fg)' }}
      >
        {faq.q}
        <span style={styles.icon(open)}>+</span>
      </button>
      <div style={styles.answer(open)}>
        <div style={styles.aInner}>{faq.a}</div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(sectionRef.current.querySelectorAll('[data-f]'), { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.06,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
  }, { scope: sectionRef })

  return (
    <section id="faq" ref={sectionRef} className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <span className="eyebrow">FAQ</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Perguntas frequentes
          </h2>
        </div>
        <div style={styles.list}>
          {content.faq.map((faq, i) => (
            <div key={i} data-f><Item faq={faq} /></div>
          ))}
        </div>
      </div>
    </section>
  )
}
