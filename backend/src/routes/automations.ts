import { Router, Request, Response } from 'express'
import prisma from '../prisma'
import { verifyToken, AuthenticatedRequest } from '../middleware/auth'

const router = Router()

// Get all automations for current user
router.get('/', verifyToken, async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user
  
  try {
    const automations = await prisma.automation.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })
    
    res.json(automations.map(a => ({
      ...a,
      trigger: JSON.parse(a.trigger),
      conditions: a.conditions ? JSON.parse(a.conditions) : null,
      actions: JSON.parse(a.actions)
    })))
  } catch (error) {
    console.error('Automations fetch error:', error)
    res.status(500).json({ message: 'Failed to fetch automations' })
  }
})

// Create automation
router.post('/', verifyToken, async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user
  const { name, trigger, conditions, actions } = req.body
  
  if (!name || !trigger || !actions) {
    return res.status(400).json({ message: 'Name, trigger, and actions are required' })
  }
  
  try {
    const automation = await prisma.automation.create({
      data: {
        name,
        trigger: JSON.stringify(trigger),
        conditions: conditions ? JSON.stringify(conditions) : null,
        actions: JSON.stringify(actions),
        userId: user.id
      }
    })
    
    res.json({
      ...automation,
      trigger: JSON.parse(automation.trigger),
      conditions: automation.conditions ? JSON.parse(automation.conditions) : null,
      actions: JSON.parse(automation.actions)
    })
  } catch (error) {
    console.error('Automation create error:', error)
    res.status(500).json({ message: 'Failed to create automation' })
  }
})

// Update automation
router.put('/:id', verifyToken, async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user
  const id = parseInt(req.params.id)
  const { name, trigger, conditions, actions, status } = req.body
  
  try {
    const automation = await prisma.automation.findFirst({
      where: { id, userId: user.id }
    })
    
    if (!automation) return res.status(404).json({ message: 'Automation not found' })
    
    const updated = await prisma.automation.update({
      where: { id },
      data: {
        name: name || automation.name,
        trigger: trigger ? JSON.stringify(trigger) : automation.trigger,
        conditions: conditions !== undefined ? JSON.stringify(conditions) : automation.conditions,
        actions: actions ? JSON.stringify(actions) : automation.actions,
        status: status || automation.status
      }
    })
    
    res.json({
      ...updated,
      trigger: JSON.parse(updated.trigger),
      conditions: updated.conditions ? JSON.parse(updated.conditions) : null,
      actions: JSON.parse(updated.actions)
    })
  } catch (error) {
    console.error('Automation update error:', error)
    res.status(500).json({ message: 'Failed to update automation' })
  }
})

// Delete automation
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user
  const id = parseInt(req.params.id)
  
  try {
    const automation = await prisma.automation.findFirst({
      where: { id, userId: user.id }
    })
    
    if (!automation) return res.status(404).json({ message: 'Automation not found' })
    
    await prisma.automation.delete({ where: { id } })
    res.json({ ok: true })
  } catch (error) {
    console.error('Automation delete error:', error)
    res.status(500).json({ message: 'Failed to delete automation' })
  }
})

// Run automation (increment run count)
router.post('/:id/run', verifyToken, async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user
  const id = parseInt(req.params.id)
  
  try {
    const automation = await prisma.automation.findFirst({
      where: { id, userId: user.id }
    })
    
    if (!automation) return res.status(404).json({ message: 'Automation not found' })
    
    const updated = await prisma.automation.update({
      where: { id },
      data: { runCount: { increment: 1 } }
    })
    
    res.json(updated)
  } catch (error) {
    console.error('Automation run error:', error)
    res.status(500).json({ message: 'Failed to run automation' })
  }
})

export default router
