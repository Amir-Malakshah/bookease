import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getClientRequest, updateClientRequest, type Client } from '../features/clients/client-api'

export default function ClientDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState<Client | null>(null)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadClient() {
      if (!id) return

      try {
        const data = await getClientRequest(id)
        setClient(data)
        setForm({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone || '',
          notes: data.notes || '',
        })
      } catch {
        setError('Failed to load client')
      } finally {
        setLoading(false)
      }
    }

    loadClient()
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!id) return

    try {
      const updated = await updateClientRequest(id, form)
      setClient(updated)
      navigate('/clients')
    } catch {
      setError('Failed to update client')
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  if (!client) {
    return <div className="p-6 text-red-600">{error || 'Client not found'}</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Client</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border rounded-xl px-4 py-3"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />

          <input
            className="w-full border rounded-xl px-4 py-3"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />

          <input
            className="w-full border rounded-xl px-4 py-3"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="w-full border rounded-xl px-4 py-3"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <textarea
            className="w-full border rounded-xl px-4 py-3 min-h-32"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          {error ? <p className="text-red-600 text-sm">{error}</p> : null}

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-slate-900 text-white px-5 py-3"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate('/clients')}
              className="rounded-xl border px-5 py-3"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}