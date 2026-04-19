# BookEase – Client Appointment System

BookEase is a full-stack appointment management platform for service-based businesses such as hair salons and barber shops.

It helps staff manage clients, services, appointments, and daily operations through a clean SaaS-style dashboard.

## Live Demo

Frontend: [BookEase Live Demo](https://bookease-client-wko4.onrender.com)

Backend API: [BookEase API](https://bookease-api-s2nd.onrender.com)

## GitHub Repository

[BookEase Repository](https://github.com/Amir-Malakshah/bookease)

---

## Features

- Secure authentication with JWT
- Client management
- Service management
- Appointment scheduling
- Appointment status tracking
- Dashboard with business metrics
- Responsive SaaS-style UI
- PostgreSQL database with Prisma ORM
- Render deployment

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- JWT Authentication
- bcrypt

### Database
- PostgreSQL

### Deployment
- Render Static Site
- Render Web Service
- Render PostgreSQL

---



## Project Structure

```bash
bookease/
├── client/
│   ├── src/
│   └── package.json
├── server/
│   ├── prisma/
│   ├── src/
│   └── package.json
└── README.md
```

 ##  Main Modules

 ### Backend

 - Auth
 - Clients
 - Services
 - Appointments
 - Dashboard

 ### Frontend

-  Authentication pages
-  Dashboard
-  Client management
-  Service management
-  Appointment management
-  Shared protected layout and top navigation
```

```
### Database Models
- User
- Client
- Service
- Appointment
- IntegrationConnection

## Local Development Setup
1. Clone the repository
```bash
git clone https://github.com/Amir-Malakshah/bookease.git
cd bookease
```

### 2.Frontend setup
```bash
cd client
npm install
```

### Create:
```bash
client/.env.local
```

### Add:
```bash
VITE_API_URL=http://localhost:5000/api
```
### Run the frontend:
```bash
npm run dev
```

## 3.Backend setup

### Open a new terminal :
```bash
cd server
npm install
```
### Create:
```bash
server/.env
```

### Add:

```bash
PORT=5000
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/bookease_db?schema=public"
JWT_SECRET="your_secret_key"
FRONTEND_URL="http://localhost:5173"
```

## 4.Prisma setup

### Generate Prisma Client:

``` bash
npx prisma generate
```
### Push schema to the database:

```bash
npx prisma db push
```

### if needed, run migrations:

```bash
npx prisma migrate dev --name init
```

## 5. Run the backend
```bash
npm run dev
```
### Backend health check:

```bash
http://localhost:5000/api/health
```
## Production Deployment

BookEase is deployed on Render with:

- Render PostgreSQL
- Render Web Service for backend
- Render Static Site for frontend
### Backend environment variables
```bash
DATABASE_URL=your_render_postgres_url
JWT_SECRET=your_production_secret
FRONTEND_URL=https://bookease-client-wko4.onrender.com
```

### Frontend environment variables
```bash
VITE_API_URL=https://bookease-api-s2nd.onrender.com
```
## API Routes
### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
Clients
- GET /api/clients
- POST /api/clients
- GET /api/clients/:id
- PATCH /api/clients/:id
- DELETE /api/clients/:id
Services
- GET /api/services
- POST /api/services
- GET /api/services/:id
- PATCH /api/services/:id
- DELETE /api/services/:id
Appointments
- GET /api/appointments
- POST /api/appointments
- GET /api/appointments/:id
- PATCH /api/appointments/:id
- PATCH /api/appointments/:id/status
Dashboard
- GET /api/dashboard

 ## Future Improvements
- Search and filters
- Calendar view
- Reminder notifications
- Role-based permissions
- Seed/demo data
- Automated tests
- Analytics charts