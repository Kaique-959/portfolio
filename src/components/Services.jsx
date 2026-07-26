import { Globe, MessageCircle, GitBranch, Search, Layout, Code, Server, Lightbulb } from 'lucide-react'
import { AnimatedTabs } from '@/components/ui/animated-tabs'
import { content } from '../data/content'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const icons = [
  <Globe size={32} />,
  <MessageCircle size={32} />,
  <GitBranch size={32} />,
  <Search size={32} />,
  <Layout size={32} />,
  <Code size={32} />,
  <Server size={32} />,
  <Lightbulb size={32} />,
]

export default function Services() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current, start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: sectionRef })

  const tabs = content.services.map((service, i) => ({
    id: service.title,
    label: `${String(i + 1).padStart(2, '0')}. ${service.title}`,
    icon: icons[i % icons.length],
    content: (
      <div className="grid grid-cols-5 gap-6 items-start">
        <div className="col-span-2 flex items-center justify-center" style={{
          aspectRatio: '1/1',
          background: '#F2F2F0',
          borderRadius: '12px',
          border: '1px solid #E5E5E2',
          color: '#C24E2E',
          minHeight: '200px',
        }}>
          {icons[i % icons.length]}
        </div>
        <div className="col-span-3">
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#C24E2E',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            display: 'block',
            marginBottom: '8px',
          }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem', fontWeight: 600,
            color: '#141414', marginBottom: '12px',
          }}>
            {service.title}
          </h3>
          <p style={{ color: '#71717A', lineHeight: 1.7, marginBottom: '20px' }}>
            {service.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {service.tags.map((tag, j) => (
              <span key={j} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  }))

  return (
    <section id="services" ref={sectionRef} className="section" style={{ background: '#F2F2F0' }}>
      <div className="container">
        <div ref={headerRef} style={{ marginBottom: '40px' }}>
          <span className="eyebrow">/ Habilidades</span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1,
          }}>
            O que eu faço
          </h2>
        </div>

        <AnimatedTabs tabs={tabs} />
      </div>
    </section>
  )
}
