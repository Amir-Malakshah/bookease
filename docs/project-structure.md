Parfait. Voici Jour 1 complet de BookEase, étape par étape, sans mélanger les choses.

Le but du Jour 1 est seulement de préparer une base propre :

dossier projet
repo GitHub
structure initiale
README
docs
Git

Pas encore de React, pas encore d’Express, pas encore de Prisma.

Objectif du Jour 1

À la fin du Jour 1, tu dois avoir :

un dossier local bookease
un repo GitHub bookease
une structure propre client / server / docs
un README.md
un .gitignore
un fichier docs/mvp-plan.md
un premier commit poussé sur GitHub
Outils nécessaires

Tu vas utiliser :

VS Code
GitHub
Terminal VS Code ou Git Bash
File Explorer Windows
Étape 1 — Choisir le nom final du projet

Le nom recommandé :

BookEase

Nom complet dans le README :

BookEase – Client Appointment System

Nom du repo GitHub :

bookease

Nom du dossier local :

bookease
Étape 2 — Créer le dossier local

Choisis l’endroit où tu gardes tes projets.

Exemple :

C:\Users\malek\OneDrive\Bureau\projet portfolio2

Puis crée le dossier :

bookease
Méthode terminal

Dans le terminal :

cd "C:\Users\malek\OneDrive\Bureau\projet portfolio2"
mkdir bookease
cd bookease
Méthode File Explorer
Ouvre ton dossier projet portfolio2
clic droit
New Folder
nom :
bookease
Étape 3 — Ouvrir le projet dans VS Code
ouvre VS Code
clique sur File
Open Folder
choisis le dossier :
bookease
Étape 4 — Créer la structure de base

Dans le dossier bookease, crée ces 3 dossiers :

client
server
docs
Méthode terminal

Depuis la racine bookease :

mkdir client server docs
Résultat attendu
bookease/
├── client/
├── server/
└── docs/
Étape 5 — Initialiser Git

Dans la racine du projet :

git init
Vérification

Tape :

git status

Tu dois voir quelque chose comme :

On branch master
No commits yet

ou parfois main, selon ta config.

Étape 6 — Créer le fichier README.md

À la racine du projet, crée :

README.md

Puis colle ce contenu :

# BookEase – Client Appointment System

BookEase is a full-stack appointment management platform for service-based businesses such as hair salons and barber shops.

It allows staff to manage clients, services, appointments, and reminder integrations through a modern dashboard.

## Planned Stack
- React
- TypeScript
- Node.js
- Express
- PostgreSQL
- Prisma
- Tailwind CSS
- JWT Authentication

## Planned Features
- Authentication
- Client management
- Service management
- Appointment scheduling
- Appointment status tracking
- Basic dashboard
- Mock reminder integrations
Étape 7 — Créer .gitignore

À la racine du projet, crée :

.gitignore

Puis colle :

# dependencies
node_modules/

# build outputs
dist/
build/

# environment files
.env
.env.*
!.env.example

# coverage
coverage/

# logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# editor / system files
.vscode/
.idea/
.DS_Store
Thumbs.db
Étape 8 — Créer docs/mvp-plan.md

Dans docs/, crée :

mvp-plan.md

Puis colle :

# BookEase — MVP Plan

## Main Goal
BookEase is a full-stack appointment management platform for service-based businesses such as hair salons and barber shops.

It allows staff to manage clients, services, appointments, and reminder integrations through a modern dashboard.

The project demonstrates:
- React + TypeScript frontend
- Node.js + Express backend
- PostgreSQL database with Prisma ORM
- Authentication with JWT
- Modular backend architecture
- Mock integrations (calendar, email, SMS)
- Dashboard metrics and activity tracking

## MVP Features
1. Authentication
2. Client Management
3. Service Management
4. Appointment Management
5. Basic Dashboard
6. Mock Integrations (planned)

## Main Entities
- User
- Client
- Service
- Appointment
- IntegrationConnection
Étape 9 — Créer docs/project-structure.md

Dans docs/, crée :

project-structure.md

Puis colle :

# Planned Project Structure

## Root
- client/
- server/
- docs/

## Frontend
- pages
- components
- features
- api
- hooks
- routes
- layouts

## Backend
- modules
- middleware
- config
- lib
- utils
- types