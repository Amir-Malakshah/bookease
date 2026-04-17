import type { Request, Response } from 'express'
import { getDashboardStats } from './dashboard.service.js'

export async function getDashboardHandler(req: Request, res: Response) {
  try {
    const ownerId = req.user?.userId

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const stats = await getDashboardStats(ownerId)

    return res.json(stats)
  } catch {
    return res.status(500).json({ message: 'Failed to load dashboard' })
  }
}
