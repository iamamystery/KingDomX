import MotionPage from '../components/MotionPage'
import NavBar from '../components/NavBar'
import { useTheme } from '../components/ThemeProvider'
import { useState } from 'react'
import Card from '../components/ui/Card'

export default function Settings() {
  const { theme, setTheme, palette, setPalette } = useTheme()
  const [name, setName] = useState('')

  return (
    <MotionPage>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <main className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold">Settings</h1>

          <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="font-semibold">Appearance</h3>
              <div className="mt-3 flex items-center justify-between">
                <div>Theme</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setTheme('light')} className={`px-3 py-1 rounded ${theme==='light' ? 'bg-brand-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Light</button>
                  <button onClick={() => setTheme('dark')} className={`px-3 py-1 rounded ${theme==='dark' ? 'bg-brand-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Dark</button>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-gray-500">Palettes</div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => setPalette('brand-500')} className="w-8 h-8 rounded-full bg-brand-500" />
                  <button onClick={() => setPalette('blue-500')} className="w-8 h-8 rounded-full bg-blue-500" />
                  <button onClick={() => setPalette('purple-500')} className="w-8 h-8 rounded-full bg-purple-500" />
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold">Account</h3>
              <div className="mt-3">
                <input className="w-full p-2 border rounded bg-transparent" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your display name" />
                <div className="mt-3 text-right">
                  <button className="px-3 py-1 rounded bg-brand-500 text-white">Save</button>
                </div>
              </div>
            </Card>
          </section>
        </main>
      </div>
    </MotionPage>
  )
}