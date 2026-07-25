import { useState, useEffect } from 'react'
import { navLinks } from '../data/content'

const styles = {
  wrapper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    padding: '0 24px 24px',
    zIndex: 1000,
    pointerEvents: 'none',
  },
  pill: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 8px',
    background: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid var(--border)',
    borderRadius: '100px',
    pointerEvents: 'auto',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  link: {
    padding: '8px 16px',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'var(--muted)',
    borderRadius: '100px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-body)',
  },
  linkActive: {
    background: 'var(--fg)',
    color: 'white',
  },
}

export default function Nav() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const sections = navLinks.map(l => document.getElementById(l.href.slice(1))).filter(Boolean)
      let current = ''
      sections.forEach((sec) => {
        const top = sec.getBoundingClientRect().top
        if (top < 200) current = sec.id
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

  return (
    <div style={styles.wrapper}>
      <nav style={styles.pill}>
        {navLinks.map((link) => (
          <button
            key={link.href}
            style={{
              ...styles.link,
              ...(active === link.href.slice(1) ? styles.linkActive : {}),
            }}
            onClick={() => scrollTo(link.href.slice(1))}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
