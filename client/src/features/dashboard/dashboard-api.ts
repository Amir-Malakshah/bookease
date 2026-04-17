import { http } from '../../api/http'

export async function getDashboardRequest() {
  const res = await http.get('/dashboard')
  return res.data
}