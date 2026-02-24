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
      <motion.div layout whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-start gap-3 cursor-grab hover:border-amber-500/30 transition-all">
        <div {...listeners} className="drag-handle text-white/30 hover:text-white/60 transition-colors">☰</div>
        <div className="flex-1">
          <InlineEditor value={task.title} onSave={(v: string) => onSave(task.id, { title: v })} />
          {task.description && <div className="text-xs text-white/40 mt-1">{task.description}</div>}
        </div>
      </motion.div>
    </div>
  )
}