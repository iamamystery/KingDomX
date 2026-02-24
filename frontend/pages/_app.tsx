import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../components/ThemeProvider'
import MotionPage from '../components/MotionPage'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SplashScreen, { hasSplashBeenShown } from '../components/SplashScreen'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [showSplash, setShowSplash] = useState(true) // Start true to prevent flash
  const [splashComplete, setSplashComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const publicRoutes = ['/', '/login', '/signup', '/splash']
    const isPublic = publicRoutes.includes(router.pathname)

    // Check if splash was already shown this session
    const alreadyShown = hasSplashBeenShown()
    
    if (alreadyShown) {
      setShowSplash(false)
      setSplashComplete(true)
    }

    // Auth routing logic
    if (!token && !isPublic) {
      router.replace('/login')
    }

    if (token && (router.pathname === '/login' || router.pathname === '/signup')) {
      router.replace('/dashboard')
    }

    setIsLoading(false)
  }, [router.pathname])

  const handleSplashComplete = () => {
    setSplashComplete(true)
    // Remove splash from DOM immediately for smoother transition
    setShowSplash(false)
  }

  // Show nothing while checking localStorage (prevents flash)
  if (isLoading) {
    return null
  }

  return (
    <ThemeProvider>
      {/* Render page content underneath */}
      <MotionPage>
        <div className={showSplash ? 'invisible' : 'visible'}>
          <Component {...pageProps} />
        </div>
      </MotionPage>
      
      {/* Splash screen overlay - renders on top */}
      {showSplash && (
        <div className="fixed inset-0 z-[99999]">
          <SplashScreen 
            onComplete={handleSplashComplete} 
            redirectPath="/login"
            skipAnimation={splashComplete}
          />
        </div>
      )}
    </ThemeProvider>
  )
}
