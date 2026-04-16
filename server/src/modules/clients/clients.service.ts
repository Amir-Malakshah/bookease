import prisma from '../../lib/prisma.js'

export async function createClient(input: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  notes?: string
  ownerId: string
}) {
  return prisma.client.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone ?? null,
      notes: input.notes ?? null,
      ownerId: input.ownerId,
    },
  })
}

export async function getUserClients(ownerId: string) {
  return prisma.client.findMany({
    where: { ownerId },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getClientById(id: string, ownerId: string) {
  return prisma.client.findFirst({
    where: {
      id,
      ownerId,
    },
  })
}

export async function updateClient(
  id: string,
  ownerId: string,
  input: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    notes?: string
  }
) {
  const existing = await prisma.client.findFirst({
    where: {
      id,
      ownerId,
    },
  })

  if (!existing) {
    return null
  }

  return prisma.client.update({
    where: { id },
    data: {
      firstName: input.firstName ?? existing.firstName,
      lastName: input.lastName ?? existing.lastName,
      email: input.email ?? existing.email,
      phone: input.phone ?? existing.phone,
      notes: input.notes ?? existing.notes,
    },
  })
}

export async function deleteClient(id: string, ownerId: string) {
  const existing = await prisma.client.findFirst({
    where: {
      id,
      ownerId,
    },
  })

  if (!existing) {
    return null
  }

  await prisma.client.delete({
    where: { id },
  })

  return { message: 'Client deleted successfully' }
}