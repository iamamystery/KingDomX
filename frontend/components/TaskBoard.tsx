import { useEffect, useState } from 'react'
import axios from 'axios'
import useSocket from '../hooks/useSocket'
import { motion } from 'framer-motion'
import Button from './ui/Button'
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import KanbanColumn from './KanbanColumn'
import InlineEditor from './InlineEditor'
import SortableTask from './SortableTask'

type Task = {
  id: number
  title: string
  description?: string
  status?: string
  position?: number
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const socketRef = useSocket()

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    const s = socketRef.current
    if (!s) return
    s.on('task:created', (t: Task) => setTasks((prev) => [t, ...prev]))
    s.on('task:updated', (t: Task) => setTasks((prev) => prev.map(p => (p.id === t.id ? t : p))))
    s.on('task:deleted', ({ id }: any) => setTasks((prev) => prev.filter(p => p.id !== id)))
    return () => {
      s.off('task:created')
      s.off('task:updated')
      s.off('task:deleted')
    }
  }, [socketRef])

  async function fetchTasks() {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/tasks`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
    setTasks(res.data)
  }

  async function createTask(title: string, status = 'todo') {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/tasks`, { title, status }, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
  }

  async function updateTask(id: number, data: any) {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/tasks/${id}`, data, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
  }

  const columns = [
    { key: 'todo', label: 'To Do' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'done', label: 'Done' },
  ]

  const grouped = columns.map(col => ({ ...col, items: tasks.filter(t => (t.status || 'todo') === (col.key === 'in_progress' ? 'in_progress' : col.key)).sort((a,b)=> (a.position||0) - (b.position||0)) }))
  const [activeId, setActiveId] = useState<string | null>(null)
  const [localGroup, setLocalGroup] = useState(grouped)

  function findColumn(key: string) { return localGroup.find(g => g.key === key) }

  function handleDragOver(e: any) {
    const { active, over } = e
    if (!over) return
    const activeIdLocal = String(active.id)
    const overId = String(over.id)
    const overParts = overId.split(':')
    // when over is column (id like 'todo') we just noop
    if (overParts.length === 1) return
  }

  async function handleDragEnd(e: any) {
    const { active, over } = e
    if (!over) { setActiveId(null); return }
    const taskId = Number(active.id)
    const destKey = over.id as string

    // if same column and exact reorder within column
    const sourceKey = active.data.current?.status || 'todo'

    if (sourceKey === destKey) {
      // compute new positions by capturing DOM order
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/tasks`)
        const latest = res.data
        const colItems = latest.filter((t:any)=> (t.status||'todo') === destKey).sort((a:any,b:any)=> (a.position||0)-(b.position||0))
        // send updated positions based on current order in DOM (we'll read DOM order via query)
        const domOrder = Array.from(document.querySelectorAll(`[data-status="${destKey}"] [data-id]`)).map((el: any) => Number(el.getAttribute('data-id')))
        const items = domOrder.map((id: number, idx: number) => ({ id, status: destKey, position: idx + 1 }))
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null
        if (items.length) await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/tasks/reorder`, { items }, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
        const refreshed = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/tasks`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
        setTasks(refreshed.data)
      } catch (err) { console.error(err) }
      setActiveId(null)
      return
    }

    // Cross-column move - move to end
    const dest = findColumn(destKey)
    const newPos = (dest && dest.items.length > 0) ? (dest.items[dest.items.length - 1].position || 0) + 1 : 1
    setLocalGroup(grouped.map(g => g.key === sourceKey ? { ...g, items: g.items.filter(i => i.id !== taskId) } : g.key === destKey ? { ...g, items: [...g.items, { id: taskId, title: 'Moving...', position: newPos, status: destKey }] } : g))

    try {
      await updateTask(taskId, { status: destKey, position: newPos })
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/tasks`)
      setTasks(res.data)
    } catch (err) {
      console.error(err)
    }

    setActiveId(null)
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragStart={(e)=> setActiveId(String(e.active.id))} onDragEnd={handleDragEnd} onDragCancel={() => setActiveId(null)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {grouped.map(col => (
          <KanbanColumn key={col.key} id={col.key} title={col.label}>
            <SortableContext items={col.items.map(i => String(i.id))} strategy={verticalListSortingStrategy}>
              {col.items.map(task => (
                <div key={task.id} data-status={task.status} data-id={task.id}>
                  <SortableTask task={task} onSave={(id:number, data:any)=> updateTask(id,data)} />
                </div>
              ))}
            </SortableContext>
            <div className="mt-2">
              <CreateTask onCreate={(title) => createTask(title, col.key === 'in_progress' ? 'in_progress' : col.key)} />
            </div>
          </KanbanColumn>
        ))}
      </div>

      <DragOverlay>{activeId ? <div className="p-3 bg-white dark:bg-gray-800 rounded shadow-sm">Moving...</div> : null}</DragOverlay>
    </DndContext>
  )
}

function CreateTask({ onCreate }: { onCreate: (title: string) => void }) {
  const [title, setTitle] = useState('')
  return (
    <div className="flex gap-2">
      <input value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 p-2 rounded border bg-transparent" placeholder="New task title" />
      <Button onClick={() => { if (title.trim()) { onCreate(title.trim()); setTitle('') } }} className="px-3">Add</Button>
    </div>
  )
}
