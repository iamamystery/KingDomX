import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'

export default function KanbanColumn({ id, title, children }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <motion.div whileHover={{ y: -4 }} className="p-3 bg-white dark:bg-gray-800 rounded shadow-sm">
        <div className="font-semibold">{title}</div>
        <div className="mt-2 space-y-2">{children}</div>
      </motion.div>
    </div>
  )
}