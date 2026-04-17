import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  deleteServiceRequest,
  getServicesRequest,
  type Service,
} from '../features/services/service-api'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function ServiceListPage() {
  const [services, setServices] = useState<Service[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadServices() {
    try {
      setLoading(true)
      const data = await getServicesRequest()
      setServices(data)
    } catch {
      setError('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
  }, [])

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Delete this service?')
    if (!confirmed) return

    await deleteServiceRequest(id)
    await loadServices()
  }

  const averagePrice =
    services.length > 0
      ? Math.round(
          services.reduce((sum, service) => sum + service.price, 0) /
            services.length
        )
      : 0

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <p className="text-sm text-slate-500 mt-1">
            Create and manage service offerings, pricing, and duration.
          </p>
        </div>

        <Link
          to="/services/new"
          className="inline-flex items-center rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm font-medium shadow-sm hover:bg-slate-800 transition"
        >
          New Service
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/70">
          <p className="text-sm text-slate-500 mb-2">Total services</p>
          <h2 className="text-3xl font-bold text-slate-900">{services.length}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/70">
          <p className="text-sm text-slate-500 mb-2">Average price</p>
          <h2 className="text-3xl font-bold text-slate-900">
            {formatCurrency(averagePrice)}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/70">
          <p className="text-sm text-slate-500 mb-2">Average duration</p>
          <h2 className="text-3xl font-bold text-slate-900">
            {services.length > 0
              ? Math.round(
                  services.reduce(
                    (sum, service) => sum + service.durationMinutes,
                    0
                  ) / services.length
                )
              : 0}{' '}
            min
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : services.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center">
            <p className="text-slate-600 mb-4">No services yet.</p>
            <Link
              to="/services/new"
              className="inline-flex items-center rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm font-medium shadow-sm hover:bg-slate-800 transition"
            >
              Create your first service
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-3xl border border-slate-200 p-5 hover:shadow-sm transition bg-white"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-slate-900">
                      {service.name}
                    </h2>

                    <p className="text-sm text-slate-600">
                      <span className="font-medium text-slate-800">Price:</span>{' '}
                      {formatCurrency(service.price)}
                    </p>

                    <p className="text-sm text-slate-600">
                      <span className="font-medium text-slate-800">Duration:</span>{' '}
                      {service.durationMinutes} min
                    </p>

                    {service.description ? (
                      <p className="text-sm text-slate-500 pt-1">
                        <span className="font-medium text-slate-700">
                          Description:
                        </span>{' '}
                        {service.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/services/${service.id}`}
                      className="rounded-2xl border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleDelete(service.id)}
                      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition"
                    >
                      Delete
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