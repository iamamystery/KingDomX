import { useEffect, useState } from 'react'
import { mockTasks, Task } from '../data/mockData'
import { motion, AnimatePresence } from 'framer-motion'

interface Section {
  key: string
  label: string
  count: number
  tasks: Task[]
  color: string
}

interface TaskBoardProps {
  filterAssignee?: string | null
  filterPriority?: string | null
}

export default function TaskBoard({ filterAssignee, filterPriority }: TaskBoardProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overdue', 'today', 'upcoming']))

  useEffect(() => {
    fetchTasks()
  }, [filterAssignee, filterPriority])

  async function fetchTasks() {
    // Using mock data for static export
    let filteredTasks = [...mockTasks]
    
    // Apply assignee filter
    if (filterAssignee && filterAssignee !== 'All Assignees') {
      filteredTasks = filteredTasks.filter((t: Task) => 
        t.assignees?.includes(filterAssignee) || 
        (filterAssignee === 'Unassigned' && (!t.assignees || t.assignees.length === 0))
      )
    }
    
    // Apply priority filter
    if (filterPriority && filterPriority !== 'All Priorities') {
      filteredTasks = filteredTasks.filter((t: Task) => 
        t.priority?.toLowerCase() === filterPriority.toLowerCase()
      )
    }
    
    setTasks(filteredTasks)
  }

  async function updateTask(id: number, data: Partial<Task>) {
    // Mock update - in static mode we just update local state
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...data } : t))
  }

  async function createTask(title: string, section: string) {
    // Mock create - add to local state
    const newTask: Task = {
      id: Date.now(),
      title,
      status: 'todo',
      priority: 'Medium',
      assignees: [],
    }
    setTasks(prev => [newTask, ...prev])
  }

  function toggleSection(key: string) {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  function getSections(): Section[] {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const overdue = tasks.filter(t => {
      if (!t.dueDate) return false
      const due = new Date(t.dueDate)
      due.setHours(0, 0, 0, 0)
      return due < today && t.status !== 'done'
    })

    const todayTasks = tasks.filter(t => {
      if (!t.dueDate) return false
      const due = new Date(t.dueDate)
      due.setHours(0, 0, 0, 0)
      return due.getTime() === today.getTime()
    })

    const upcoming = tasks.filter(t => {
      if (!t.dueDate) return t.status !== 'done'
      const due = new Date(t.dueDate)
      due.setHours(0, 0, 0, 0)
      return due > today && t.status !== 'done'
    })

    const noDate = tasks.filter(t => !t.dueDate && t.status !== 'done')

    const completed = tasks.filter(t => t.status === 'done' || t.completed)

    return [
      { key: 'overdue', label: 'Overdue', count: overdue.length, tasks: overdue, color: 'text-red-400' },
      { key: 'today', label: 'Today', count: todayTasks.length, tasks: todayTasks, color: 'text-amber-400' },
      { key: 'upcoming', label: 'Upcoming', count: upcoming.length, tasks: upcoming, color: 'text-blue-400' },
      { key: 'noDate', label: 'No Date', count: noDate.length, tasks: noDate, color: 'text-gray-400' },
      { key: 'completed', label: 'Completed', count: completed.length, tasks: completed, color: 'text-green-400' },
    ]
  }

  const sections = getSections()

  return (
    <div className="h-[calc(100vh-220px)] overflow-y-auto pr-2">
      <div className="space-y-2">
        {sections.map(section => (
          <div key={section.key} className="border border-white/10 rounded-xl overflow-hidden bg-[#0f0f14]">
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg
                  className={`w-4 h-4 text-white/50 transition-transform ${expandedSections.has(section.key) ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`font-semibold ${section.color}`}>{section.label}</span>
                <span className="text-white/40 text-sm">{section.count}</span>
              </div>
            </button>

            <AnimatePresence>
              {expandedSections.has(section.key) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-3">
                    {section.tasks.length === 0 ? (
                      <p className="text-white/30 text-sm py-4 text-center">No tasks in this section</p>
                    ) : (
                      <div className="space-y-1">
                        {section.tasks.map(task => (
                          <TaskRow
                            key={task.id}
                            task={task}
                            onToggle={() => updateTask(task.id, { completed: !task.completed, status: task.completed ? 'todo' : 'done' })}
                          />
                        ))}
                      </div>
                    )}
                    <CreateTaskRow onCreate={(title) => createTask(title, section.key)} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

function TaskRow({ task, onToggle }: { task: Task; onToggle: () => void }) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done'

  return (
    <div className="group flex items-center gap-3 py-2 px-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          task.completed || task.status === 'done'
            ? 'bg-green-500 border-green-500'
            : 'border-white/30 hover:border-amber-400'
        }`}
      >
        {(task.completed || task.status === 'done') && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`truncate ${task.completed || task.status === 'done' ? 'line-through text-white/40' : 'text-white'}`}>
            {task.title}
          </span>
          {task.priority === 'High' && (
            <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )}
        </div>
      </div>

      {task.status && (
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          task.status === 'done' ? 'bg-green-500/20 text-green-400' :
          task.status === 'in-progress' ? 'bg-amber-500/20 text-amber-400' :
          task.status === 'review' ? 'bg-purple-500/20 text-purple-400' :
          'bg-blue-500/20 text-blue-400'
        }`}>
          {task.status.replace('_', ' ')}
        </span>
      )}

      {task.dueDate && (
        <span className={`text-xs ${isOverdue ? 'text-red-400' : 'text-white/50'}`}>
          {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      )}

      {task.assignees && task.assignees.length > 0 && (
        <div className="flex -space-x-1">
          {task.assignees.slice(0, 3).map((assignee, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs text-white font-medium border-2 border-[#0f0f14]"
            >
              {assignee.charAt(0).toUpperCase()}
            </div>
          ))}
          {task.assignees.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/60 border-2 border-[#0f0f14]">
              +{task.assignees.length - 3}
            </div>
          )}
        </div>
      )}

      {task.tags?.map((tag, i) => (
        <span
          key={i}
          className="text-xs px-2 py-0.5 bg-white/10 rounded text-white/60"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

function CreateTaskRow({ onCreate }: { onCreate: (title: string) => void }) {
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState('')

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="flex items-center gap-2 py-2 px-2 text-white/40 hover:text-white/60 transition-colors text-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add task
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2 py-2 px-2">
      <div className="w-5 h-5 rounded border-2 border-white/30" />
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && title.trim()) {
            onCreate(title.trim())
            setTitle('')
            setIsAdding(false)
          } else if (e.key === 'Escape') {
            setIsAdding(false)
            setTitle('')
          }
        }}
        onBlur={() => {
          if (!title.trim()) setIsAdding(false)
        }}
        placeholder="Task name"
        className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none text-sm"
      />
    </div>
  )
}
