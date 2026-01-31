import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

export default function useSocket(path = '/') {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    const socket = io(base, { path: '/', transports: ['websocket'], autoConnect: true })
    socketRef.current = socket

    socket.on('connect', () => console.log('socket connected', socket.id))
    socket.on('disconnect', () => console.log('socket disconnected'))

    return () => {
      socket.disconnect()
    }
  }, [])

  return socketRef
}
