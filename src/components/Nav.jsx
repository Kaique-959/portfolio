import { useState, useEffect } from 'react'
import { House, Wrench, FolderKanban, User, Mail } from 'lucide-react'
import { IconBar, IconBarItem } from '@/components/ui/icon-bar'
import { navLinks } from '../data/content'

const icons = [House, Wrench, FolderKanban, User, Mail]

export default function Nav() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    navLinks.forEach((link) => {
      const el = document.getElementById(link.href.slice(1))
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleClick = (href) => {
    const el = document.getElementById(href.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      display: 'flex', justifyContent: 'center',
      padding: '0 24px 24px', zIndex: 1000, pointerEvents: 'none',
    }}>
      <div style={{ pointerEvents: 'auto' }}>
        <IconBar value={activeSection} onValueChange={setActiveSection}>
          {navLinks.map((link, i) => (
            <IconBarItem
              key={link.href}
              icon={icons[i]}
              label={link.label}
              value={link.href.slice(1)}
              onClick={() => handleClick(link.href)}
            />
          ))}
        </IconBar>
      </div>
    </div>
  )
}
