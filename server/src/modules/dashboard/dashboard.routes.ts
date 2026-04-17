import { Router } from 'express'
import { getDashboardHandler } from './dashboard.controller.js'
import { requireAuth } from '../../middleware/auth.middleware.js'

const router = Router()

router.get('/', requireAuth, getDashboardHandler)

export default router
