# Task Management System

A simple full-stack Task Management application (Express + MongoDB backend, React frontend) used to demonstrate authentication, role-based access control, and task CRUD operations.

---

## Project structure

- `backend/` — Express API
  - `src/app.js` — Express app wiring
  - `src/routes/` — Route definitions (auth, tasks)
  - `src/controllers/` — Controller logic
  - `src/models/` — Mongoose models (`User`, `Task`)
  - `src/middleware/` — Auth, role, validation middleware
  - `src/docs/swagger.js` — Swagger/OpenAPI generation
  - `.env` — environment variables (not committed)
- `frontend/` — React app (simple UI for testing APIs)
  - `src/services/api.js` — API client (auth + tasks)
  - `src/pages/` — Login/Register and Task pages
  - `src/components/` — UI components
- `package.json` (root) — helper scripts to run both services

---

## Prerequisites

- Node.js (>=16 recommended)
- npm
- MongoDB accessible (local or Atlas)

---

## Environment variables

Create a `backend/.env` file (example values):

```
PORT=5000
MONGO_URI=mongodb://<user>:<pass>@host:port/<db>
JWT_SECRET=your_jwt_secret_here
ADMIN_SECRET=admin_secret_key_2024
```

Do not commit `.env` to source control.

---

## Setup

Install dependencies for both services (from repo root):

```powershell
cd backend
npm install

cd ../frontend
npm install
```

Or use the root convenience script to install all:

```powershell
cd <repo-root>
npm run install-all
```

---

## Running

Start backend (development):

```powershell
cd backend
npm run dev
```

Start frontend (development):

```powershell
cd frontend
npm start
```

Run both together from repo root (requires `concurrently`):

```powershell
npm start
```

Default ports:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

---

## API Overview

Base URL: `http://localhost:5000/api/v1`

Auth endpoints:
- `POST /auth/register` — Register a new user (name, email, password)
- `POST /auth/login` — Login and receive JWT token
- `POST /auth/register-admin` — Register admin (requires `adminSecret`)

Task endpoints (require `Authorization: Bearer <token>`):
- `POST /tasks` — Create task (title, description, status, priority)
- `GET /tasks` — List tasks (admin sees all)
- `GET /tasks/:id` — Get task by id
- `PUT /tasks/:id` — Update task
- `DELETE /tasks/:id` — Delete task (admin only)

Authentication: endpoints return a JWT token from `/auth/login`. The frontend stores the token in `localStorage` and attaches it to requests.

---

## Swagger / API docs

Swagger UI is available (when backend is running) at:

```
http://localhost:5000/api-docs
```

Swagger is generated from JSDoc comments in `backend/src/routes/*.js` via `swagger-jsdoc` and served by `swagger-ui-express`.

---

## Admin registration

To create an admin account, either:

- Use the frontend registration UI: enable **Register as admin** and supply the **Admin Secret** (the value of `ADMIN_SECRET` from `backend/.env`).
- Or call the API directly:

```bash
curl -X POST http://localhost:5000/api/v1/auth/register-admin \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","password":"AdminPass123","adminSecret":"admin_secret_key_2024"}'
```

Make sure the `adminSecret` exactly matches the value in your `.env` (watch for extra whitespace/CRLF on Windows).

Alternatively, update an existing user document in MongoDB and set `role: "admin"`.

---

## Validation & sanitization

Server-side input validation and sanitization are implemented using `express-validator`:

- `backend/src/middleware/validate.js` collects and formats validation errors.
- `auth` and `task` routes include validation chains for required fields, enums (`status`, `priority`), email format, and password length.

Validation errors return `400` with a JSON payload like:

```json
{
  "message": "Validation failed",
  "errors": [ { "param": "email", "msg": "Valid email required" } ]
}
```

---

## Troubleshooting

- `Invalid admin secret`: verify `ADMIN_SECRET` via:

```powershell
cd backend
node -e "require('dotenv').config(); console.log(process.env.ADMIN_SECRET)"
```

- `ENOENT package.json` when running `npm start` in the repo root: make sure you `cd frontend` or use the root scripts.

---
## Output
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/2b6ad508-f23d-48db-84a0-b20dc6d97379" />
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/5beb11ab-35e6-4fd0-839e-5168812bba48" />
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/0b122e0c-f436-4062-ae87-27c35780d684" />
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/ba2e0fcb-6e67-4ce6-8219-5a7a6f6f8bd4" />


## Next steps / Improvements

- Add unit/integration tests
- Improve error handling and logging
- Add stronger rate-limiting and security headers for production

---
