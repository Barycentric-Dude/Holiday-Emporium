# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Holiday Emporium (formerly Sachin Travels) is a travel agency web app. The frontend is a React SPA; the active backend is PHP 8.2 + MySQL served via Apache. The `/backend` Python/FastAPI directory is a legacy prototype — it is **not used by the frontend** and can be ignored for all active development.

---

## Commands

### Frontend (all commands run from `frontend/`)

```bash
npm start          # Dev server on http://localhost:3000
npm run build      # Production build → frontend/build/
npm test           # Run tests
```

Before starting, create `frontend/.env`:
```
REACT_APP_BACKEND_URL=http://localhost:8000
```
The app appends `/api` to this URL for all requests.

### Backend (Docker)

```bash
docker compose up -d      # Start MySQL (port 3306) + PHP API (port 8000)
docker compose down       # Stop containers
docker compose logs -f    # Stream logs
```

On first boot, Docker auto-imports `api/sql/schema.sql` then `api/sql/seed.sql`.

### Backend (without Docker)

Requires local PHP 8.2 + MySQL. Edit `api/config.php` directly with credentials, then:
```bash
cd api && php -S localhost:8000
```

---

## Architecture

### Request Flow

```
Browser → React SPA (port 3000)
             ↓ axios (withCredentials: true)
         PHP API (port 8000) → MySQL
```

`axios.defaults.withCredentials = true` is set globally in `App.js` so PHP session cookies work across origins.

### PHP API (`/api`)

URL routing is handled by `api/.htaccess` (Apache mod_rewrite):
- `GET /api/tours` → `tours.php`
- `GET /api/tours/:id` → `tours.php?id=:id`
- `POST /api/leads` → `leads.php`
- `/api/admin/*` → `admin/*.php` (session-protected)

Every PHP file must `require_once 'config.php'` (or `require_once __DIR__ . '/../config.php'` from admin/). `config.php` opens the PDO connection, sets CORS headers, and starts the session.

**Admin protection:** All files under `api/admin/` must `require_once 'middleware.php'` and call `verify_admin()` at the top. This checks `$_SESSION['admin_id']` and exits with 401 if absent.

Default admin credentials (seeded via `api/sql/seed.sql`): `admin` / `admin123`

### Database Schema

Five tables: `tours`, `tour_highlights`, `tour_itineraries`, `tour_variants` (all FK to `tours.id` with CASCADE DELETE), and `leads`. Tour IDs are strings (slugs), not integers. Re-seed with `api/sql/seed.sql` via phpMyAdmin or MySQL CLI.

### Frontend (`/frontend/src`)

- **`App.js`** — defines all routes and wraps the app in `AuthProvider` + `BrowserRouter`
- **`context/AuthContext.jsx`** — admin auth state; consumed by admin pages and `AdminLayout`
- **`components/admin/AdminLayout.jsx`** — protected layout wrapper; redirects to `/admin/login` if unauthenticated
- **`components/ui/`** — shadcn/ui primitives (Radix UI based); don't modify these directly
- **`pages/`** — one file per route; tour detail pages (`/tours/*`) fetch from the PHP API on mount

Tour detail pages each map to a specific route defined in `App.js`. Adding a new tour requires: a new page component, a new `<Route>` in `App.js`, a new entry in `Navbar.jsx` dropdowns, and a DB row in MySQL.

### Styling

Design system: **"Organic & Earthy"** — Cormorant Garamond (headings) + Manrope (body), warm Stone palette, deep forest green primary (`#1E3F20`), terracotta secondary (`#C17A58`), gold accent (`#D4A373`).

CSS custom properties (`--brand-primary`, `--brand-accent`, etc.) are defined in `src/index.css` and used throughout. Always reference these variables rather than hardcoding hex values. Full token definitions and typography hierarchy are in `design_guidelines.json`.

### Logo & Favicon

- Logo: `frontend/public/images/logo.png` — referenced as `src="/images/logo.png"` (public path, not bundled)
- Favicon: `frontend/public/favicon.png`
- Source files are the PNGs in the repo root. When updating logos, copy them to the public folder above.
- On transparent/hero backgrounds, apply `brightness-0 invert` CSS to make the logo white.

---

## Shared Hosting Deployment

1. Build frontend with production URL: `REACT_APP_BACKEND_URL=https://yourdomain.com npm run build`
2. Upload `frontend/build/` contents to `public_html/`
3. Upload `api/` to `public_html/api/`
4. Add to `public_html/.htaccess` for SPA routing:
   ```apache
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_URI} !^/api/
   RewriteRule ^ index.html [QSA,L]
   ```
5. Create MySQL DB via cPanel, import schema.sql then seed.sql
6. Edit `api/config.php`: replace `getenv()` calls with hardcoded credentials (`$host = 'localhost'`)
7. Set PHP 8.2 in cPanel → MultiPHP Manager; enable SSL via AutoSSL
