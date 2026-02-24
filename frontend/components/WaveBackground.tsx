import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WaveParticles() {
  const meshRef = useRef<THREE.Points>(null)
  const count = 2000
  
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 10
      const y = Math.sin(x * 0.5) * 0.5 + Math.sin(z * 0.3) * 0.3
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y - 2
      positions[i * 3 + 2] = z
      
      // Teal colors with variation
      const tealIntensity = 0.5 + Math.random() * 0.5
      colors[i * 3] = 0.05 * tealIntensity
      colors[i * 3 + 1] = 0.6 * tealIntensity
      colors[i * 3 + 2] = 0.55 * tealIntensity
    }
    
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    const posAttr = meshRef.current.geometry.attributes.position
    
    for (let i = 0; i < count; i++) {
      const x = posAttr.getX(i)
      const z = posAttr.getZ(i)
      
      // Animated wave effect
      const y = Math.sin(x * 0.5 + time * 0.5) * 0.4 + 
                Math.sin(z * 0.3 + time * 0.3) * 0.2 +
                Math.sin((x + z) * 0.2 + time * 0.4) * 0.15 - 2
      
      posAttr.setY(i, y)
    }
    
    posAttr.needsUpdate = true
    meshRef.current.rotation.y = time * 0.02
  })

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

export default function WaveBackground() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[35vh] pointer-events-none">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#14b8a6" />
        <WaveParticles />
      </Canvas>
    </div>
  )
}
