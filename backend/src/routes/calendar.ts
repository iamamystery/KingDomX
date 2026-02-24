import { Router, Request, Response } from 'express'
import prisma from '../prisma'
import { verifyToken, AuthenticatedRequest } from '../middleware/auth'

const router = Router()

// Get all calendar events for current user
router.get('/', verifyToken, async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user
  const { start, end } = req.query
  
  let whereClause: any = { userId: user.id }
  
  if (start && end) {
    whereClause.startDate = {
      gte: new Date(start as string),
      lte: new Date(end as string)
    }
  }
  
  try {
    const events = await prisma.calendarEvent.findMany({
      where: whereClause,
      include: { task: { include: { project: true } } },
      orderBy: { startDate: 'asc' }
    })
    res.json(events)
  } catch (error) {
    console.error('Calendar fetch error:', error)
    res.status(500).json({ message: 'Failed to fetch calendar events' })
  }
})

// Create calendar event
router.post('/', verifyToken, async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user
  const { title, description, startDate, endDate, allDay, type, taskId } = req.body
  
  if (!title || !startDate) {
    return res.status(400).json({ message: 'Title and startDate are required' })
  }
  
  try {
    const event = await prisma.calendarEvent.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        allDay: allDay || false,
        type: type || 'event',
        taskId: taskId ? parseInt(taskId) : null,
        userId: user.id
      },
      include: { task: { include: { project: true } } }
    })
    res.json(event)
  } catch (error) {
    console.error('Calendar create error:', error)
    res.status(500).json({ message: 'Failed to create event' })
  }
})

// Update calendar event
router.put('/:id', verifyToken, async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user
  const id = parseInt(req.params.id)
  const { title, description, startDate, endDate, allDay, type } = req.body
  
  try {
    const event = await prisma.calendarEvent.findFirst({
      where: { id, userId: user.id }
    })
    
    if (!event) return res.status(404).json({ message: 'Event not found' })
    
    const updated = await prisma.calendarEvent.update({
      where: { id },
      data: {
        title: title || event.title,
        description: description !== undefined ? description : event.description,
        startDate: startDate ? new Date(startDate) : event.startDate,
        endDate: endDate !== undefined ? (endDate ? new Date(endDate) : null) : event.endDate,
        allDay: allDay !== undefined ? allDay : event.allDay,
        type: type || event.type
      },
      include: { task: { include: { project: true } } }
    })
    res.json(updated)
  } catch (error) {
    console.error('Calendar update error:', error)
    res.status(500).json({ message: 'Failed to update event' })
  }
})

// Delete calendar event
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user
  const id = parseInt(req.params.id)
  
  try {
    const event = await prisma.calendarEvent.findFirst({
      where: { id, userId: user.id }
    })
    
    if (!event) return res.status(404).json({ message: 'Event not found' })
    
    await prisma.calendarEvent.delete({ where: { id } })
    res.json({ ok: true })
  } catch (error) {
    console.error('Calendar delete error:', error)
    res.status(500).json({ message: 'Failed to delete event' })
  }
})

export default router
