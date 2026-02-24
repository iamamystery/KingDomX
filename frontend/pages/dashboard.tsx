import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'
import TaskBoard from '../components/TaskBoard'
import { mockTasks, mockUsers, mockProjects, Task } from '../data/mockData'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Dashboard() {
  const [me, setMe] = useState<any>(null)
  const [statsData, setStatsData] = useState({
    activeTasks: 0,
    overdueTasks: 0,
    projects: 0,
    completedToday: 0,
    teamMembers: 0,
    productivityScore: 0
  })
  const [myTasks, setMyTasks] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [aiSuggestion, setAiSuggestion] = useState('')

  useEffect(() => {
    // Using mock data for static export
    const tasks = mockTasks
    const users = mockUsers
    const projects = mockProjects

    const activeTasks = tasks.filter((t: Task) => t.status !== 'done').length
    const overdueTasks = tasks.filter((t: Task) => {
      if (!t.dueDate) return false
      return new Date(t.dueDate) < new Date() && t.status !== 'done'
    }).length
    const completedToday = tasks.filter((t: Task) => {
      if (t.status !== 'done') return false
      return true // Simplified for demo
    }).length
    const teamMembers = users.filter((u) =>
      ['ADMIN', 'MANAGER', 'STAFF'].includes(String(u?.role || ''))
    ).length

    // Calculate productivity score
    const totalTasks = tasks.length || 1
    const doneRatio = (totalTasks - activeTasks) / totalTasks
    const productivityScore = Math.round(doneRatio * 100)

    setStatsData({
      activeTasks,
      overdueTasks,
      projects: projects.length,
      completedToday,
      teamMembers,
      productivityScore
    })
    
    setProjects(projects)
    setMyTasks(tasks.filter(t => t.assignees?.includes('Muhammad Jawad')))
    
  }, [])

  const kpiCards = [
    { label: 'Active Tasks', value: statsData.activeTasks, trend: '+12%', color: 'amber' },
    { label: 'Overdue', value: statsData.overdueTasks, trend: '-5%', color: 'red' },
    { label: 'Projects', value: projects.length, trend: null, color: 'blue' },
    { label: 'Completed Today', value: statsData.completedToday, trend: null, color: 'green' },
    { label: 'Team Members', value: statsData.teamMembers, trend: null, color: 'purple' },
    { label: 'Productivity', value: `${statsData.productivityScore}%`, trend: '+8%', color: 'amber' },
  ]

  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Dashboard' }]

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:lg:ml-64">
        {/* Top Header Bar */}
        <TopHeaderBar
          pageTitle="Dashboard"
          breadcrumbs={breadcrumbs}
          user={me}
        />

        {/* Dashboard Content */}
        <main className="p-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            {/* ROW 1: Welcome + Primary Actions */}
            <motion.div
              variants={fadeInUp}
              className="flex items-start sm:items-center justify-between gap-4"
            >
              {/* Left: Welcome */}
              <div>
                <h2 className="text-3xl font-light text-white">
                  Welcome back, <span className="font-semibold text-amber-400">{me?.name || 'User'}</span>
                </h2>
                <p className="text-sm text-white/40 mt-1">
                  {me?.role || 'Member'} • KingdomX Workspace
                </p>
              </div>

              {/* Right: Primary Actions */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 text-sm font-medium text-white/80 border border-white/20 rounded-lg hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300"
                >
                  Invite Team
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 text-sm font-medium text-[#0a0a0f] bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(251,191,36,0.5)] flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  Create Project
                </motion.button>
              </div>
            </motion.div>

            {/* ROW 2: KPI Summary Cards */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {kpiCards.map((card) => (
                <motion.div
                  key={card.label}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-amber-500/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/50 uppercase tracking-wider">{card.label}</span>
                    {card.trend && (
                      <span className={`text-xs ${card.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {card.trend}
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-semibold text-white">{card.value}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* ROW 3: Main Work Area + Context Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT (70%): Task Workspace */}
              <motion.div variants={fadeInUp} className="lg:col-span-8 xl:col-span-9 space-y-4">
                {/* Board Controls */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {/* View Switcher */}
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
                      <button className="px-3 py-1.5 text-sm font-medium text-amber-400 bg-amber-500/10 rounded-md">Board</button>
                      <button className="px-3 py-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors">List</button>
                      <button className="px-3 py-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors">Calendar</button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Filters */}
                    <select className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70 focus:outline-none focus:border-amber-500/50">
                      <option value="">All Assignees</option>
                      <option value="me">Assigned to me</option>
                    </select>
                    <select className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70 focus:outline-none focus:border-amber-500/50">
                      <option value="">Priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <button className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                      <FilterIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Kanban Board */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 min-h-[500px]">
                  <TaskBoard />
                </div>
              </motion.div>

              {/* RIGHT (30%): My Work Panel - Scrollable */}
              <motion.aside variants={fadeInUp} className="lg:col-span-4 xl:col-span-3 h-[calc(100vh-140px)] overflow-y-auto space-y-4 pr-2">
                {/* My Tasks Section */}
                <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white flex items-center gap-2">
                      <TaskIcon className="w-4 h-4 text-amber-400" />
                      My Tasks
                    </h3>
                    <span className="text-xs text-white/40">{statsData.activeTasks} active</span>
                  </div>
                  <div className="space-y-2">
                    {myTasks.slice(0, 5).map((task: any) => (
                      <div key={task.id} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                        <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-400' : task.priority === 'medium' ? 'bg-amber-400' : 'bg-green-400'}`} />
                        <span className="text-sm text-white/70 truncate flex-1">{task.title}</span>
                        <span className="text-xs text-white/40">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due'}</span>
                      </div>
                    ))}
                    {myTasks.length === 0 && (
                      <p className="text-sm text-white/40 text-center py-4">No tasks assigned to you</p>
                    )}
                  </div>
                  <button className="w-full mt-3 text-xs text-amber-400 hover:text-amber-300 transition-colors">View all tasks →</button>
                </div>

                {/* Recents Section */}
                <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-blue-400" />
                      Recents
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {projects.slice(0, 3).map((project: any) => (
                      <div key={project.id} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg cursor-pointer group">
                        <ListIcon className="w-4 h-4 text-white/40 group-hover:text-amber-400" />
                        <span className="text-sm text-white/70">{project.name}</span>
                        <span className="text-xs text-white/30">• in {project.space || 'Team Space'}</span>
                      </div>
                    ))}
                    {myTasks.slice(0, 4).map((task: any) => (
                      <div key={`recent-${task.id}`} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg cursor-pointer group">
                        <CircleIcon className="w-4 h-4 text-white/40 group-hover:text-amber-400" />
                        <span className="text-sm text-white/70">{task.title}</span>
                        <span className="text-xs text-white/30">• in {task.project?.name || 'Project'}</span>
                      </div>
                    ))}
                    {projects.length === 0 && myTasks.length === 0 && (
                      <p className="text-sm text-white/40 text-center py-4">No recent items</p>
                    )}
                  </div>
                </div>

                {/* Assigned to Me Section */}
                <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-green-400" />
                      Assigned to Me
                    </h3>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">{myTasks.filter((t: any) => t.assigneeId === me?.id).length}</span>
                  </div>
                  <div className="space-y-2">
                    {myTasks.filter((t: any) => t.assigneeId === me?.id).slice(0, 4).map((task: any) => (
                      <div key={`assigned-${task.id}`} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                        <span className="text-sm text-white/70 truncate">{task.title}</span>
                      </div>
                    ))}
                    {myTasks.filter((t: any) => t.assigneeId === me?.id).length === 0 && (
                      <p className="text-sm text-white/40 text-center py-4">No tasks assigned</p>
                    )}
                  </div>
                </div>

                {/* Agendas Section */}
                <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-purple-400" />
                      Agendas
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-sm text-white/70">Team Standup</p>
                      <p className="text-xs text-white/40 mt-1">Today, 10:00 AM</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-sm text-white/70">Sprint Planning</p>
                      <p className="text-xs text-white/40 mt-1">Tomorrow, 2:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* AI Standup Section */}
                <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white flex items-center gap-2">
                      <SparklesIcon className="w-4 h-4 text-amber-400" />
                      AI Standup
                    </h3>
                    <span className="text-xs text-white/30">Daily summary</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-white/60 leading-relaxed">
                      You completed <span className="text-amber-400">{statsData.completedToday}</span> tasks yesterday. 
                      You have <span className="text-amber-400">{statsData.activeTasks}</span> tasks pending today.
                    </p>
                    <button className="w-full mt-2 px-3 py-2 text-xs font-medium text-[#0a0a0f] bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_-5px_rgba(251,191,36,0.5)]">
                      Generate Full Report
                    </button>
                  </div>
                </div>

                {/* Priorities Section */}
                <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white flex items-center gap-2">
                      <StarIcon className="w-4 h-4 text-red-400" />
                      Priorities
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {myTasks.filter((t: any) => t.priority === 'high').slice(0, 4).map((task: any) => (
                      <div key={`priority-${task.id}`} className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="text-sm text-white/70 truncate flex-1">{task.title}</span>
                        <span className="text-xs text-red-400">High</span>
                      </div>
                    ))}
                    {myTasks.filter((t: any) => t.priority === 'high').length === 0 && (
                      <p className="text-sm text-white/40 text-center py-4">No high priority tasks</p>
                    )}
                  </div>
                </div>
              </motion.aside>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

// Quick Action Button Component
function QuickActionButton({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 group"
    >
      <Icon className="w-4 h-4 text-white/40 group-hover:text-amber-400 transition-colors" />
      {label}
    </motion.button>
  )
}

// Icon Components
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  )
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  )
}

function TaskIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )
}

function UserPlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  )
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeWidth={2} />
    </svg>
  )
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
}
