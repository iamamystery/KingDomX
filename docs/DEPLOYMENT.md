# Deployment Guide — KingdomX (expanded)

## Frontend (Vercel)

- Recommended: Connect this repository to Vercel and set the root to the `frontend` directory.
- Add environment variables in Vercel:
  - NEXT_PUBLIC_API_URL -> Backend URL
  - NEXT_PUBLIC_AI_URL -> AI service URL
- For automatic deployment: Vercel will trigger a build on push to `main`.

---

## Frontend CI (GitHub Actions) — E2E integration (important)

We run end-to-end Cypress tests on every push to `main`. The workflow used is `.github/workflows/frontend-ci.yml`.

Key details:

- The job will:
  - install frontend dependencies and build the frontend,
  - start `postgres` and `mongo` via `docker-compose` (using `docker-compose up -d postgres mongo`),
  - install backend dependencies, run Prisma migrations/seeds (best-effort) and start the backend server in the runner,
  - wait for the backend at `http://localhost:4000` and then run Cypress tests against `http://localhost:3000`.
- Cypress tests require a running backend and will use `API_URL` pointing to `http://localhost:4000`. The CI step sets `API_URL` for the test run.

Add the following repository secrets for CI and deploys:

- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (for frontend deploys)
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_ACCOUNT_ID`, `AWS_ECS_CLUSTER`, `AWS_ECS_SERVICE` (for AWS backend deploys)
- `AZURE_CREDENTIALS`, `AZURE_ACR_NAME`, `AZURE_WEBAPP_NAME`, `AZURE_RESOURCE_GROUP` (for Azure deploys)

Notes and troubleshooting:

- If tests fail due to the backend not responding, check the `Wait for backend to be ready` step in the workflow and logs for any Prisma migration errors.
- For faster CI, consider using a prebuilt backend container or a test matrix that runs E2E only on PR merges to `main`.

### Parallel E2E matrix and retry policy

- The workflow `.github/workflows/frontend-ci.yml` includes an `e2e` job that runs end-to-end specs in parallel using a **matrix**. By default this runs:
  - `cypress/e2e/reorder.cy.ts`
  - `cypress/e2e/cross_column.cy.ts`

- To add a new spec to parallel execution: edit the `matrix.spec` array in `.github/workflows/frontend-ci.yml` and add the path to your new spec file.

- Each matrix worker starts Postgres/Mongo and the backend locally, then runs a single Cypress spec to keep jobs isolated and fast. The job is configured to wait for `http://localhost:4000/api/ping` before running tests.

- Retry settings:
  - Cypress `retries` is configured in `cypress.config.ts` (runMode: `2`). This helps with transient CI flakiness.
  - The GitHub Action invocation also specifies `retries: 2` so failed runs will be retried by the runner.

### Robust drag helpers

- Drag & drop flakiness is common in CI due to animation and timing differences. We added a resilient helper at `cypress/support/commands.ts`:
  - `cy.dragFromTo(source, target, options)` performs stepped pointer moves and will retry the drag multiple times (default: 3 attempts). Options: `{ attempts, steps, waitBetween }`.
  - Example usage in tests: `cy.dragFromTo(srcSel, dstSel, { attempts: 4, steps: 8 })`.

- If a test continues to flake:
  - Run the spec locally in headed mode (`npx cypress open`) and use `--headed` in CI to replicate the environment.
  - Increase `defaultCommandTimeout` or `retries` in `cypress.config.ts` temporarily while stabilizing flakey tests.
  - Consider stubbing slow external services in tests to isolate behavior.

These improvements help keep the CI fast and make E2E runs more reliable across environments.

### Artifacts and smoke job

- Artifact capture:
  - Each E2E matrix job uploads `frontend/cypress/screenshots` and `frontend/cypress/videos` as artifacts (check the workflow run → Artifacts section).
  - Artifacts are uploaded even on failure (`if: always()`), and are named per-spec (e.g., `cypress-cypress/e2e/reorder.cy.ts-screenshots`).
  - Use `actions/upload-artifact` to retrieve screenshots and videos from a failed run for debugging.

- Smoke job:
  - The `smoke` job runs a quick smoke spec (`cypress/e2e/smoke.cy.ts`) on PRs to provide fast feedback. It runs after `build-and-test` and uploads screenshots/videos in the same way as matrix workers.
  - To add more quick smoke checks, add files under `cypress/e2e/smoke.*.cy.ts` and update the `smoke` job spec path.

- Accessing artifacts:
  - Open the workflow run in GitHub Actions, select job (matrix worker or smoke), and look for the `Artifacts` tab on the run page. Download the artifact bundle and inspect the screenshots/videos for debugging.

## Backend (AWS ECS) — high-level steps

1. Create an ECR repository (e.g., `kingdomx-backend`).
2. Create or use an existing ECS cluster and service (Fargate recommended).
3. Set up an RDS Postgres instance and MongoDB Atlas for production data.
4. Create GitHub secrets in the repo:
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - AWS_REGION
   - AWS_ACCOUNT_ID
   - AWS_ECS_CLUSTER
   - AWS_ECS_SERVICE
5. The workflow `.github/workflows/backend-deploy.yml` builds and pushes the Docker image to ECR and triggers an ECS service deployment.

## Backend (Azure) — high-level steps

1. Create an Azure Container Registry (ACR) and a Web App for Containers (or Azure App Service).
2. Create a service principal and set `AZURE_CREDENTIALS` secret (JSON) in GitHub secrets.
3. Configure these GitHub secrets:
   - AZURE_CREDENTIALS (service principal), AZURE_ACR_NAME, AZURE_WEBAPP_NAME, AZURE_RESOURCE_GROUP
4. The workflow `.github/workflows/azure-backend-deploy.yml` will push an image to ACR and update the Web App container.

---

## Backend (Render) — high-level steps (simple demo)

Render offers a straightforward way to host containers or web services and provide a simple API to trigger deploys. For a quick production demo using **Render**:

1. Create a Render account at https://dashboard.render.com and create a **Web Service**.
   - Connect the service to this GitHub repository and choose the `backend/` directory as the service root (or use a Dockerfile if preferred).
   - Note the **Service ID** (found in your service settings URL or via the dashboard).
2. Create an **API Key** in Render: Dashboard → Account → API Keys → Create Key.
3. Add these **GitHub Secrets** to your repository (Settings → Secrets → Actions):
   - `RENDER_API_KEY` — the API key created in Render.
   - `RENDER_SERVICE_ID` — the ID of the Render service you created.
   - Also set runtime secrets for production: `DATABASE_URL`, `JWT_SECRET`, `OPENAI_API_KEY`.
4. The workflow `.github/workflows/render-backend-deploy.yml` will trigger a deploy by calling the Render Deploys API when you push to `main`.

Notes & tips:

- The Render deploy endpoint used by the workflow is `POST https://api.render.com/v1/services/<service-id>/deploys`.
- If you prefer automatic deploys, you can keep the GitHub <-> Render connection enabled and Render will deploy on every push without extra secrets.
- Use the Render dashboard to inspect logs, environment variables, and service status.

---

### Providing secrets & invite notes

- You told me you'll provide the secrets via GitHub Secrets: `DATABASE_URL`, `JWT_SECRET`, `OPENAI_API_KEY`. Add them under: Settings → Secrets → Actions.
- To enable Vercel frontend deploys automatically via GitHub Actions, set Vercel secrets as described in the **Frontend (Vercel)** section. If you prefer, add me (a deploy account) as a collaborator to your Vercel project and I can trigger a deploy for you.

## Notes

- Ensure environment variables for DB and secrets are stored securely in your cloud provider.
- For other providers, push images to a registry and update your deployment configuration accordingly.
