import type { Request, Response } from 'express'
import {
  createClient,
  deleteClient,
  getClientById,
  getUserClients,
  updateClient,
} from './clients.service.js'

export async function createClientHandler(req: Request, res: Response) {
  try {
    const ownerId = req.user?.userId
    const { firstName, lastName, email, phone, notes } = req.body

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        message: 'First name, last name, and email are required',
      })
    }

    const client = await createClient({
      firstName,
      lastName,
      email,
      phone,
      notes,
      ownerId,
    })

    return res.status(201).json(client)
  } catch {
    return res.status(500).json({ message: 'Failed to create client' })
  }
}

export async function getClientsHandler(req: Request, res: Response) {
  try {
    const ownerId = req.user?.userId

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const clients = await getUserClients(ownerId)
    return res.status(200).json(clients)
  } catch {
    return res.status(500).json({ message: 'Failed to load clients' })
  }
}

export async function getClientByIdHandler(req: Request, res: Response) {
  try {
    const ownerId = req.user?.userId
    const id = req.params.id

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: 'Invalid client id' })
    }

    const client = await getClientById(id, ownerId)

    if (!client) {
      return res.status(404).json({ message: 'Client not found' })
    }

    return res.status(200).json(client)
  } catch {
    return res.status(500).json({ message: 'Failed to load client' })
  }
}

export async function updateClientHandler(req: Request, res: Response) {
  try {
    const ownerId = req.user?.userId
    const id = req.params.id
    const { firstName, lastName, email, phone, notes } = req.body

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: 'Invalid client id' })
    }

    const updated = await updateClient(id, ownerId, {
      firstName,
      lastName,
      email,
      phone,
      notes,
    })

    if (!updated) {
      return res.status(404).json({ message: 'Client not found' })
    }

    return res.status(200).json(updated)
  } catch {
    return res.status(500).json({ message: 'Failed to update client' })
  }
}

export async function deleteClientHandler(req: Request, res: Response) {
  try {
    const ownerId = req.user?.userId
    const id = req.params.id

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: 'Invalid client id' })
    }

    const result = await deleteClient(id, ownerId)

    if (!result) {
      return res.status(404).json({ message: 'Client not found' })
    }

    return res.status(200).json(result)
  } catch {
    return res.status(500).json({ message: 'Failed to delete client' })
  }
}