# KingdomX Django Backend (backend-django)

This is an optional Django backend scaffold added to the KingdomX monorepo as a non-breaking additional backend service. It provides minimal endpoints used by the frontend for a production demo.

Endpoints

- GET /api/ping — returns {"pong": true}
- GET /api/auth/demo?role=ADMIN — returns a signed JWT demo token for the requested role (useful for testing)

Environment

- `DATABASE_URL` — production Postgres URL (optional, falls back to sqlite in development)
- `JWT_SECRET` — secret used to sign demo JWT tokens
- `DEBUG` — set to `true` to enable debug mode locally

Run locally (recommended via Docker)

- docker build -t kingdomx-backend-django ./backend-django
- docker run -p 8000:8000 --env-file backend-django/.env.example kingdomx-backend-django

Deploying to Render

- Create a Render Web Service and point it to the `backend-django` directory or configure a Docker deploy.
- Add `DATABASE_URL`, `JWT_SECRET`, and `OPENAI_API_KEY` to the Render environment.
- Add GitHub secret `RENDER_SERVICE_ID_DJANGO` to trigger the deploy workflow (optional).
