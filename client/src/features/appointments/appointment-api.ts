import { http } from '../../api/http'

export async function getAppointmentsRequest() {
  const res = await http.get('/appointments')
  return res.data
}

export async function createAppointmentRequest(data: any) {
  const res = await http.post('/appointments', data)
  return res.data
}

export async function updateStatusRequest(id: string, status: string) {
  const res = await http.patch(`/appointments/${id}/status`, { status })
  return res.data
}