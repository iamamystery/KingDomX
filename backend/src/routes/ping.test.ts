import request from 'supertest'
import express from 'express'
import pingRouter from './ping'

const app = express()
app.use('/api', pingRouter)

describe('GET /api/ping', () => {
  it('should respond with status ok', async () => {
    const res = await request(app).get('/api/ping')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})
