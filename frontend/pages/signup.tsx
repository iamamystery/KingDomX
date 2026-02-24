import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ParticleBackground from '../components/ParticleBackground'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    setLoading(true)
    // Mock signup for static export
    setTimeout(() => {
      localStorage.setItem('token', 'mock-token-for-demo')
      localStorage.setItem('user', JSON.stringify({ name, email, role: 'ADMIN' }))
      router.push('/dashboard')
      setLoading(false)
    }, 500)
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f] px-4">
      {/* Elegant subtle background */}
      <ParticleBackground />
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-64 h-64 border-l border-t border-white/5" />
      <div className="absolute top-0 right-0 w-64 h-64 border-r border-t border-white/5" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border-l border-b border-white/5" />
      <div className="absolute bottom-0 right-0 w-64 h-64 border-r border-b border-white/5" />

      <motion.div 
        className="relative z-10 w-full max-w-md"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          variants={fadeInUp}
          className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
        >
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light tracking-tight mb-2">
              <span className="bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
                Kingdom
              </span>
              <span className="font-semibold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                X
              </span>
            </h1>
            <p className="text-white/40 text-sm">Create your account</p>
          </div>

          <form className="space-y-5" onSubmit={submit}>
            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Full Name
              </label>
              <input 
                id="nameSignup"
                type="text"
                className="w-full p-3.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Email Address
              </label>
              <input 
                id="emailSignup"
                type="email"
                className="w-full p-3.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Password
              </label>
              <input 
                type="password"
                className="w-full p-3.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Confirm Password
              </label>
              <input 
                type="password"
                className="w-full p-3.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 px-4 font-medium text-[#0a0a0f] bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(251,191,36,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </motion.button>
            </motion.div>
          </form>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 mt-4 text-center text-sm"
            >
              {error}
            </motion.p>
          )}

          {/* Divider */}
          <motion.div variants={fadeInUp} className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-[#0a0a0f] text-white/40">Or continue with</span>
              </div>
            </div>
          </motion.div>

          {/* OAuth buttons */}
          <motion.div variants={fadeInUp} className="mt-4 grid grid-cols-2 gap-3">
            <a 
              className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-center block transition-all duration-300" 
              href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/oauth/google`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </span>
            </a>
            <a 
              className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-center block transition-all duration-300" 
              href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/oauth/github`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </span>
            </a>
          </motion.div>

          {/* Login link */}
          <motion.div variants={fadeInUp} className="mt-6 text-center">
            <p className="text-sm text-white/40">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-amber-400 hover:text-amber-300 transition-colors">
                Sign In
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  )
}
