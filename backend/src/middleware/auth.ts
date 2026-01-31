import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayload {
  id?: number
  email?: string
  role?: string
  iat?: number
  exp?: number
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ message: 'No token' })
  const token = auth.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as TokenPayload
    ;(req as any).user = payload
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export function requireRole(roles: string | string[]) {
  const allowed = Array.isArray(roles) ? roles : [roles]
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as TokenPayload
    if (!user || !user.role || !allowed.includes(user.role)) return res.status(403).json({ message: 'Forbidden' })
    next()
  }
}
