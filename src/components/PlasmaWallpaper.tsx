import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group, Mesh } from 'three'

interface TreeConfig {
  position: [number, number, number]
  trunkHeight: number
  trunkRadius: number
  canopyHeight: number
  canopyRadius: number
  rotationY: number
  hue: number
  accentHue: number
  swaySpeed: number
  swayAmount: number
}

const pseudoRandom = (seed: number): number => {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function PineForest() {
  const treeRefs = useRef<Array<Group | null>>([])

  const trees = useMemo<TreeConfig[]>(
    () =>
      Array.from({ length: 42 }, (_, index) => {
        const lane = Math.floor(index / 7)
        const column = index % 7
        const jitter = pseudoRandom(index + 0.33)

        const x = (column - 3) * 2.65 + (lane % 2 === 0 ? 0.52 : -0.52) + (jitter - 0.5) * 0.45
        const y = -2.78
        const z = -2.1 - lane * 1.55

        const canopyScale = 0.85 + pseudoRandom(index + 1.15) * 0.9
        const canopyHeight = 2.6 + pseudoRandom(index + 2.11) * 1.8

        return {
          position: [x, y, z],
          trunkHeight: 0.42 + pseudoRandom(index + 2.91) * 0.35,
          trunkRadius: 0.08 + pseudoRandom(index + 3.27) * 0.06,
          canopyHeight,
          canopyRadius: canopyScale,
          rotationY: pseudoRandom(index + 4.02) * Math.PI,
          hue: 120 + pseudoRandom(index + 4.73) * 12,
          accentHue: 205 + pseudoRandom(index + 5.31) * 70,
          swaySpeed: 0.16 + pseudoRandom(index + 6.04) * 0.12,
          swayAmount: 0.02 + pseudoRandom(index + 6.88) * 0.018,
        }
      }),
    [],
  )

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime

    treeRefs.current.forEach((tree, index) => {
      if (!tree) {
        return
      }

      const config = trees[index]
      const swayBase = elapsed * config.swaySpeed + index * 0.41

      tree.position.y = config.position[1]
      tree.rotation.z = Math.sin(swayBase) * config.swayAmount
      tree.rotation.y = config.rotationY + Math.sin(elapsed * 0.07 + index) * 0.012
    })
  })

  return (
    <group>
      <mesh position={[0, -2.75, -6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[92, 92]} />
        <meshStandardMaterial color="#020617" metalness={0.03} roughness={1} />
      </mesh>

      {trees.map((config, index) => (
        <group
          key={index}
          ref={(node) => {
            treeRefs.current[index] = node
          }}
          position={config.position}
          rotation={[0, config.rotationY, 0]}
        >
          <mesh position={[0, config.trunkHeight * 0.5, 0]}>
            <cylinderGeometry args={[config.trunkRadius * 0.7, config.trunkRadius, config.trunkHeight, 6]} />
            <meshStandardMaterial color="#1b2b26" roughness={0.92} metalness={0.02} />
          </mesh>

          <mesh position={[0, config.trunkHeight + config.canopyHeight * 0.45, 0]}>
            <coneGeometry args={[config.canopyRadius, config.canopyHeight, 6]} />
            <meshStandardMaterial
              color={`hsl(${config.hue} 48% 31%)`}
              emissive={`hsl(${config.accentHue} 55% 13%)`}
              emissiveIntensity={0.22}
              flatShading
              roughness={0.86}
              metalness={0.08}
            />
          </mesh>

          <mesh position={[0, config.trunkHeight + config.canopyHeight * 0.78, 0]}>
            <coneGeometry args={[config.canopyRadius * 0.72, config.canopyHeight * 0.72, 6]} />
            <meshStandardMaterial
              color={`hsl(${config.hue} 44% 38%)`}
              emissive={`hsl(${config.accentHue + 12} 65% 10%)`}
              emissiveIntensity={0.18}
              flatShading
              roughness={0.84}
              metalness={0.08}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function DriftingMoon() {
  const moonRef = useRef<Mesh>(null)

  useFrame((state) => {
    const moon = moonRef.current
    if (!moon) {
      return
    }

    const drift = state.clock.elapsedTime
    moon.position.x = 7.4 + Math.sin(drift * 0.055) * 0.46
    moon.position.y = 4.05 + Math.cos(drift * 0.048) * 0.34
    moon.rotation.y += 0.0009
  })

  return (
    <mesh ref={moonRef} position={[7.4, 5.1, -13.2]}>
      <icosahedronGeometry args={[0.92, 1]} />
      <meshStandardMaterial
        color="#dbeafe"
        emissive="#a78bfa"
        emissiveIntensity={0.38}
        flatShading
        roughness={0.62}
        metalness={0.14}
      />
    </mesh>
  )
}

export function PlasmaWallpaper() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas camera={{ position: [0, 2.2, 8], fov: 54 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 8, 34]} />
        <ambientLight intensity={0.24} />
        <hemisphereLight color="#9dd8ff" groundColor="#111827" intensity={0.58} />
        <directionalLight position={[4, 8, 7]} color="#a78bfa" intensity={1.08} />
        <pointLight position={[-7, 2, -2]} color="#22d3ee" intensity={1.52} />
        <pointLight position={[5.5, 4.8, -10]} color="#60a5fa" intensity={0.86} />
        <PineForest />
        <DriftingMoon />
      </Canvas>
    </div>
  )
}
