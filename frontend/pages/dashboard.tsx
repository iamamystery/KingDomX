import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import TaskBoard from '../components/TaskBoard'
import AIPanel from '../components/AIPanel'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const [me, setMe] = useState<any>(null)

  useEffect(() => {
    const t = localStorage.getItem('token')
    if (!t) return
    axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/me`, { headers: { Authorization: `Bearer ${t}` } })
      .then(r => setMe(r.data))
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <main className="max-w-7xl mx-auto p-6">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {me?.name || 'Guest'}</h1>
                <p className="text-sm text-gray-500">Role: {me?.role || 'Guest'}</p>
              </div>
              <div className="text-sm text-gray-400">KingdomX — Founded by Muhammad Jawad</div>
            </div>

            <section className="mt-6">
              <motion.div whileHover={{ y: -4 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                  <div className="text-sm text-gray-500">Tasks</div>
                  <div className="text-xl font-bold mt-2">Real-time</div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                  <div className="text-sm text-gray-500">Projects</div>
                  <div className="text-xl font-bold mt-2">Organize</div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                  <div className="text-sm text-gray-500">AI</div>
                  <div className="text-xl font-bold mt-2">Assist</div>
                </div>
              </motion.div>
            </section>

            <section className="mt-6">
              <h2 className="text-lg font-semibold">Your tasks</h2>
              <TaskBoard />
            </section>
          </div>

          <aside className="w-80 hidden lg:block">
            <AIPanel />
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded shadow">
              <h4 className="font-semibold">Quick Actions</h4>
              <div className="mt-3 space-y-2">
                <button className="w-full px-3 py-2 rounded bg-brand-500 text-white">Create Project</button>
                <button className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700">Invite Team</button>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <footer className="w-full text-center py-4 text-sm text-gray-500">© King Group of Technology — Muhammad Jawad</footer>
    </div>
  )
}