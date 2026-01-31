import { useTheme } from './ThemeProvider'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const { theme, setTheme, palette, setPalette } = useTheme()
  return (
    <div className="flex items-center gap-3">
      <motion.button whileTap={{ scale: 0.95 }} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700">
        {theme === 'dark' ? 'Dark' : 'Light'}
      </motion.button>
      <div className="flex gap-2">
        <button className={`w-6 h-6 rounded-full bg-brand-500 ring-2 ring-white`} onClick={() => setPalette('brand-500')} aria-label="Brand"></button>
        <button className={`w-6 h-6 rounded-full bg-blue-500 ring-2 ring-white`} onClick={() => setPalette('blue-500')} aria-label="Blue"></button>
        <button className={`w-6 h-6 rounded-full bg-purple-500 ring-2 ring-white`} onClick={() => setPalette('purple-500')} aria-label="Purple"></button>
      </div>
    </div>
  )
}