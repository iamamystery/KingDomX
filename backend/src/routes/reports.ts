import { Router, Request, Response } from 'express'
import prisma from '../prisma'
import { verifyToken, AuthenticatedRequest } from '../middleware/auth'

const router = Router()

// Get analytics dashboard data
router.get('/dashboard', verifyToken, async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user
  
  try {
    const [tasks, projects, recentTasks] = await Promise.all([
      prisma.task.findMany({
        where: {
          OR: [
            { assigneeId: user.id },
            { project: { ownerId: user.id } }
          ]
        }
      }),
      prisma.project.findMany({
        where: { ownerId: user.id }
      }),
      prisma.task.findMany({
        where: {
          OR: [
            { assigneeId: user.id },
            { project: { ownerId: user.id } }
          ]
        },
        orderBy: { updatedAt: 'desc' },
        take: 10
      })
    ])
    
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(t => t.status === 'done').length
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length
    const todoTasks = tasks.filter(t => t.status === 'todo').length
    
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    
    // Calculate tasks completed this week
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    
    const completedThisWeek = tasks.filter(t => 
      t.status === 'done' && 
      t.updatedAt >= oneWeekAgo
    ).length
    
    // Calculate trend
    const twoWeeksAgo = new Date()
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
    const completedLastWeek = tasks.filter(t => 
      t.status === 'done' && 
      t.updatedAt >= twoWeeksAgo &&
      t.updatedAt < oneWeekAgo
    ).length
    
    let trend = '+0%'
    if (completedLastWeek > 0) {
      const change = Math.round(((completedThisWeek - completedLastWeek) / completedLastWeek) * 100)
      trend = `${change >= 0 ? '+' : ''}${change}%`
    } else if (completedThisWeek > 0) {
      trend = '+100%'
    }
    
    res.json({
      overview: {
        totalTasks,
        completedTasks,
        inProgressTasks,
        todoTasks,
        totalProjects: projects.length,
        completionRate
      },
      weekly: {
        completedThisWeek,
        trend
      },
      recentActivity: recentTasks.map(t => ({
        id: t.id,
        title: t.title,
        status: t.status,
        updatedAt: t.updatedAt
      })),
      byProject: projects.map(p => ({
        id: p.id,
        name: p.name,
        taskCount: tasks.filter(t => t.projectId === p.id).length,
        completedCount: tasks.filter(t => t.projectId === p.id && t.status === 'done').length
      }))
    })
  } catch (error) {
    console.error('Reports dashboard error:', error)
    res.status(500).json({ message: 'Failed to fetch dashboard data' })
  }
})

// Get task completion trends (for charts)
router.get('/trends', verifyToken, async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user
  
  try {
    // Get last 30 days of task activity
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { assigneeId: user.id },
          { project: { ownerId: user.id } }
        ],
        createdAt: { gte: thirtyDaysAgo }
      }
    })
    
    // Group by date
    const dailyStats = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)
      
      const dayTasks = tasks.filter(t => 
        t.createdAt >= date && t.createdAt < nextDate
      )
      const dayCompleted = tasks.filter(t => 
        t.status === 'done' && 
        t.updatedAt >= date && 
        t.updatedAt < nextDate
      )
      
      dailyStats.push({
        date: date.toISOString().split('T')[0],
        created: dayTasks.length,
        completed: dayCompleted.length
      })
    }
    
    res.json({ dailyStats })
  } catch (error) {
    console.error('Reports trends error:', error)
    res.status(500).json({ message: 'Failed to fetch trends data' })
  }
})

// Get productivity metrics
router.get('/productivity', verifyToken, async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user
  
  try {
    const tasks = await prisma.task.findMany({
      where: {
        assigneeId: user.id,
        status: 'done'
      }
    })
    
    // Calculate average time to complete (from created to updated)
    const completionTimes = tasks
      .filter(t => t.updatedAt > t.createdAt)
      .map(t => ({
        hours: (t.updatedAt.getTime() - t.createdAt.getTime()) / (1000 * 60 * 60),
        task: t
      }))
    
    const avgHours = completionTimes.length > 0
      ? completionTimes.reduce((sum, t) => sum + t.hours, 0) / completionTimes.length
      : 0
    
    res.json({
      completedTasks: tasks.length,
      averageCompletionTime: Math.round(avgHours * 10) / 10, // Round to 1 decimal
      quickWins: completionTimes.filter(t => t.hours < 24).length,
      longRunning: completionTimes.filter(t => t.hours > 168).length // > 7 days
    })
  } catch (error) {
    console.error('Reports productivity error:', error)
    res.status(500).json({ message: 'Failed to fetch productivity data' })
  }
})

export default router
