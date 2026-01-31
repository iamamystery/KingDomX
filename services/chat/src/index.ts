import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })

io.on('connection', (socket) => {
  console.log('chat socket connected', socket.id)
  socket.on('message', (msg) => io.emit('message', msg))
})

httpServer.listen(5001, () => console.log('Chat service running on 5001'))
