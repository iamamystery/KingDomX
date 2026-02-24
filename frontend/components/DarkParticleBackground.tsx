import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Particles() {
  const mesh = useRef<THREE.Points>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()
  
  const count = 120
  
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
      
      vel[i * 3] = (Math.random() - 0.5) * 0.02
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01
    }
    
    return [pos, vel]
  }, [])
  
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  
  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.elapsedTime
    const attr = mesh.current.geometry.attributes.position
    
    for (let i = 0; i < count; i++) {
      let x = attr.getX(i)
      let y = attr.getY(i)
      let z = attr.getZ(i)
      
      // Organic movement
      const speed = 0.5 + (i % 5) * 0.2
      x += velocities[i * 3] + Math.sin(time * speed + i) * 0.005
      y += velocities[i * 3 + 1] + Math.cos(time * speed * 0.7 + i) * 0.005
      z += velocities[i * 3 + 2] + Math.sin(time * speed * 0.3) * 0.002
      
      // Mouse interaction
      const mx = mouse.current.x * viewport.width * 0.5
      const my = mouse.current.y * viewport.height * 0.5
      const dx = x - mx
      const dy = y - my
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < 2 && d > 0) {
        x += (dx / d) * 0.02
        y += (dy / d) * 0.02
      }
      
      // Wrap
      if (x > 8) x = -8
      if (x < -8) x = 8
      if (y > 5) y = -5
      if (y < -5) y = 5
      
      attr.setXYZ(i, x, y, z)
    }
    
    attr.needsUpdate = true
  })
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])
  
  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.25}
        color="#5eead4"
        transparent
        opacity={1}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Connections({ count = 120 }: { count?: number }) {
  const lines = useRef<THREE.LineSegments>(null)
  const positions = useRef<Float32Array>(new Float32Array(count * 6))
  
  useFrame(() => {
    if (!lines.current?.parent) return
    const pts = lines.current.parent.children[0] as THREE.Points
    if (!pts) return
    
    const posAttr = pts.geometry.attributes.position
    const linePos = lines.current.geometry.attributes.position
    let idx = 0
    
    for (let i = 0; i < count; i++) {
      const x1 = posAttr.getX(i)
      const y1 = posAttr.getY(i)
      const z1 = posAttr.getZ(i)
      
      let connections = 0
      for (let j = i + 1; j < count && connections < 2; j++) {
        const x2 = posAttr.getX(j)
        const y2 = posAttr.getY(j)
        const z2 = posAttr.getZ(j)
        const d = Math.sqrt((x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2)
        
        if (d < 2) {
          linePos.setXYZ(idx++, x1, y1, z1)
          linePos.setXYZ(idx++, x2, y2, z2)
          connections++
        }
      }
    }
    
    for (let i = idx; i < count * 6; i += 3) {
      linePos.setXYZ(i/3|0, 0, 0, 0)
    }
    
    linePos.needsUpdate = true
    lines.current.geometry.setDrawRange(0, idx)
  })
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions.current, 3))
    return geo
  }, [])
  
  return (
    <lineSegments ref={lines} geometry={geometry}>
      <lineBasicMaterial color="#2dd4bf" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
    </lineSegments>
  )
}

export default function DarkParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10" style={{ background: '#020617' }}>
      {/* Debug: visible border to confirm component renders */}
      <div className="absolute inset-4 border-2 border-brand-500/20 rounded-lg pointer-events-none" />
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={1}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
        <Connections />
      </Canvas>
    </div>
  )
}
