import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import ClientListPage from '../pages/ClientListPage'
import CreateClientPage from '../pages/CreateClientPage'
import ClientDetailPage from '../pages/ClientDetailPage'
import ProtectedRoute from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/clients',
    element: (
      <ProtectedRoute>
        <ClientListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/clients/new',
    element: (
      <ProtectedRoute>
        <CreateClientPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/clients/:id',
    element: (
      <ProtectedRoute>
        <ClientDetailPage />
      </ProtectedRoute>
    ),
  },
])