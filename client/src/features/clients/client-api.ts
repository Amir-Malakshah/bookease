import { http } from '../../api/http'

export type Client = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  notes: string | null
  ownerId: string
  createdAt: string
  updatedAt: string
}

export async function getClientsRequest(): Promise<Client[]> {
  const response = await http.get('/clients')
  return response.data
}

export async function getClientRequest(id: string): Promise<Client> {
  const response = await http.get(`/clients/${id}`)
  return response.data
}

export async function createClientRequest(data: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  notes?: string
}): Promise<Client> {
  const response = await http.post('/clients', data)
  return response.data
}

export async function updateClientRequest(
  id: string,
  data: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    notes?: string
  }
): Promise<Client> {
  const response = await http.patch(`/clients/${id}`, data)
  return response.data
}

export async function deleteClientRequest(id: string): Promise<{ message: string }> {
  const response = await http.delete(`/clients/${id}`)
  return response.data
}