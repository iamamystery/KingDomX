import MotionPage from '../components/MotionPage'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'
import { useTheme } from '../components/ThemeProvider'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Settings() {
  const { theme, setTheme, palette, setPalette } = useTheme()
  const [name, setName] = useState('')

  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Settings' }]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64">
          {/* Top Header Bar */}
          <TopHeaderBar
            pageTitle="Settings"
            breadcrumbs={breadcrumbs}
          />

          {/* Settings Content */}
          <main className="p-6">
            <div className="flex items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-light text-white">Settings</h1>
                <p className="text-sm text-white/40 mt-1">Manage appearance, account preferences, and workspace defaults.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-sm font-medium text-white/80 border border-white/20 rounded-lg hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300"
              >
                Save Changes
              </motion.button>
            </div>

            <section className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold text-white">Account</div>
                      <div className="text-sm text-white/40 mt-1">Update your profile details used across the workspace.</div>
                    </div>
                    <div className="text-xs text-white/40 px-2 py-1 bg-white/5 rounded-full">Profile</div>
                  </div>

                  <div className="mt-5">
                    <div className="text-sm text-white/60">Display name</div>
                    <input
                      className="mt-2 w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-all text-sm"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your display name"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-white/70 border border-white/15 rounded-lg hover:border-amber-500/40 hover:text-amber-300 transition-all duration-300">Cancel</button>
                    <button className="px-4 py-2 text-sm font-medium text-[#0a0a0f] bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_18px_-6px_rgba(251,191,36,0.55)]">Save</button>
                  </div>
                </div>

                <div className="p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold text-white">Security</div>
                      <div className="text-sm text-white/40 mt-1">Review account security and session settings.</div>
                    </div>
                    <div className="text-xs text-white/40 px-2 py-1 bg-white/5 rounded-full">Coming soon</div>
                  </div>
                  <div className="mt-4 text-sm text-white/50">
                    Password management, 2FA, and active sessions will appear here.
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold text-white">Appearance</div>
                      <div className="text-sm text-white/40 mt-1">Choose a theme and accent palette.</div>
                    </div>
                    <div className="text-xs text-white/40 px-2 py-1 bg-white/5 rounded-full">UI</div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="text-sm text-white/60">Theme</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTheme('light')}
                        className={`px-3 py-1.5 rounded-lg text-sm border transition-all duration-300 ${theme === 'light' ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-white/5 text-white/60 border-white/15 hover:border-amber-500/30 hover:text-white/80'}`}
                      >
                        Light
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`px-3 py-1.5 rounded-lg text-sm border transition-all duration-300 ${theme === 'dark' ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-white/5 text-white/60 border-white/15 hover:border-amber-500/30 hover:text-white/80'}`}
                      >
                        Dark
                      </button>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="text-sm text-white/60">Palette</div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => setPalette('brand-500')} className={`w-9 h-9 rounded-full bg-brand-500 border ${palette === 'brand-500' ? 'border-white/60' : 'border-white/10'}`} />
                      <button onClick={() => setPalette('blue-500')} className={`w-9 h-9 rounded-full bg-blue-500 border ${palette === 'blue-500' ? 'border-white/60' : 'border-white/10'}`} />
                      <button onClick={() => setPalette('purple-500')} className={`w-9 h-9 rounded-full bg-purple-500 border ${palette === 'purple-500' ? 'border-white/60' : 'border-white/10'}`} />
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold text-white">Workspace</div>
                      <div className="text-sm text-white/40 mt-1">Default preferences for projects and tasks.</div>
                    </div>
                    <div className="text-xs text-white/40 px-2 py-1 bg-white/5 rounded-full">Coming soon</div>
                  </div>
                  <div className="mt-4 text-sm text-white/50">
                    Default statuses, templates, and automations will be configurable here.
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </MotionPage>
  )
}
