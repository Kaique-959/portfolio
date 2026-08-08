import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { OriginButton } from '@/components/ui/origin-button'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function About() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const techRef = useRef(null)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useGSAP(() => {
    gsap.fromTo(
      imgRef.current,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    gsap.fromTo(
      textRef.current,
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    if (techRef.current) {
      gsap.fromTo(
        techRef.current,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: techRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  }, { scope: sectionRef })

  return (
    <section id="about" ref={sectionRef} className="section about-section">
      <div className="container">
        <span className="eyebrow">/ Sobre Mim</span>

        <div className="about-grid">
          <div ref={imgRef} className="about-placeholder">
            <img src={content.about.image} alt="Kaique Calefi" className="about-photo" />
            <span className="about-photo-caption">Kaique Calefi · Brasília</span>
          </div>

          <div>
            <div ref={textRef}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: '24px',
                }}
              >
                Criativo na <span style={{ color: 'var(--accent)' }}>Prática</span>
              </h2>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '20px', color: 'var(--fg)' }}>
                {content.about.bio}
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '32px' }}>
                {content.about.bio2}
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <OriginButton onClick={() => scrollTo('contact')}>Falar comigo</OriginButton>
                <OriginButton onClick={() => scrollTo('portfolio')}>Ver projetos</OriginButton>
                <OriginButton onClick={() => window.open('/Curriculo_Kaique_Calefi_Foto_1_Pagina.pdf', '_blank', 'noopener,noreferrer')}>Ver currículo</OriginButton>
              </div>
            </div>

            <div
              ref={techRef}
              className="about-tech"
              aria-label="Stack e contexto"
            >
              {content.about.techStack.map((item, i) => (
                <span key={item}>
                  {i > 0 && <span aria-hidden="true" style={{ margin: '0 8px', opacity: 0.3 }}>/</span>}
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          background:
            radial-gradient(circle at 78% 18%, rgba(194, 78, 46, 0.06), transparent 38%),
            #FAFAF8;
        }

        .about-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
          gap: clamp(48px, 7vw, 80px);
          align-items: center;
        }

        .about-placeholder {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border: 1px solid var(--border);
          border-radius: 20px;
          background: var(--surface);
        }

        .about-photo {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .about-photo-caption {
          position: absolute;
          left: 20px;
          bottom: 18px;
          font-size: 0.75rem;
          font-weight: 500;
          color: #fff;
          text-shadow: 0 1px 12px rgba(0, 0, 0, 0.55);
        }

        .about-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          padding-top: 24px;
          margin-top: 24px;
          border-top: 1px solid var(--border);
          font-size: 0.85rem;
          color: var(--muted);
        }

        @media (max-width: 767px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .about-placeholder {
            max-height: 520px;
          }
        }
      `}</style>
    </section>
  )
}
