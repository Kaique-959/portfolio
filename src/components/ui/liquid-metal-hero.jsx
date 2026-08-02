"use client"

import { useRef } from 'react'
import { LiquidMetal } from '@paper-design/shaders-react'
import { GradientButton } from '@/components/ui/gradient-button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
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
  badge,
  firstName,
  lastName,
  kickerLeft,
  kickerRight,
  primaryCtaLabel,
  secondaryCtaLabel,
  primaryCtaHref,
  secondaryCtaHref,
}) {
  const sectionRef = useRef(null)
  useHeroParallax(sectionRef)

  const h1style = {
    fontFamily: 'var(--font-display)',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '-0.06em',
    lineHeight: 0.85,
    fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
    color: 'var(--fg)',
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-stage relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
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
              <span aria-hidden="true" style={h1style}>{firstName}</span>
            </motion.div>

            <motion.div
              className="hero-liquid-layer"
              data-parallax-layer="2"
              variants={itemVariants}
              style={{ willChange: 'transform' }}
            >
                <LiquidMetal
                  colorBack="#FAFAF8"
                  colorTint="#C24E2E"
                  shape="metaballs"
                  repetition={2}
                  softness={0.25}
                  distortion={0.12}
                  contour={0.6}
                  angle={70}
                  speed={0.4}
                  scale={0.5}
                  fit="cover"
                  style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                />
            </motion.div>

            <motion.div
              className="hero-title-last"
              data-parallax-layer="3"
              variants={itemVariants}
              style={{ willChange: 'transform' }}
            >
              <span aria-hidden="true" style={h1style}>{lastName}</span>
            </motion.div>
          </h1>

          <motion.div className="flex flex-col items-center gap-5 mt-14" data-parallax-layer="4" variants={itemVariants}>
            {badge && (
              <Badge variant="outline" className="text-foreground border-border bg-background/60 backdrop-blur-sm">
                {badge}
              </Badge>
            )}

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <GradientButton asChild>
                <a href={primaryCtaHref}>{primaryCtaLabel}</a>
              </GradientButton>

              {secondaryCtaLabel && secondaryCtaHref && (
                <GradientButton variant="variant" asChild>
                  <a href={secondaryCtaHref}>{secondaryCtaLabel}</a>
                </GradientButton>
              )}
            </div>
          </motion.div>
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
          min-height: 560px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-parallax-layers {
          position: relative;
          width: 100%;
        }

        .hero-kickers {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
          color: var(--muted);
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .hero-title {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(220px, 34vw) minmax(0, 1fr);
          align-items: center;
          width: 100%;
          text-align: center;
        }

        .hero-title-first,
        .hero-title-last {
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
          display: flex;
          justify-content: center;
          width: clamp(220px, 28vw, 360px);
          aspect-ratio: 3 / 4;
          left: clamp(12px, 1.8vw, 28px);
          z-index: 2;
        }

        @media (max-width: 767px) {
          .hero-stage {
            min-height: calc(100dvh - var(--mobile-header-height));
            justify-content: flex-start;
            padding: 56px 0 48px;
          }

          .hero-kickers {
            align-items: flex-start;
            margin-bottom: 28px;
          }

          .hero-kickers span:last-child {
            text-align: right;
          }

          .hero-title {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 28px;
          }

          .hero-title-first,
          .hero-title-last {
            text-align: left;
          }

          .hero-liquid-layer {
            width: min(42vw, 150px);
            aspect-ratio: 3 / 4;
            left: 0;
          }
        }

        @media (min-width: 1280px) {
          .hero-title {
            grid-template-columns: minmax(0, 1fr) minmax(260px, 28vw) minmax(0, 1fr);
          }
        }
      `}</style>
    </section>
  )
}
