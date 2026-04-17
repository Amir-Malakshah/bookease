import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getServiceRequest,
  updateServiceRequest,
  type Service,
} from '../features/services/service-api'

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
  const [saving, setSaving] = useState(false)

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

    setError('')

    if (!form.name || !form.durationMinutes || !form.price) {
      setError('Name, duration, and price are required')
      return
    }

    try {
      setSaving(true)
      const updated = await updateServiceRequest(id, form)
      setService(updated)
      navigate('/services')
    } catch {
      setError('Failed to update service')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6">Loading...</div>
  }

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-red-600">
        {error || 'Service not found'}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6">
        <h1 className="text-2xl font-bold text-slate-900">Edit Service</h1>
        <p className="text-sm text-slate-500 mt-1">
          Update service pricing, duration, and description.
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
              disabled={saving}
              className="inline-flex items-center rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm font-medium shadow-sm hover:bg-slate-800 transition disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Update Service'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/services')}
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}