# Football Results App

A full-stack football results and squads application with a React/TypeScript frontend and an ASP.NET Core backend.

[![Frontend CI](https://github.com/marko-krznar/Football-Results-ASP.NET-React/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/marko-krznar/Football-Results-ASP.NET-React/actions/workflows/frontend-ci.yml)
[![Backend CI](https://github.com/marko-krznar/Football-Results-ASP.NET-React/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/marko-krznar/Football-Results-ASP.NET-React/actions/workflows/backend-ci.yml)

## Project Structure

```
.
├── frontend/          # React 19 + Vite 7 + TypeScript 5 + MUI 7
├── backend/           # ASP.NET Core 10 + Entity Framework + PostgreSQL
├── .github/workflows/ # GitHub Actions CI pipelines
└── render.yaml        # Render deployment config
```

## Getting Started

### Prerequisites

- Node.js v24.14.0 (see `frontend/.nvmrc`)
- .NET 10 SDK
- PostgreSQL

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Available scripts:

| Command           | Description                     |
|-------------------|---------------------------------|
| `npm run dev`     | Start local dev server (Vite)   |
| `npm run build`   | Type-check + production build   |
| `npm run lint`    | Run ESLint                      |
| `npm run preview` | Preview production build locally |

### Backend

```bash
cd backend
dotnet restore
dotnet run
```

## CI/CD

Every pull request targeting `main` automatically triggers GitHub Actions:

| Workflow        | Trigger              | Steps                              |
|-----------------|----------------------|------------------------------------|
| **Frontend CI** | Changes in `frontend/` | `npm ci` → lint → type-check → build |
| **Backend CI**  | Changes in `backend/`  | `dotnet restore` → `dotnet build --configuration Release` |

Branch protection on `main` requires both checks to pass before a PR can be merged.

## Deployment

The app is deployed on [Render](https://render.com) via `render.yaml`:

| Service                   | Type          | Details                                  |
|---------------------------|---------------|------------------------------------------|
| `React-Football-Results`  | Static Site   | Root: `frontend`, Build: `npm run build` |
| `HPD_Superliga_backend`   | Web (Docker)  | Health check: `/healthz`                 |

Render auto-deploys on every push to `main` — after GitHub Actions CI has already verified the build.

## Technologies

| Layer        | Stack                                                         |
|--------------|---------------------------------------------------------------|
| **Frontend** | React 19, Vite 7, TypeScript 5, MUI 7, Redux Toolkit, Sass   |
| **Backend**  | ASP.NET Core 10, Entity Framework Core 10, PostgreSQL, Serilog |
| **CI/CD**    | GitHub Actions, Render                                        |
