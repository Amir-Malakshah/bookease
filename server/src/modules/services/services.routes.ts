import { Router } from 'express'
import { requireAuth } from '../../middleware/auth.middleware.js'
import {
  createServiceHandler,
  deleteServiceHandler,
  getServiceByIdHandler,
  getServicesHandler,
  updateServiceHandler,
} from './services.controller.js'

const router = Router()

router.use(requireAuth)

router.get('/', getServicesHandler)
router.post('/', createServiceHandler)
router.get('/:id', getServiceByIdHandler)
router.patch('/:id', updateServiceHandler)
router.delete('/:id', deleteServiceHandler)

export default router