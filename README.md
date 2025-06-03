# Project Overview

**F1 Champions App**

[DEMO FRONTEND](https://awake-mindfulness-production.up.railway.app/)
[DEMO SERVER](https://f1-fullstack-production.up.railway.app/api/seasons)

![F1 Poster](/assets/reference.jpeg "Reference")

A fullstack web application that displays a list of Formula 1 world champions from 2005 to the present. Selecting a champion reveals the winners of each race from that year.

The app is intended for Formula 1 fans, data enthusiasts, and developers interested in sports-based fullstack applications.
The design draws inspiration from retro F1 posters to give a nostalgic, race-day feel.

## Features

**World Champion List**: View all Formula 1 world champions from 2005 to the latest season.

**Race Winners by Year**: Click on a champion to explore the individual race winners for that season.

**High Performance with Redis**: Uses Redis to cache champion and race data for fast response times.

**Automated Data Refresh**: A scheduled background job (via Bull) fetches new data weekly from the Ergast API.

**Client-Side Caching**: Uses localStorage on the frontend to avoid redundant API calls and improve UX.

**Modern Fullstack Stack**: Built with Node.js, PostgreSQL, React, Typescript, and Docker — all wired together with CI/CD.

**Deployed to the Cloud**: Hosted on Railway

## Technologies Used

🛠️ **Backend**

**Runtime & Framework**: Node.js with Express

**Database**: PostgreSQL, accessed via Prisma ORM

**Language**: TypeScript

**Caching**: Redis (hosted on Railway)

**Job Queue**: Bull for background tasks, with bull-board for job monitoring

**Validation**: Zod

**Security**: Helmet

**Testing**: Jest

**API Documentation**: OpenAPI (Swagger)

🎨 **Frontend**

**Framework**: React with TypeScript

**Styling**: CSS Modules

**State Management**: useState (no external state library)

**API Requests**: Fetch API and Axios

**Testing**: Vitest + React Testing Library

⚙️ **Dev Tools & Infrastructure**

**Deployment**: Railway (backend + Redis), Railway (frontend)

**CI/CD**: GitHub Actions

**Job Monitoring**: bull-board for managing background jobs

**API Spec**: OpenAPI for clear documentation and testing

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

his will create:

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

The F1 Fullstack app follows a modular fullstack architecture with clear separation of concerns:

📦 **Structure**

client/: React frontend with TypeScript and CSS Modules

server/: Node.js backend with Express, Prisma, and TypeScript

docker-compose.yml: Defines all services for local development (frontend, backend, Redis, PostgreSQL, pgAdmin)

🧠 **Backend Services**

REST API built with Express

Data layer powered by Prisma + PostgreSQL

External data fetched from Ergast API

Redis used to cache:

World champion list

Race winners per season

Bull queue handles background jobs

A scheduled job runs weekly to refresh champion and race data

bull-board provides a web dashboard for job monitoring

🧪 **API Documentation & Validation**

OpenAPI/Swagger documents the available routes

Zod used to validate incoming data

Helmet secures HTTP headers

🎯 **Frontend Logic**

Built with React + TypeScript

Uses Fetch API and Axios for API requests

Manages state via useState hooks

Caches API responses with localStorage

Tested with Vitest and React Testing Library

🚀 **CI/CD & Deployment**

The app uses **GitHub Actions** for a complete CI/CD pipeline, triggered on:

- Push or pull request to the `main` branch

🧱 **Pipeline Stages**

1. **Install**

   - Installs dependencies for both `server/` and `client/` using `npm ci`

2. **Lint**

   - Lints the backend and frontend codebases

3. **Test**

   - Backend tests run with a PostgreSQL container
   - Frontend tests use Vitest and React Testing Library

4. **Security**

   - **CodeQL** analysis for static code vulnerabilities in JavaScript/TypeScript and GitHub Actions
   - **Snyk** scans for known vulnerabilities in both frontend and backend dependencies (`--severity-threshold=high`)

5. **Docker**

   - Builds and pushes Docker images to Docker Hub:
     - `${{ secrets.DOCKERHUB_USERNAME }}/f1-backend:latest`
     - `${{ secrets.DOCKERHUB_USERNAME }}/f1-frontend:latest`

6. **Vulnerability Scanning**

   - **Trivy** scans Docker images for `HIGH` and `CRITICAL` severity issues

7. **Deployment**
   - Automatic deployment to **Railway** using Railway CLI
   - Triggered only on the `main` branch
   - Uses the following GitHub secrets:
     - `RAILWAY_PROJECT_ID`
     - `RAILWAY_TOKEN`
     - `RAILWAY_SERVER_SERVICE_ID`
     - `RAILWAY_CLIENT_SERVICE_ID`
