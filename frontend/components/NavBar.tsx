import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NavBar() {
  const router = useRouter()
  function logout() {
    localStorage.removeItem('token')
    router.push('/login')
  }
  return (
    <header className="w-full bg-[#0a0a0f] backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-light tracking-tight">
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Kingdom
              </span>
              <span className="font-semibold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                X
              </span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {[
              { name: 'Dashboard', href: '/dashboard' },
              { name: 'Projects', href: '/projects' },
              { name: 'Tasks', href: '/tasks' },
              { name: 'Settings', href: '/settings' },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                  router.pathname === item.href
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 text-sm font-medium text-white/80 border border-white/20 rounded-lg hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300"
            onClick={logout}
          >
            Sign Out
          </motion.button>
        </div>
      </div>
    </header>
  )
}
