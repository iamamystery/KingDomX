import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'

export default function KanbanColumn({ id, title, count = 0, children }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="h-full">
      <div className="h-full flex flex-col p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium text-white/80">{title}</span>
          <span className="text-xs text-white/40 px-2 py-1 bg-white/5 rounded-full">{Number.isFinite(count) ? count : 0}</span>
        </div>
        <div className="flex-1 space-y-3 min-h-[200px]">{children}</div>
      </div>
    </div>
  )
}