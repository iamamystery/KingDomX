import MotionPage from '../components/MotionPage'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'
import { useEffect, useState } from 'react'
import { mockProjects, Project } from '../data/mockData'
import { motion } from 'framer-motion'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { 
    // Using mock data for static export
    setProjects(mockProjects)
    setLoading(false)
  }, [])

  function fetchProjects() {
    // Mock refresh function for static export
    setLoading(true)
    setTimeout(() => {
      setProjects(mockProjects)
      setLoading(false)
    }, 500)
  }

  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Projects' }]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64">
          {/* Top Header Bar */}
          <TopHeaderBar
            pageTitle="Projects"
            breadcrumbs={breadcrumbs}
          />

          {/* Projects Content */}
          <main className="p-6">
            <div className="flex items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-light text-white">Projects</h1>
                <p className="text-sm text-white/40 mt-1">Create projects, assign ownership, and track progress.</p>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={fetchProjects}
                  className="px-4 py-2 text-sm font-medium text-white/80 border border-white/20 rounded-lg hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300"
                >
                  Refresh
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 text-sm font-medium text-[#0a0a0f] bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(251,191,36,0.5)]"
                >
                  + New Project
                </motion.button>
              </div>
            </div>

            {error ? (
              <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl p-4 text-sm">
                {error}
              </div>
            ) : null}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-xl animate-pulse">
                    <div className="h-4 w-2/3 bg-white/10 rounded" />
                    <div className="mt-3 h-3 w-full bg-white/10 rounded" />
                    <div className="mt-4 h-3 w-1/2 bg-white/10 rounded" />
                  </div>
                ))
              ) : projects.length === 0 ? (
                <div className="lg:col-span-3 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="text-white/80 font-medium">No projects yet</div>
                  <div className="text-sm text-white/40 mt-1">Create your first project to start organizing tasks.</div>
                </div>
              ) : (
                projects.map(p => (
                  <motion.div
                    key={p.id}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-amber-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-lg font-semibold text-white">{p?.name || 'Untitled Project'}</div>
                        <div className="text-sm text-white/50 mt-1 line-clamp-2">{p?.description || 'No description provided.'}</div>
                      </div>
                      <div className="text-xs text-white/40 px-2 py-1 bg-white/5 rounded-full">Project</div>
                    </div>

                    <div className="mt-4 text-sm text-white/40">
                      Owner: <span className="text-white/60">{p?.owner?.name || p?.owner?.email || '—'}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </MotionPage>
  )
}
