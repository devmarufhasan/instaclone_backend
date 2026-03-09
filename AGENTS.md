# AGENTS.md

## Overview

This is a small Node.js backend for an Instagram clone. The current stack is:

- Node.js with CommonJS modules
- Express 5
- Mongoose 9
- dotenv
- Local MongoDB via `docker-compose.yaml`

Keep changes small and explicit. Do not assume there is already a service layer, controller layer, validation library, auth system, or test suite unless it is visible in the repo.

## Current Files

Read these files first before changing behavior:

- `server.js`
  Loads environment variables, connects to MongoDB, then starts the Express server.
- `src/app.js`
  Registers middleware and HTTP routes.
- `src/config/databases.js`
  Handles the Mongoose connection using `process.env.MONGODB_URI`.
- `src/routes/auth.route.js`
  Contains the auth routes. Right now it has browser-safe `GET` routes and a `POST /api/auth/register` route.
- `src/models/user.model.js`
  Defines the Mongoose user schema.
- `.env`
  Defines `PORT` and `MONGODB_URI`.

## Commands

Use `npm` in this project.

- Install dependencies: `npm install`
- Run the backend in dev mode: `npm run dev`
- Start MongoDB with Docker: `docker compose up -d`
- Stop MongoDB: `docker compose down`

There is no working automated test suite yet. `npm test` is only a placeholder.

## Runtime Notes

- Default server port is `3000`
- MongoDB connection is read from `.env`
- The server starts only after MongoDB connects successfully

If MongoDB is down or the URI is wrong, the process exits and browser requests will fail because the HTTP server never finishes booting.

## Current Routes

These routes should exist unless a task changes them:

- `GET /`
- `GET /health`
- `GET /api/auth`
- `GET /api/auth/register`
- `POST /api/auth/register`

Important:

- A browser address bar sends `GET`
- `POST /api/auth/register` must be tested with Postman, Thunder Client, Insomnia, or `curl`

## Implementation Rules

- Stay with CommonJS unless the user explicitly asks for ESM or TypeScript
- Keep startup logic in `server.js`
- Keep Express wiring in `src/app.js`
- Keep database logic in `src/config/databases.js`
- Put new route modules in `src/routes`
- Put new Mongoose models in `src/models`
- Prefer async/await
- Add basic error handling around async route code when modifying route behavior

## Data And Security Notes

- Do not hardcode credentials in source files
- Keep secrets in `.env`
- Do not commit `.env`
- Passwords are currently stored as plain text in `src/models/user.model.js` usage flow; if auth work is requested, hashing should be added before calling the feature complete

## Verification

After backend changes, use the lightest useful checks available:

- Confirm the server starts with `npm run dev`
- Confirm browser-safe routes in a browser:
  - `http://localhost:3000/`
  - `http://localhost:3000/health`
  - `http://localhost:3000/api/auth`
- Confirm `POST /api/auth/register` with an API client, not the browser address bar

If MongoDB or Docker access is unavailable, say clearly what could not be verified.
