from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL')
if not mongo_url:
    raise ValueError("MONGO_URL environment variable is required")
client = AsyncIOMotorClient(mongo_url)
db_name = os.environ.get('DB_NAME')
if not db_name:
    raise ValueError("DB_NAME environment variable is required")
db = client[db_name]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# CORS Middleware - MUST be added before routes
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

# Models
class LeadCreate(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: str
    package_interest: str
    message: Optional[str] = ""

class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    last_name: str
    phone: str
    email: str
    package_interest: str
    message: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

# Tour data
TOURS = [
    {
        "id": "ashtavinayak",
        "slug": "ashtavinayak-yatra",
        "title": "Divine Ashtavinayak Yatra",
        "title_mr": "दिव्य अष्टविनायक यात्रा",
        "category": "spiritual",
        "duration": "2 Nights / 3 Days",
        "price": "Starting from ₹8,999 per person",
        "tagline": "A spiritual journey covering Maharashtra's sacred Ganpati temples",
        "description": "Embark on a sacred pilgrimage to all eight revered Ganpati temples of Maharashtra. This carefully curated 3-day journey takes you through the divine circuit of Morgaon, Siddhatek, Pali, Mahad, Theur, Lenyadri, Ozar, and Ranjangaon.",
        "image": "/images/ASHTAVINAYAK.jpg",
        "highlights": ["AC Tempo Traveller", "Darshan at all 8 temples", "Breakfast & Dinner included", "Experienced guide"],
        "itinerary": [
            {"day": "Day 1", "title": "Pune - Morgaon - Siddhatek - Pali", "details": "Early morning departure from Pune. Visit Shri Mayureshwar Temple at Morgaon, Shri Siddhi Vinayak at Siddhatek, and Shri Ballaleshwar at Pali. Overnight stay at Pali."},
            {"day": "Day 2", "title": "Mahad - Theur - Lenyadri", "details": "After breakfast, visit Shri Varadvinayak at Mahad, Shri Chintamani at Theur, and Shri Girijatmaj at Lenyadri (requires climbing 300+ steps). Overnight stay near Ozar."},
            {"day": "Day 3", "title": "Ozar - Ranjangaon - Pune", "details": "Morning darshan at Shri Vighnahar at Ozar and Shri Mahaganapati at Ranjangaon. Return to Pune by evening with divine blessings."}
        ]
    },
    {
        "id": "tadoba",
        "slug": "tadoba-tiger-safari",
        "title": "The Roar of Tadoba",
        "title_mr": "ताडोबाची गर्जना",
        "category": "wildlife",
        "duration": "3 Nights / 4 Days",
        "price": "Starting from ₹14,999 per person",
        "tagline": "Experience India's premier Tiger Reserve with expert-led safaris",
        "description": "Discover the raw beauty of Tadoba Andhari Tiger Reserve, Maharashtra's largest and oldest national park. With one of India's highest tiger densities, every safari promises an unforgettable encounter with the wild.",
        "image": "https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/Tadoba-1.png",
        "highlights": ["2 Jungle Safaris (Gypsy)", "Resort accommodation", "All meals included", "Naturalist guide"],
        "itinerary": [
            {"day": "Day 1", "title": "Pune/Mumbai - Tadoba", "details": "Travel to Tadoba Andhari Tiger Reserve. Check-in at the jungle resort. Evening orientation about the park and wildlife."},
            {"day": "Day 2", "title": "Full Day Safari", "details": "Early morning and afternoon safari in the core zone. Spot Royal Bengal Tigers, Leopards, Sloth Bears, Wild Dogs, and over 195 species of birds."},
            {"day": "Day 3", "title": "Safari & Buffer Zone", "details": "Morning safari in the buffer zone. Afternoon at leisure or optional nature walk. Evening campfire and wildlife photography session."},
            {"day": "Day 4", "title": "Tadoba - Return", "details": "Early morning birdwatching. After breakfast, check-out and return journey with memories of the wild."}
        ]
    },
    {
        "id": "dubai",
        "slug": "dubai-shopping-festival",
        "title": "Shop the World: Dubai",
        "title_mr": "दुबई शॉपिंग फेस्टिव्हल",
        "category": "international",
        "duration": "4 Nights / 5 Days",
        "price": "Starting from ₹49,999 per person",
        "tagline": "Curated shopping festivals, luxury stays, and iconic city tours",
        "description": "Experience the glamour of Dubai with our carefully crafted package. From the towering Burj Khalifa to the gold-laden souks, from desert safaris to luxury mall shopping - this trip has it all.",
        "image": "https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome012.jpg",
        "highlights": ["4-star hotel stay", "Desert Safari with BBQ dinner", "Dhow Cruise", "Dubai City Tour"],
        "itinerary": [
            {"day": "Day 1", "title": "Arrival in Dubai", "details": "Arrive at Dubai International Airport. Hotel check-in. Evening free for Dubai Mall visit and Burj Khalifa views."},
            {"day": "Day 2", "title": "Dubai City Tour", "details": "Full day city tour covering Jumeirah Mosque, Palm Jumeirah, Atlantis, Dubai Frame, and Gold & Spice Souks. Evening Dhow Cruise dinner."},
            {"day": "Day 3", "title": "Desert Safari", "details": "Morning at leisure for shopping at Mall of Emirates. Afternoon desert safari with dune bashing, camel riding, BBQ dinner with entertainment."},
            {"day": "Day 4", "title": "Abu Dhabi Day Trip", "details": "Full day excursion to Abu Dhabi. Visit Sheikh Zayed Grand Mosque, Emirates Palace, and Yas Island. Return to Dubai."},
            {"day": "Day 5", "title": "Departure", "details": "Last minute shopping at Global Village or Dubai Outlet Mall. Transfer to airport for return flight."}
        ]
    },
    {
        "id": "singapore",
        "slug": "singapore-experience",
        "title": "Singapore Experience",
        "title_mr": "सिंगापूर अनुभव",
        "category": "international",
        "duration": "4 Nights / 5 Days",
        "price": "Starting from ₹54,999 per person",
        "tagline": "The Lion City awaits with gardens, culture, and culinary delights",
        "description": "Explore the vibrant city-state of Singapore. From the futuristic Gardens by the Bay to the cultural enclaves of Chinatown and Little India, experience a perfect blend of tradition and modernity.",
        "image": "https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome015.jpg",
        "highlights": ["Sentosa Island visit", "Gardens by the Bay", "Night Safari", "Universal Studios"],
        "itinerary": [
            {"day": "Day 1", "title": "Arrival & Marina Bay", "details": "Arrive at Changi Airport. City orientation tour. Evening at Marina Bay Sands and Gardens by the Bay light show."},
            {"day": "Day 2", "title": "Sentosa Island", "details": "Full day at Sentosa Island. Visit Universal Studios Singapore, S.E.A. Aquarium, and enjoy the beaches."},
            {"day": "Day 3", "title": "Cultural Tour", "details": "Explore Chinatown, Little India, and Arab Street. Visit Merlion Park. Afternoon at Orchard Road for shopping."},
            {"day": "Day 4", "title": "Nature & Night Safari", "details": "Morning at Singapore Botanic Gardens. Afternoon at leisure. Evening Night Safari experience."},
            {"day": "Day 5", "title": "Departure", "details": "Morning free for last-minute shopping. Transfer to Changi Airport."}
        ]
    },
    {
        "id": "bangkok-malaysia-singapore",
        "slug": "bangkok-malaysia-singapore",
        "title": "Bangkok Malaysia Singapore",
        "title_mr": "बैंकॉक मलेशिया सिंगापुर",
        "category": "international",
        "duration": "4 to 15 Days",
        "price": "Starting from ₹64,999 per person",
        "tagline": "Four amazing destinations in one incredible journey",
        "description": "Experience the best of Southeast Asia! From Singapore to Malaysia, Bangkok & Pattaya with multiple tour options from 4 to 15 days.",
        "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?crop=entropy&cs=srgb&fm=jpg",
        "highlights": ["Singapore City Tour", "Genting Highlands", "Pattaya Beaches", "Bangkok Temples", "Hong Kong Disneyland", "Macau Casinos"],
        "variants": [
            {"id": "bmsm", "name": "BMS Full", "duration": "11D/10N", "destinations": "Bangkok, Pattaya, Malaysia, Singapore"},
            {"id": "bangkok_pattaya", "name": "Bangkok Pattaya", "duration": "7D/6N", "destinations": "Bangkok, Pattaya"},
            {"id": "singapore_malaysia", "name": "Singapore Malaysia", "duration": "7D/6N", "destinations": "Singapore, Malaysia"},
            {"id": "singapore", "name": "Singapore Only", "duration": "4D/3N", "destinations": "Singapore"},
            {"id": "bmsm_alt", "name": "BMS Alternate", "duration": "8D/7N", "destinations": "Singapore, Malaysia, Bangkok, Pattaya"},
            {"id": "bangkok_singapore", "name": "Bangkok Singapore", "duration": "7D/6N", "destinations": "Bangkok, Pattaya, Singapore"},
            {"id": "hk_msm_bp", "name": "HK MSM BP", "duration": "15D/14N", "destinations": "Hong Kong, Macau, Malaysia, Singapore, Bangkok, Pattaya"},
            {"id": "hk_msm", "name": "HK Malaysia Singapore", "duration": "9D/8N", "destinations": "Hong Kong, Malaysia, Singapore"},
            {"id": "hongkong", "name": "Hong Kong", "duration": "4D/3N", "destinations": "Hong Kong, Macau"},
            {"id": "hk_malaysia", "name": "HK Malaysia", "duration": "7D/6N", "destinations": "Hong Kong, Malaysia"},
            {"id": "malaysia", "name": "Malaysia Only", "duration": "4D/3N", "destinations": "Malaysia (KL, Genting)"}
        ],
        "itinerary": [
            {"day": "Day 1", "title": "Mumbai - Bangkok - Pattaya", "details": "Depart to Bangkok. Proceed to Pattaya. Evening Alcazar Show.", "stay": "Pattaya"},
            {"day": "Day 2", "title": "Pattaya", "details": "Coral Island by Speed Boat, Parasailing, Glass bottom boat. Mini Siam. Thai Massage.", "stay": "Pattaya"},
            {"day": "Day 3", "title": "Pattaya - Bangkok", "details": "Nong Nooch Village - Thai Cultural Show and Elephant Show. Chao Praya River Cruise dinner.", "stay": "Bangkok"},
            {"day": "Day 4", "title": "Bangkok - Safari World", "details": "Safari World - Wild Life Safari, Marine Park, Orang Utan Boxing, Dolphins Show.", "stay": "Bangkok"},
            {"day": "Day 5", "title": "Bangkok Temple Tour", "details": "Golden Buddha, Reclining Buddha, Principle Buddha. Baiyoke Sky Tower. Shopping.", "stay": "Bangkok"},
            {"day": "Day 6", "title": "Bangkok - Genting Highlands", "details": "Flight to Kuala Lumpur. Proceed to Genting Highlands. Cable Car ride. Casino.", "stay": "Genting Highlands"},
            {"day": "Day 7", "title": "Genting Highlands", "details": "Genting Highlands Theme Park - Monorail, Roller Coaster, Go Carting, Water Splash.", "stay": "Genting Highlands"},
            {"day": "Day 8", "title": "Genting - Kuala Lumpur", "details": "KL City tour - Batu Caves, Petronas Twin Tower, KL Tower. Shopping.", "stay": "Kuala Lumpur"},
            {"day": "Day 9", "title": "Kuala Lumpur - Singapore", "details": "Proceed to Singapore by bus. Night Safari.", "stay": "Singapore"},
            {"day": "Day 10", "title": "Singapore", "details": "Jurong Bird Park. Sentosa Island - Wax Museum, Underwater World.", "stay": "Singapore"},
            {"day": "Day 11", "title": "Singapore - Mumbai", "details": "Departure to Mumbai.", "stay": ""}
        ]
    },
    {
        "id": "konkan",
        "slug": "konkan-coastal-retreat",
        "title": "Konkan Coastal Retreat",
        "title_mr": "कोकण किनारा सहल",
        "category": "coastal",
        "duration": "3 Nights / 4 Days",
        "price": "Starting from ₹11,999 per person",
        "tagline": "Premium Konkan beaches, temples, and Malvani cuisine",
        "description": "Escape to the pristine beaches of Konkan coast. From the white sands of Tarkarli to the historic Sindhudurg Fort, experience the untouched beauty of Maharashtra's coastline with authentic Malvani hospitality.",
        "image": "https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/Nainital-9.png",
        "highlights": ["Scuba diving at Tarkarli", "Sindhudurg Fort visit", "Malvani cuisine", "Beach camping"],
        "itinerary": [
            {"day": "Day 1", "title": "Pune - Ganpatipule", "details": "Depart from Pune. Visit the famous Ganpatipule Swayambhu Ganpati Temple. Evening at the pristine Ganpatipule Beach. Overnight stay."},
            {"day": "Day 2", "title": "Ganpatipule - Tarkarli", "details": "Drive along the scenic Konkan coast to Tarkarli. En route visit Jaigad Fort. Evening at Tarkarli Beach with Malvani seafood dinner."},
            {"day": "Day 3", "title": "Tarkarli & Sindhudurg", "details": "Morning scuba diving or snorkeling at Tarkarli. Afternoon boat ride to Sindhudurg Fort. Evening bonfire at beach campsite."},
            {"day": "Day 4", "title": "Return to Pune", "details": "After breakfast, visit Vengurla Beach. Begin return journey to Pune via Amboli Ghat with scenic stops."}
        ]
    },
    {
        "id": "corbett",
        "slug": "jim-corbett-safari",
        "title": "Jim Corbett Tiger Safari",
        "title_mr": "जिम कॉर्बेट वाघ सफारी",
        "category": "wildlife",
        "duration": "3 Nights / 4 Days",
        "price": "Starting from ₹16,999 per person",
        "tagline": "India's oldest national park and the heart of Project Tiger",
        "description": "Journey to Jim Corbett National Park, established in 1936 as India's first national park. Home to the majestic Royal Bengal Tiger and set against the backdrop of the Himalayan foothills, this is a wildlife experience like no other.",
        "image": "https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/Tadoba-3.png",
        "highlights": ["Jeep Safari in Dhikala Zone", "Riverside resort stay", "Bird watching", "Corbett Museum visit"],
        "itinerary": [
            {"day": "Day 1", "title": "Delhi - Corbett", "details": "Drive from Delhi to Jim Corbett National Park (approx 6 hrs). Check-in at riverside resort. Evening nature walk along the Kosi River."},
            {"day": "Day 2", "title": "Dhikala Zone Safari", "details": "Full day safari in the famous Dhikala zone. Spot Tigers, Elephants, Deer, and Gharials. Packed lunch in the park."},
            {"day": "Day 3", "title": "Bijrani Zone Safari", "details": "Morning safari in Bijrani zone. Afternoon visit to Corbett Museum and Garjia Devi Temple. Evening at leisure."},
            {"day": "Day 4", "title": "Return to Delhi", "details": "Early morning birdwatching. After breakfast, check-out and drive back to Delhi."}
        ]
    },
    {
        "id": "sri-lanka-maldives",
        "slug": "sri-lanka-maldives",
        "title": "Sri Lanka With Maldives",
        "title_mr": "श्रीलंका और मालदीव",
        "category": "international",
        "duration": "6 Nights / 7 Days",
        "price": "Starting from ₹59,999 per person",
        "tagline": "Cultural immersion in Sri Lanka combined with Maldives luxury",
        "description": "This itinerary offers a seamless blend of cultural exploration and tropical luxury, beginning in Colombo and moving into the scenic heart of Kandy. The second half transitions into pure relaxation in the Maldives — one of the world's most sought-after tropical destinations.",
        "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=srgb&fm=jpg",
        "highlights": ["Pinnawala Elephant Orphanage", "Temple of the Tooth", "Nuwara Eliya Tea Estates", "Maldives Beach Resort"],
        "itinerary": [
            {"day": "Day 1", "title": "Mumbai - Colombo - Kandy", "details": "Depart to Colombo. En route visit Pinnawala Elephant Orphanage. Proceed to Kandy."},
            {"day": "Day 2", "title": "Kandy City Tour", "details": "Visit Spice Garden, Gems Factory, Craft Centre, and Temple of the Tooth."},
            {"day": "Day 3", "title": "Kandy - Nuwara Eliya", "details": "Proceed to Nuwara Eliya. En route visit Tea Estate, Tea Factory, and Sita Amman Temple."},
            {"day": "Day 4", "title": "Nuwara Eliya - Colombo", "details": "Proceed to Colombo. City tour with Freedom Memorial, Museum, Beach, Shopping at ODEL."},
            {"day": "Day 5", "title": "Colombo - Maldives", "details": "Depart to Male. Transfer to resort by speed boat. Day at leisure."},
            {"day": "Day 6", "title": "Maldives - Leisure Day", "details": "Day free for relaxation. Optional water sports: Parasailing, Scuba diving, Fishing, Snorkeling."},
            {"day": "Day 7", "title": "Maldives - Mumbai", "details": "Breakfast and departure to Mumbai. Tour ends."}
        ]
    },
    {
        "id": "dubai",
        "slug": "dubai",
        "title": "Dubai",
        "title_mr": "दुबई",
        "category": "international",
        "duration": "3 Nights / 4 Days",
        "price": "Starting from ₹39,999 per person",
        "tagline": "Luxury, innovation, and cultural fusion in the heart of UAE",
        "description": "Dubai is a city that truly exemplifies luxury, innovation, and cultural fusion. From iconic Burj Al Arab to desert safaris, gold souks to dhow cruises — experience the world's most exciting destination.",
        "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=srgb&fm=jpg",
        "highlights": ["Burj Al Arab", "Desert Safari", "Gold Souk", "Dhow Cruise"],
        "itinerary": [
            {"day": "Day 1", "title": "Mumbai - Dubai", "details": "Depart to Dubai. Arrival and transfer to hotel."},
            {"day": "Day 2", "title": "Dubai City Tour", "details": "City tour - Burj Al Arab, Jumeira Mosque, Dubai Museum, Gold Souk, Spice Souk, Madinat Jumeirah. Evening Dhow Cruise with dinner."},
            {"day": "Day 3", "title": "Dubai - Desert Safari", "details": "Free time for shopping. Afternoon Desert Safari with dune bashing, camel ride, belly dancing, and BBQ dinner."},
            {"day": "Day 4", "title": "Dubai - Mumbai", "details": "Check out and departure to Mumbai. Tour ends."}
        ]
    }
]

# Routes
@api_router.get("/")
async def root():
    return {"message": "Holiday Emporium API"}

@api_router.get("/tours")
async def get_tours():
    return {"tours": TOURS}

@api_router.get("/tours/{tour_id}")
async def get_tour(tour_id: str):
    tour = next((t for t in TOURS if t["id"] == tour_id), None)
    if not tour:
        raise HTTPException(status_code=404, detail="Tour not found")
    return tour

@api_router.post("/leads")
async def create_lead(lead_data: LeadCreate):
    lead = Lead(**lead_data.model_dump())
    doc = lead.model_dump()
    await db.leads.insert_one(doc)
    doc.pop("_id", None)
    return {"success": True, "message": "Thank you! We will contact you soon.", "lead_id": lead.id}

@api_router.get("/leads")
async def get_leads():
    leads = await db.leads.find({}, {"_id": 0}).to_list(1000)
    return {"leads": leads}

app.include_router(api_router)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
