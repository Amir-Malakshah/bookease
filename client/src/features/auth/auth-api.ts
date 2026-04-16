import { http } from '../../api/http'

export async function registerRequest(data: {
  name: string
  email: string
  password: string
}) {
  const response = await http.post('/auth/register', data)
  return response.data
}

export async function loginRequest(data: {
  email: string
  password: string
}) {
  const response = await http.post('/auth/login', data)
  return response.data
}

export async function meRequest() {
  const response = await http.get('/auth/me')
  return response.data
}