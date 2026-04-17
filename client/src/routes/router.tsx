import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import ClientListPage from '../pages/ClientListPage'
import CreateClientPage from '../pages/CreateClientPage'
import ClientDetailPage from '../pages/ClientDetailPage'
import ServiceListPage from '../pages/ServiceListPage'
import CreateServicePage from '../pages/CreateServicePage'
import ServiceDetailPage from '../pages/ServiceDetailPage'
import AppointmentListPage from '../pages/AppointmentListPage'
import CreateAppointmentPage from '../pages/CreateAppointmentPage'
import AppointmentDetailPage from '../pages/AppointmentDetailPage'
import ProtectedLayout from '../layouts/ProtectedLayout'

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
    element: <ProtectedLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/clients',
        element: <ClientListPage />,
      },
      {
        path: '/clients/new',
        element: <CreateClientPage />,
      },
      {
        path: '/clients/:id',
        element: <ClientDetailPage />,
      },
      {
        path: '/services',
        element: <ServiceListPage />,
      },
      {
        path: '/services/new',
        element: <CreateServicePage />,
      },
      {
        path: '/services/:id',
        element: <ServiceDetailPage />,
      },
      {
        path: '/appointments',
        element: <AppointmentListPage />,
      },
      {
        path: '/appointments/new',
        element: <CreateAppointmentPage />,
      },
      {
        path: '/appointments/:id',
        element: <AppointmentDetailPage />,
      },
    ],
  },
])