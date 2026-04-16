import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClientRequest } from '../features/clients/client-api'

export default function CreateClientPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      await createClientRequest(form)
      navigate('/clients')
    } catch {
      setError('Failed to create client')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Create Client</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="First name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />

          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Last name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />

          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <textarea
            className="w-full border rounded-xl px-4 py-3 min-h-32"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          {error ? <p className="text-red-600 text-sm">{error}</p> : null}

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-slate-900 text-white px-5 py-3"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate('/clients')}
              className="rounded-xl border px-5 py-3"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}