import express from 'express'
const app = express()
app.use(express.json())

app.get('/health', (req, res) => res.json({ ok: true }))

app.listen(5003, () => console.log('Notifications service running on 5003'))
