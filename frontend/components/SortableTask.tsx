import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import InlineEditor from './InlineEditor'

export default function SortableTask({ task, onSave }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: String(task.id), data: { status: task.status } })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <motion.div layout whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} className="p-3 bg-white dark:bg-gray-800 rounded shadow-sm flex items-start gap-3 cursor-grab">
        <div {...listeners} className="drag-handle text-gray-400">☰</div>
        <div className="flex-1">
          <InlineEditor value={task.title} onSave={(v: string) => onSave(task.id, { title: v })} />
          <div className="text-xs text-gray-400 mt-2">{task.description}</div>
        </div>
      </motion.div>
    </div>
  )
}