import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function FooterMarquee() {
  const ref = useRef(null)

  useGSAP(() => {
    if (!ref.current) return
    const doubled = document.createElement('div')
    doubled.innerHTML = ref.current.innerHTML
    ref.current.parentNode.appendChild(doubled)

    const total = ref.current.scrollWidth
    gsap.to(ref.current, {
      x: -total,
      ease: 'none',
      duration: 20,
      repeat: -1,
    })
  }, { scope: ref })

  return (
    <div style={{
      overflow: 'hidden',
      padding: '40px 0',
      borderTop: '1px solid var(--border)',
      marginBottom: '40px',
    }}>
      <div ref={ref} style={{
        display: 'flex',
        gap: '0',
        width: 'max-content',
        whiteSpace: 'nowrap',
        fontSize: '1.8rem',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--fg)',
        paddingLeft: '24px',
      }}>
        <span>Vamos trabalhar juntos</span>
        <span style={{
          color: 'var(--accent)',
          margin: '0 32px',
        }}>✦</span>
        <span>Vamos trabalhar juntos</span>
        <span style={{
          color: 'var(--accent)',
          margin: '0 32px',
        }}>✦</span>
        <span>Vamos trabalhar juntos</span>
        <span style={{
          color: 'var(--accent)',
          margin: '0 32px',
        }}>✦</span>
        <span>Vamos trabalhar juntos</span>
        <span style={{
          color: 'var(--accent)',
          margin: '0 32px',
        }}>✦</span>
        <span>Vamos trabalhar juntos</span>
      </div>
    </div>
  )
}
