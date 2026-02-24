import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MotionPage from '../components/MotionPage'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'
import { mockTasks, mockProjects } from '../data/mockData'

interface DashboardData {
  overview: {
    totalTasks: number
    completedTasks: number
    inProgressTasks: number
    todoTasks: number
    totalProjects: number
    completionRate: number
  }
  weekly: {
    completedThisWeek: number
    trend: string
  }
  recentActivity: Array<{
    id: number
    title: string
    status: string
    updatedAt: string
  }>
  byProject: Array<{
    id: number
    name: string
    taskCount: number
    completedCount: number
  }>
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

const reports = [
  { id: 1, name: 'Project Overview', description: 'Summary of all active projects', type: 'dashboard' },
  { id: 2, name: 'Task Completion Rate', description: 'Weekly task completion trends', type: 'chart' },
  { id: 3, name: 'Team Velocity', description: 'Sprint velocity and capacity', type: 'chart' },
  { id: 4, name: 'Time Tracking', description: 'Hours logged by project', type: 'table' },
]

const stats = [
  { label: 'Tasks Completed', value: '156', change: '+12%', positive: true },
  { label: 'Projects Active', value: '8', change: '+2', positive: true },
  { label: 'Average Cycle Time', value: '4.2d', change: '-0.8d', positive: true },
  { label: 'On-time Delivery', value: '94%', change: '+3%', positive: true },
]

export default function ReportsPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Reports' }]

  useEffect(() => {
    // Using mock data for static export
    const tasks = mockTasks
    const projects = mockProjects
    
    const completedTasks = tasks.filter(t => t.status === 'done').length
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length
    const todoTasks = tasks.filter(t => t.status === 'todo').length
    
    const mockData: DashboardData = {
      overview: {
        totalTasks: tasks.length,
        completedTasks,
        inProgressTasks,
        todoTasks,
        totalProjects: projects.length,
        completionRate: Math.round((completedTasks / tasks.length) * 100)
      },
      weekly: {
        completedThisWeek: 12,
        trend: '+8%'
      },
      recentActivity: tasks.slice(0, 5).map(t => ({
        id: t.id,
        title: t.title,
        status: t.status,
        updatedAt: t.dueDate || new Date().toISOString()
      })),
      byProject: projects.map(p => ({
        id: p.id,
        name: p.name,
        taskCount: tasks.filter(t => t.projectId === p.id).length,
        completedCount: tasks.filter(t => t.projectId === p.id && t.status === 'done').length
      }))
    }
    
    setData(mockData)
    setLoading(false)
  }, [])

  const fetchReportData = async () => {
    // Mock refresh for static export
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }

  const stats = data ? [
    { label: 'Total Tasks', value: String(data.overview.totalTasks), change: data.weekly.trend, positive: data.weekly.trend.startsWith('+') },
    { label: 'Completed', value: String(data.overview.completedTasks), change: `${data.overview.completionRate}%`, positive: data.overview.completionRate > 50 },
    { label: 'In Progress', value: String(data.overview.inProgressTasks), change: '+0', positive: true },
    { label: 'Projects', value: String(data.overview.totalProjects), change: '+0', positive: true },
  ] : [
    { label: 'Total Tasks', value: '0', change: '0%', positive: true },
    { label: 'Completed', value: '0', change: '0%', positive: true },
    { label: 'In Progress', value: '0', change: '+0', positive: true },
    { label: 'Projects', value: '0', change: '+0', positive: true },
  ]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64">
          {/* Top Header Bar */}
          <TopHeaderBar
            pageTitle="Reports"
            breadcrumbs={breadcrumbs}
          />

          {/* Reports Content */}
          <main className="p-6">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-light text-white">Reports</h1>
                  <p className="text-sm text-white/40 mt-1">Track progress and analyze team performance</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 text-sm font-medium text-white/80 border border-white/20 rounded-lg hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 flex items-center gap-2"
                >
                  <DownloadIcon className="w-4 h-4" />
                  Export Data
                </motion.button>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -4 }}
                    className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
                  >
                    <div className="text-2xl font-semibold text-white">{stat.value}</div>
                    <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                    <div className={`text-xs mt-2 ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.change} from last month
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Available Reports */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reports.map((report) => (
                  <motion.div
                    key={report.id}
                    whileHover={{ y: -4, borderColor: 'rgba(251, 191, 36, 0.3)' }}
                    className="p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl cursor-pointer transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                        <ChartIcon className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-white">{report.name}</h3>
                        <p className="text-xs text-white/40 mt-1">{report.description}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs text-white/40 px-2 py-1 bg-white/5 rounded">
                            {report.type}
                          </span>
                        </div>
                      </div>
                      <ArrowIcon className="w-5 h-5 text-white/20" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Project Progress */}
              {data && data.byProject.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-medium text-white mb-4">Project Progress</h2>
                  <div className="space-y-3">
                    {data.byProject.map((project) => {
                      const progress = project.taskCount > 0 ? Math.round((project.completedCount / project.taskCount) * 100) : 0
                      return (
                        <motion.div key={project.id} whileHover={{ x: 4 }} className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white">{project.name}</span>
                            <span className="text-xs text-white/60">{project.completedCount}/{project.taskCount} tasks</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
                            </div>
                            <span className="text-xs text-white/60 w-8">{progress}%</span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              {data && data.recentActivity.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-medium text-white mb-4">Recent Activity</h2>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl divide-y divide-white/10">
                    {data.recentActivity.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="p-4 flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${activity.status === 'done' ? 'bg-green-400' : activity.status === 'in-progress' ? 'bg-amber-400' : 'bg-white/40'}`} />
                        <div className="flex-1">
                          <p className="text-sm text-white">{activity.title}</p>
                          <p className="text-xs text-white/40">{new Date(activity.updatedAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${activity.status === 'done' ? 'bg-green-500/10 text-green-400' : activity.status === 'in-progress' ? 'bg-amber-500/10 text-amber-400' : 'bg-white/5 text-white/60'}`}>{activity.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </MotionPage>
  )
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}
