import { Router } from 'express'
import { requireAuth } from '../../middleware/auth.middleware.js'
import {
  createClientHandler,
  deleteClientHandler,
  getClientByIdHandler,
  getClientsHandler,
  updateClientHandler,
} from './clients.controller.js'

const router = Router()

router.use(requireAuth)

router.get('/', getClientsHandler)
router.post('/', createClientHandler)
router.get('/:id', getClientByIdHandler)
router.patch('/:id', updateClientHandler)
router.delete('/:id', deleteClientHandler)

export default router