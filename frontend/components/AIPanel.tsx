import { useState } from 'react'
import Button from './ui/Button'
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
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-semibold">AI Suggestions</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Ask the AI to suggest tasks or summarize updates.</p>
        <div className="mt-3 flex gap-2">
          <input className="flex-1 p-2 border rounded bg-transparent" placeholder="Describe the problem or update" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <Button onClick={ask} className="px-3">{loading ? 'Thinking...' : 'Suggest'}</Button>
        </div>
        {suggestion && (
          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <div className="whitespace-pre-wrap">{suggestion}</div>
            {onCreateTask && <Button className="mt-3" onClick={() => onCreateTask(suggestion, '')}>Create Task</Button>}
          </div>
        )}
      </div>
    </motion.div>
  )
}