import { Router, Request, Response } from 'express'
import prisma from '../prisma'
import { verifyToken, requireRole } from '../middleware/auth'

const router = Router()
import { body, validationResult } from 'express-validator'

// List tasks (all roles can view; rolled-up permissions can be enhanced)
router.get('/', verifyToken, async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({ include: { assignee: true, project: true } })
  res.json(tasks)
})

// Create task
router.post('/', verifyToken, requireRole(['ADMIN', 'MANAGER', 'STAFF']), [
  body('title').isLength({ min: 1 }),
  body('status').optional().isIn(['todo', 'in_progress', 'done'])
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { title, description, dueDate, assigneeId, projectId, status } = req.body
  // compute position: max position in column + 1
  const maxPosRes: any = await prisma.$queryRaw`SELECT COALESCE(MAX("position"), 0) as max FROM "Task" WHERE status = ${status || 'todo'}`
  const pos = (maxPosRes && maxPosRes[0] && maxPosRes[0].max) ? Number(maxPosRes[0].max) + 1 : 1
  const task = await prisma.task.create({ data: { title, description, status: status || 'todo', position: pos, dueDate: dueDate ? new Date(dueDate) : undefined, assigneeId, projectId } })
  // emit real-time event if socket exists
  try { (req.app.get('io') as any)?.emit('task:created', task) } catch (e) {}
  res.json(task)
})

// Get single task
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const task = await prisma.task.findUnique({ where: { id }, include: { assignee: true, project: true } })
  if (!task) return res.status(404).json({ message: 'Task not found' })
  res.json(task)
})

// Update task
router.put('/:id', verifyToken, requireRole(['ADMIN', 'MANAGER', 'STAFF']), async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { title, description, status, dueDate, assigneeId, position } = req.body
  const updates: any = { title, description, status, dueDate: dueDate ? new Date(dueDate) : undefined, assigneeId }
  if (typeof position !== 'undefined') updates.position = position
  const task = await prisma.task.update({ where: { id }, data: updates })
  try { (req.app.get('io') as any)?.emit('task:updated', task) } catch (e) {}
  res.json(task)
})

// Reorder endpoint: accept array of {id, status, position}
router.post('/reorder', verifyToken, requireRole(['ADMIN', 'MANAGER', 'STAFF']), async (req: Request, res: Response) => {
  const { items } = req.body // items: [{ id, status, position }]
  if (!Array.isArray(items)) return res.status(400).json({ message: 'items required' })
  const tx = await prisma.$transaction(items.map((it: any) => prisma.task.update({ where: { id: it.id }, data: { status: it.status, position: it.position } })))
  try { (req.app.get('io') as any)?.emit('tasks:reordered', tx) } catch (e) {}
  res.json({ ok: true })
})

// Delete task
router.delete('/:id', verifyToken, requireRole(['ADMIN', 'MANAGER']), async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  await prisma.task.delete({ where: { id } })
  try { (req.app.get('io') as any)?.emit('task:deleted', { id }) } catch (e) {}
  res.json({ ok: true })
})

export default router