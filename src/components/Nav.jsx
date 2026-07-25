import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { navLinks } from '../data/content'

export default function Nav() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const sections = navLinks.map(l => document.getElementById(l.href.slice(1))).filter(Boolean)
      let current = ''
      sections.forEach((sec) => {
        if (sec.getBoundingClientRect().top < 200) current = sec.id
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const isHome = active === 'hero' || active === ''

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      display: 'flex', justifyContent: 'center',
      padding: '0 24px 24px', zIndex: 1000, pointerEvents: 'none',
    }}>
      <nav style={{
        display: 'flex', alignItems: 'center', gap: '4px',
        padding: '6px 8px',
        background: 'rgba(250,250,248,0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--glass-border)',
        borderRadius: '100px',
        pointerEvents: 'auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      }}>
        {navLinks.map((link) => {
          const isActive = active === link.href.slice(1) || (link.href === '#hero' && isHome)
          return (
            <motion.button
              key={link.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo(link.href.slice(1))}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px', fontSize: '0.85rem', fontWeight: 500,
                color: isActive ? 'white' : 'var(--muted)',
                borderRadius: '100px', cursor: 'pointer',
                background: isActive ? 'var(--fg)' : 'transparent',
                border: 'none', fontFamily: 'var(--font-body)',
                transition: 'color 0.2s ease, background 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'var(--surface)'
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent'
              }}
            >
              {link.label === 'Início' && <span style={{ fontSize: '1.1em' }}>⌂</span>}
              {link.label}
            </motion.button>
          )
        })}
      </nav>
    </div>
  )
}
