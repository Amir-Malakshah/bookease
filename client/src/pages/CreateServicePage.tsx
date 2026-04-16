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
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      await createServiceRequest(form)
      navigate('/services')
    } catch {
      setError('Failed to create service')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Create Service</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Service name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full border rounded-xl px-4 py-3"
            type="number"
            placeholder="Duration in minutes"
            value={form.durationMinutes}
            onChange={(e) =>
              setForm({ ...form, durationMinutes: Number(e.target.value) })
            }
          />

          <input
            className="w-full border rounded-xl px-4 py-3"
            type="number"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />

          <textarea
            className="w-full border rounded-xl px-4 py-3 min-h-32"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
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
              onClick={() => navigate('/services')}
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