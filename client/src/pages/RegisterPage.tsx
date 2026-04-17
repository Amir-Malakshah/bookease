import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerRequest } from '../features/auth/auth-api'

export default function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      setLoading(true)
      await registerRequest(form)
      navigate('/login')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-lg border border-slate-200/70 bg-white">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white p-10 flex flex-col justify-between">
          <div>
            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-lg font-bold mb-6">
              B
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Create your BookEase account
            </h1>
            <p className="text-slate-200 leading-7 max-w-md">
              Start managing clients, services, and appointments in a simple, clean, and modern workspace.
            </p>
          </div>

          <div className="text-sm text-slate-300">
            Modern booking workflow for service businesses
          </div>
        </div>

        <div className="p-10 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Register</h2>
            <p className="text-sm text-slate-500 mb-6">
              Create your account to access the platform.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </label>
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                  placeholder="Bahador"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-slate-900 text-white py-3 font-medium shadow-sm hover:bg-slate-800 transition disabled:opacity-60"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <p className="text-sm text-slate-600 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-slate-900 underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}