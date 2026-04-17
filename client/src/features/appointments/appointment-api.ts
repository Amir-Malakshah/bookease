import { http } from '../../api/http'

export type AppointmentStatus =
  | 'SCHEDULED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'

export type Appointment = {
  id: string
  appointmentDate: string
  status: AppointmentStatus
  notes: string | null
  clientId: string
  serviceId: string
  client: {
    id: string
    firstName: string
    lastName: string
  }
  service: {
    id: string
    name: string
    durationMinutes: number
    price: number
  }
}

export async function getAppointmentsRequest(): Promise<Appointment[]> {
  const res = await http.get('/appointments')
  return res.data
}

export async function getAppointmentRequest(id: string): Promise<Appointment> {
  const res = await http.get(`/appointments/${id}`)
  return res.data
}

export async function createAppointmentRequest(data: {
  appointmentDate: string
  clientId: string
  serviceId: string
  notes?: string
}) {
  const res = await http.post('/appointments', data)
  return res.data
}

export async function updateAppointmentRequest(
  id: string,
  data: {
    appointmentDate?: string
    status?: AppointmentStatus
    clientId?: string
    serviceId?: string
    notes?: string
  }
) {
  const res = await http.patch(`/appointments/${id}`, data)
  return res.data
}

export async function updateStatusRequest(id: string, status: AppointmentStatus) {
  const res = await http.patch(`/appointments/${id}/status`, { status })
  return res.data
}