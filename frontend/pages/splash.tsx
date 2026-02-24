import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SplashScreen, { hasSplashBeenShown } from '../components/SplashScreen'

/**
 * Splash Page
 * 
 * Renders the premium splash screen animation before redirecting to login.
 * This page handles the initial loading experience for KingdomX.
 * 
 * Route: /splash
 * Redirects to: /login (after animation or immediately if already shown)
 */

export default function SplashPage() {
  const router = useRouter()
  const [shouldShowSplash, setShouldShowSplash] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Check if splash has been shown this session
    const hasShown = hasSplashBeenShown()
    
    if (hasShown) {
      // Skip splash and redirect immediately
      router.push('/login')
    } else {
      // Show splash screen
      setShouldShowSplash(true)
      setIsReady(true)
    }
  }, [router])

  // Handle completion callback
  const handleComplete = () => {
    router.push('/login')
  }

  // Don't render anything until we've checked localStorage
  if (!isReady) {
    return null
  }

  // If splash was already shown, we would have redirected
  // This is a fallback
  if (!shouldShowSplash) {
    return null
  }

  return (
    <SplashScreen 
      onComplete={handleComplete}
      redirectPath="/login"
    />
  )
}
