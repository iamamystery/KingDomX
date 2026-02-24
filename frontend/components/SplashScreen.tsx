import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import logo from '../assets/logo.png'

/**
 * SplashScreen Component
 * 
 * Premium 3-second loading animation for KingdomX
 * Features: Crown Lottie animation, gold gradient text, smooth fade transitions
 * 
 * Place Lottie JSON at: frontend/assets/animations/crown.json
 */

interface SplashScreenProps {
  onComplete?: () => void
  redirectPath?: string
  skipAnimation?: boolean
}

const ANIMATION_DURATION = 3000 // 3 seconds total
const SESSION_KEY = 'kingdomx_splash_shown'

export default function SplashScreen({ 
  onComplete, 
  redirectPath = '/login',
  skipAnimation = false 
}: SplashScreenProps) {
  const router = useRouter()
  const [phase, setPhase] = useState<'entering' | 'animating' | 'exiting' | 'complete'>('entering')
  const [showText, setShowText] = useState(true)
  const [hideText, setHideText] = useState(false)

  // Handle completion and navigation
  const handleComplete = useCallback(() => {
    setPhase('exiting')
    
    // Shorter fade-out animation before redirect
    setTimeout(() => {
      setPhase('complete')
      localStorage.setItem(SESSION_KEY, 'true')
      
      if (onComplete) {
        onComplete()
      } else {
        router.push(redirectPath)
      }
    }, 300) // Reduced from 500ms to 300ms for smoother transition
  }, [router, redirectPath, onComplete])

  // Skip animation if already shown this session
  useEffect(() => {
    if (skipAnimation || localStorage.getItem(SESSION_KEY)) {
      handleComplete()
      return
    }

    // Phase 1: Entrance (0-1s) - Crown outline draws
    const phase1Timer = setTimeout(() => {
      setPhase('animating')
    }, 100)

    // Text is already visible from start (showText initialized to true)
    // Just animate it in on mount
    const textTimer = setTimeout(() => {
      // Text animation is handled by initial/animate props
    }, 100)

    // No hide timer - text stays until animation ends

    // Complete at 3s
    const completeTimer = setTimeout(() => {
      handleComplete()
    }, ANIMATION_DURATION)

    return () => {
      clearTimeout(phase1Timer)
      clearTimeout(textTimer)
      clearTimeout(completeTimer)
    }
  }, [skipAnimation, handleComplete])

  // Click to skip
  const handleClick = () => {
    handleComplete()
  }

  // Don't render if complete
  if (phase === 'complete') return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, #1a1a2e 0%, #0a0a0f 50%),
            linear-gradient(180deg, #0a0a0f 0%, #000000 100%)
          `,
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: phase === 'exiting' ? 0 : 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: phase === 'exiting' ? 0.3 : 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        onClick={handleClick}
      >
        {/* Subtle ambient glow background */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: phase === 'animating' ? [0.3, 0.5, 0.3] : 0.3,
          }}
          transition={{
            duration: 2,
            repeat: phase === 'animating' ? Infinity : 0,
            ease: "easeInOut"
          }}
          style={{
            background: `
              radial-gradient(circle at 50% 50%, rgba(245, 185, 66, 0.08) 0%, transparent 60%)
            `,
          }}
        />

        {/* Main Content Container - Perfectly Centered */}
        <div className="flex flex-col items-center justify-center h-full w-full">
          {/* Crown and Text wrapper */}
          <div className="flex flex-col items-center justify-center -mt-20">
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: phase === 'animating' ? [1, 1.02, 1] : 1,
            opacity: 1,
          }}
          transition={{
            scale: {
              duration: 1,
              repeat: phase === 'animating' ? Infinity : 0,
              ease: "easeInOut"
            },
            opacity: { duration: 0.8, ease: "easeOut" }
          }}
        >
          {/* Gold glow behind crown */}
          <motion.div
            className="absolute inset-0 blur-3xl"
            animate={{
              opacity: phase === 'animating' ? [0.2, 0.4, 0.2] : 0,
              scale: phase === 'animating' ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'radial-gradient(circle, rgba(245, 185, 66, 0.4) 0%, transparent 70%)',
            }}
          />

          {/* Logo Image */}
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src={logo}
              alt="KingdomX Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* KingdomX Text - Centered */}
        <AnimatePresence>
          {showText && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] flex items-center justify-center">
                <span className="text-[#e8e6e3]">KingDom</span>
                <motion.span
                  className="font-semibold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #f5d485 0%, #f5b942 50%, #e8a332 100%)',
                  }}
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(245, 185, 66, 0.3)',
                      '0 0 40px rgba(245, 185, 66, 0.5)',
                      '0 0 20px rgba(245, 185, 66, 0.3)',
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  X
                </motion.span>
              </h1>
              
              {/* Subtle tagline */}
              <motion.p
                className="mt-3 text-xs tracking-[0.3em] text-white/30 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Premium Workspace
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <div className="w-24 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#f5b942] to-[#f5d485]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Click to skip hint */}
        <motion.p
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/20 tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          Click anywhere to continue
        </motion.p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * Utility to reset splash screen (for testing)
 * Call this in browser console: resetSplashScreen()
 */
export function resetSplashScreen() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY)
    window.location.reload()
  }
}

/**
 * Check if splash has been shown this session
 */
export function hasSplashBeenShown(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(SESSION_KEY) === 'true'
}
