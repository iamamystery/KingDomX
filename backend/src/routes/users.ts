import { Router, Request, Response } from 'express'
import prisma from '../prisma'
import { verifyToken } from '../middleware/auth'

const router = Router()

// List users (JWT required)
router.get('/', verifyToken, async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true } })
  res.json(users)
})

export default router
