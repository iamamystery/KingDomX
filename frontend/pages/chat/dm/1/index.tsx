import MotionPage from '../../../../components/MotionPage'
import LeftSidebar from '../../../../components/LeftSidebar'
import TopHeaderBar from '../../../../components/TopHeaderBar'
import { useState } from 'react'

export default function DirectMessagePage() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Chat' }, { name: 'Muhammad Jawad' }]
  const [messageInput, setMessageInput] = useState('')

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        <LeftSidebar />
        <div className="flex-1 lg:ml-64 flex flex-col">
          <TopHeaderBar breadcrumbs={breadcrumbs} pageTitle="Muhammad Jawad" />
          <main className="flex-1 flex flex-col p-6">
            <div className="flex-1 bg-[#13131a] rounded-xl border border-white/10 p-6 mb-4 overflow-y-auto">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-lg font-bold text-white">
                  MJ
                </div>
                <div>
                  <h2 className="text-white font-semibold">Muhammad Jawad</h2>
                  <p className="text-green-400 text-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Online
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-center">
                  <span className="text-white/40 text-xs">Today</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-xs font-bold text-white">MJ</div>
                  <div className="bg-[#1a1a23] rounded-lg p-3 max-w-md">
                    <p className="text-white/80 text-sm">Hey! How&apos;s the project going?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-[#13131a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-amber-500/50"
              />
              <button className="bg-amber-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-amber-400 transition-colors">
                Send
              </button>
            </div>
          </main>
        </div>
      </div>
    </MotionPage>
  )
}
