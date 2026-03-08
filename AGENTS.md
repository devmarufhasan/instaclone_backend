# AGENTS.md

## Project Overview

This repository is a small Node.js backend for an Instagram clone. It currently uses:

- `express` for the HTTP server
- `mongoose` for MongoDB access
- `nodemon` for local development
- `docker-compose.yaml` to run MongoDB locally

The application is intentionally minimal right now. Do not assume hidden architecture, test coverage, validation layers, auth, or error handling already exist.

## Runtime Shape

- Entry point: `server.js`
- Express app setup: `src/app.js`
- MongoDB connection: `src/config/databases.js`
- Environment variables: `.env`
- Local MongoDB service: `docker-compose.yaml`

Current boot flow:

1. `server.js` loads the Express app.
2. `server.js` calls `connectToDatabase()`.
3. The app listens on `process.env.PORT || 3000`.

## Commands

Use these commands when working in this repo:

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Start MongoDB with Docker: `docker compose up -d`
- Stop MongoDB: `docker compose down`

There is no real test suite yet. `npm test` is a placeholder and currently fails by design.

## Environment Rules

Expected environment variables from `.env`:

- `PORT`
- `MONGODB_URI`

Current local default pattern:

- App port: `3000`
- MongoDB URI points to local Docker MongoDB with username/password auth

When changing connection behavior:

- Keep `.env` as the source of truth for runtime config
- Do not hardcode secrets or connection strings in application files
- Preserve compatibility with the Docker MongoDB service unless the task explicitly changes local setup

## Code Structure Conventions

Follow these conventions unless the user asks for a different structure:

- Keep server bootstrap concerns in `server.js`
- Keep Express app wiring in `src/app.js`
- Keep database connection logic in `src/config/databases.js`
- Add new feature code under `src/` using clear folders such as:
  - `src/routes`
  - `src/controllers`
  - `src/models`
  - `src/middlewares`
  - `src/utils`

If you add a new layer, wire it in explicitly instead of creating dead files.

## Implementation Guidance

When making changes:

- Prefer small, direct CommonJS modules to match the current codebase
- Use async/await for database and request logic
- Add basic error handling when touching startup or database code
- Keep naming straightforward and consistent with existing files
- Avoid introducing TypeScript, ESM, or major framework changes unless requested
- Avoid adding new dependencies unless they solve a clear problem the current stack cannot

## API Work Expectations

If adding endpoints:

- Register middleware and routers in `src/app.js`
- Validate request shape at the boundary when practical
- Return consistent JSON responses
- Use appropriate HTTP status codes
- Avoid embedding database logic directly in route registration when the code starts to grow

For Mongoose work:

- Keep schemas and models under `src/models` if added
- Keep connection concerns in `src/config/databases.js`
- Do not open multiple database connections unless explicitly required

## Verification Expectations

Before finishing work, verify with the lightest relevant checks available, for example:

- `npm run dev` for startup validation
- Basic route smoke checks if endpoints were added
- MongoDB connection startup if database code changed

If a task cannot be fully verified because tests do not exist, say that explicitly.

## Safety Notes

- Do not edit `node_modules`
- Treat `.env` as local developer configuration
- Do not remove or rewrite user changes outside the requested scope
- If Docker or MongoDB is required for validation, mention that clearly in the final response
