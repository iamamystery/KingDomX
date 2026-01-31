# Authentication (KingdomX)

Endpoints:

- `POST /api/auth/signup` — create account (email, password, name)
- `POST /api/auth/login` — login (email, password) → returns JWT
- `GET /api/auth/me` — get current user (requires Bearer token)

Notes:

- Passwords are hashed with bcrypt.
- Initial admin user is created by running `npm run prisma:seed` (see `.env.example` for `ADMIN_EMAIL`/`ADMIN_PASSWORD`).

OAuth (Google/GitHub):

- Add your provider credentials to `.env` (see `.env.example` for `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`, and the GitHub equivalents).
- The backend exposes these endpoints for OAuth sign-in:
  - `GET /api/auth/oauth/google` — start Google OAuth (PKCE-style state token is generated and stored in a session cookie)
  - `GET /api/auth/oauth/google/callback` — callback redirect (server verifies state, then redirects to `FRONTEND_URL` with `?token=...`)
  - `GET /api/auth/oauth/github` — start GitHub OAuth (state validated)
  - `GET /api/auth/oauth/github/callback` — callback redirect

Security & Hardening:

- OAuth state tokens are generated and validated to protect against CSRF.
- Rate limiting (`express-rate-limit`) and `helmet` headers are enabled in the backend.
- Input validation (`express-validator`) used on critical endpoints (auth, tasks, projects).

Demo / Sandbox:

- For quick testing without real provider credentials use:
  - `GET /api/auth/demo?role=ADMIN` (or MANAGER, STAFF, CLIENT) — returns a demo JWT for that role
- The frontend has "Demo" buttons on the login page to create demo Admin/Manager/Client tokens for sandbox testing.
