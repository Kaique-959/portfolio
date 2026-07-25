import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ExpandingSphere({ progress }) {
  const groupRef = useRef(null)
  const count = 180
  const innerCount = 60

  const outerVerts = useMemo(() => {
    const verts = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.2 + Math.random() * 0.3
      verts.push({
        ox: r * Math.sin(phi) * Math.cos(theta),
        oy: r * Math.sin(phi) * Math.sin(theta),
        oz: r * Math.cos(phi),
        dx: (Math.random() - 0.5) * 6,
        dy: (Math.random() - 0.5) * 6,
        dz: (Math.random() - 0.5) * 6,
        delay: Math.random() * 0.3,
      })
    }
    return verts
  }, [])

  const innerVerts = useMemo(() => {
    const verts = []
    for (let i = 0; i < innerCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 0.5 + Math.random() * 0.3
      verts.push({
        ox: r * Math.sin(phi) * Math.cos(theta),
        oy: r * Math.sin(phi) * Math.sin(theta),
        oz: r * Math.cos(phi),
        dx: (Math.random() - 0.5) * 3,
        dy: (Math.random() - 0.5) * 3,
        dz: (Math.random() - 0.5) * 3,
        delay: Math.random() * 0.2,
      })
    }
    return verts
  }, [])

  const allVerts = useMemo(() => [...outerVerts, ...innerVerts], [])

  const positions = useMemo(() => new Float32Array(allVerts.length * 3), [])
  const posRef = useRef(positions)

  useFrame(() => {
    const p = progress.current
    const arr = posRef.current
    allVerts.forEach((v, i) => {
      const eased = Math.min(1, Math.max(0, (p - v.delay) / (1 - v.delay)))
      const t = eased * eased * (3 - 2 * eased)
      arr[i * 3] = v.ox + v.dx * t
      arr[i * 3 + 1] = v.oy + v.dy * t
      arr[i * 3 + 2] = v.oz + v.dz * t
    })
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={allVerts.length}
            array={posRef.current}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#C24E2E"
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

export default function SphereReveal() {
  const sectionRef = useRef(null)
  const canvasWrapper = useRef(null)
  const textRef = useRef(null)
  const progress = useRef({ current: 0 })

  useGSAP(() => {
    const obj = { val: 0 }

    gsap.to(obj, {
      val: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'top 30%',
        scrub: 1,
        onUpdate: () => { progress.current = obj.val },
      },
    })

    gsap.fromTo(textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'top 20%',
          scrub: 0.5,
        },
      }
    )

    gsap.to(canvasWrapper.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 30%',
        end: 'top 0%',
        scrub: 0.5,
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      height: '120vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'var(--surface)',
    }}>
      <div ref={canvasWrapper} style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.8} />
          <ExpandingSphere progress={progress} />
        </Canvas>
      </div>

      <div ref={textRef} style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        opacity: 0,
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: '12px',
        }}>
          Habilidades
        </h2>
        <p style={{ color: 'var(--muted)', maxWidth: '40ch', margin: '0 auto' }}>
          O que eu faço de melhor
        </p>
      </div>
    </section>
  )
}
