# KingdomX Backend

Express + TypeScript API for KingdomX. Contains core routes, auth placeholders, and microservice hooks.

Routes:

- `GET /api/ping`
- `POST /api/auth/signup` (create account)
- `POST /api/auth/login` (login -> JWT)
- `GET /api/auth/me` (get current user)

Run (local):

- Install: `npm install`
- Generate Prisma client: `npm run prisma:generate` (or runs automatically on postinstall)
- Create DB & run migrations: `npm run prisma:migrate:dev`
- Seed DB (create initial admin): `npm run prisma:seed`
- Dev: `npm run dev`

Environment variables: see root `.env.example`
