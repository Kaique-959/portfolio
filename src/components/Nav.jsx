import { useState, useEffect } from 'react'
import { navLinks } from '../data/content'

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    padding: '16px 24px 0',
    pointerEvents: 'none',
  },
  pill: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '720px',
    padding: '8px 24px',
    background: 'rgba(10, 10, 10, 0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '100px',
    pointerEvents: 'auto',
    transition: 'border-color 0.3s ease, background 0.3s ease',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.125rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: 'var(--fg)',
  },
  logoAccent: {
    color: 'var(--accent)',
  },
  links: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  link: {
    fontSize: '0.875rem',
    color: 'var(--muted)',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-body)',
  },
  cta: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--bg)',
    background: 'var(--accent)',
    padding: '6px 16px',
    borderRadius: '100px',
    transition: 'background 0.2s ease, transform 0.2s ease',
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'var(--font-body)',
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: '5px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: '4px',
  },
  hamburgerLine: (open) => ({
    width: '22px',
    height: '2px',
    background: 'var(--fg)',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
    transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none',
  }),
  hamburgerLine2: (open) => ({
    width: '22px',
    height: '2px',
    background: 'var(--fg)',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
    opacity: open ? 0 : 1,
  }),
  hamburgerLine3: (open) => ({
    width: '22px',
    height: '2px',
    background: 'var(--fg)',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
    transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
  }),
  mobileMenu: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(10,10,10,0.98)',
    backdropFilter: 'blur(30px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32px',
    zIndex: 999,
    transition: 'opacity 0.3s ease',
  },
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav style={styles.nav}>
        <div style={{
          ...styles.pill,
          borderColor: scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
          background: scrolled ? 'rgba(10,10,10,0.9)' : 'rgba(10,10,10,0.8)',
        }}>
          <span style={styles.logo}>
            KC<span style={styles.logoAccent}>.</span>
          </span>

          <div style={{
            ...styles.links,
            display: window.innerWidth < 768 ? 'none' : 'flex',
          }}>
            {navLinks.map((link) => (
              <button
                key={link.href}
                style={styles.link}
                onClick={() => scrollTo(link.href.slice(1))}
                onMouseEnter={(e) => e.target.style.color = 'var(--fg)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--muted)'}
              >
                {link.label}
              </button>
            ))}
            <button
              style={styles.cta}
              onClick={() => scrollTo('contact')}
              onMouseEnter={(e) => e.target.style.background = 'var(--accent-hover)'}
              onMouseLeave={(e) => e.target.style.background = 'var(--accent)'}
            >
              Let's talk
            </button>
          </div>

          <button
            style={styles.hamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span style={styles.hamburgerLine(mobileOpen)} />
            <span style={styles.hamburgerLine2(mobileOpen)} />
            <span style={styles.hamburgerLine3(mobileOpen)} />
          </button>
        </div>
      </nav>

      <div style={{
        ...styles.mobileMenu,
        opacity: mobileOpen ? 1 : 0,
        pointerEvents: mobileOpen ? 'auto' : 'none',
      }}>
        {navLinks.map((link) => (
          <button
            key={link.href}
            style={{
              ...styles.link,
              fontSize: '1.5rem',
              color: 'var(--fg)',
            }}
            onClick={() => scrollTo(link.href.slice(1))}
          >
            {link.label}
          </button>
        ))}
        <button
          style={{ ...styles.cta, padding: '12px 32px', fontSize: '1rem' }}
          onClick={() => scrollTo('contact')}
        >
          Let's talk
        </button>
      </div>
    </>
  )
}
