# KingdomX — Fullstack SaaS platform

**Architected & Founded by Muhammad Jawad (CEO & Founder, King Group of Technology).**

KingdomX is a production-ready full-stack SaaS scaffold with a premium frontend (Next.js + Tailwind + Framer Motion), a TypeScript Node/Express backend with Prisma/Postgres, and optional microservices for realtime chat, notifications and AI helpers.

---

## Quick start (local development)

1. Copy `.env.example` to `.env` and fill in required values.
2. Install dependencies and generate Prisma client:
   - Backend: `cd backend && npm ci && npm run prisma:generate`
   - Frontend: `cd frontend && npm ci`
3. Run locally (either via docker-compose or directly):
   - Docker: `docker-compose up --build`
   - Or run services directly:
     - Backend: `npm run dev --prefix backend` (runs on http://localhost:4000)
     - Frontend: `npm run dev --prefix frontend` (runs on http://localhost:3000)

---

## Backend routes (overview)

- GET /api/ping — health check
- GET /api/auth/demo — returns a demo JWT token for sandboxing (role query param supported)
- POST /api/auth/signup — create user (email/password)
- POST /api/auth/login — login (email/password)
- GET /api/tasks — list tasks (auth required)
- POST /api/tasks — create task (role: ADMIN/MANAGER/STAFF)
- GET /api/tasks/:id — get task
- PUT /api/tasks/:id — update task
- DELETE /api/tasks/:id — delete task
- POST /api/tasks/reorder — persist positions after drag-and-drop
- GET /api/projects — list projects
- POST /api/projects — create project (role: ADMIN/MANAGER)
- Other auth/oauth endpoints: `/api/auth/oauth/google` and `/api/auth/oauth/github`

Refer to route handlers under `backend/src/routes` for full request/response shapes and validations.

---

## Environment variables (important)

Copy `.env.example` and fill these at minimum for local/dev usage:

- DATABASE_URL — Postgres connection string
- JWT_SECRET — secret used to sign JWT tokens
- COOKIE_KEY — key used for cookie-session (for OAuth state)
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL — optional for Google OAuth
- GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL — optional for GitHub OAuth
- OPENAI_API_KEY — optional for AI features
- BACKEND_URL — optional override for backend base URL
- FRONTEND_URL — optional override for frontend base URL

---

## Features

- Real-time task & project updates via Socket.IO
- Kanban board with drag/drop and persisted ordering
- Inline editing and optimistic UI updates
- Demo auth token for quick sandboxing
- CI templates (GitHub Actions) that run builds, tests, and E2E Cypress suites
- Docker compose for local full-stack orchestration

---

## Next steps & deployment

- Add OAuth client IDs and set them in environment for OAuth flows
- Add cloud database and set `DATABASE_URL` for production
- Configure Vercel for frontend and Render/AWS/GCP for backend (CI workflows included in `.github/workflows`)

---

If you want, I can create a concise runbook with the exact commands to deploy to Vercel + Render and verify the production deployment.

---

© King Group of Technology — Muhammad Jawad
