import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDashboardRequest } from '../features/dashboard/dashboard-api'

type DashboardData = {
  clientsCount: number
  totalRevenue: number
  upcomingAppointments: Array<{
    id: string
    appointmentDate: string
    status?: string
    client: {
      firstName: string
      lastName: string
    }
    service: {
      name: string
      price?: number
    }
  }>
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const res = await getDashboardRequest()
        setData(res)
      } catch {
        setError('Failed to load dashboard')
      }
    }

    load()
  }, [])

  const upcomingCount = useMemo(() => {
    return data?.upcomingAppointments?.length ?? 0
  }, [data])

  if (error) {
    return <div className="max-w-7xl mx-auto p-6 text-red-600">{error}</div>
  }

  if (!data) {
    return <div className="max-w-7xl mx-auto p-6">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <section className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white p-8 shadow-lg">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium mb-4">
              Business overview
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Run your appointments with clarity.
            </h1>

            <p className="text-slate-200 leading-7 max-w-xl">
              BookEase helps service-based businesses manage clients, services,
              and appointments in one place with a clean, modern workflow.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                to="/appointments"
                className="rounded-2xl bg-white text-slate-900 px-5 py-3 font-medium shadow-sm"
              >
                View Appointments
              </Link>

              <Link
                to="/appointments/new"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 font-medium text-white hover:bg-white/10 transition"
              >
                New Appointment
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg border border-slate-200/70">
          <p className="text-sm font-medium text-slate-500 mb-2">
            Quick summary
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Today at a glance
          </h2>

          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Clients</p>
              <p className="text-2xl font-bold text-slate-900">
                {data.clientsCount}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Revenue</p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(data.totalRevenue)}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Upcoming</p>
              <p className="text-2xl font-bold text-slate-900">
                {upcomingCount}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/70">
          <p className="text-sm text-slate-500 mb-2">Clients</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-slate-900">
              {data.clientsCount}
            </h3>
            <Link
              to="/clients"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Manage →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/70">
          <p className="text-sm text-slate-500 mb-2">Completed revenue</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-slate-900">
              {formatCurrency(data.totalRevenue)}
            </h3>
            <Link
              to="/services"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Services →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/70">
          <p className="text-sm text-slate-500 mb-2">Upcoming bookings</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold text-slate-900">
              {upcomingCount}
            </h3>
            <Link
              to="/appointments"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Schedule →
            </Link>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/70">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Next appointments
              </h2>
              <p className="text-sm text-slate-500">
                Your next confirmed and scheduled bookings
              </p>
            </div>

            <Link
              to="/appointments"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              View all
            </Link>
          </div>

          {data.upcomingAppointments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              No upcoming appointments yet.
            </div>
          ) : (
            <div className="space-y-4">
              {data.upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {appointment.client.firstName} {appointment.client.lastName}
                    </p>
                    <p className="text-sm text-slate-600">
                      {appointment.service.name}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      {formatDateTime(appointment.appointmentDate)}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {appointment.status || 'SCHEDULED'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/70">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Quick actions
          </h2>

          <div className="grid gap-3">
            <Link
              to="/clients/new"
              className="rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 transition"
            >
              <p className="font-medium text-slate-900">Add new client</p>
              <p className="text-sm text-slate-500">
                Create a new client profile
              </p>
            </Link>

            <Link
              to="/services/new"
              className="rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 transition"
            >
              <p className="font-medium text-slate-900">Create service</p>
              <p className="text-sm text-slate-500">
                Define a service, price, and duration
              </p>
            </Link>

            <Link
              to="/appointments/new"
              className="rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 transition"
            >
              <p className="font-medium text-slate-900">Book appointment</p>
              <p className="text-sm text-slate-500">
                Schedule a new appointment
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}