import MotionPage from '../components/MotionPage'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'
import TaskBoard from '../components/TaskBoard'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { mockTasks, Task } from '../data/mockData'

const assignees = ['All Assignees', 'Unassigned', 'Muhammad Jawad', 'Alice Chen', 'Bob Smith', 'Carol Wu']
const priorities = ['All Priorities', 'Urgent', 'High', 'Medium', 'Low']

export default function TasksPage() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Tasks' }]
  const [activeTab, setActiveTab] = useState('Board')
  const [selectedAssignee, setSelectedAssignee] = useState('All Assignees')
  const [selectedPriority, setSelectedPriority] = useState('All Priorities')
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false)
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [selectedAssignee, selectedPriority])

  async function fetchTasks() {
    try {
      setLoading(true)
      // Using mock data for static export
      let filteredTasks = [...mockTasks]
      
      // Apply assignee filter
      if (selectedAssignee && selectedAssignee !== 'All Assignees') {
        filteredTasks = filteredTasks.filter((t: Task) => 
          t.assignees?.includes(selectedAssignee) || 
          (selectedAssignee === 'Unassigned' && (!t.assignees || t.assignees.length === 0))
        )
      }
      
      // Apply priority filter
      if (selectedPriority && selectedPriority !== 'All Priorities') {
        filteredTasks = filteredTasks.filter((t: Task) => 
          t.priority?.toLowerCase() === selectedPriority.toLowerCase()
        )
      }
      
      setTasks(filteredTasks)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.assignee-dropdown') && !target.closest('.priority-dropdown')) {
        setShowAssigneeDropdown(false)
        setShowPriorityDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64">
          {/* Top Header Bar */}
          <TopHeaderBar
            pageTitle="Tasks"
            breadcrumbs={breadcrumbs}
          />

          {/* Tasks Content */}
          <main className="p-6">
            <div className="flex items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-light text-white">Tasks</h1>
                <p className="text-sm text-white/40 mt-1">Plan, prioritize, and move work across stages.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 text-sm font-medium text-[#0a0a0f] bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(251,191,36,0.5)]"
              >
                + New Task
              </motion.button>
            </div>

            {/* Filters Bar */}
            <div className="flex items-center justify-between mt-6 mb-4">
              {/* View Tabs */}
              <div className="flex items-center bg-[#13131a] rounded-lg p-1 border border-white/10">
                {['Board', 'List', 'Calendar'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      activeTab === tab 
                        ? 'bg-amber-500/20 text-amber-400' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3">
                {/* Assignee Filter */}
                <div className="relative assignee-dropdown">
                  <button
                    onClick={() => {
                      setShowAssigneeDropdown(!showAssigneeDropdown)
                      setShowPriorityDropdown(false)
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#13131a] border border-white/10 rounded-lg text-sm text-white hover:border-white/20 transition-all min-w-[140px] justify-between"
                  >
                    <span className="truncate">{selectedAssignee}</span>
                    <ChevronDownIcon className={`w-4 h-4 text-white/40 transition-transform ${showAssigneeDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {showAssigneeDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-[#0f0f14] border border-white/20 rounded-xl shadow-2xl py-2 z-50 max-h-80 overflow-y-auto"
                      >
                        <div className="px-3 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider border-b border-white/10 mb-1">
                          Filter by Assignee
                        </div>
                        {assignees.map((assignee) => (
                          <button
                            key={assignee}
                            onClick={() => {
                              setSelectedAssignee(assignee)
                              setShowAssigneeDropdown(false)
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-3 ${
                              selectedAssignee === assignee 
                                ? 'bg-amber-500/30 text-amber-300' 
                                : 'text-white/90 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {assignee !== 'All Assignees' && (
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                assignee === 'Unassigned' 
                                  ? 'bg-white/10 text-white/60' 
                                  : 'bg-gradient-to-br from-amber-400 to-amber-600 text-white'
                              }`}>
                                {assignee === 'Unassigned' ? '?' : assignee.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                              </div>
                            )}
                            {assignee === 'All Assignees' && <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><UsersIcon className="w-3 h-3 text-white/60" /></div>}
                            <span>{assignee}</span>
                            {selectedAssignee === assignee && <CheckIcon className="w-4 h-4 ml-auto" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Priority Filter */}
                <div className="relative priority-dropdown">
                  <button
                    onClick={() => {
                      setShowPriorityDropdown(!showPriorityDropdown)
                      setShowAssigneeDropdown(false)
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#13131a] border border-white/10 rounded-lg text-sm text-white hover:border-white/20 transition-all min-w-[130px] justify-between"
                  >
                    <span className="truncate">{selectedPriority}</span>
                    <ChevronDownIcon className={`w-4 h-4 text-white/40 transition-transform ${showPriorityDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {showPriorityDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-[#0f0f14] border border-white/20 rounded-xl shadow-2xl py-2 z-50"
                      >
                        <div className="px-3 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider border-b border-white/10 mb-1">
                          Filter by Priority
                        </div>
                        {priorities.map((priority) => (
                          <button
                            key={priority}
                            onClick={() => {
                              setSelectedPriority(priority)
                              setShowPriorityDropdown(false)
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-3 ${
                              selectedPriority === priority 
                                ? 'bg-amber-500/30 text-amber-300' 
                                : 'text-white/90 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {priority !== 'All Priorities' && (
                              <span className={`w-3 h-3 rounded-full ${
                                priority === 'Urgent' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                                priority === 'High' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' :
                                priority === 'Medium' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' :
                                'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'
                              }`} />
                            )}
                            {priority === 'All Priorities' && <div className="w-3 h-3 rounded-full border-2 border-white/50" />}
                            <span>{priority}</span>
                            {selectedPriority === priority && <CheckIcon className="w-4 h-4 ml-auto" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Filter Button */}
                <button className="p-2 bg-[#13131a] border border-white/10 rounded-lg text-white/60 hover:text-white hover:border-white/20 transition-all">
                  <FunnelIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Task Content Area */}
            <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 min-h-[600px]">
              <AnimatePresence mode="wait">
                {activeTab === 'Board' && (
                  <motion.div
                    key="board"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TaskBoard 
                      filterAssignee={selectedAssignee !== 'All Assignees' ? selectedAssignee : null}
                      filterPriority={selectedPriority !== 'All Priorities' ? selectedPriority : null}
                    />
                  </motion.div>
                )}
                
                {activeTab === 'List' && (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    {loading ? (
                      <div className="text-center py-12 text-white/40">Loading tasks...</div>
                    ) : tasks.length === 0 ? (
                      <div className="text-center py-12 text-white/40">No tasks found</div>
                    ) : (
                      tasks.map((task) => (
                        <div 
                          key={task.id} 
                          className="flex items-center gap-4 p-4 bg-[#13131a] rounded-lg border border-white/10 hover:border-white/20 transition-all group"
                        >
                          <div className={`w-3 h-3 rounded-full ${
                            task.priority === 'Urgent' ? 'bg-red-500' :
                            task.priority === 'High' ? 'bg-orange-500' :
                            task.priority === 'Medium' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`} />
                          <div className="flex-1">
                            <h3 className="text-white font-medium">{task.title}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-white/40">{task.status}</span>
                              {task.dueDate && (
                                <span className="text-xs text-white/40">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {task.assignees?.map((assignee, i) => (
                              <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs font-bold text-white">
                                {assignee.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                              </div>
                            ))}
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 p-2 text-white/40 hover:text-white transition-all">
                            <MoreIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
                
                {activeTab === 'Calendar' && (
                  <motion.div
                    key="calendar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CalendarView tasks={tasks} />
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </main>
        </div>
      </div>
    </MotionPage>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

function FunnelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function MoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  )
}

// Calendar View Component
function CalendarView({ tasks }: { tasks: Task[] }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  const getTasksForDay = (day: number) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false
      const taskDate = new Date(task.dueDate)
      return taskDate.getDate() === day && 
             taskDate.getMonth() === currentDate.getMonth() && 
             taskDate.getFullYear() === currentDate.getFullYear()
    })
  }
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }
  
  return (
    <div className="h-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={prevMonth}
              className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={nextMonth}
              className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <button 
          onClick={() => setCurrentDate(new Date())}
          className="px-4 py-2 text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
        >
          Today
        </button>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {dayNames.map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-white/40">
            {day}
          </div>
        ))}
        
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="p-2 min-h-[100px] bg-[#13131a]/50 rounded-lg" />
        ))}
        
        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const dayTasks = getTasksForDay(day)
          const isToday = new Date().getDate() === day && 
                         new Date().getMonth() === currentDate.getMonth() &&
                         new Date().getFullYear() === currentDate.getFullYear()
          
          return (
            <div 
              key={day} 
              className={`p-2 min-h-[100px] bg-[#13131a] rounded-lg border transition-all ${
                isToday ? 'border-amber-500/50 bg-amber-500/5' : 'border-white/5 hover:border-white/10'
              }`}
            >
              <div className={`text-sm font-medium mb-2 ${isToday ? 'text-amber-400' : 'text-white/60'}`}>
                {day}
              </div>
              <div className="space-y-1">
                {dayTasks.slice(0, 3).map((task) => (
                  <div 
                    key={task.id} 
                    className={`text-xs p-1.5 rounded truncate cursor-pointer hover:opacity-80 ${
                      task.priority === 'Urgent' ? 'bg-red-500/20 text-red-400' :
                      task.priority === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}
                    title={task.title}
                  >
                    {task.title}
                  </div>
                ))}
                {dayTasks.length > 3 && (
                  <div className="text-xs text-white/40 text-center">
                    +{dayTasks.length - 3} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
