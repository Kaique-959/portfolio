import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function PossibleProjects() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(gridRef.current?.children || [], { y: 18, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.45,
      ease: 'power3.out',
      stagger: 0.045,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="possibilities" ref={sectionRef} className="section possibilities-section">
      <div className="container">
        <div className="section-header possibilities-header">
          <span className="eyebrow">/ Possibilidades</span>
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
            Projetos que posso desenvolver
          </h2>
          <p className="possibilities-intro">
            Ideias de soluções que cabem no meu repertório técnico. Não são trabalhos concluídos: são pontos de partida para transformar uma dor real em produto.
          </p>
        </div>

        <div ref={gridRef} className="possibilities-grid">
          {content.possibleProjects.map((project, index) => (
            <article key={project.title} className="possibility-card">
              <div className="possibility-card-topline">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span className="possibility-label">Possibilidade</span>
              </div>
              <span className="possibility-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="possibility-tags">
                {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .possibilities-section {
          background: #141414;
          color: #FAFAF8;
        }

        .possibilities-section .eyebrow,
        .possibilities-section .possibilities-intro {
          color: rgba(250,250,248,0.62);
        }

        .possibilities-header { max-width: 680px; }

        .possibilities-intro {
          max-width: 62ch;
          margin: 0;
          line-height: 1.75;
        }

        .possibilities-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: 48px;
        }

        .possibility-card {
          min-height: 248px;
          display: flex;
          flex-direction: column;
          padding: 22px;
          border: 1px solid rgba(250,250,248,0.14);
          border-radius: 18px;
          background: #1c1c1c;
          transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
        }

        .possibility-card:hover {
          transform: translateY(-4px);
          border-color: rgba(194,78,46,0.72);
          background: #222;
        }

        .possibility-card-topline,
        .possibility-category {
          color: rgba(250,250,248,0.48);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .possibility-card-topline {
          display: flex;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .possibility-label { color: var(--accent); }

        .possibility-category {
          display: inline-block;
          width: fit-content;
          margin-bottom: 10px;
          color: #f0c56d;
        }

        .possibility-card h3 {
          margin: 0 0 10px;
          font-family: var(--font-display);
          font-size: 1.18rem;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: #FAFAF8;
        }

        .possibility-card p {
          margin: 0;
          color: rgba(250,250,248,0.62);
          font-size: 0.86rem;
          line-height: 1.65;
        }

        .possibility-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
          padding-top: 22px;
        }

        .possibilities-section .tag {
          border-color: rgba(250,250,248,0.14);
          background: rgba(250,250,248,0.06);
          color: rgba(250,250,248,0.68);
        }

        @media (max-width: 1020px) {
          .possibilities-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 640px) {
          .possibilities-grid { grid-template-columns: 1fr; gap: 10px; margin-top: 36px; }
          .possibility-card { min-height: 220px; }
        }
      `}</style>
    </section>
  )
}
