import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'

function LiquidBlob() {
  const meshRef = useRef(null)

  useFrame(({ pointer, viewport }) => {
    if (!meshRef.current) return
    const tx = (pointer.x * viewport.width) / 10
    const ty = (pointer.y * viewport.height) / 10
    meshRef.current.position.x += (tx - meshRef.current.position.x) * 0.015
    meshRef.current.position.y += (-ty - meshRef.current.position.y) * 0.015
    meshRef.current.rotation.x += 0.002
    meshRef.current.rotation.y += 0.004
  })

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          color="#C24E2E"
          transmission={0.4}
          thickness={1.5}
          roughness={0.1}
          metalness={0}
          ior={1.25}
          chromaticAberration={0.02}
          backside
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  )
}

function Particles() {
  const count = 80
  const ref = useRef(null)

  const positions = useRef(new Float32Array(count * 3))
  if (!positions.current.length) {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 18
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 18
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3
    }
  }

  useFrame(({ pointer }) => {
    if (!ref.current) return
    ref.current.rotation.x += (pointer.y * 0.008 - ref.current.rotation.x) * 0.004
    ref.current.rotation.y += (pointer.x * 0.008 - ref.current.rotation.y) * 0.004
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#C24E2E"
        transparent
        opacity={0.12}
        sizeAttenuation
      />
    </points>
  )
}

import { useMemo } from 'react'

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
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={0.8} />
      <LiquidBlob />
      <Particles />
    </Canvas>
  )
}
