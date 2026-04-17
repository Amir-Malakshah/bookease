import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createServiceRequest } from '../features/services/service-api'

export default function CreateServicePage() {
  const [form, setForm] = useState({
    name: '',
    durationMinutes: 30,
    price: 25,
    description: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.name || !form.durationMinutes || !form.price) {
      setError('Name, duration, and price are required')
      return
    }

    try {
      setLoading(true)
      await createServiceRequest(form)
      navigate('/services')
    } catch {
      setError('Failed to create service')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6">
        <h1 className="text-2xl font-bold text-slate-900">Create Service</h1>
        <p className="text-sm text-slate-500 mt-1">
          Add a service with price, duration, and description.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Service name
            </label>
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              placeholder="Haircut"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                value={form.durationMinutes}
                onChange={(e) =>
                  setForm({
                    ...form,
                    durationMinutes: Number(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full min-h-32 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              placeholder="Classic haircut service with consultation and styling..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
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
              {loading ? 'Creating...' : 'Create Service'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/services')}
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