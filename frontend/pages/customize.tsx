import MotionPage from '../components/MotionPage'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'
import { useState } from 'react'

export default function CustomizePage() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Customize' }]
  const [theme, setTheme] = useState('dark')

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        <LeftSidebar />
        <div className="flex-1 lg:ml-64">
          <TopHeaderBar breadcrumbs={breadcrumbs} pageTitle="Customize" />
          <main className="p-6">
            <h1 className="text-2xl font-semibold text-white mb-6">Customize Workspace</h1>
            <div className="max-w-2xl space-y-6">
              <div className="bg-[#13131a] rounded-xl border border-white/10 p-6">
                <h2 className="text-lg font-medium text-white mb-4">Theme</h2>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-amber-500 text-black' : 'bg-white/10 text-white'}`}
                  >
                    Dark
                  </button>
                  <button 
                    onClick={() => setTheme('light')}
                    className={`px-4 py-2 rounded-lg ${theme === 'light' ? 'bg-amber-500 text-black' : 'bg-white/10 text-white'}`}
                  >
                    Light
                  </button>
                </div>
              </div>
              <div className="bg-[#13131a] rounded-xl border border-white/10 p-6">
                <h2 className="text-lg font-medium text-white mb-4">Sidebar</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-white/80">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber-500" />
                    Show Favorites
                  </label>
                  <label className="flex items-center gap-3 text-white/80">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber-500" />
                    Show Channels
                  </label>
                  <label className="flex items-center gap-3 text-white/80">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber-500" />
                    Show Direct Messages
                  </label>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </MotionPage>
  )
}
