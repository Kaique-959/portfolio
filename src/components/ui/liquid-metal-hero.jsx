"use client"

import { useEffect, useRef, useState } from 'react'
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

function formatClock(timeZone) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZoneName: 'shortOffset',
  }).formatToParts(new Date())
  const value = (type) => parts.find((part) => part.type === type)?.value
  return `${value('hour')}:${value('minute')} ${value('timeZoneName')}`
}

function useClock(timeZone) {
  const [clock, setClock] = useState(() => formatClock(timeZone))

  useEffect(() => {
    const id = setInterval(() => setClock(formatClock(timeZone)), 1000)
    return () => clearInterval(id)
  }, [timeZone])

  return clock
}

export default function LiquidMetalHero({
  firstName,
  lastName,
  descriptor,
  role,
  location,
  timeZone,
}) {
  const sectionRef = useRef(null)
  const clock = useClock(timeZone)
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
          <h1 className="hero-title" aria-label={`${firstName} ${lastName}`}>
            <motion.div
              className="hero-title-first"
              data-parallax-layer="3"
              variants={itemVariants}
              style={{ willChange: 'transform' }}
            >
              <span className="hero-name-group" aria-hidden="true">
                <span className="hero-meta hero-meta-top" lang="en">{descriptor}</span>
                <span className="hero-name">{firstName}</span>
              </span>
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
              <span className="hero-name-group" aria-hidden="true">
                <span className="hero-meta hero-meta-top" lang="en">{role}</span>
                <span className="hero-name">{lastName}</span>
                <span className="hero-meta hero-meta-bottom" lang="en">{location} - {clock}</span>
              </span>
            </motion.div>
          </h1>

          <p className="sr-only" lang="en">{`${descriptor}. ${role}. ${location}.`}</p>
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
          /* a composicao escala pela largura: sem o teto de 2x a caixa do blob, telas altas e estreitas sobram vazias */
          min-height: min(80svh, calc(2 * clamp(220px, 26vw, 360px)));
          padding-block: 48px;
        }

        .hero-parallax-layers {
          position: relative;
          width: 100%;
        }

        .hero-parallax-layers .container {
          max-width: 1128px;
        }

        .hero-title {
          display: grid;
          grid-template-columns: minmax(0, 1fr) clamp(220px, 26vw, 360px) minmax(0, 1fr);
          align-items: center;
          width: 100%;
        }

        .hero-title-first,
        .hero-title-last {
          position: relative;
          /* o centro visual do blob fica abaixo do centro do canvas; top compensa porque o transform e do Framer */
          top: clamp(12px, 2vw, 28px);
          min-width: 0;
        }

        .hero-title-first {
          text-align: left;
        }

        .hero-title-last {
          text-align: right;
        }

        .hero-name-group {
          position: relative;
          display: inline-block;
        }

        .hero-name {
          font-family: 'Clash Display', var(--font-display);
          font-size: clamp(2.5rem, 6vw, 5.75rem);
          font-weight: 600;
          line-height: 0.95;
          letter-spacing: -0.5px;
          text-transform: uppercase;
          color: #333;
        }

        .hero-meta {
          font-family: 'General Sans', var(--font-body);
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.4;
          letter-spacing: -0.5px;
          color: var(--muted);
          white-space: nowrap;
        }

        .hero-meta-top {
          position: absolute;
          bottom: 100%;
          margin-bottom: 18px;
        }

        .hero-meta-bottom {
          position: absolute;
          top: 100%;
          margin-top: 28px;
        }

        .hero-title-first .hero-meta {
          left: 0;
        }

        .hero-title-last .hero-meta {
          right: 0;
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
            min-height: 0;
            padding: 36px 0 72px;
          }

          .hero-title {
            display: flex;
            flex-direction: column;
            align-items: stretch;
          }

          .hero-title-first,
          .hero-title-last {
            top: 0;
          }

          .hero-name {
            font-size: 20vw;
            line-height: 0.9;
          }

          .hero-meta {
            position: static;
            display: block;
            font-size: 0.875rem;
          }

          .hero-meta-top {
            margin-bottom: 4px;
          }

          .hero-meta-bottom {
            margin-top: 8px;
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
