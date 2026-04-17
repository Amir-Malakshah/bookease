import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  deleteServiceRequest,
  getServicesRequest,
  type Service,
} from '../features/services/service-api'
import { useAuth } from '../features/auth/auth-context'

export default function ServiceListPage() {
  const [services, setServices] = useState<Service[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  async function loadServices() {
    try {
      setLoading(true)
      const data = await getServicesRequest()
      setServices(data)
    } catch {
      setError('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
  }, [])

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Delete this service?')

    if (!confirmed) return

    await deleteServiceRequest(id)
    await loadServices()
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Services</h1>
            <p className="text-slate-600 text-sm">
              Welcome{user ? `, ${user.name}` : ''}.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/services/new"
              className="rounded-xl bg-slate-900 text-white px-4 py-2"
            >
              New Service
            </Link>

            <Link
              to="/clients"
              className="rounded-xl border px-4 py-2"
            >
              Clients
            </Link>

            <Link
              to="/appointments"
              className="rounded-xl border px-4 py-2"
            >
               Appointments
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-xl border px-4 py-2"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : services.length === 0 ? (
            <p className="text-slate-600">No services yet.</p>
          ) : (
            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border rounded-2xl p-4 flex items-start justify-between"
                >
                  <div>
                    <h2 className="text-lg font-semibold">{service.name}</h2>
                    <p className="text-slate-600 text-sm">
                      {service.description || 'No description'}
                    </p>
                    <p className="text-slate-500 text-sm">
                      {service.durationMinutes} min • ${service.price}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/services/${service.id}`}
                      className="rounded-xl border px-3 py-2 text-sm"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="rounded-xl border px-3 py-2 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}