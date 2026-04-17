import prisma from '../../lib/prisma.js'
import { AppointmentStatus } from '@prisma/client'

export async function createAppointment(input: {
  appointmentDate: Date
  clientId: string
  serviceId: string
  notes?: string
  ownerId: string
}) {
  return prisma.appointment.create({
    data: {
      appointmentDate: input.appointmentDate,
      clientId: input.clientId,
      serviceId: input.serviceId,
      notes: input.notes ?? null,
      ownerId: input.ownerId,
    },
    include: {
      client: true,
      service: true,
    },
  })
}

export async function getAppointments(ownerId: string) {
  return prisma.appointment.findMany({
    where: { ownerId },
    include: {
      client: true,
      service: true,
    },
    orderBy: {
      appointmentDate: 'asc',
    },
  })
}

export async function updateAppointmentStatus(
  id: string,
  ownerId: string,
  status: AppointmentStatus
) {
  const existing = await prisma.appointment.findFirst({
    where: { id, ownerId },
  })

  if (!existing) {
    return null
  }

  return prisma.appointment.update({
    where: { id },
    data: { status },
    include: {
      client: true,
      service: true,
    },
  })
}