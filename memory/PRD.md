# Holiday Emporium (Sachin Travels) - PRD

## Original Problem Statement
Re-imagine the WordPress-based Sachin Travels / Holiday Emporium site into a high-performance bespoke web application with premium travel aesthetic, Three.js hero, bilingual support, and lead management.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn UI
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Design**: Organic & Earthy theme with Cormorant Garamond + Manrope fonts

## User Personas
1. **Pune-based spiritual traveler** - Looking for Ashtavinayak/temple circuits
2. **Adventure seeker** - Wildlife safaris (Tadoba, Corbett)
3. **International tourist** - Dubai, Singapore, Bali packages
4. **Family vacation planner** - Coastal retreats, hill stations

## Core Requirements (Static)
- Immersive hero section with mode toggle (Spiritual/Adventure)
- Tour categories bento grid (6 categories)
- Featured packages with day-by-day itinerary accordions (6 packages)
- Explore Asia infinite scroll carousel
- Trust indicators section
- Company story (35 years legacy)
- Bilingual lead generation form (English/Marathi)
- WhatsApp integration, Sticky CTA, Promo Banner

## What's Been Implemented (Feb 2026)
- [x] Backend: Tour data API (6 packages), Lead management CRUD
- [x] Frontend: All 12 sections implemented and tested
- [x] Hero section with spiritual/adventure mode toggle
- [x] Tour categories bento grid layout
- [x] Featured packages with filter tabs + itinerary accordions
- [x] Explore Asia infinite carousel
- [x] Trust indicators with hover effects
- [x] Company story with stats
- [x] Lead form with bilingual labels
- [x] WhatsApp floating button, Sticky CTA, Promo Banner
- [x] Glassmorphism navbar with scroll effect
- [x] Footer with complete contact info

## Prioritized Backlog
### P0 (Must Have)
- All implemented ✓

### P1 (Should Have)
- Three.js 3D hero scenes (currently using high-res fallback images)
- SEO meta tags optimization
- Image optimization / lazy loading CDN

### P2 (Nice to Have)
- Admin panel for lead management
- Blog/content section
- Testimonials from past travelers
- Interactive map of destinations
- Multi-language toggle (full Marathi site version)
- Newsletter subscription

## Next Tasks
1. Add Three.js (react-three-fiber) for immersive 3D hero backgrounds
2. SEO meta tags and structured data for travel packages
3. Admin dashboard for lead management
4. Mobile responsiveness fine-tuning
5. Performance optimization (image CDN, code splitting)
