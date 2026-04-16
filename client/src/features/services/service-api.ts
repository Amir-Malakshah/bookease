import { http } from '../../api/http'

export type Service = {
  id: string
  name: string
  durationMinutes: number
  price: number
  description: string | null
  ownerId: string
  createdAt: string
  updatedAt: string
}

export async function getServicesRequest(): Promise<Service[]> {
  const response = await http.get('/services')
  return response.data
}

export async function getServiceRequest(id: string): Promise<Service> {
  const response = await http.get(`/services/${id}`)
  return response.data
}

export async function createServiceRequest(data: {
  name: string
  durationMinutes: number
  price: number
  description?: string
}): Promise<Service> {
  const response = await http.post('/services', data)
  return response.data
}

export async function updateServiceRequest(
  id: string,
  data: {
    name?: string
    durationMinutes?: number
    price?: number
    description?: string
  }
): Promise<Service> {
  const response = await http.patch(`/services/${id}`, data)
  return response.data
}

export async function deleteServiceRequest(id: string): Promise<{ message: string }> {
  const response = await http.delete(`/services/${id}`)
  return response.data
}