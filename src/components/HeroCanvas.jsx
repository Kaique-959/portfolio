import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function TorusKnot() {
  const meshRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useFrame(({ pointer, viewport }) => {
    if (!meshRef.current) return

    const targetX = (pointer.x * viewport.width) / 6
    const targetY = (pointer.y * viewport.height) / 6

    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.02
    meshRef.current.position.y += (-targetY - meshRef.current.position.y) * 0.02
    meshRef.current.rotation.x += 0.003
    meshRef.current.rotation.y += 0.006
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.35, 200, 32]} />
        <MeshDistortMaterial
          color="#d4a853"
          roughness={0.3}
          metalness={0.9}
          emissive="#d4a853"
          emissiveIntensity={0.15}
          distort={0.15}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

function Particles() {
  const count = 400
  const particlesRef = useRef(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
    }
    return pos
  }, [])

  useFrame(({ pointer }) => {
    if (!particlesRef.current) return
    particlesRef.current.rotation.x += (pointer.y * 0.02 - particlesRef.current.rotation.x) * 0.01
    particlesRef.current.rotation.y += (pointer.x * 0.02 - particlesRef.current.rotation.y) * 0.01
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#d4a853"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '60%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#d4a853" />
      <pointLight position={[-3, -3, 2]} intensity={0.5} color="#ffffff" />
      <TorusKnot />
      <Particles />
    </Canvas>
  )
}
