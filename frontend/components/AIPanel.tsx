import { useState } from 'react'
import { motion } from 'framer-motion'

export default function AIPanel({ onCreateTask }: { onCreateTask?: (title: string, description?: string) => void }) {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestion, setSuggestion] = useState<string | null>(null)

  async function ask() {
    if (!prompt) return
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_AI_URL || 'http://localhost:5004'}/suggest-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      const data = await res.json()
      setSuggestion(data.suggestion)
    } catch (err) {
      setSuggestion('AI service unavailable')
    } finally {
      setLoading(false)
    }
  }
          
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div>
        <h3 className="text-lg font-medium text-white mb-1">AI Suggestions</h3>
        <p className="text-sm text-white/40">Ask the AI to suggest tasks or summarize updates.</p>
        <div className="mt-4 flex items-stretch gap-2">
          <input 
            className="flex-1 min-w-0 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-all text-sm" 
            placeholder="Describe the problem or update" 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
          />
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={ask}
            className="px-4 py-2.5 text-sm font-medium text-[#0a0a0f] bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_-5px_rgba(251,191,36,0.5)] shrink-0"
          >
            {loading ? 'Thinking...' : 'Suggest'}
          </motion.button>
        </div>
        {suggestion && (
          <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="whitespace-pre-wrap text-white/70 text-sm">{suggestion}</div>
            {onCreateTask && (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-3 px-4 py-2 text-sm font-medium text-[#0a0a0f] bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(251,191,36,0.5)]"
                onClick={() => onCreateTask(suggestion, '')}
              >
                Create Task
              </motion.button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}


