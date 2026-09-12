"use client"

import { useRef } from 'react'
import { LiquidMetal } from '@paper-design/shaders-react'
import { motion } from 'motion/react'
import { useHeroParallax } from '@/hooks/useHeroParallax'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.15, staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function LiquidMetalHero({
  firstName,
  lastName,
  kickerLeft,
  kickerRight,
}) {
  const sectionRef = useRef(null)
  useHeroParallax(sectionRef)

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-stage relative overflow-hidden bg-background"
    >
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>

      <div data-parallax-layers className="hero-parallax-layers">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl w-full">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <div className="hero-kickers" data-parallax-layer="1" aria-hidden="true">
            <span>{kickerLeft}</span>
            <span>{kickerRight}</span>
          </div>

          <h1 className="hero-title" aria-label={`${firstName} ${lastName}`}>
            <motion.div
              className="hero-title-first"
              data-parallax-layer="3"
              variants={itemVariants}
              style={{ willChange: 'transform' }}
            >
              <span aria-hidden="true" className="hero-name">{firstName}</span>
            </motion.div>

            <motion.div
              className="hero-liquid-layer"
              data-parallax-layer="2"
              variants={itemVariants}
              style={{ willChange: 'transform' }}
            >
                <div className="hero-liquid-visual">
                  <LiquidMetal
                    colorBack="#FAFAF800"
                    colorTint="#C24E2E"
                    shape="metaballs"
                    repetition={2}
                    softness={0.25}
                    distortion={0.12}
                    contour={0.6}
                    angle={70}
                    speed={0.4}
                    scale={0.8}
                    fit="cover"
                    style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                  />
                </div>
            </motion.div>

            <motion.div
              className="hero-title-last"
              data-parallax-layer="3"
              variants={itemVariants}
              style={{ willChange: 'transform' }}
            >
              <span aria-hidden="true" className="hero-name">{lastName}</span>
            </motion.div>
          </h1>

          </motion.div>
        </div>
      </div>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .hero-stage {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(40px, 6vh, 64px) 0 0;
        }

        .hero-parallax-layers {
          position: relative;
          width: 100%;
        }

        .hero-kickers {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          color: var(--muted);
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .hero-title {
          display: grid;
          grid-template-columns: minmax(0, 1fr) clamp(220px, 26vw, 360px) minmax(0, 1fr);
          align-items: center;
          width: 100%;
          /* a faixa vazia no topo do canvas quadrado sobe para a altura dos kickers, que ficam nas colunas laterais */
          margin-top: calc(-1 * clamp(16px, 2.5vw, 36px));
          text-align: center;
        }

        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 7.2vw, 7rem);
          font-weight: 900;
          line-height: 0.85;
          letter-spacing: -0.06em;
          text-transform: uppercase;
          color: var(--fg);
        }

        .hero-title-first,
        .hero-title-last {
          position: relative;
          /* o centro visual do blob fica abaixo do centro do canvas; top compensa porque o transform e do Framer */
          top: clamp(12px, 2vw, 28px);
          min-width: 0;
        }

        .hero-title-first {
          text-align: right;
        }

        .hero-title-last {
          text-align: left;
        }

        .hero-liquid-layer {
          position: relative;
          width: 100%;
          /* quadrado como o mundo do shader: em caixa mais baixa o cover recorta a orbita das gotas */
          aspect-ratio: 1 / 1;
          z-index: 2;
        }

        .hero-liquid-visual {
          width: 100%;
          height: 100%;
        }

        @media (max-width: 767px) {
          .hero-stage {
            justify-content: flex-start;
            padding: 28px 0 8px;
          }

          .hero-kickers {
            align-items: flex-start;
            margin-bottom: 20px;
            font-size: 0.78rem;
          }

          .hero-kickers span:last-child {
            text-align: right;
          }

          .hero-title {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            margin-top: 0;
          }

          .hero-name {
            font-size: 21.5vw;
            line-height: 0.82;
          }

          .hero-title-first,
          .hero-title-last {
            top: 0;
          }

          .hero-title-first {
            text-align: left;
          }

          .hero-title-last {
            text-align: right;
          }

          .hero-liquid-layer {
            align-self: center;
            width: 64vw;
            /* o blob anima abaixo do centro do canvas: sobe a caixa para as folgas ate os nomes ficarem iguais */
            margin: -2.5vw 0 2.5vw;
          }
        }
      `}</style>
    </section>
  )
}
