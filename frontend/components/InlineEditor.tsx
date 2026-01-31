import { useState, useRef, useEffect } from 'react'

export default function InlineEditor({ value, onSave }: { value: string, onSave: (v: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(value)
  const ref = useRef<HTMLInputElement | null>(null)

  useEffect(() => { setVal(value) }, [value])
  useEffect(() => { if (editing) ref.current?.focus() }, [editing])

  return editing ? (
    <div className="flex gap-2">
      <input ref={ref} className="flex-1 p-1 border-b bg-transparent" value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { onSave(val); setEditing(false) } }} />
      <button className="px-2 py-1 text-sm bg-brand-500 text-white rounded" onClick={() => { onSave(val); setEditing(false) }}>Save</button>
      <button className="px-2 py-1 text-sm rounded" onClick={() => { setVal(value); setEditing(false) }}>Cancel</button>
    </div>
  ) : (
    <div onDoubleClick={() => setEditing(true)} className="font-medium cursor-text" role="textbox" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') setEditing(true) }}>{value}</div>
  )
}
