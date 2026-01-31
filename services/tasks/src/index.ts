import express from 'express'
const app = express()
app.use(express.json())

app.get('/health', (req, res) => res.json({ ok: true }))

app.listen(5002, () => console.log('Tasks service running on 5002'))
