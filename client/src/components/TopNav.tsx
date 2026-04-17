import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/auth-context'

function navClass(isActive: boolean) {
  return isActive
    ? 'rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-medium shadow-sm'
    : 'rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-4 py-2 text-sm font-medium transition'
}

export default function TopNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            B
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">
              BookEase
            </h1>
            <p className="text-sm text-slate-500 leading-tight">
              {user ? `Welcome back, ${user.name}` : 'Client Appointment System'}
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-2 flex-wrap">
          <Link
            to="/dashboard"
            className={navClass(location.pathname === '/dashboard')}
          >
            Dashboard
          </Link>

          <Link
            to="/clients"
            className={navClass(location.pathname.startsWith('/clients'))}
          >
            Clients
          </Link>

          <Link
            to="/services"
            className={navClass(location.pathname.startsWith('/services'))}
          >
            Services
          </Link>

          <Link
            to="/appointments"
            className={navClass(location.pathname.startsWith('/appointments'))}
          >
            Appointments
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}