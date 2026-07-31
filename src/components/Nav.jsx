import { useState, useEffect, useRef } from 'react'
import { House, Wrench, User, FolderKanban, Mail, Menu, X } from 'lucide-react'
import { navLinks } from '../data/content'

const icons = [House, Wrench, User, FolderKanban, Mail]

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Nav() {
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    const entries = navLinks.map((link) => {
      const el = document.getElementById(link.href.slice(1))
      return el ? { id: link.href.slice(1), el } : null
    }).filter(Boolean)

    const observer = new IntersectionObserver(
      (items) => {
        items.forEach((item) => {
          if (item.isIntersecting) {
            setActiveSection(item.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    entries.forEach(({ el }) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!mobileOpen) return undefined

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKey)
    }
  }, [mobileOpen])

  useEffect(() => {
    if (mobileOpen) {
      const firstButton = menuRef.current?.querySelector('button, a')
      firstButton?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleNav = (href) => {
    setMobileOpen(false)
    scrollToId(href.slice(1))
  }

  return (
    <header
      className="nav-header nav-desktop"
      style={{ pointerEvents: 'auto' }}
      aria-label="Navegação principal"
    >
      <div className="nav-pill glass">
        <nav aria-label="Navegação desktop" className="nav-inner">
          {navLinks.map((link, i) => {
            const id = link.href.slice(1)
            const isActive = activeSection === id
            const Icon = icons[i]
            return (
              <a
                key={link.href}
                href={`#${id}`}
                className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  handleNav(link.href)
                }}
              >
                <Icon aria-hidden className="size-[18px] stroke-[1.5]" />

                <span className="nav-label" aria-hidden="true">
                  <span className="nav-label-track">
                    <span>{link.label}</span>
                    <span>{link.label}</span>
                  </span>
                </span>
              </a>
            )
          })}

          <a
            href="#contact"
            className="nav-contact"
            aria-current={activeSection === 'contact' ? 'location' : undefined}
            onClick={(event) => {
              event.preventDefault()
              handleNav('#contact')
            }}
          >
            <Mail aria-hidden className="size-[18px] stroke-[1.5]" />
            <span>Contato</span>
          </a>
        </nav>
      </div>

      <header className="nav-mobile-header" aria-label="Navegação mobile">
        <span className="nav-brand">Kaique Calefi</span>
        <button
          ref={triggerRef}
          type="button"
          className="nav-menu-button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? (
            <X aria-hidden className="size-[22px]" />
          ) : (
            <Menu aria-hidden className="size-[22px]" />
          )}
          <span className="sr-only">{mobileOpen ? 'Fechar menu' : 'Abrir menu'}</span>
        </button>
      </header>

      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          ref={menuRef}
          className="nav-mobile-panel"
          role="dialog"
          aria-label="Menu de navegação"
        >
          <nav className="nav-mobile-list" aria-label="Navegação mobile">
            {navLinks.map((link, i) => {
              const id = link.href.slice(1)
              const isActive = activeSection === id
              const Icon = icons[i]
              return (
                <a
                  key={link.href}
                  href={`#${id}`}
                  className={`nav-mobile-link ${isActive ? 'nav-mobile-link-active' : ''}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    handleNav(link.href)
                  }}
                >
                  <Icon aria-hidden className="size-[18px] stroke-[1.5]" />
                  {link.label}
                </a>
              )
            })}

            <a
              href="#contact"
              className="nav-mobile-link nav-mobile-contact"
              aria-current={activeSection === 'contact' ? 'location' : undefined}
              onClick={(event) => {
                event.preventDefault()
                handleNav('#contact')
              }}
            >
              <Mail aria-hidden className="size-[18px] stroke-[1.5]" />
              Contato
            </a>
          </nav>
        </div>
      )}

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

        .nav-header {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          padding: 0 24px calc(24px + env(safe-area-inset-bottom, 0px));
          z-index: 1000;
          pointer-events: none;
        }

        .nav-pill {
          pointer-events: auto;
          width: min(100%, 860px);
          border-radius: 999px;
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 10px 10px 14px;
        }

        .nav-item {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          color: var(--muted);
          transition:
            color 200ms,
            background-color 200ms;
        }

        .nav-item:hover,
        .nav-item:focus-visible {
          background-color: rgba(20, 20, 20, 0.08);
          color: var(--fg);
        }

        .nav-item-active,
        .nav-item[aria-current="location"] {
          background-color: var(--fg);
          color: #fff;
        }

        .nav-label {
          height: 1.25em;
          overflow: hidden;
        }

        .nav-label-track {
          display: flex;
          flex-direction: column;
          transition: transform 400ms cubic-bezier(0.21, 0.6, 0.35, 1);
        }

        .nav-item:hover .nav-label-track,
        .nav-item:focus-visible .nav-label-track,
        .nav-item-active .nav-label-track,
        .nav-item[aria-current="location"] .nav-label-track {
          transform: translateY(-50%);
        }

        .nav-item-active .nav-label-track,
        .nav-item[aria-current="location"] .nav-label-track {
          color: #fff;
        }

        .nav-contact {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-left: 6px;
          padding: 10px 16px;
          border-radius: 999px;
          background-color: #c24e2e;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          box-shadow:
            0 4px 16px rgba(194, 78, 46, 0.24),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: transform 180ms ease, box-shadow 240ms ease;
        }

        .nav-contact:hover,
        .nav-contact:focus-visible {
          transform: translateY(-1px);
          box-shadow:
            0 8px 24px rgba(194, 78, 46, 0.32),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }

        .nav-mobile-header,
        .nav-mobile-panel {
          display: none;
        }

        @media (max-width: 767px) {
          .nav-desktop {
            display: none !important;
          }

          .nav-mobile-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: var(--mobile-header-height);
            padding: 0 16px;
            background-color: #141414;
            color: #fff;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }

          .nav-brand {
            font-family: var(--font-display);
            font-weight: 800;
            font-size: 1rem;
            letter-spacing: -0.02em;
          }

          .nav-menu-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background-color: rgba(255, 255, 255, 0.08);
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.12);
            transition: background-color 200ms;
          }

          .nav-menu-button:hover,
          .nav-menu-button:focus-visible {
            background-color: rgba(255, 255, 255, 0.14);
          }

          .nav-mobile-panel {
            display: block;
            position: fixed;
            top: var(--mobile-header-height);
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999;
            background: rgba(20, 20, 20, 0.96);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            padding: 24px;
            overflow-y: auto;
          }

          .nav-mobile-list {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .nav-mobile-link {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 16px 16px;
            border-radius: 16px;
            font-size: 1rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.06);
            background: rgba(255, 255, 255, 0.04);
            transition: background 200ms, color 200ms;
          }

          .nav-mobile-link:hover,
          .nav-mobile-link:focus-visible {
            background: rgba(255, 255, 255, 0.08);
            color: #fff;
          }

          .nav-mobile-link-active,
          .nav-mobile-link[aria-current="location"] {
            background: rgba(194, 78, 46, 0.16);
            border-color: rgba(194, 78, 46, 0.3);
            color: #fff;
          }

          .nav-mobile-contact {
            margin-top: 12px;
            background-color: #c24e2e;
            border-color: transparent;
            color: #fff;
            font-weight: 600;
          }
        }
      `}</style>
    </header>
  )
}
