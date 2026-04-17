import prisma from '../../lib/prisma.js'

export async function getDashboardStats(ownerId: string) {
  const clientsCount = await prisma.client.count({
    where: { ownerId },
  })

  const appointments = await prisma.appointment.findMany({
    where: { ownerId },
    include: { service: true },
  })

  const totalRevenue = appointments
    .filter((a) => a.status === 'COMPLETED')
    .reduce((sum, a) => sum + a.service.price, 0)

  const upcomingAppointments = await prisma.appointment.findMany({
    where: {
      ownerId,
      appointmentDate: {
        gte: new Date(),
      },
    },
    orderBy: {
      appointmentDate: 'asc',
    },
    take: 5,
    include: {
      client: true,
      service: true,
    },
  })

  return {
    clientsCount,
    totalRevenue,
    upcomingAppointments,
  }
}
