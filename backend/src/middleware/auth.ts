import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface TokenPayload {
  id: number
  email: string
  role: string
  iat?: number
  exp?: number
}

export interface AuthenticatedRequest extends Request {
  user: TokenPayload
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ message: 'No token' })
  
  const token = auth.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Invalid token format' })
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as TokenPayload
    ;(req as AuthenticatedRequest).user = payload
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export function requireRole(roles: string | string[]) {
  const allowed = Array.isArray(roles) ? roles : [roles]
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthenticatedRequest).user
    if (!user || !user.role || !allowed.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    next()
  }
}
