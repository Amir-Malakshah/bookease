import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getAppointmentsRequest,
  updateStatusRequest,
} from '../features/appointments/appointment-api'
import { useAuth } from '../features/auth/auth-context'

type Appointment = {
  id: string
  appointmentDate: string
  status: 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  notes: string | null
  client: {
    firstName: string
    lastName: string
  }
  service: {
    name: string
    durationMinutes: number
    price: number
  }
}

export default function AppointmentListPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const { logout, user } = useAuth()
  const navigate = useNavigate()

  async function loadAppointments() {
    try {
      setLoading(true)
      const data = await getAppointmentsRequest()
      setAppointments(data)
    } catch {
      setError('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAppointments()
  }, [])

  async function handleStatusChange(
    id: string,
    status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  ) {
    try {
      await updateStatusRequest(id, status)
      await loadAppointments()
    } catch {
      setError('Failed to update appointment status')
    }
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Appointments</h1>
            <p className="text-slate-600 text-sm">
              Welcome{user ? `, ${user.name}` : ''}.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/appointments/new"
              className="rounded-xl bg-slate-900 text-white px-4 py-2"
            >
              New Appointment
            </Link>

            <Link
              to="/clients"
              className="rounded-xl border px-4 py-2"
            >
              Clients
            </Link>

            <Link
              to="/services"
              className="rounded-xl border px-4 py-2"
            >
              Services
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-xl border px-4 py-2"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : appointments.length === 0 ? (
            <p className="text-slate-600">No appointments yet.</p>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border rounded-2xl p-4 flex items-start justify-between"
                >
                  <div>
                    <h2 className="text-lg font-semibold">
                      {appointment.client.firstName} {appointment.client.lastName}
                    </h2>
                    <p className="text-slate-600 text-sm">
                      Service: {appointment.service.name}
                    </p>
                    <p className="text-slate-500 text-sm">
                      {new Date(appointment.appointmentDate).toLocaleString()}
                    </p>
                    <p className="text-slate-500 text-sm">
                      Status: {appointment.status}
                    </p>
                    {appointment.notes ? (
                      <p className="text-slate-500 text-sm">
                        Notes: {appointment.notes}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleStatusChange(appointment.id, 'CONFIRMED')
                      }
                      className="rounded-xl border px-3 py-2 text-sm"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() =>
                        handleStatusChange(appointment.id, 'COMPLETED')
                      }
                      className="rounded-xl border px-3 py-2 text-sm"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() =>
                        handleStatusChange(appointment.id, 'CANCELLED')
                      }
                      className="rounded-xl border px-3 py-2 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}