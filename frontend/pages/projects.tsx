import MotionPage from '../components/MotionPage'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => { fetchProjects() }, [])
  async function fetchProjects() { const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/projects`); setProjects(res.data) }

  return (
    <MotionPage>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <main className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Projects</h1>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(p => (
              <motion.div key={p.id} whileHover={{ scale: 1.02 }} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-500 mt-2">{p.description}</p>
                <div className="mt-3 text-sm text-gray-400">Owner: {p.owner?.name || p.owner?.email}</div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </MotionPage>
  )
}