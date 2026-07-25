import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshDistortMaterial } from '@react-three/drei'
import { content } from '../data/content'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function TiltCard({ index }) {
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  useFrame(({ pointer }) => {
    if (!meshRef.current) return
    if (hovered) {
      meshRef.current.rotation.x += (pointer.y * 0.1 - meshRef.current.rotation.x) * 0.05
      meshRef.current.rotation.y += (pointer.x * 0.1 - meshRef.current.rotation.y) * 0.05
    } else {
      meshRef.current.rotation.x += (-0.1 - meshRef.current.rotation.x) * 0.05
      meshRef.current.rotation.y += (0.2 - meshRef.current.rotation.y) * 0.05
    }
  })

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      position={[0, 0, 0]}
    >
      <boxGeometry args={[index === 0 ? 3 : 2, index === 0 ? 2 : 1.5, 0.2]} />
      <MeshDistortMaterial
        color="#141418"
        roughness={0.8}
        metalness={0.2}
        wireframe
        distort={0.05}
      />
    </mesh>
  )
}

import { useState } from 'react'

const styles = {
  section: {
    padding: '128px 0',
    background: 'var(--surface)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '20px',
  },
  card: {
    background: 'var(--bg)',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    overflow: 'hidden',
    transition: 'border-color 0.3s ease, transform 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
  },
  cardMedia: {
    height: '220px',
    background: 'var(--surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  cardCanvas: {
    width: '100%',
    height: '100%',
  },
  cardBody: {
    padding: '24px',
  },
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.125rem',
    fontWeight: 600,
    marginBottom: '8px',
    letterSpacing: '-0.02em',
  },
  cardDesc: {
    fontSize: '0.875rem',
    color: 'var(--muted)',
    lineHeight: 1.6,
    marginBottom: '16px',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  tag: {
    fontSize: '0.7rem',
    padding: '3px 8px',
    borderRadius: '100px',
    background: 'rgba(255,255,255,0.04)',
    color: 'var(--muted)',
    border: '1px solid var(--border)',
  },
  linkArrow: {
    color: 'var(--accent)',
    fontSize: '1.2rem',
    transition: 'transform 0.2s ease',
  },
}

export default function Portfolio() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useGSAP(() => {
    gsap.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="portfolio" ref={sectionRef} style={styles.section}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Portfolio</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '16px' }}>
            Selected Work
          </h2>
          <p style={{ color: 'var(--muted)', maxWidth: '40ch' }}>
            A curated selection of projects that showcase my skills and passion.
          </p>
        </div>

        <div style={styles.grid}>
          {content.projects.map((project, i) => (
            <a
              key={i}
              ref={(el) => cardsRef.current[i] = el}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,168,83,0.3)'
                e.currentTarget.style.transform = 'translateY(-6px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ ...styles.cardMedia, position: 'relative' }}>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '2.5rem', color: 'var(--accent)', opacity: 0.15,
                  fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.04em',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <div style={styles.cardBody}>
                <h3 style={styles.cardTitle}>{project.title}</h3>
                <p style={styles.cardDesc}>{project.description}</p>
                <div style={styles.tags}>
                  {project.tags.map((tag, j) => (
                    <span key={j} style={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
