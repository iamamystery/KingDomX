import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import helmet from 'helmet'
import prisma from './prisma'
import pingRouter from './routes/ping'
import authRouter from './routes/auth'
import tasksRouter from './routes/tasks'
import projectsRouter from './routes/projects'
import usersRouter from './routes/users'
import calendarRouter from './routes/calendar'
import automationsRouter from './routes/automations'
import reportsRouter from './routes/reports'
import passport from 'passport'
import initializePassport from './passport'

dotenv.config()

// Initialize passport strategies (Google/GitHub if configured)
initializePassport()

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())

// session for OAuth state storage
import cookieSession from 'cookie-session'
app.use(cookieSession({ name: 'kingdomx_session', keys: [process.env.COOKIE_KEY || 'dev-key'], maxAge: 24 * 60 * 60 * 1000 }))
app.use(passport.initialize())

// rate limiter
import rateLimit from 'express-rate-limit'
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 })
app.use(limiter)

app.use('/api', pingRouter)
app.use('/api/auth', authRouter)
app.use('/api/tasks', tasksRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/users', usersRouter)
app.use('/api/calendar', calendarRouter)
app.use('/api/automations', automationsRouter)
app.use('/api/reports', reportsRouter)

// Root route - fix "Cannot GET /" error
app.get('/', (req, res) => {
  res.json({ message: 'KingdomX API Server', version: '0.1.0', status: 'running' })
})

// error handler (last)
import errorHandler from './middleware/error'
app.use(errorHandler)

app.get('/api/health-db', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({ db: 'ok' })
  } catch (err) {
    res.status(500).json({ db: 'error', error: String(err) })
  }
})

const PORT = process.env.PORT || 4000

if (require.main === module) {
  const server = http.createServer(app)
  const io = new Server(server, { cors: { origin: '*' } })

  io.on('connection', (socket) => {
    console.log('socket connected', socket.id)
    socket.on('hello', (msg) => socket.emit('hello', `Received: ${msg}`))
  })

  // store io on app for routes to emit events
  app.set('io', io)

  server.listen(PORT, () => {
    console.log(`KingdomX backend running on port ${PORT}`)
  })
}

export default app
