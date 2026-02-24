import MotionPage from '../components/MotionPage'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'
import { motion } from 'framer-motion'
import { useState } from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

const channels = [
  { id: 1, name: 'general', type: 'public', unread: 0 },
  { id: 2, name: 'project-alpha', type: 'public', unread: 3 },
  { id: 3, name: 'design', type: 'public', unread: 0 },
  { id: 4, name: 'engineering', type: 'public', unread: 5 },
]

const directMessages = [
  { id: 1, name: 'Alice Chen', status: 'online', unread: 0 },
  { id: 2, name: 'Bob Smith', status: 'offline', unread: 2 },
  { id: 3, name: 'Carol Wu', status: 'online', unread: 0 },
]

const messages = [
  { id: 1, sender: 'Alice Chen', content: 'Hey team, just pushed the new designs to Figma.', time: '10:30 AM', self: false },
  { id: 2, sender: 'You', content: 'Great! I\'ll review them this afternoon.', time: '10:32 AM', self: true },
  { id: 3, sender: 'Bob Smith', content: 'Can we schedule a sync meeting for tomorrow?', time: '10:45 AM', self: false },
]

export default function ChatPage() {
  const [activeChannel, setActiveChannel] = useState(channels[0])
  const [messageInput, setMessageInput] = useState('')
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Chat' }]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 flex">
          {/* Chat Sidebar */}
          <div className="w-64 bg-[#0a0a0f] border-r border-white/10 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <h2 className="text-lg font-medium text-white">Chat</h2>
            </div>

            {/* Channels */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="px-4 mb-2">
                <span className="text-xs text-white/40 uppercase tracking-wider">Channels</span>
              </div>
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                    activeChannel.id === channel.id
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <HashtagIcon className="w-4 h-4" />
                  <span className="flex-1 text-left">{channel.name}</span>
                  {channel.unread > 0 && (
                    <span className="px-2 py-0.5 bg-amber-500 text-[#0a0a0f] text-xs font-medium rounded-full">
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}

              {/* Direct Messages */}
              <div className="px-4 mt-6 mb-2">
                <span className="text-xs text-white/40 uppercase tracking-wider">Direct Messages</span>
              </div>
              {directMessages.map((dm) => (
                <button
                  key={dm.id}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <div className="relative">
                    <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-[#0a0a0f] text-xs font-semibold">
                      {dm.name.charAt(0)}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-[#0a0a0f] ${
                      dm.status === 'online' ? 'bg-green-400' : 'bg-white/30'
                    }`} />
                  </div>
                  <span className="flex-1 text-left">{dm.name}</span>
                  {dm.unread > 0 && (
                    <span className="px-2 py-0.5 bg-amber-500 text-[#0a0a0f] text-xs font-medium rounded-full">
                      {dm.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Main Area */}
          <div className="flex-1 flex flex-col">
            {/* Top Header */}
            <TopHeaderBar
              pageTitle={`#${activeChannel.name}`}
              breadcrumbs={breadcrumbs}
            />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${message.self ? 'flex-row-reverse' : ''}`}
                >
                  {!message.self && (
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-[#0a0a0f] text-sm font-semibold shrink-0">
                      {message.sender.charAt(0)}
                    </div>
                  )}
                  <div className={`max-w-[70%] ${message.self ? 'items-end' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{message.sender}</span>
                      <span className="text-xs text-white/40">{message.time}</span>
                    </div>
                    <div className={`p-3 rounded-xl ${
                      message.self 
                        ? 'bg-amber-500/20 text-white' 
                        : 'bg-white/5 text-white/90'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={`Message #${activeChannel.name}`}
                  className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
                >
                  <SendIcon className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionPage>
  )
}

function HashtagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
  )
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )
}
