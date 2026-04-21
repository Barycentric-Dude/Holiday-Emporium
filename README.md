# Holiday Emporium (Sachin Travels)

A professional web application for a travel agency with over 35 years of legacy.

## Features
- **Featured Packages:** Dynamic tour listings from MySQL.
- **Detailed Itineraries:** Day-by-day breakdown of travel plans.
- **Lead Generation:** Integrated enquiry form for potential customers.
- **Shared Hosting Optimized:** Built with React and PHP/MySQL for easy deployment.

## Project Structure
- `frontend/`: React application (Tailwind CSS, Radix UI).
- `api/`: PHP Backend API.
  - `sql/`: Database schema and seed data.
- `backend/`: Legacy Python/FastAPI backend (for reference).

## Deployment (Shared Hosting)

### 1. Database Setup
1. Create a MySQL database in your hosting panel (cPanel/DirectAdmin).
2. Import `api/sql/schema.sql` into your database.
3. Import `api/sql/seed.sql` to populate initial tour data.

### 2. Backend Configuration
1. Open `api/config.php` and update the database credentials (`$host`, `$db`, `$user`, `$pass`).
2. Upload the `api/` folder to your `public_html` directory.

### 3. Frontend Deployment
1. Open `frontend/.env` (or create it) and set `REACT_APP_BACKEND_URL` to your domain.
2. Run `npm run build` in the `frontend` directory.
3. Upload the contents of `frontend/build/` to your `public_html` directory.

## Local Development

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
Requires a local PHP server (like XAMPP, WAMP, or `php -S localhost:8000`).
Ensure MySQL is running and the database is configured in `api/config.php`.
