import { useEffect, useState } from 'react'
import { mockAutomations, Automation } from '../data/mockData'
import { motion, AnimatePresence } from 'framer-motion'
import MotionPage from '../components/MotionPage'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

const templates = [
  { id: 1, name: 'Due Date Reminder', description: 'Remind assignee 1 day before due date', trigger: 'due_date_approaching', action: 'send_notification' },
  { id: 2, name: 'Status Change Alert', description: 'Notify watchers when status changes', trigger: 'task_status_changed', action: 'notify_channel' },
  { id: 3, name: 'Weekly Summary', description: 'Send weekly progress report every Monday', trigger: 'schedule', action: 'send_report' },
]

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    trigger: { type: 'task_status_changed', config: {} },
    actions: [{ type: 'send_notification', config: {} }]
  })
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Automations' }]

  useEffect(() => {
    // Using mock data for static export
    setAutomations(mockAutomations)
    setLoading(false)
  }, [])

  const fetchAutomations = async () => {
    // Mock function for static export
    setLoading(true)
    setTimeout(() => {
      setAutomations(mockAutomations)
      setLoading(false)
    }, 300)
  }

  const handleCreateAutomation = async (e: React.FormEvent) => {
    e.preventDefault()
    // Mock create for static export
    const newAutomation: Automation = {
      id: Date.now(),
      name: formData.name,
      trigger: formData.trigger,
      actions: formData.actions,
      status: 'active',
      runCount: 0
    }
    setAutomations(prev => [...prev, newAutomation])
    setIsCreateModalOpen(false)
    setFormData({ name: '', trigger: { type: 'task_status_changed', config: {} }, actions: [{ type: 'send_notification', config: {} }] })
  }

  const toggleAutomationStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active'
    // Mock toggle for static export
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, status: newStatus as any } : a))
  }

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64">
          {/* Top Header Bar */}
          <TopHeaderBar
            pageTitle="Automations"
            breadcrumbs={breadcrumbs}
          />

          {/* Automations Content */}
          <main className="p-6">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-light text-white">Automations</h1>
                  <p className="text-sm text-white/40 mt-1">Automate repetitive tasks and workflows</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-4 py-2.5 text-sm font-medium text-[#0a0a0f] bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(251,191,36,0.5)] flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  Create Automation
                </motion.button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Automations */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-sm font-medium text-white/60 uppercase tracking-wider">Active Automations</h2>
                  
                  {automations.map((automation) => (
                    <motion.div
                      key={automation.id}
                      whileHover={{ y: -2 }}
                      className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                            <BoltIcon className="w-5 h-5 text-amber-400" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-white">{automation.name}</h3>
                            <div className="flex items-center gap-2 mt-1 text-xs text-white/40">
                              <span>Trigger: {automation.trigger?.type || 'Unknown'}</span>
                              <span>•</span>
                              <span>Actions: {automation.actions?.length || 0}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-white/40">{automation.runCount || 0} runs</span>
                          <button
                            onClick={() => toggleAutomationStatus(automation.id, automation.status)}
                            className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-colors ${
                              automation.status === 'active' 
                                ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' 
                                : 'bg-white/5 text-white/60 hover:bg-white/10'
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full ${automation.status === 'active' ? 'bg-green-400' : 'bg-white/40'}`} />
                            <span className="text-xs">{automation.status === 'active' ? 'Active' : 'Paused'}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {automations.length === 0 && (
                    <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-center">
                      <div className="text-white/80 font-medium">No automations yet</div>
                      <div className="text-sm text-white/40 mt-1">Create your first automation to save time</div>
                    </div>
                  )}
                </div>

                {/* Templates */}
                <div className="space-y-4">
                  <h2 className="text-sm font-medium text-white/60 uppercase tracking-wider">Templates</h2>
                  
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      whileHover={{ x: 4 }}
                      onClick={() => {
                        setSelectedTemplate(template.id)
                        setFormData({
                          name: template.name,
                          trigger: { type: template.trigger, config: {} },
                          actions: [{ type: template.action, config: {} }]
                        })
                        setIsCreateModalOpen(true)
                      }}
                      className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl cursor-pointer hover:border-amber-500/30 transition-all"
                    >
                      <h3 className="text-sm font-medium text-white">{template.name}</h3>
                      <p className="text-xs text-white/40 mt-1">{template.description}</p>
                      <button className="mt-3 text-xs text-amber-400 hover:text-amber-300 transition-colors">
                        Use Template →
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </main>

          {/* Create Automation Modal */}
          <AnimatePresence>
            {isCreateModalOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsCreateModalOpen(false)}>
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e: React.MouseEvent) => e.stopPropagation()} className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 w-full max-w-lg">
                  <h2 className="text-xl font-medium text-white mb-4">Create Automation</h2>
                  <form onSubmit={handleCreateAutomation} className="space-y-4">
                    <div>
                      <label className="text-sm text-white/60 block mb-1">Name</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500/50" required />
                    </div>
                    <div>
                      <label className="text-sm text-white/60 block mb-1">Trigger</label>
                      <select value={formData.trigger.type} onChange={(e) => setFormData({ ...formData, trigger: { ...formData.trigger, type: e.target.value } })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500/50">
                        <option value="task_status_changed">Task Status Changed</option>
                        <option value="task_created">Task Created</option>
                        <option value="due_date_approaching">Due Date Approaching</option>
                        <option value="schedule">Schedule</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-white/60 block mb-1">Action</label>
                      <select value={formData.actions[0]?.type} onChange={(e) => setFormData({ ...formData, actions: [{ ...formData.actions[0], type: e.target.value }] })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500/50">
                        <option value="send_notification">Send Notification</option>
                        <option value="notify_channel">Notify Channel</option>
                        <option value="send_report">Send Report</option>
                        <option value="update_task">Update Task</option>
                      </select>
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
        </div>
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

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}
