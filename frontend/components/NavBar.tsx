import { useRouter } from 'next/router'
import ThemeToggle from './ThemeToggle'

export default function NavBar() {
  const router = useRouter()
  function logout() {
    localStorage.removeItem('token')
    router.push('/login')
  }
  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-xl font-semibold">KingdomX</div>
          <nav className="hidden md:flex gap-2 text-sm text-gray-600 dark:text-gray-300">
            <button onClick={() => router.push('/dashboard')}>Dashboard</button>
            <button onClick={() => router.push('/projects')}>Projects</button>
            <button onClick={() => router.push('/tasks')}>Tasks</button>
            <button onClick={() => router.push('/settings')}>Settings</button>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={logout}>Logout</button>
        </div>
      </div>
    </header>
  )
}
