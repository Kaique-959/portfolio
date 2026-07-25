"use client"

import { useRef } from 'react'
import { LiquidMetal } from '@paper-design/shaders-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function LiquidMetalHero({
  badge, firstName, lastName, kickerLeft, kickerRight,
  primaryCtaLabel, secondaryCtaLabel,
  onPrimaryCtaClick, onSecondaryCtaClick,
}) {
  const cardRef = useRef(null)
  const sectionRef = useRef(null)

  useGSAP(() => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      scale: 1.05,
      y: 15,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, { scope: sectionRef })

  const h1style = {
    fontFamily: 'var(--font-display)',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '-0.06em',
    lineHeight: 0.85,
    fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
    color: 'var(--fg)',
  }

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl w-full">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(24px, 4vw, 64px)',
            width: '100%',
          }}>
            <motion.div style={{
              flex: '1 1 0',
              textAlign: 'right',
              minWidth: 0,
              overflow: 'visible',
            }} variants={itemVariants}>
              <p className="text-sm text-muted font-medium tracking-wide mb-2">{kickerLeft}</p>
              <h1 style={h1style}>{firstName}</h1>
            </motion.div>

            <motion.div style={{
              flex: '0 0 auto',
              display: 'flex',
              justifyContent: 'center',
            }} variants={itemVariants}>
              <div ref={cardRef} style={{
                width: 'clamp(120px, 25vw, 300px)',
                aspectRatio: '3/4',
                borderRadius: '16px',
                overflow: 'hidden',
              }}>
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
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </motion.div>

            <motion.div style={{
              flex: '1 1 0',
              textAlign: 'left',
              minWidth: 0,
              overflow: 'visible',
            }} variants={itemVariants}>
              <p className="text-sm text-muted font-medium tracking-wide mb-2">{kickerRight}</p>
              <h1 style={h1style}>{lastName}</h1>
            </motion.div>
          </div>

          <motion.div className="flex flex-col items-center gap-6 mt-12" variants={itemVariants}>
            {badge && (
              <Badge variant="outline" className="text-foreground border-border bg-background/60 backdrop-blur-sm">
                {badge}
              </Badge>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={onPrimaryCtaClick} size="lg" className="bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-2xl text-lg px-8 py-6 font-semibold">
                  {primaryCtaLabel}
                </Button>
              </motion.div>
              {secondaryCtaLabel && onSecondaryCtaClick && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={onSecondaryCtaClick} variant="outline" size="lg" className="border-border text-foreground hover:bg-foreground/10 hover:border-foreground/50 transition-all duration-300 backdrop-blur-sm text-lg px-8 py-6 font-semibold">
                    {secondaryCtaLabel}
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
