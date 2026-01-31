import { Router } from 'express'
const router = Router()
router.get('/ping', (req, res) => res.json({ status: 'ok', now: new Date() }))
export default router
