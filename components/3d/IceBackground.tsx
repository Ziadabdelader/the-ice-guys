'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Optimized cold smoke particles - continuous flowing animation
function ColdSmokeParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const velocitiesRef = useRef<Float32Array>()

  const { positions, sizes, opacities } = useMemo(() => {
    const count = 80 // Reduced for better performance
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const opacities = new Float32Array(count)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Start particles at bottom, spread across width
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = Math.random() * -3 - 2 // Start from bottom
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
      
      sizes[i] = Math.random() * 0.4 + 0.2
      opacities[i] = Math.random() * 0.3 + 0.1
      
      // Velocity for continuous upward flow
      velocities[i * 3] = (Math.random() - 0.5) * 0.01 // Slight horizontal drift
      velocities[i * 3 + 1] = Math.random() * 0.015 + 0.01 // Upward movement
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005
    }
    
    velocitiesRef.current = velocities
    return { positions, sizes, opacities }
  }, [])

  useFrame((state) => {
    if (!particlesRef.current || !velocitiesRef.current) return
    
    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array
    const vel = velocitiesRef.current
    const t = state.clock.getElapsedTime()

    for (let i = 0; i < 80; i++) {
      // Continuous upward flow with slight wave motion
      pos[i * 3] += vel[i * 3] + Math.sin(t * 0.5 + i) * 0.002
      pos[i * 3 + 1] += vel[i * 3 + 1]
      pos[i * 3 + 2] += vel[i * 3 + 2] + Math.cos(t * 0.3 + i) * 0.002

      // Reset particle when it goes too high (continuous loop)
      if (pos[i * 3 + 1] > 4) {
        pos[i * 3] = (Math.random() - 0.5) * 12
        pos[i * 3 + 1] = -3
        pos[i * 3 + 2] = (Math.random() - 0.5) * 6
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={80}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={80}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        color="#a8d8f0"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={createSmokeTexture()}
      />
    </points>
  )
}

// Create soft circular smoke texture
function createSmokeTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.6)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

// Subtle floating ice crystals
function IceCrystals() {
  const crystalsRef = useRef<THREE.Points>(null)

  const { positions, sizes } = useMemo(() => {
    const count = 40
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
      sizes[i] = Math.random() * 0.05 + 0.02
    }
    return { positions, sizes }
  }, [])

  useFrame((state) => {
    if (!crystalsRef.current) return
    const t = state.clock.getElapsedTime()
    
    crystalsRef.current.rotation.y = t * 0.05
    
    const pos = crystalsRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < 40; i++) {
      pos[i * 3 + 1] += Math.sin(t + i) * 0.0005
    }
    crystalsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={crystalsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={40}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Optimized scene with minimal lighting
function Scene() {
  return (
    <>
      {/* Minimal lighting for performance */}
      <ambientLight intensity={0.4} color="#a8d8f0" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      
      {/* Cold smoke effect */}
      <ColdSmokeParticles />
      
      {/* Subtle ice crystals */}
      <IceCrystals />
    </>
  )
}

export default function IceBackground() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ 
          antialias: false, // Disable for better performance
          alpha: true,
          powerPreference: 'high-performance' // Optimize for performance
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for better performance
        style={{ background: 'transparent' }}
        frameloop="always"
        performance={{ min: 0.5 }} // Allow frame rate to drop if needed
      >
        <Scene />
      </Canvas>
    </div>
  )
}
