import { useEffect, useState, useMemo } from 'react'
import { mockCalendarEvents, CalendarEvent } from '../data/mockData'
import { motion, AnimatePresence } from 'framer-motion'
import MotionPage from '../components/MotionPage'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    allDay: false,
    type: 'event'
  })
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Calendar' }]

  // Fetch events
  useEffect(() => {
    // Using mock data for static export
    setEvents(mockCalendarEvents.map(e => ({
      ...e,
      startDate: e.date + 'T09:00:00.000Z',
      allDay: false
    })))
    setLoading(false)
  }, [currentDate])

  const fetchEvents = async () => {
    // Mock function for static export
    setLoading(true)
    setTimeout(() => {
      setEvents(mockCalendarEvents.map(e => ({
        ...e,
        startDate: e.date + 'T09:00:00.000Z',
        allDay: false
      })))
      setLoading(false)
    }, 300)
  }

  // Calendar navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Calendar days generator
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDayOfWeek = firstDay.getDay()
    const days: { date: Date; isCurrentMonth: boolean }[] = []
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month, -i), isCurrentMonth: false })
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true })
    }
    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false })
    }
    return days
  }, [currentDate])

  const getEventsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(event => {
      const eventDate = event.startDate || event.date || new Date().toISOString()
      return new Date(eventDate).toISOString().split('T')[0] === dateStr
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const openCreateModal = (date: Date) => {
    setFormData(prev => ({ ...prev, startDate: date.toISOString().split('T')[0] + 'T09:00' }))
    setIsCreateModalOpen(true)
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    // Mock create for static export
    const newEvent: any = {
      id: Date.now(),
      ...formData,
      startDate: formData.startDate || new Date().toISOString()
    }
    setEvents(prev => [...prev, newEvent])
    setIsCreateModalOpen(false)
    setFormData({ title: '', description: '', startDate: '', endDate: '', allDay: false, type: 'event' })
  }

  const currentMonthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 flex flex-col">
          {/* Top Header Bar */}
          <TopHeaderBar pageTitle="Calendar" breadcrumbs={breadcrumbs} />

          {/* Calendar Content */}
          <main className="flex-1 p-6 overflow-hidden">
            <motion.div variants={fadeInUp} initial="initial" animate="animate" className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 shrink-0">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-light text-white">{currentMonthYear}</h1>
                  <div className="flex items-center gap-1">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={prevMonth} className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><ChevronLeftIcon className="w-5 h-5" /></motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={goToToday} className="px-3 py-1.5 text-sm font-medium text-white/80 border border-white/20 rounded-lg hover:border-amber-500/50 hover:text-amber-400 transition-all">Today</motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={nextMonth} className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><ChevronRightIcon className="w-5 h-5" /></motion.button>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => openCreateModal(new Date())} className="px-4 py-2 text-sm font-medium text-[#0a0a0f] bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(251,191,36,0.5)] flex items-center gap-2"><PlusIcon className="w-4 h-4" />New Event</motion.button>
              </div>

              {/* Calendar Grid */}
              <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden flex flex-col min-h-0">
                <div className="grid grid-cols-7 border-b border-white/10 shrink-0">
                  {days.map((day) => (<div key={day} className="p-3 text-center"><span className="text-sm font-medium text-white/60">{day}</span></div>))}
                </div>
                <div className="grid grid-cols-7 flex-1 overflow-y-auto">
                  {calendarDays.map(({ date, isCurrentMonth }, index) => {
                    const dayEvents = getEventsForDay(date)
                    const today = isToday(date)
                    return (
                      <motion.div key={index} whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }} onClick={() => openCreateModal(date)} className={`border-r border-b border-white/5 p-2 min-h-[80px] cursor-pointer transition-colors ${!isCurrentMonth ? 'bg-white/[0.02]' : ''} ${today ? 'bg-amber-500/5' : ''}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm ${today ? 'w-6 h-6 bg-amber-500 text-[#0a0a0f] rounded-full flex items-center justify-center font-medium text-xs' : isCurrentMonth ? 'text-white/80' : 'text-white/20'}`}>{date.getDate()}</span>
                          {dayEvents.length > 0 && <span className="text-xs text-white/40">{dayEvents.length}</span>}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 3).map((event: CalendarEvent) => (
                            <motion.div key={event.id} onClick={(e: React.MouseEvent) => { e.stopPropagation(); setSelectedEvent(event) }} whileHover={{ scale: 1.02 }} className={`px-2 py-0.5 text-xs rounded truncate cursor-pointer ${event.type === 'task' ? 'bg-amber-500/20 text-amber-300' : event.type === 'meeting' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'}`}>{event.title}</motion.div>
                          ))}
                          {dayEvents.length > 3 && <div className="text-xs text-white/40 pl-2">+{dayEvents.length - 3} more</div>}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </main>
        </div>
        {/* Create Event Modal */}
        <AnimatePresence>
          {isCreateModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsCreateModalOpen(false)}>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-medium text-white mb-4">Create Event</h2>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div>
                    <label className="text-sm text-white/60 block mb-1">Title</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500/50" required />
                  </div>
                  <div>
                    <label className="text-sm text-white/60 block mb-1">Description</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500/50" rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-white/60 block mb-1">Start</label>
                      <input type="datetime-local" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500/50" required />
                    </div>
                    <div>
                      <label className="text-sm text-white/60 block mb-1">End (optional)</label>
                      <input type="datetime-local" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500/50" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="allDay" checked={formData.allDay} onChange={(e) => setFormData({ ...formData, allDay: e.target.checked })} className="rounded bg-white/5 border-white/10" />
                    <label htmlFor="allDay" className="text-sm text-white/60">All day</label>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={() => setIsCreateModalOpen(false)} className="flex-1 px-4 py-2 text-sm font-medium text-white/80 border border-white/20 rounded-lg hover:border-amber-500/50 transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 px-4 py-2 text-sm font-medium text-[#0a0a0f] bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg transition-all">Create</button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event Detail Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e: React.MouseEvent) => e.stopPropagation()} className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 w-full max-w-md">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-medium text-white">{selectedEvent.title}</h2>
                  <button onClick={() => setSelectedEvent(null)} className="text-white/40 hover:text-white"><XIcon className="w-5 h-5" /></button>
                </div>
                <div className="space-y-3">
                  {selectedEvent.description && <p className="text-white/60">{selectedEvent.description}</p>}
                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <ClockIcon className="w-4 h-4" />
                    {new Date(selectedEvent.startDate || selectedEvent.date || new Date()).toLocaleString()}
                    {selectedEvent.endDate && <> - {new Date(selectedEvent.endDate).toLocaleString()}</>}
                  </div>
                  {selectedEvent.type === 'task' && (
                    <div className="p-3 bg-white/5 rounded-lg">
                      <span className="text-xs text-white/40">Linked Task</span>
                      <p className="text-sm text-white">{selectedEvent.title}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 pt-4 mt-4 border-t border-white/10">
                  <button onClick={() => setSelectedEvent(null)} className="flex-1 px-4 py-2 text-sm font-medium text-white/80 border border-white/20 rounded-lg hover:border-amber-500/50 transition-colors">Close</button>
                  <button onClick={() => setSelectedEvent(null)} className="flex-1 px-4 py-2 text-sm font-medium text-[#0a0a0f] bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg transition-all">Edit</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionPage>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
