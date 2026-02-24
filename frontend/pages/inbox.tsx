import MotionPage from '../components/MotionPage'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

export default function InboxPage() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Inbox' }]

  const notifications = [
    { id: 1, type: 'task', title: 'New task assigned', description: 'You have been assigned to "Update landing page design"', time: '2 min ago', read: false },
    { id: 2, type: 'mention', title: 'Mentioned in #project-alpha', description: '@alice mentioned you in a message', time: '15 min ago', read: false },
    { id: 3, type: 'task', title: 'Task due soon', description: '"Fix API endpoint" is due tomorrow', time: '1 hour ago', read: true },
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
            pageTitle="Inbox"
            breadcrumbs={breadcrumbs}
          />

          {/* Inbox Content */}
          <main className="p-6">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-light text-white">Inbox</h1>
                  <p className="text-sm text-white/40 mt-1">Your personal activity feed and notifications</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 text-sm font-medium text-white/80 border border-white/20 rounded-lg hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300"
                >
                  Mark all as read
                </motion.button>
              </div>

              {/* Notifications List */}
              <div className="max-w-3xl space-y-2">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    whileHover={{ x: 4 }}
                    className={`p-4 bg-white/5 backdrop-blur-sm border rounded-xl cursor-pointer transition-all ${
                      notification.read 
                        ? 'border-white/10 opacity-60' 
                        : 'border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        notification.type === 'task' ? 'bg-amber-500/10' : 'bg-blue-500/10'
                      }`}>
                        {notification.type === 'task' ? (
                          <TaskIcon className="w-5 h-5 text-amber-400" />
                        ) : (
                          <MentionIcon className="w-5 h-5 text-blue-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-white">{notification.title}</h3>
                          <span className="text-xs text-white/40">{notification.time}</span>
                        </div>
                        <p className="text-sm text-white/60 mt-1">{notification.description}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-amber-400 rounded-full mt-2" />
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Empty State */}
                {notifications.length === 0 && (
                  <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-center">
                    <div className="text-white/80 font-medium">You're all caught up!</div>
                    <div className="text-sm text-white/40 mt-1">No new notifications</div>
                  </div>
                )}
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </MotionPage>
  )
}

function TaskIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )
}

function MentionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  )
}
