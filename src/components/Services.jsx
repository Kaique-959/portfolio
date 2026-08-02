import { useRef, useEffect, useState, useCallback } from 'react'
import { Globe, MessageCircle, GitBranch, Search, Layout, Code, Server, Lightbulb, Film } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const icons = [Globe, MessageCircle, GitBranch, Search, Layout, Code, Server, Lightbulb, Film]
const rotations = [-1.2, 0.8, -0.6, 1, -0.8, 0.6, -0.4, 0.9, -0.7]

function ServiceVisualPanel({ activeIndex }) {
  const item = content.services[activeIndex] || content.services[0]
  const Icon = icons[activeIndex] || icons[0]

  return (
    <div className="services-layout-col-right">
      <div className="service-visual-panel">
        <div className="service-visual-content" aria-hidden="true">
          <span className="service-visual-number">{String((activeIndex ?? 0) + 1).padStart(2, '0')}</span>
          <Icon className="service-visual-icon" strokeWidth={1.1} />

          <div className="service-visual-grid" />

          <div className="service-visual-nodes">
            <span className="service-visual-node service-visual-node-1" />
            <span className="service-visual-node service-visual-node-2" />
            <span className="service-visual-node service-visual-node-3" />
            <span className="service-visual-line service-visual-line-1" />
            <span className="service-visual-line service-visual-line-2" />
          </div>
        </div>

        <div className="service-visual-meta">
          <span className="service-visual-label">Especialidade atual</span>
          <strong className="service-visual-title">{item.title}</strong>
          <div className="service-visual-tags" aria-hidden="true">
            {item.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  const onCardEnter = useCallback((i) => setActiveIndex(i), [])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

    const mm = gsap.matchMedia()
    const triggers = []

    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      cardsRef.current.forEach((el, i) => {
        if (!el) return
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: 'top 40%',
            onEnter: () => onCardEnter(i),
            onEnterBack: () => onCardEnter(i),
          })
        )
      })
      return () => { triggers.forEach((t) => t.kill()) }
    })

    return () => mm.revert()
  }, [onCardEnter])

  useGSAP(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
    })

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      end: 'bottom 20%',
      onLeave: () => setActiveIndex(-1),
      onLeaveBack: () => setActiveIndex(-1),
    })

    return () => trigger.kill()
  }, { scope: sectionRef })

  return (
    <section id="services" ref={sectionRef} className="section services-section">
      <div className="container">
        <div ref={headerRef} className="services-header">
          <span className="eyebrow">/ Habilidades</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            O que eu faço
          </h2>
          <p
            className="services-subheader"
            style={{ color: 'var(--muted)', marginTop: '16px', maxWidth: '50ch' }}
          >
            {content.services.length} áreas organizadas em cartões que você percorre enquanto leia a proposta de cada especialidade.
          </p>
        </div>

        <div className="services-layout">
          <div className="services-layout-col-left">
            <div className="services-stack">
              {content.services.map((service, index) => (
                <article
                  key={service.title}
                  ref={(el) => { cardsRef.current[index] = el }}
                  className="service-card"
                  style={{
                    '--stack-index': index + 1,
                    '--card-rotation': `${rotations[index % rotations.length]}deg`,
                  }}
                  onFocus={() => onCardEnter(index)}
                  onMouseEnter={() => onCardEnter(index)}
                >
                  <div className="service-card-inner">
                    <header className="service-card-header">
                      <span className="service-card-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
                          fontWeight: 700,
                          letterSpacing: '-0.03em',
                          lineHeight: 1.1,
                        }}
                      >
                        {service.title}
                      </h3>
                    </header>

                    <p style={{ color: 'var(--muted)', lineHeight: 1.75, margin: '20px 0 24px' }}>
                      {service.description}
                    </p>

                    <div className="service-card-tags">
                      {service.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <ServiceVisualPanel activeIndex={activeIndex >= 0 ? activeIndex : 0} />
        </div>
      </div>

      <style>{`
        .services-section {
          background: linear-gradient(180deg, #FAFAF8 0%, #F7F6F3 40%, #FAFAF8 100%);
        }

        .services-subheader { max-width: 50ch; }

        .services-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
          gap: clamp(48px, 7vw, 110px);
          align-items: start;
        }

        .services-stack {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .service-card {
          position: sticky;
          top: 112px;
          z-index: var(--stack-index, 2);
          will-change: transform;
        }

        .service-card-inner {
          padding: clamp(28px, 4vw, 48px);
          border: 1px solid var(--border);
          border-radius: 24px;
          background: rgba(250, 250, 248, 0.96);
          box-shadow: 0 18px 60px rgba(20,20,20,0.08), 0 8px 24px rgba(20,20,20,0.04);
          transform: rotate(var(--card-rotation, 0deg));
          transform-origin: center top;
        }

        .service-card:focus-within .service-card-inner,
        .service-card:hover .service-card-inner {
          box-shadow: 0 24px 70px rgba(20,20,20,0.10), 0 12px 30px rgba(194,78,46,0.08);
        }

        .service-card-header { display: flex; flex-direction: column; gap: 12px; }

        .service-card-number {
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent);
        }

        .service-card-tags { display: flex; flex-wrap: wrap; gap: 8px; }

        .services-layout-col-right { position: sticky; top: 112px; }

        .service-visual-panel {
          position: relative;
          min-height: min(620px, calc(100dvh - 160px));
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
          border: 1px solid rgba(229,229,226,0.8);
          border-radius: 24px;
          background: radial-gradient(circle at 24% 18%, rgba(194,78,46,0.24), transparent 38%),
            linear-gradient(145deg, #141414, #35120d 58%, #8f321f);
          box-shadow: 0 24px 70px rgba(20,20,20,0.14);
        }

        .service-visual-content { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }

        .service-visual-number {
          position: absolute; top: 32px; left: 32px;
          font-family: var(--font-display); font-size: 5rem; font-weight: 900;
          line-height: 1; color: rgba(255,255,255,0.08);
        }

        .service-visual-icon {
          position: absolute; top: 50%; left: 50%;
          width: min(220px, 28vw); height: min(220px, 28vw);
          color: rgba(255,255,255,0.18);
          transform: translate(-50%, -50%);
        }

        .service-visual-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(circle at 60% 72%, black, transparent 78%);
          -webkit-mask-image: radial-gradient(circle at 60% 72%, black, transparent 78%);
        }

        .service-visual-nodes { position: absolute; inset: 0; }

        .service-visual-node {
          position: absolute; width: 10px; height: 10px; border-radius: 50%;
          background-color: rgba(255,255,255,0.32);
          box-shadow: 0 0 0 6px rgba(255,255,255,0.06);
        }

        .service-visual-node-1 { top: 22%; right: 24%; }
        .service-visual-node-2 { top: 58%; left: 18%; }
        .service-visual-node-3 { bottom: 24%; right: 34%; }

        .service-visual-line {
          position: absolute; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
        }
        .service-visual-line-1 { top: 36%; left: 12%; width: 56%; transform: rotate(-12deg); }
        .service-visual-line-2 { bottom: 32%; right: 8%; width: 48%; transform: rotate(18deg); }

        .service-visual-meta {
          position: relative; padding: 28px 28px 24px;
          background: linear-gradient(180deg, rgba(20,20,20,0), rgba(20,20,20,0.6) 58%);
        }

        .service-visual-label {
          display: block; margin-bottom: 12px; font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.58);
        }

        .service-visual-title {
          display: block; margin-bottom: 16px;
          font-family: var(--font-display); font-size: clamp(1.4rem, 2.4vw, 2rem);
          font-weight: 800; letter-spacing: -0.03em; color: #fff;
        }

        .service-visual-tags { display: flex; flex-wrap: wrap; gap: 8px; }

        .service-visual-tags .tag {
          background: rgba(255,255,255,0.1); color: #fff;
          border-color: rgba(255,255,255,0.18);
        }

        @media (max-width: 899px) {
          .services-layout { grid-template-columns: 1fr; gap: 24px; }
          .services-layout-col-right { position: relative; top: auto; order: -1; }
          .service-visual-panel { min-height: 260px; }
          .service-card { position: relative; top: auto !important; transform: none !important; }
          .service-card-inner { transform: none; }
          .services-stack { gap: 16px; }
        }

        @media (min-width: 1280px) {
          .service-visual-panel { min-height: min(680px, calc(100dvh - 180px)); }
        }
      `}</style>
    </section>
  )
}
