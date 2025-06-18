# Project Overview

**F1 Champions App**

[DEMO FRONTEND](https://awake-mindfulness-production.up.railway.app/)
[DEMO SERVER](https://f1-fullstack-production.up.railway.app/api/seasons)

![F1 Poster](/assets/reference.jpeg "Reference")

A fullstack web application that displays a list of Formula 1 world champions from 2005 to the present. Selecting a champion reveals the winners of each race from that year.

The app is intended for Formula 1 fans, data enthusiasts, and developers interested in sports-based fullstack applications.
The design draws inspiration from retro F1 posters to give a nostalgic, race-day feel.

## Features

- **World Champion List**: View all Formula 1 world champions from 2005 to the latest season.

- **Race Winners by Year**: Click on a champion to explore the individual race winners for that season.

- **High Performance with Redis**: Uses Redis to cache champion and race data for fast response times.

- **Automated Data Refresh**: A scheduled background job (via Bull) fetches new data weekly from the Ergast API.

- **Client-Side Caching**: Uses localStorage on the frontend to avoid redundant API calls and improve UX.

- **Modern Fullstack Stack**: Built with Node.js, PostgreSQL, React, Typescript, and Docker — all wired together with CI/CD.

- **Full Refresh System**: Automatically keeps race data up-to-date via scheduled background refresh jobs (Bull + Redis).

- **Safe Deploy-Time Refresh**: Supports one-time data refresh after deployment using `REFRESH_ON_DEPLOY` flag.

- **Refresh Audit Metadata**: Tracks last refresh timestamp and refresh trigger source (manual, deploy, cron) stored in Redis for monitoring.

- **Redis-powered Rate Limiting (Token Bucket Algorithm)**: Implements burst-friendly request limiting with Redis-backed token bucket strategy, ensuring fair access control while maintaining high availability even under sudden load spikes (supports optional API keys).

- **Deployed to the Cloud**: Hosted on Railway

## Technologies Used

🛠️ **Backend**

- **Runtime & Framework**: Node.js with Express
- **Language**: TypeScript
- **Database**: PostgreSQL (accessed via Prisma ORM)
- **Caching**: Redis (hosted on Railway)
- **Job Queue**: Bull for background processing with bull-board for monitoring
- **Validation**: Zod
- **Security**: Helmet
- **Testing**: Jest
- **API Documentation**: OpenAPI (Swagger)

🎨 **Frontend**

- **Framework**: React with TypeScript
- **Styling**: CSS Modules
- **State Management**: React’s built-in `useState` (no external state library)
- **API Requests**: Axios
- **Testing**: Vitest with React Testing Library

⚙️ **Dev Tools & Infrastructure**

- **Deployment**: Railway (backend, frontend, Redis)
- **CI/CD**: GitHub Actions (lint, test, scan, build, deploy)
- **Vulnerability Scanning**: Trivy and Snyk
- **Containerization**: Docker (multi-service builds and deployment)

## Setup & Installation

**Prerequisites**

- Docker
- Make

**Clone the Project**

```bash
git clone https://github.com/sadaskeanu/f1-fullstack.git
cd f1-fullstack
```

**Setup Environment Variables**

Copy .env.example files for the root, backend, and frontend using:

```bash
make setup-env
```

This will create:

.env

server/.env

client/.env

🚀 **Start the App**

Spin up all containers with build:

```bash
make up
```

To stop everything:

```bash
make down
```

Other useful commands:

- make restart: Rebuild and restart containers

- make logs: Follow container logs

- make prune: Clean up all unused Docker resources

- make build: Build Docker images

🧪 **Run Tests**

Server tests:

```bash
make test-server
```

Client tests:

```bash
make test-client
```

## 🧭 Local App URLs

| Service              | URL                                                                              | Description                                   |
| -------------------- | -------------------------------------------------------------------------------- | --------------------------------------------- |
| 🖥️ Frontend UI       | [http://localhost:8080](http://localhost:8080)                                   | React-based interface for exploring champions |
| 🧠 API: World Champs | [http://localhost:4000/api/seasons](http://localhost:4000/api/seasons)           | List of world champions (2005–now)            |
| 🏁 API: Race Winners | [http://localhost:4000/api/2005/winners](http://localhost:4000/api/2005/winners) | Replace `2005` with any year for race winners |
| 📄 Swagger Docs      | [http://localhost:4000/api-docs](http://localhost:4000/api-docs)                 | Interactive API documentation (OpenAPI)       |
| 📊 BullMQ Dashboard  | [http://localhost:4000/admin/queues](http://localhost:4000/admin/queues)         | Background job dashboard                      |
| 🐘 pgAdmin           | [http://localhost:5050](http://localhost:5050)                                   |

**pgAdmin credentials**:

Email: admin@admin.com

Password: admin123

## Architecture

The F1 Fullstack app follows a modular fullstack architecture with clear separation of concerns.

### 🧠 Backend Structure

The backend (`server/src`) is organized into dedicated folders based on responsibility:

- **`controllers/`** – Handle incoming HTTP requests and send responses.
- **`routes/`** – Define API routes and connect them to controllers and middleware.
- **`middleware/`** – Custom Express middleware (e.g. logger, error handler, rate limiter, validate).
- **`repositories/`** – Abstract data access using Prisma (e.g. upsert, fetch operations).
- **`services/`** – Business logic like fetching and transforming external data.
- **`processors/`** – Register background job processors (e.g. Bull job consumers).
- **`jobs/`** – Define and schedule recurring jobs (e.g. weekly season refresh).
- **`validation/`** – Request validation schemas using Zod.
- **`models/`** – TypeScript types and API response models.
- **`config/`** – App setup for Redis, database, etc.
- **`constants/`** – Centralized constants (timeouts, rate limits, cache keys).
- **`utils/`** - Small helper functions and utilities:
  **`time/`** - Delay, retry logic, exponential backoff handling for external API requests.
  **`users/`** - Logic for user-related operations such as generating Redis keys for rate limiting.
- **`scripts/`** – CLI scripts for manual or one-time tasks (e.g. batch upserts).
- **`worker.ts`** - Dedicated worker entry point to run Bull background jobs independently from API

#### Pros

- ✅ **Separation of concerns** – Logic is cleanly split by purpose.
- ✅ **Testability** – Each unit (service, repo, middleware) is independently testable.
- ✅ **Scalability** – Easy to extend with new features or API endpoints.
- ✅ **Maintainability** – The structure is predictable and easy to navigate as the app grows.

### 🎯 Frontend Structure

The frontend (`client/src`) is structured around modular React concepts with clear organization:

- **`api/`** – Functions for communicating with the backend API (e.g. via Axios).
- **`assets/`** – Static image files like icons and UI illustrations.
- **`components/`** – Reusable UI components (e.g. `Card`, `Heading`, `Error`, `Link`, etc.).
- **`constants/`** – Shared static values (e.g. durations).
- **`hooks/`** – Custom React hooks (e.g. `useCachedData`) for shared data-fetching logic.
- **`pages/`** – Top-level page components mapped to routes (`WorldsChampions`, `RaceChampions`).
- **`styles/`** – Global stylesheets (`normalize.css`, `base.css`).
- **`types/`** – Shared TypeScript type definitions for world and race champion data.
- **`main.tsx`** – React root entry point.

#### Pros

- ✅ **Modular design** – Encourages separation of UI, logic, and API concerns.
- ✅ **Reusability** – Shared hooks and components reduce duplication.
- ✅ **Scalability** – Easy to extend with new pages, components, or hooks.
- ✅ **Clarity** – Predictable structure that aligns with best practices in modern React apps.

🧪 **API Documentation & Validation**

- OpenAPI/Swagger documents the available routes

- Zod used to validate incoming data

- Helmet secures HTTP headers

## CI/CD Pipeline

This project uses a full GitHub Actions CI/CD workflow to automate the development and deployment lifecycle for both the backend and frontend.

### Key Features

- **Triggered on**:
  - Pushes and pull requests to `main`
  - Scheduled runs every Tuesday at 03:16 UTC

### Workflow Overview

#### 🧩 Install

- `install-backend` – Installs server dependencies (`npm ci`).
- `install-client` – Installs client dependencies (`npm ci`).

#### 🧹 Lint

- `lint-backend` – Lints the backend with ESLint.
- `lint-client` – Lints the frontend with ESLint.

#### 🧪 Test

- `test-backend` – Runs backend tests (Jest) with PostgreSQL service.
- `test-client` – Runs frontend tests (Vitest).

#### 🔐 Security

- `codeql` – Static analysis of backend and frontend using GitHub CodeQL.
- `snyk` – Snyk scans for high-severity vulnerabilities in dependencies (requires `SNYK_TOKEN`).

#### 🐳 Docker

- `docker` – Builds and pushes backend and frontend Docker images to DockerHub.
  - Uses `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets.

#### 🛡️ Image Scanning

- `trivy` – Scans built Docker images (`backend-image`, `frontend-image`) for high and critical vulnerabilities.

#### 🚀 Deployment

- `deploy-backend` – Deploys backend image to [Railway](https://railway.app) using the Railway CLI and service ID.
- `deploy-client` – Deploys frontend image to Railway.

> Deployment only happens from the `main` branch using the `ghcr.io/railwayapp/cli` container.

---

### Secrets Used

| Secret                      | Purpose                             |
| --------------------------- | ----------------------------------- |
| `DOCKERHUB_USERNAME`        | Auth for DockerHub image publishing |
| `DOCKERHUB_TOKEN`           | Auth for DockerHub image publishing |
| `SNYK_TOKEN`                | Snyk CLI vulnerability scanning     |
| `RAILWAY_TOKEN`             | Auth for Railway CLI deployment     |
| `RAILWAY_PROJECT_ID`        | Project ID for Railway deployment   |
| `RAILWAY_SERVER_SERVICE_ID` | Backend service ID in Railway       |
| `RAILWAY_CLIENT_SERVICE_ID` | Frontend service ID in Railway      |

---

This setup ensures reliable testing, vulnerability scanning, container builds, and seamless deployment to production.
