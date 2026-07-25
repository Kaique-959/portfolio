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
  const bgRef = useRef(null)
  const sectionRef = useRef(null)

  useGSAP(() => {
    if (!bgRef.current) return

    gsap.to(bgRef.current, {
      scale: 1.4,
      x: '25%',
      y: '15%',
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 z-[-10] will-change-transform">
        <LiquidMetal
          colorBack="#E8E4DC"
          colorTint="#C24E2E"
          shape="metaballs"
          repetition={3}
          softness={0.5}
          distortion={0.07}
          contour={0.4}
          angle={70}
          speed={0.3}
          scale={0.6}
          fit="cover"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/70 z-[-5]" />

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <motion.div className="flex flex-col items-center" variants={containerVariants} initial="hidden" animate="visible">
          <div className="relative grid grid-cols-2 gap-8 md:gap-16 w-full max-w-4xl mb-8">
            <motion.div className="text-right" variants={itemVariants}>
              <p className="text-sm text-muted font-medium tracking-wide mb-2">{kickerLeft}</p>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-none tracking-tight">
                {firstName}
              </h1>
            </motion.div>



            <motion.div className="text-left" variants={itemVariants}>
              <p className="text-sm text-muted font-medium tracking-wide mb-2">{kickerRight}</p>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-none tracking-tight">
                {lastName}
              </h1>
            </motion.div>
          </div>

          <motion.div className="flex flex-col items-center gap-6 mt-4" variants={itemVariants}>
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
