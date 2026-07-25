import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function GradientBlob() {
  const meshRef = useRef(null)
  const clockRef = useRef(0)

  useFrame((state, delta) => {
    if (!meshRef.current) return
    clockRef.current += delta
    const t = clockRef.current * 0.3
    meshRef.current.rotation.x = Math.sin(t * 0.7) * 0.1
    meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.15
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.15
    const s = 1 + Math.sin(t * 0.3) * 0.05
    meshRef.current.scale.setScalar(s)
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 3]} />
      <meshPhysicalMaterial
        color="#2563EB"
        transparent
        opacity={0.06}
        roughness={0.1}
        metalness={0}
        wireframe
      />
    </mesh>
  )
}

function Particles() {
  const count = 120
  const ref = useRef(null)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3
      siz[i] = Math.random() * 2 + 1
    }
    return [pos, siz]
  }, [])

  useFrame(({ pointer }) => {
    if (!ref.current) return
    ref.current.rotation.x += (pointer.y * 0.01 - ref.current.rotation.x) * 0.005
    ref.current.rotation.y += (pointer.x * 0.01 - ref.current.rotation.y) * 0.005
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#2563EB"
        transparent
        opacity={0.15}
        sizeAttenuation
      />
    </points>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <ambientLight intensity={0.8} />
      <GradientBlob />
      <Particles />
    </Canvas>
  )
}
