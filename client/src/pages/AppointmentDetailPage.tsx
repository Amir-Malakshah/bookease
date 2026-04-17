import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getAppointmentRequest,
  updateAppointmentRequest,
  type AppointmentStatus,
} from '../features/appointments/appointment-api'
import { http } from '../api/http'

type Client = {
  id: string
  firstName: string
  lastName: string
}

type Service = {
  id: string
  name: string
  durationMinutes: number
  price: number
}

export default function AppointmentDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [clients, setClients] = useState<Client[]>([])
  const [services, setServices] = useState<Service[]>([])

  const [form, setForm] = useState({
    appointmentDate: '',
    status: 'SCHEDULED' as AppointmentStatus,
    clientId: '',
    serviceId: '',
    notes: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadData() {
      if (!id) return

      try {
        const [appointment, clientsRes, servicesRes] = await Promise.all([
          getAppointmentRequest(id),
          http.get('/clients'),
          http.get('/services'),
        ])

        setClients(clientsRes.data)
        setServices(servicesRes.data)

        setForm({
          appointmentDate: appointment.appointmentDate.slice(0, 16),
          status: appointment.status,
          clientId: appointment.clientId,
          serviceId: appointment.serviceId,
          notes: appointment.notes || '',
        })
      } catch {
        setError('Failed to load appointment')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!id) return

    setError('')

    if (!form.appointmentDate || !form.clientId || !form.serviceId) {
      setError('Appointment date, client, and service are required')
      return
    }

    try {
      setSaving(true)

      await updateAppointmentRequest(id, {
        appointmentDate: form.appointmentDate,
        status: form.status,
        clientId: form.clientId,
        serviceId: form.serviceId,
        notes: form.notes,
      })

      navigate('/appointments')
    } catch {
      setError('Failed to update appointment')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6">
        <h1 className="text-2xl font-bold text-slate-900">Edit Appointment</h1>
        <p className="text-sm text-slate-500 mt-1">
          Update booking details, linked client, service, and status.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Appointment date & time
            </label>
            <input
              type="datetime-local"
              value={form.appointmentDate}
              onChange={(e) =>
                setForm({ ...form, appointmentDate: e.target.value })
              }
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Client
              </label>
              <select
                value={form.clientId}
                onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400 bg-white"
              >
                <option value="">Select client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.firstName} {client.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Service
              </label>
              <select
                value={form.serviceId}
                onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400 bg-white"
              >
                <option value="">Select service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as AppointmentStatus,
                })
              }
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400 bg-white"
            >
              <option value="SCHEDULED">SCHEDULED</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Notes
            </label>
            <textarea
              className="w-full min-h-32 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm font-medium shadow-sm hover:bg-slate-800 transition disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Update Appointment'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/appointments')}
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