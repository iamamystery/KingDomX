import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from '../prisma'
import { verifyToken } from '../middleware/auth'
import passport from 'passport'

const router = Router()

// Local signup
import { body, validationResult } from 'express-validator'

router.post('/signup', [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('name').optional().isLength({ max: 100 })
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { email, password, name } = req.body
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(409).json({ message: 'User already exists' })
  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { email, name, password: hashed, role: 'CLIENT' } })
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
})

// Local login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' })
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) return res.status(401).json({ message: 'Invalid credentials' })
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ message: 'Invalid credentials' })
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
  res.json({ token })
})

// Get current user
router.get('/me', verifyToken, async (req: Request, res: Response) => {
  const user = (req as any).user
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!dbUser) return res.status(404).json({ message: 'User not found' })
  res.json({ id: dbUser.id, email: dbUser.email, name: dbUser.name, role: dbUser.role })
})

// OAuth: Google - with state
router.get('/oauth/google', (req: Request & { session?: any }, res: Response, next: any) => {
  const state = Math.random().toString(36).slice(2)
  req.session = { ...req.session, oauthState: state }
  passport.authenticate('google', { scope: ['profile', 'email'], state })(req, res, next)
})
router.get('/oauth/google/callback', (req: Request & { session?: any }, res: Response, next: any) => {
  const incoming = req.query.state as string | undefined
  const stored = req.session?.oauthState as string | undefined
  if (!incoming || !stored || incoming !== stored) return res.redirect(process.env.FRONTEND_URL + '/login?error=oauth_state_mismatch')
  passport.authenticate('google', { session: false, failureRedirect: process.env.FRONTEND_URL + '/login' })(req, res, next)
}, (req: Request, res: Response) => {
  const user = (req as any).user
  const token = (user && (user as any).jwtToken) || ''
  const redirect = `${process.env.FRONTEND_URL || 'http://localhost:3000'}?token=${token}`
  res.redirect(redirect)
})

// OAuth: GitHub - with state
router.get('/oauth/github', (req: Request & { session?: any }, res: Response, next: any) => {
  const state = Math.random().toString(36).slice(2)
  req.session = { ...req.session, oauthState: state }
  passport.authenticate('github', { scope: ['user:email'], state })(req, res, next)
})
router.get('/oauth/github/callback', (req: Request & { session?: any }, res: Response, next: any) => {
  const incoming = req.query.state as string | undefined
  const stored = req.session?.oauthState as string | undefined
  if (!incoming || !stored || incoming !== stored) return res.redirect(process.env.FRONTEND_URL + '/login?error=oauth_state_mismatch')
  passport.authenticate('github', { session: false, failureRedirect: process.env.FRONTEND_URL + '/login' })(req, res, next)
}, (req: Request, res: Response) => {
  const user = (req as any).user
  const token = (user && (user as any).jwtToken) || ''
  const redirect = `${process.env.FRONTEND_URL || 'http://localhost:3000'}?token=${token}`
  res.redirect(redirect)
})

// Demo token (useful for sandbox/testing)
router.get('/demo', async (req, res) => {
  const role = (req.query.role as string) || 'CLIENT'
  const email = `demo.${role.toLowerCase()}@kingdomx.local`
  let user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    user = await prisma.user.create({ data: { email, name: `Demo ${role}`, role: role as any } })
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
  res.json({ token })
})

export default router
