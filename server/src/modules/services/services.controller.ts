import type { Request, Response } from 'express'
import {
  createService,
  deleteService,
  getServiceById,
  getUserServices,
  updateService,
} from './services.service.js'

export async function createServiceHandler(req: Request, res: Response) {
  try {
    const ownerId = req.user?.userId
    const { name, durationMinutes, price, description } = req.body

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!name || durationMinutes === undefined || price === undefined) {
      return res.status(400).json({
        message: 'Name, durationMinutes, and price are required',
      })
    }

    const service = await createService({
      name,
      durationMinutes: Number(durationMinutes),
      price: Number(price),
      description,
      ownerId,
    })

    return res.status(201).json(service)
  } catch {
    return res.status(500).json({ message: 'Failed to create service' })
  }
}

export async function getServicesHandler(req: Request, res: Response) {
  try {
    const ownerId = req.user?.userId

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const services = await getUserServices(ownerId)
    return res.status(200).json(services)
  } catch {
    return res.status(500).json({ message: 'Failed to load services' })
  }
}

export async function getServiceByIdHandler(req: Request, res: Response) {
  try {
    const ownerId = req.user?.userId
    const id = req.params.id

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: 'Invalid service id' })
    }

    const service = await getServiceById(id, ownerId)

    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }

    return res.status(200).json(service)
  } catch {
    return res.status(500).json({ message: 'Failed to load service' })
  }
}

export async function updateServiceHandler(req: Request, res: Response) {
  try {
    const ownerId = req.user?.userId
    const id = req.params.id
    const { name, durationMinutes, price, description } = req.body

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: 'Invalid service id' })
    }

    const updateData: {
        name?: string
        durationMinutes?: number
        price?: number
        description?: string
      } = {}
  
      if (name !== undefined) {
        updateData.name = name
      }
  
      if (durationMinutes !== undefined) {
        updateData.durationMinutes = Number(durationMinutes)
      }
  
      if (price !== undefined) {
        updateData.price = Number(price)
      }
  
      if (description !== undefined) {
        updateData.description = description
      }
  
      const updated = await updateService(id, ownerId, updateData)
  
      if (!updated) {
        return res.status(404).json({ message: 'Service not found' })
      }
  
      return res.status(200).json(updated)
    } catch {
      return res.status(500).json({ message: 'Failed to update service' })
    }
  }

export async function deleteServiceHandler(req: Request, res: Response) {
  try {
    const ownerId = req.user?.userId
    const id = req.params.id

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: 'Invalid service id' })
    }

    const result = await deleteService(id, ownerId)

    if (!result) {
      return res.status(404).json({ message: 'Service not found' })
    }

    return res.status(200).json(result)
  } catch {
    return res.status(500).json({ message: 'Failed to delete service' })
  }
}