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
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.firstName || !form.lastName || !form.email) {
      setError('First name, last name, and email are required')
      return
    }

    try {
      setLoading(true)
      await createClientRequest(form)
      navigate('/clients')
    } catch {
      setError('Failed to create client')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6">
        <h1 className="text-2xl font-bold text-slate-900">Create Client</h1>
        <p className="text-sm text-slate-500 mt-1">
          Add a new client profile with contact details and notes.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                First name
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                placeholder="Sarah"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Last name
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                placeholder="Johnson"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                placeholder="sarah@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                placeholder="514-555-1111"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Notes
            </label>
            <textarea
              className="w-full min-h-32 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              placeholder="Client preferences, schedule notes, or personal details..."
              value={form.notes}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm font-medium shadow-sm hover:bg-slate-800 transition disabled:opacity-60"
            >
              {loading ? 'Creating...' : 'Create Client'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/clients')}
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}