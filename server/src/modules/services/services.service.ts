import prisma from '../../lib/prisma.js'

export async function createService(input: {
  name: string
  durationMinutes: number
  price: number
  description?: string
  ownerId: string
}) {
  return prisma.service.create({
    data: {
      name: input.name,
      durationMinutes: input.durationMinutes,
      price: input.price,
      description: input.description ?? null,
      ownerId: input.ownerId,
    },
  })
}

export async function getUserServices(ownerId: string) {
  return prisma.service.findMany({
    where: { ownerId },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getServiceById(id: string, ownerId: string) {
  return prisma.service.findFirst({
    where: {
      id,
      ownerId,
    },
  })
}

export async function updateService(
  id: string,
  ownerId: string,
  input: {
    name?: string
    durationMinutes?: number
    price?: number
    description?: string
  }
) {
  const existing = await prisma.service.findFirst({
    where: {
      id,
      ownerId,
    },
  })

  if (!existing) {
    return null
  }

  return prisma.service.update({
    where: { id },
    data: {
      name: input.name ?? existing.name,
      durationMinutes: input.durationMinutes ?? existing.durationMinutes,
      price: input.price ?? existing.price,
      description: input.description ?? existing.description,
    },
  })
}

export async function deleteService(id: string, ownerId: string) {
  const existing = await prisma.service.findFirst({
    where: {
      id,
      ownerId,
    },
  })

  if (!existing) {
    return null
  }

  await prisma.service.delete({
    where: { id },
  })

  return { message: 'Service deleted successfully' }
}