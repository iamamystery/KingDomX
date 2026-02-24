'use client'

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      
      {/* Subtle gradient overlays */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(251, 191, 36, 0.08), transparent)'
        }}
      />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 100%, rgba(251, 191, 36, 0.05), transparent)'
        }}
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  )
}
