import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAppointmentRequest } from '../features/appointments/appointment-api'
import { http } from '../api/http'

type Client = {
  id: string
  firstName: string
  lastName: string
}

type Service = {
  id: string
  name: string
}

export default function CreateAppointmentPage() {
  const navigate = useNavigate()

  const [clients, setClients] = useState<Client[]>([])
  const [services, setServices] = useState<Service[]>([])

  const [appointmentDate, setAppointmentDate] = useState('')
  const [clientId, setClientId] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [notes, setNotes] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Charger clients + services
  useEffect(() => {
    async function loadData() {
      try {
        const [clientsRes, servicesRes] = await Promise.all([
          http.get('/clients'),
          http.get('/services'),
        ])

        setClients(clientsRes.data)
        setServices(servicesRes.data)
      } catch {
        setError('Failed to load data')
      }
    }

    loadData()
  }, [])

  // Submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setError('')

    if (!appointmentDate || !clientId || !serviceId) {
      setError('All fields are required')
      return
    }

    try {
      setLoading(true)

      await createAppointmentRequest({
        appointmentDate,
        clientId,
        serviceId,
        notes,
      })

      navigate('/appointments')
    } catch {
      setError('Failed to create appointment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Create Appointment</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Date */}
          <div>
            <label className="block text-sm mb-1">Date & Time</label>
            <input
              type="datetime-local"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full border rounded-xl p-2"
            />
          </div>

          {/* Client */}
          <div>
            <label className="block text-sm mb-1">Client</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full border rounded-xl p-2"
            >
              <option value="">Select client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.firstName} {client.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm mb-1">Service</label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full border rounded-xl p-2"
            >
              <option value="">Select service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm mb-1">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-xl p-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-xl hover:opacity-90"
          >
            {loading ? 'Creating...' : 'Create Appointment'}
          </button>
        </form>
      </div>
    </div>
  )
}