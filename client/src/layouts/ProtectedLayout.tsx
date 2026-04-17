import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/auth-context'
import TopNav from '../components/TopNav'

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div className="p-6">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav />
      <main>
        <Outlet />
      </main>
    </div>
  )
}