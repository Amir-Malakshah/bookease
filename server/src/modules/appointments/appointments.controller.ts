import type { Request, Response } from 'express'
import { AppointmentStatus } from '@prisma/client'
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
} from './appointments.service.js'

export async function createAppointmentHandler(req: Request, res: Response) {
  try {
    const ownerId = req.user?.userId
    const { appointmentDate, clientId, serviceId, notes } = req.body

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!appointmentDate|| !clientId || !serviceId) {
      return res.status(400).json({
        message: 'appointmentDate, clientId, serviceId are required',
      })
    }

    const appointment = await createAppointment({
        appointmentDate: new Date(appointmentDate),
        clientId,
        serviceId,
        notes,
        ownerId,
      })

    return res.status(201).json(appointment)
  } catch {
    return res.status(500).json({ message: 'Failed to create appointment' })
  }
}

export async function getAppointmentsHandler(req: Request, res: Response) {
  try {
    const ownerId = req.user?.userId

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const appointments = await getAppointments(ownerId)
    return res.status(200).json(appointments)
  } catch {
    return res.status(500).json({ message: 'Failed to load appointments' })
  }
}

export async function updateStatusHandler(req: Request, res: Response) {
  try {
    const ownerId = req.user?.userId
    const id = req.params.id
    const { status } = req.body

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!id || Array.isArray(id)) {
        return res.status(400).json({ message: 'Invalid appointment id' })
    }

    if (
        !status ||
        !Object.values(AppointmentStatus).includes(status as AppointmentStatus)
      ) {
        return res.status(400).json({ message: 'Invalid appointment status' })
      }

    const updated = await updateAppointmentStatus(id, ownerId, status as AppointmentStatus)

    if (!updated) {
      return res.status(404).json({ message: 'Appointment not found' })
    }

    return res.status(200).json(updated)
  } catch {
    return res.status(500).json({ message: 'Failed to update status' })
  }
}