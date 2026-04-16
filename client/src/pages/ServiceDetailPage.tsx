import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getServiceRequest, updateServiceRequest, type Service } from '../features/services/service-api'

export default function ServiceDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState<Service | null>(null)
  const [form, setForm] = useState({
    name: '',
    durationMinutes: 30,
    price: 0,
    description: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadService() {
      if (!id) return

      try {
        const data = await getServiceRequest(id)
        setService(data)
        setForm({
          name: data.name,
          durationMinutes: data.durationMinutes,
          price: data.price,
          description: data.description || '',
        })
      } catch {
        setError('Failed to load service')
      } finally {
        setLoading(false)
      }
    }

    loadService()
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!id) return

    try {
      const updated = await updateServiceRequest(id, form)
      setService(updated)
      navigate('/services')
    } catch {
      setError('Failed to update service')
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  if (!service) {
    return <div className="p-6 text-red-600">{error || 'Service not found'}</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Service</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border rounded-xl px-4 py-3"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full border rounded-xl px-4 py-3"
            type="number"
            value={form.durationMinutes}
            onChange={(e) =>
              setForm({ ...form, durationMinutes: Number(e.target.value) })
            }
          />

          <input
            className="w-full border rounded-xl px-4 py-3"
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />

          <textarea
            className="w-full border rounded-xl px-4 py-3 min-h-32"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
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
              onClick={() => navigate('/services')}
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