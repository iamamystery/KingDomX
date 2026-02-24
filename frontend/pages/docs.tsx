import MotionPage from '../components/MotionPage'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

const docs = [
  { id: 1, title: 'Project Roadmap', type: 'doc', updatedAt: '2 hours ago', author: 'Alice Chen' },
  { id: 2, title: 'API Documentation', type: 'doc', updatedAt: 'Yesterday', author: 'Bob Smith' },
  { id: 3, title: 'Design System', type: 'doc', updatedAt: '3 days ago', author: 'Carol Wu' },
  { id: 4, title: 'Meeting Notes - Sprint Planning', type: 'doc', updatedAt: '1 week ago', author: 'Alice Chen' },
]

const folders = [
  { id: 1, name: 'Engineering', count: 12 },
  { id: 2, name: 'Design', count: 8 },
  { id: 3, name: 'Product', count: 5 },
]

export default function DocsPage() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Docs' }]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64">
          {/* Top Header Bar */}
          <TopHeaderBar
            pageTitle="Docs"
            breadcrumbs={breadcrumbs}
          />

          {/* Docs Content */}
          <main className="p-6">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-light text-white">Knowledge Base</h1>
                  <p className="text-sm text-white/40 mt-1">Documentation, notes, and shared knowledge</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2.5 text-sm font-medium text-[#0a0a0f] bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(251,191,36,0.5)] flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  New Document
                </motion.button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Quick Actions */}
                  <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                    <h3 className="text-sm font-medium text-white mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <DocIcon className="w-4 h-4" />
                        New Document
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <FolderIcon className="w-4 h-4" />
                        New Folder
                      </button>
                    </div>
                  </div>

                  {/* Folders */}
                  <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                    <h3 className="text-sm font-medium text-white mb-3">Folders</h3>
                    <div className="space-y-1">
                      {folders.map((folder) => (
                        <button
                          key={folder.id}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <FolderIcon className="w-4 h-4" />
                            {folder.name}
                          </div>
                          <span className="text-xs text-white/40">{folder.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-9">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <h2 className="text-sm font-medium text-white">Recent Documents</h2>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Search docs..."
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50"
                        />
                      </div>
                    </div>

                    {/* Document List */}
                    <div className="divide-y divide-white/10">
                      {docs.map((doc) => (
                        <motion.div
                          key={doc.id}
                          whileHover={{ x: 4 }}
                          className="p-4 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                        >
                          <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                            <DocIcon className="w-5 h-5 text-amber-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-white">{doc.title}</h3>
                            <p className="text-xs text-white/40 mt-1">
                              Edited {doc.updatedAt} by {doc.author}
                            </p>
                          </div>
                          <button className="p-2 text-white/40 hover:text-white transition-colors">
                            <MoreIcon className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    {docs.length === 0 && (
                      <div className="p-8 text-center">
                        <div className="text-white/80 font-medium">No documents yet</div>
                        <div className="text-sm text-white/40 mt-1">Create your first document to get started</div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="mt-4 px-4 py-2 text-sm font-medium text-[#0a0a0f] bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg transition-all duration-300"
                        >
                          Create Document
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </main>
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

function DocIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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

function MoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  )
}
