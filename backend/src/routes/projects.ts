import { Router, Request, Response } from 'express'
import prisma from '../prisma'
import { verifyToken, requireRole, AuthenticatedRequest } from '../middleware/auth'

const router = Router()

router.get('/', verifyToken, async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user
  
  try {
    const projects = await prisma.project.findMany({ 
      where: { ownerId: user.id },
      include: { owner: true, tasks: true } 
    })
    res.json(projects)
  } catch (error) {
    console.error('Projects fetch error:', error)
    res.status(500).json({ message: 'Failed to fetch projects' })
  }
})

router.post('/', verifyToken, requireRole(['ADMIN', 'MANAGER']), async (req: Request, res: Response) => {
  const { name, description } = req.body
  const user = (req as AuthenticatedRequest).user
  
  if (!name) {
    return res.status(400).json({ message: 'Project name is required' })
  }
  
  try {
    const project = await prisma.project.create({ 
      data: { name, description, ownerId: user.id } 
    })
    res.json(project)
  } catch (error) {
    console.error('Project create error:', error)
    res.status(500).json({ message: 'Failed to create project' })
  }
})

router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const project = await prisma.project.findUnique({ where: { id }, include: { owner: true, tasks: { include: { assignee: true } } } })
    if (!project) return res.status(404).json({ message: 'Project not found' })
    res.json(project)
  } catch (error) {
    console.error('Project fetch error:', error)
    res.status(500).json({ message: 'Failed to fetch project' })
  }
})

router.put('/:id', verifyToken, requireRole(['ADMIN', 'MANAGER']), async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { name, description } = req.body
  
  try {
    const project = await prisma.project.update({ where: { id }, data: { name, description } })
    res.json(project)
  } catch (error) {
    console.error('Project update error:', error)
    res.status(500).json({ message: 'Failed to update project' })
  }
})

router.delete('/:id', verifyToken, requireRole(['ADMIN']), async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  
  try {
    await prisma.project.delete({ where: { id } })
    res.json({ ok: true })
  } catch (error) {
    console.error('Project delete error:', error)
    res.status(500).json({ message: 'Failed to delete project' })
  }
})

export default router