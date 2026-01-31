import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(express.json())

app.post('/suggest-task', async (req, res) => {
  const { prompt } = req.body
  const key = process.env.OPENAI_API_KEY
  if (!key) {
    // mock suggestion
    return res.json({ suggestion: `Mock suggestion for: ${prompt}`, source: 'mock' })
  }

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are an assistant that suggests concise actionable tasks.' }, { role: 'user', content: `Suggest tasks for: ${prompt}` }],
      max_tokens: 200,
    }, {
      headers: { Authorization: `Bearer ${key}` }
    })

    const suggestion = response.data.choices?.[0]?.message?.content || 'No suggestion'
    res.json({ suggestion, source: 'openai' })
  } catch (err: any) {
    res.status(500).json({ error: err?.message || String(err) })
  }
})

app.listen(5004, () => console.log('AI service running on 5004'))
