import { Globe, MessageCircle, GitBranch, Search, Layout, Code, Server, Lightbulb } from 'lucide-react'
import { HoverSlider, HoverSliderImageWrap, TextStaggerHover, useHoverSliderContext } from '@/components/ui/animated-slideshow'
import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const icons = [Globe, MessageCircle, GitBranch, Search, Layout, Code, Server, Lightbulb]

const panelGradients = [
  'linear-gradient(135deg, #C24E2E 0%, #E8A87C 100%)',
  'linear-gradient(135deg, #141414 0%, #71717A 100%)',
  'linear-gradient(135deg, #C24E2E 0%, #E5E5E2 100%)',
  'linear-gradient(135deg, #141414 0%, #C24E2E 100%)',
  'linear-gradient(135deg, #E5E5E2 0%, #C24E2E 100%)',
  'linear-gradient(135deg, #71717A 0%, #141414 100%)',
  'linear-gradient(135deg, #C24E2E 0%, #71717A 100%)',
  'linear-gradient(135deg, #141414 0%, #E8A87C 100%)',
]

const clipPathVariants = {
  visible: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
  hidden: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)' },
}

function GradientPanel({ gradient, icon: Icon }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      borderRadius: '12px', background: gradient,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon size={64} color="white" opacity={0.25} />
    </div>
  )
}

function SlidePanel({ index, gradient, icon }) {
  const { activeSlide } = useHoverSliderContext()
  return (
    <motion.div
      variants={clipPathVariants}
      animate={activeSlide === index ? 'visible' : 'hidden'}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      style={{ gridRow: 1, gridColumn: 1 }}
    >
      <GradientPanel gradient={gradient} icon={icon} />
    </motion.div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (!isTouch) return
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % content.services.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useGSAP(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current, start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="services" ref={sectionRef} style={{ padding: '100px 0', background: '#FAFAF8' }}>
      <div className="container">
        <div ref={headerRef} style={{ marginBottom: '48px' }}>
          <span style={{
            fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: '#C24E2E', marginBottom: '8px', display: 'block',
          }}>
            / Habilidades
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1,
          }}>
            O que eu faço
          </h2>
        </div>

        <HoverSlider
          activeSlide={activeSlide}
          onSlideChange={setActiveSlide}
          className="flex flex-wrap items-center justify-evenly gap-6 md:gap-12"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {content.services.map((service, index) => (
              <TextStaggerHover
                key={service.title}
                index={index}
                className="text-3xl md:text-4xl font-bold uppercase tracking-tighter"
                text={service.title}
              />
            ))}
          </div>

          <HoverSliderImageWrap style={{ width: '400px', height: '500px', flexShrink: 0 }}>
            {content.services.map((service, index) => (
              <SlidePanel
                key={service.title}
                index={index}
                gradient={panelGradients[index]}
                icon={icons[index]}
              />
            ))}
          </HoverSliderImageWrap>
        </HoverSlider>
      </div>
    </section>
  )
}
