import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'
import { GradientButton } from '@/components/ui/gradient-button'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function ProjectPlaceholder({ index, title, status }) {
  return (
    <div
      className={`project-placeholder project-placeholder-${index % 4}`}
      aria-label={`${title} — ${status}`}
    >
      <div className="project-placeholder-grid" aria-hidden="true" />

      <span className="project-placeholder-number">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="project-placeholder-window" aria-hidden="true">
        <div className="project-placeholder-window-bar">
          <span />
          <span />
          <span />
        </div>

        <div className="project-placeholder-lines">
          <span />
          <span />
          <span />
        </div>
      </div>

      <span className="project-placeholder-status">{status}</span>
    </div>
  )
}

export default function Portfolio() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const ctaRef = useRef(null)
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)
  const lastFocusedRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    if (!selectedProject) return undefined

    lastFocusedRef.current = document.activeElement
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 30)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setSelectedProject(null)
      }
      if (event.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
      if (lastFocusedRef.current instanceof HTMLElement) {
        lastFocusedRef.current.focus()
      }
    }
  }, [selectedProject])

  useGSAP(() => {
    gsap.fromTo(gridRef.current?.children || [], { y: 20, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
    })

    gsap.fromTo(ctaRef.current, { y: 20, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.3,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
    })
  }, { scope: sectionRef })

  return (
    <section id="portfolio" ref={sectionRef} className="section portfolio-section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">/ Projetos</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '12px',
            }}
          >
            Trabalhos selecionados
          </h2>
        </div>

        <div ref={gridRef} className="portfolio-grid">
          {content.projects.map((project, i) => {
            return (
              <button
                key={project.title}
                type="button"
                className="project-card"
                aria-label={`Ver detalhes de ${project.title}`}
                onClick={() => setSelectedProject(project)}
              >
                <ProjectPlaceholder
                  index={i}
                  title={project.title}
                  status={project.status || 'Imagem em preparação'}
                />

                <div className="project-card-body">
                  <span className="project-card-category">{project.category}</span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      marginBottom: '8px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                    {project.description}
                  </p>

                  <div className="project-card-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <span className="project-card-action">Abrir detalhes <span aria-hidden="true">→</span></span>
                </div>
              </button>
            )
          })}
        </div>

        <div ref={ctaRef} className="portfolio-cta">
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
              Em produção contínua
            </p>
            <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--fg)', marginTop: '4px' }}>
              Quer ver tudo que já fiz?
            </p>
          </div>
          <GradientButton asChild>
            <a href="https://github.com/Kaique-959" target="_blank" rel="noopener noreferrer">
              Ver meus repositórios
            </a>
          </GradientButton>
        </div>
      </div>

      {selectedProject && (
        <div
          className="project-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null)
          }}
        >
<div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            ref={modalRef}
          >
            <button
              type="button"
              className="project-modal-close"
              aria-label="Fechar detalhes do projeto"
              ref={closeButtonRef}
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            <span className="eyebrow">{selectedProject.category}</span>
            <h2 id="project-modal-title">{selectedProject.title}</h2>
            <p className="project-modal-lead">{selectedProject.description}</p>

            <div className="project-modal-grid">
              <div>
                <span className="project-modal-label">Contexto</span>
                <p>{selectedProject.details.context}</p>
              </div>
              <div>
                <span className="project-modal-label">Desafio</span>
                <p>{selectedProject.details.challenge}</p>
              </div>
              <div className="project-modal-solution">
                <span className="project-modal-label">Solução</span>
                <p>{selectedProject.details.solution}</p>
              </div>
            </div>

            <div className="project-modal-deliverables">
              {selectedProject.details.deliverables.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>

            <div className="project-modal-footer">
              <span className="project-modal-label">Stack</span>
              <div className="project-card-tags">
                {selectedProject.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <GradientButton asChild>
                <a href="#contact" onClick={() => setSelectedProject(null)}>Quero um projeto parecido</a>
              </GradientButton>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .portfolio-section {
          background:
            linear-gradient(180deg, var(--surface) 0%, #FAFAF8 100%);
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .project-card {
          position: relative;
          display: block;
          overflow: hidden;
          border: 1px solid var(--border);
          border-radius: 20px;
          background: var(--bg);
          box-shadow: 0 12px 32px rgba(20, 20, 20, 0.04);
          transition:
            transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 200ms,
            box-shadow 300ms;
          padding: 0;
          text-align: left;
          color: inherit;
          font: inherit;
          cursor: pointer;
        }

        .project-card:hover,
        .project-card:focus-visible {
          transform: translateY(-5px);
          border-color: var(--border-hover);
          box-shadow: 0 22px 60px rgba(20, 20, 20, 0.1);
        }

        .project-card-action {
          display: inline-flex;
          margin-top: 18px;
          color: var(--accent);
          font-size: 0.8rem;
          font-weight: 700;
        }

        .project-card-body {
          padding: 24px;
        }

        .project-card-category {
          display: inline-block;
          margin-bottom: 12px;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--muted);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .project-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .project-placeholder {
          position: relative;
          min-height: 280px;
          overflow: hidden;
          background:
            radial-gradient(circle at 72% 28%, rgba(194, 78, 46, 0.18), transparent 32%),
            linear-gradient(145deg, #EBEBE8, #F7F7F4);
        }

        .project-placeholder-0 { background:
          radial-gradient(circle at 22% 22%, rgba(194, 78, 46, 0.18), transparent 32%),
          linear-gradient(135deg, #F2F2F0, #FAFAF8 60%, #EBEBE8); }
        .project-placeholder-1 { background:
          radial-gradient(circle at 70% 24%, rgba(194, 78, 46, 0.12), transparent 32%),
          linear-gradient(160deg, #FAFAF8, #F2F2F0 50%, #EBEBE8); }
        .project-placeholder-2 { background:
          radial-gradient(circle at 32% 70%, rgba(20, 20, 20, 0.08), transparent 32%),
          linear-gradient(160deg, #FAFAF8, #F2F2F0 60%, #FAFAF8); }
        .project-placeholder-3 { background:
          radial-gradient(circle at 70% 60%, rgba(194, 78, 46, 0.10), transparent 32%),
          linear-gradient(160deg, #F2F2F0, #FAFAF8 60%, #EBEBE8); }

        .project-placeholder-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(20, 20, 20, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 20, 20, 0.05) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.55;
        }

        .project-placeholder-number {
          position: absolute;
          top: 24px;
          left: 24px;
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: -0.05em;
          color: rgba(20, 20, 20, 0.1);
        }

        .project-placeholder-window {
          position: absolute;
          inset: 72px 36px 56px;
          overflow: hidden;
          border: 1px solid rgba(20, 20, 20, 0.08);
          border-radius: 14px;
          background: rgba(250, 250, 248, 0.86);
          box-shadow: 0 16px 42px rgba(20, 20, 20, 0.08);
        }

        .project-placeholder-window-bar {
          display: flex;
          gap: 6px;
          padding: 12px;
          border-bottom: 1px solid var(--border);
        }

        .project-placeholder-window-bar span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(194, 78, 46, 0.42);
        }

        .project-placeholder-lines {
          display: grid;
          gap: 12px;
          padding: 24px;
        }

        .project-placeholder-lines span {
          height: 10px;
          border-radius: 999px;
          background: rgba(20, 20, 20, 0.08);
        }

        .project-placeholder-lines span:nth-child(1) { width: 68%; }
        .project-placeholder-lines span:nth-child(2) { width: 88%; }
        .project-placeholder-lines span:nth-child(3) { width: 52%; }

        .project-placeholder-status {
          position: absolute;
          right: 20px;
          bottom: 18px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--muted);
        }

        .portfolio-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 32px;
          padding: 24px;
          background: var(--bg);
          border-radius: 20px;
          border: 1px solid var(--border);
        }

        .project-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: grid;
          place-items: center;
          padding: 24px;
          background: rgba(20, 20, 20, 0.62);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .project-modal {
          position: relative;
          width: min(760px, 100%);
          max-height: min(760px, calc(100dvh - 48px));
          overflow-y: auto;
          padding: clamp(28px, 5vw, 56px);
          border: 1px solid rgba(229, 229, 226, 0.9);
          border-radius: 24px;
          background: #FAFAF8;
          box-shadow: 0 32px 100px rgba(0, 0, 0, 0.28);
        }

        .project-modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border: 1px solid var(--border);
          border-radius: 50%;
          color: var(--muted);
          font-size: 1.5rem;
          line-height: 1;
        }

        .project-modal h2 {
          max-width: 12ch;
          margin: 8px 0 16px;
          font-size: clamp(2rem, 5vw, 3.8rem);
          line-height: 0.98;
          letter-spacing: -0.05em;
        }

        .project-modal-lead {
          max-width: 52ch;
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .project-modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 36px;
        }

        .project-modal-grid p,
        .project-modal-solution p {
          margin-top: 8px;
          font-size: 0.92rem;
          line-height: 1.7;
        }

        .project-modal-solution {
          grid-column: 1 / -1;
        }

        .project-modal-label {
          display: block;
          color: var(--accent);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .project-modal-deliverables,
        .project-modal-footer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-top: 28px;
        }

        .project-modal-footer {
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }

        @media (max-width: 767px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
          }

          .project-placeholder {
            min-height: 240px;
          }

          .project-placeholder-window {
            inset: 60px 22px 50px;
          }

          .project-modal-grid {
            grid-template-columns: 1fr;
          }

          .project-modal-solution {
            grid-column: auto;
          }

          .project-modal-footer {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  )
}
