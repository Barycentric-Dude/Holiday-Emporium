# Holiday Emporium

A professional travel agency web application for Holiday Emporium (formerly Sachin Travels) — over 35 years of curated journeys.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Tailwind CSS, Radix UI (shadcn), React Router v7 |
| Backend | PHP 8.2, Apache, PDO |
| Database | MySQL 8.0 |
| Local Dev | Docker Compose |

> The `/backend` Python/FastAPI directory is a legacy prototype and is not used in production.

## Local Development

### Prerequisites
- Docker & Docker Compose
- Node.js 18+

### Backend
```bash
docker compose up -d
# PHP API → http://localhost:8000
# MySQL → port 3306 (auto-seeded on first boot from api/sql/)
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env          # Set REACT_APP_BACKEND_URL=http://localhost:8000
npm start                      # http://localhost:3000
```

## Deployment (Shared Hosting)

### 1. Database
1. Create a MySQL database in cPanel.
2. Import `api/sql/schema.sql`, then `api/sql/seed.sql` via phpMyAdmin.

### 2. PHP Backend
1. Edit `api/config.php` — replace `getenv()` calls with your actual DB credentials (`$host = 'localhost'`).
2. Upload the `api/` folder to `public_html/api/`.

### 3. React Frontend
```bash
cd frontend
echo "REACT_APP_BACKEND_URL=https://yourdomain.com" > .env
npm run build
```
Upload everything inside `frontend/build/` to `public_html/`.

### 4. Apache SPA Routing
Add to `public_html/.htaccess`:
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !^/api/
RewriteRule ^ index.html [QSA,L]
```

### 5. Final Checks
- Set PHP version to **8.2** in cPanel → MultiPHP Manager.
- Enable SSL via cPanel → AutoSSL.
- Admin panel: `https://yourdomain.com/admin` — default credentials `admin` / `admin123` (change after first login).

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tours` | All tours |
| GET | `/api/tours/:id` | Single tour with itinerary, highlights, variants |
| POST | `/api/leads` | Submit enquiry form |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/leads` | All leads (protected) |
| GET/POST/PUT/DELETE | `/api/admin/tours` | Manage tours (protected) |
