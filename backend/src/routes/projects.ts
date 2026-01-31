import { Router, Request, Response } from 'express'
import prisma from '../prisma'
import { verifyToken, requireRole } from '../middleware/auth'

const router = Router()

router.get('/', verifyToken, async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany({ include: { owner: true, tasks: true } })
  res.json(projects)
})

router.post('/', verifyToken, requireRole(['ADMIN', 'MANAGER']), async (req: Request, res: Response) => {
  const { name, description } = req.body
  const user = (req as any).user
  const project = await prisma.project.create({ data: { name, description, ownerId: user.id } })
  res.json(project)
})

router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const project = await prisma.project.findUnique({ where: { id }, include: { owner: true, tasks: { include: { assignee: true } } } })
  if (!project) return res.status(404).json({ message: 'Project not found' })
  res.json(project)
})

router.put('/:id', verifyToken, requireRole(['ADMIN', 'MANAGER']), async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { name, description } = req.body
  const project = await prisma.project.update({ where: { id }, data: { name, description } })
  res.json(project)
})

router.delete('/:id', verifyToken, requireRole(['ADMIN']), async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  await prisma.project.delete({ where: { id } })
  res.json({ ok: true })
})

export default router