import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Mesh } from 'three'

interface PeakConfig {
  position: [number, number, number]
  scale: [number, number, number]
  rotationY: number
  hue: number
  driftSpeed: number
}

const pseudoRandom = (seed: number): number => {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function LowPolyLandscape() {
  const peakRefs = useRef<Array<Mesh | null>>([])

  const peaks = useMemo<PeakConfig[]>(
    () =>
      Array.from({ length: 42 }, (_, index) => {
        const lane = Math.floor(index / 7)
        const column = index % 7

        const x = (column - 3) * 2.6 + (lane % 2 === 0 ? 0.6 : -0.6)
        const y = -1.5 - lane * 0.25
        const z = -2 - lane * 1.6
        const scaleBase = 0.8 + pseudoRandom(index + 0.17) * 1.4

        return {
          position: [x, y, z],
          scale: [scaleBase, 1.6 + pseudoRandom(index + 1.43) * 2.2, scaleBase],
          rotationY: pseudoRandom(index + 2.71) * Math.PI,
          hue: 200 + pseudoRandom(index + 3.11) * 90,
          driftSpeed: 0.1 + pseudoRandom(index + 4.83) * 0.18,
        }
      }),
    [],
  )

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime

    peakRefs.current.forEach((peak, index) => {
      if (!peak) {
        return
      }

      const config = peaks[index]
      peak.position.y = config.position[1] + Math.sin(elapsed * config.driftSpeed + index) * 0.08
      peak.rotation.y += 0.0008
    })
  })

  return (
    <group>
      <mesh position={[0, -2.6, -6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#020617" metalness={0.05} roughness={1} />
      </mesh>

      {peaks.map((config, index) => (
        <mesh
          key={index}
          ref={(node) => {
            peakRefs.current[index] = node
          }}
          position={config.position}
          scale={config.scale}
          rotation={[0, config.rotationY, 0]}
        >
          <coneGeometry args={[1, 1.8, 4]} />
          <meshStandardMaterial
            color={`hsl(${config.hue} 70% 42%)`}
            flatShading
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

function OrbitingMoon() {
  const moonRef = useRef<Mesh>(null)

  useFrame((state) => {
    const moon = moonRef.current
    if (!moon) {
      return
    }

    const orbit = state.clock.elapsedTime * 0.1
    moon.position.x = Math.sin(orbit) * 8.5
    moon.position.y = 3.8 + Math.cos(orbit) * 1.4
    moon.rotation.y += 0.003
  })

  return (
    <mesh ref={moonRef} position={[7, 4.4, -13]}>
      <icosahedronGeometry args={[0.65, 1]} />
      <meshStandardMaterial color="#e0f2fe" emissive="#7dd3fc" emissiveIntensity={0.45} flatShading />
    </mesh>
  )
}

export function PlasmaWallpaper() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas camera={{ position: [0, 2.2, 8], fov: 54 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 8, 34]} />
        <ambientLight intensity={0.25} />
        <hemisphereLight color="#bae6fd" groundColor="#1e1b4b" intensity={0.5} />
        <directionalLight position={[4, 8, 7]} color="#a78bfa" intensity={1.1} />
        <pointLight position={[-7, 2, -2]} color="#22d3ee" intensity={1.8} />
        <LowPolyLandscape />
        <OrbitingMoon />
      </Canvas>
    </div>
  )
}
