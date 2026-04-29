# Holiday Emporium - Project Context

## Project Overview
Holiday Emporium (formerly Sachin Travels) is a travel agency web application with over 35 years of legacy. The project features a modern React frontend and has been recently migrated from a Python/FastAPI/MongoDB backend to a PHP/MySQL architecture optimized for standard shared hosting.

### Main Technologies
- **Frontend:** React (Create React App), Tailwind CSS, Lucide Icons, Radix UI.
- **Backend (Modern/Live):** PHP 8.x with PDO (MySQL), Apache.
- **Backend (Legacy):** Python 3.9+, FastAPI, MongoDB.
- **Database:** MySQL (Relational).
- **Environment:** Docker Compose for local development (MySQL + PHP).

### Architecture
- **`/frontend`**: Contains the React source code. Communicates with the backend via JSON APIs.
- **`/api`**: The active PHP backend. Includes an `/admin` subdirectory for dashboard operations.
- **`/api/sql`**: Contains the database schema (`schema.sql`) and initial tour data (`seed.sql`).
- **`/backend`**: Legacy Python implementation (currently used for reference or specific testing).

---

## Building and Running

### Local Development (Docker)
The easiest way to run the backend and database is via Docker:
1.  Start containers: `docker compose up -d`
2.  Initialize/Update Database: Import `api/sql/schema.sql` and `api/sql/seed.sql` into the `holiday_emporium` database (automatically handled on first boot if using Docker).
3.  Access Backend: `http://localhost:8000`

### Frontend Development
1.  Navigate to folder: `cd frontend`
2.  Install dependencies: `npm install`
3.  Configure environment: Create `frontend/.env` with `REACT_APP_BACKEND_URL=http://localhost:8000`.
4.  Start development server: `npm start` (Runs on `http://localhost:3000` by default).

### Production Build
1.  Build frontend: `cd frontend && npm run build`
2.  Deploy: Upload `frontend/build/` and the `/api` directory to the host's `public_html`.

---

## Development Conventions

### Backend (PHP)
- **Database Access:** Always use **PDO** with prepared statements to prevent SQL injection.
- **Security:** All files in `api/admin/` must include `middleware.php` and call `verify_admin()` to protect endpoints.
- **JSON:** All API responses must set `header('Content-Type: application/json')` and return structured JSON.

### Frontend (React)
- **Styling:** Use **Tailwind CSS** utility classes. Adhere to the "Organic & Earthy" theme defined in `design_guidelines.json`.
- **Components:** Prefer reusable UI components in `src/components/ui/`.
- **Auth:** Use the `AuthContext` to manage admin login state.
- **API Calls:** Use `axios` with `withCredentials: true` to support PHP session cookies.

### Authentication
- **Admin Login:** Handled via PHP Sessions.
- **Default Credentials:** `admin` / `admin123`.
- **Password Hashing:** Use PHP's `password_hash()` (Bcrypt).
