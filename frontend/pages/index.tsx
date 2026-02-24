import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Link from 'next/link'
import AnimatedText from '../components/AnimatedText'
import ParticleBackground from '../components/ParticleBackground'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

// Animated counter component - counts from 0 to target in 2 seconds
function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.1 }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => observer.disconnect()
  }, [hasStarted])
  
  useEffect(() => {
    if (!hasStarted) return
    
    const duration = 2500 // 2.5 seconds - standard speed
    const startTime = Date.now()
    const startValue = 0
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(startValue + (value - startValue) * easeOut)
      
      setDisplayValue(current)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [hasStarted, value])
  
  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>
}

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const { token } = router.query as { token?: string }
    if (token) {
      localStorage.setItem('token', token)
      router.replace('/dashboard')
    }
  }, [router])

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Elegant subtle background with soft gradient orbs */}
      <ParticleBackground />
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-64 h-64 border-l border-t border-white/5" />
      <div className="absolute top-0 right-0 w-64 h-64 border-r border-t border-white/5" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border-l border-b border-white/5" />
      <div className="absolute bottom-0 right-0 w-64 h-64 border-r border-b border-white/5" />

      {/* Main content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Animated Title with elegant gradient */}
        <motion.div variants={fadeInUp} className="mb-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight">
            <span className="bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Kingdom
            </span>
            <span className="font-semibold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              X
            </span>
          </h1>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="text-white/40 max-w-xl mx-auto mb-12 text-base leading-relaxed"
        >
          Elevate your workflow with our meticulously designed platform. 
          Where elegance meets exceptional performance.
        </motion.p>

        {/* Elegant buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center px-10 py-4 font-medium text-[#0a0a0f] bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.5)]"
            >
              <span className="relative flex items-center gap-3">
                Begin Your Journey
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.button>
          </Link>

          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-10 py-4 font-medium text-white/80 border border-white/20 rounded-lg hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300"
            >
              Sign In
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats with animated counters */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 flex items-center justify-center gap-8 md:gap-16"
        >
          {[
            { value: 100, suffix: '', label: 'Active Users', prefix: '' },
            { value: 99, suffix: '%', label: 'Uptime', prefix: '' },
            { value: 47, suffix: '', label: 'Rating', prefix: '4.' },
          ].map((stat, index, arr) => (
            <div key={stat.label} className="flex items-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-light text-white">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </div>
                <div className="text-xs md:text-sm text-white/40 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
              {index < arr.length - 1 && (
                <div className="h-8 w-px bg-white/10" />
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  )
}
