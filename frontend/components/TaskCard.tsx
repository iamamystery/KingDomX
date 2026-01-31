import { motion } from 'framer-motion'
import InlineEditor from './InlineEditor'

export default function TaskCard({ task, onSave }: any) {
  return (
    <motion.div layout whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} className="p-3 bg-white dark:bg-gray-800 rounded shadow-sm cursor-grab">
      <InlineEditor value={task.title} onSave={(v: string) => onSave(task.id, { title: v })} />
      <div className="text-xs text-gray-400 mt-2">{task.description}</div>
    </motion.div>
  )
}