import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  deleteClientRequest,
  getClientsRequest,
  type Client,
} from '../features/clients/client-api'

export default function ClientListPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

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

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage client records, contact details, and personal notes.
          </p>
        </div>

        <Link
          to="/clients/new"
          className="inline-flex items-center rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm font-medium shadow-sm hover:bg-slate-800 transition"
        >
          New Client
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/70">
          <p className="text-sm text-slate-500 mb-2">Total clients</p>
          <h2 className="text-3xl font-bold text-slate-900">{clients.length}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/70">
          <p className="text-sm text-slate-500 mb-2">With phone number</p>
          <h2 className="text-3xl font-bold text-slate-900">
            {clients.filter((client) => client.phone).length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/70">
          <p className="text-sm text-slate-500 mb-2">With notes</p>
          <h2 className="text-3xl font-bold text-slate-900">
            {clients.filter((client) => client.notes).length}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : clients.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center">
            <p className="text-slate-600 mb-4">No clients yet.</p>
            <Link
              to="/clients/new"
              className="inline-flex items-center rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm font-medium shadow-sm hover:bg-slate-800 transition"
            >
              Create your first client
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="rounded-3xl border border-slate-200 p-5 hover:shadow-sm transition bg-white"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-slate-900">
                      {client.firstName} {client.lastName}
                    </h2>

                    <p className="text-sm text-slate-600">
                      <span className="font-medium text-slate-800">Email:</span>{' '}
                      {client.email}
                    </p>

                    <p className="text-sm text-slate-600">
                      <span className="font-medium text-slate-800">Phone:</span>{' '}
                      {client.phone || 'No phone number'}
                    </p>

                    {client.notes ? (
                      <p className="text-sm text-slate-500 pt-1">
                        <span className="font-medium text-slate-700">Notes:</span>{' '}
                        {client.notes}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/clients/${client.id}`}
                      className="rounded-2xl border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleDelete(client.id)}
                      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}