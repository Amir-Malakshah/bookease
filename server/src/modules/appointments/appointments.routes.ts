import { Router } from 'express'
import { requireAuth } from '../../middleware/auth.middleware.js'
import {
  createAppointmentHandler,
  getAppointmentsHandler,
  updateStatusHandler,
} from './appointments.controller.js'

const router = Router()

router.use(requireAuth)

router.get('/', getAppointmentsHandler)
router.post('/', createAppointmentHandler)
router.patch('/:id/status', updateStatusHandler)

export default router