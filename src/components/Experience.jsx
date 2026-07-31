import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Experience() {
  const sectionRef = useRef(null)
  const listRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(listRef.current?.children || [], { y: 15, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
    })
  }, { scope: sectionRef })

  return (
    <section id="experience" ref={sectionRef} className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">/ Carreira</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            Experiência
          </h2>
        </div>

        <div ref={listRef} style={{ maxWidth: '700px', margin: '0 auto' }}>
          {content.experience.map((exp, i) => (
            <div key={exp.role} className="experience-row">
              <div className="experience-item">
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      marginBottom: '2px',
                    }}
                  >
                    {exp.role}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{exp.company}</p>
                </div>
                <span className="experience-period">
                  {exp.period}
                </span>
              </div>

              {exp.description && (
                <p className="experience-description">
                  {exp.description}
                </p>
              )}

              {i < content.experience.length - 1 && <div className="experience-divider" />}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .experience-row + .experience-row {
          margin-top: 8px;
        }

        .experience-item {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 20px 0 10px;
        }

        .experience-period {
          font-size: 0.85rem;
          color: var(--accent);
          font-weight: 500;
          white-space: nowrap;
          margin-left: 24px;
        }

        .experience-description {
          font-size: 0.9rem;
          line-height: 1.72;
          color: var(--muted);
          margin: 0 0 16px;
        }

        .experience-divider {
          height: 1px;
          background: var(--border);
        }

        @media (max-width: 640px) {
          .experience-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .experience-period {
            margin-left: 0;
          }
        }
      `}</style>
    </section>
  )
}
