# Project Mandates (GEMINI.md)

This file contains project-specific instructions and standards that take precedence over general defaults.

## Project Structure
- **Frontend:** React (TypeScript) in the `frontend/` directory.
- **Backend:** ASP.NET Core (C#) in the `backend/` directory using .NET 10.

## Backend Standards
- **Framework:** .NET 10 with Minimal APIs.
- **API Documentation:** Use **Scalar** instead of Swagger UI (`/scalar/v1`).
- **Database:** Currently using **Entity Framework Core In-Memory** for development.
- **Data Structure:** 
  - `backend/Data/` - DbContext and data access logic.
  - `backend/Models/` - Data models (e.g., `Match`).
- **Comments:** All code comments MUST be written in **English**.

## Frontend Standards
- **Styling:** Use MUI components and Sass for custom styling.
- **Components:** Functional components with TypeScript interfaces for props.
- **Data Integration:** Use `fetch` or `axios` to connect to the backend API (`/api/matches`).

## Deployment
- **Backend:** Target platform is **Render** (as a Web Service).
- **Frontend:** Render (as a Static Site).
