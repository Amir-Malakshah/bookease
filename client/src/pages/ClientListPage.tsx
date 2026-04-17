import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  deleteClientRequest,
  getClientsRequest,
  type Client,
} from '../features/clients/client-api'
import { useAuth } from '../features/auth/auth-context'

export default function ClientListPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  async function loadClients() {
    try {
      setLoading(true)
      const data = await getClientsRequest()
      setClients(data)
    } catch {
      setError('Failed to load clients')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClients()
  }, [])

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Delete this client?')

    if (!confirmed) return

    await deleteClientRequest(id)
    await loadClients()
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
            <h1 className="text-2xl font-bold">Clients</h1>
            <p className="text-slate-600 text-sm">
              Welcome{user ? `, ${user.name}` : ''}.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/clients/new"
              className="rounded-xl bg-slate-900 text-white px-4 py-2"
            >
              New Client
            </Link>

            <Link
              to="/services"
              className="rounded-xl border px-4 py-2"
            >
              Services
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
          ) : clients.length === 0 ? (
            <p className="text-slate-600">No clients yet.</p>
          ) : (
            <div className="space-y-4">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="border rounded-2xl p-4 flex items-start justify-between"
                >
                  <div>
                    <h2 className="text-lg font-semibold">
                      {client.firstName} {client.lastName}
                    </h2>
                    <p className="text-slate-600 text-sm">{client.email}</p>
                    <p className="text-slate-500 text-sm">
                      {client.phone || 'No phone number'}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/clients/${client.id}`}
                      className="rounded-xl border px-3 py-2 text-sm"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(client.id)}
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