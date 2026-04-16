import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginRequest } from '../features/auth/auth-api'
import { useAuth } from '../features/auth/auth-context'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      const data = await loginRequest(form)
      await login(data.token)
      navigate('/clients')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 text-white py-3 font-medium"
          >
            Sign in
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-4">
          No account yet? <Link to="/register" className="underline">Register</Link>
        </p>
      </div>
    </div>
  )
}