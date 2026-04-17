import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getAppointmentsRequest,
  updateStatusRequest,
} from '../features/appointments/appointment-api'

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

function getStatusBadgeClass(status: Appointment['status']) {
  switch (status) {
    case 'CONFIRMED':
      return 'bg-blue-50 text-blue-700 border border-blue-200'
    case 'COMPLETED':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    case 'CANCELLED':
      return 'bg-red-50 text-red-700 border border-red-200'
    case 'SCHEDULED':
    default:
      return 'bg-slate-100 text-slate-700 border border-slate-200'
  }
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function AppointmentListPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

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

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage bookings, statuses, and upcoming client visits.
          </p>
        </div>

        <Link
          to="/appointments/new"
          className="inline-flex items-center rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm font-medium shadow-sm hover:bg-slate-800 transition"
        >
          New Appointment
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/70">
          <p className="text-sm text-slate-500 mb-2">Total appointments</p>
          <h2 className="text-3xl font-bold text-slate-900">
            {appointments.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/70">
          <p className="text-sm text-slate-500 mb-2">Confirmed</p>
          <h2 className="text-3xl font-bold text-slate-900">
            {appointments.filter((a) => a.status === 'CONFIRMED').length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/70">
          <p className="text-sm text-slate-500 mb-2">Completed</p>
          <h2 className="text-3xl font-bold text-slate-900">
            {appointments.filter((a) => a.status === 'COMPLETED').length}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : appointments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center">
            <p className="text-slate-600 mb-4">No appointments yet.</p>
            <Link
              to="/appointments/new"
              className="inline-flex items-center rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm font-medium shadow-sm hover:bg-slate-800 transition"
            >
              Create your first appointment
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="rounded-3xl border border-slate-200 p-5 hover:shadow-sm transition bg-white"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-lg font-semibold text-slate-900">
                        {appointment.client.firstName} {appointment.client.lastName}
                      </h2>

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClass(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600">
                      <span className="font-medium text-slate-800">Service:</span>{' '}
                      {appointment.service.name}
                    </p>

                    <p className="text-sm text-slate-600">
                      <span className="font-medium text-slate-800">When:</span>{' '}
                      {formatDateTime(appointment.appointmentDate)}
                    </p>

                    <p className="text-sm text-slate-600">
                      <span className="font-medium text-slate-800">Duration:</span>{' '}
                      {appointment.service.durationMinutes} min
                    </p>

                    <p className="text-sm text-slate-600">
                      <span className="font-medium text-slate-800">Price:</span>{' '}
                      ${appointment.service.price}
                    </p>

                    {appointment.notes ? (
                      <p className="text-sm text-slate-500 pt-1">
                        <span className="font-medium text-slate-700">Notes:</span>{' '}
                        {appointment.notes}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/appointments/${appointment.id}`}
                      className="rounded-2xl border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                    >
                      View
                    </Link>

                    <button
                      onClick={() =>
                        handleStatusChange(appointment.id, 'CONFIRMED')
                      }
                      className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() =>
                        handleStatusChange(appointment.id, 'COMPLETED')
                      }
                      className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() =>
                        handleStatusChange(appointment.id, 'CANCELLED')
                      }
                      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}