import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Heart, Users, ArrowRight, Ship, Landmark, Camera, Mountain, TreePine, Compass } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const HERO_BG = 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1920&q=80';
const ABOUT_IMG = 'https://images.unsplash.com/photo-1573404611406-6297c94d6ebe?auto=format&fit=crop&w=1200&q=80';
const CTA_BG = 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1920&q=80';

const QUICK_INFO = [
  { icon: Clock, label: 'Duration', value: '7N / 8 Days' },
  { icon: MapPin, label: 'Starting Point', value: 'Ho Chi Minh City' },
  { icon: Heart, label: 'Trip Type', value: 'Culture & Nature' },
  { icon: Users, label: 'Ideal For', value: 'All Travelers' },
];

const DESTINATIONS = [
  { name: 'Ho Chi Minh City', desc: 'Saigon — the vibrant southern metropolis. Cu Chi Tunnels, War Remnants Museum, Reunification Palace & Ben Thanh Market.', icon: Landmark, image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80' },
  { name: 'Da Nang', desc: 'Central Vietnam\'s coastal gem. My Son Sanctuary (UNESCO), Dragon Bridge, My Khe Beach & the Golden Bridge on Ba Na Hills.', icon: Mountain, image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hoi An', desc: 'UNESCO-listed ancient trading port famed for its lantern-lit streets, Japanese Covered Bridge & tailor-made clothing.', icon: Camera, image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hanoi', desc: 'Vietnam\'s ancient capital — Hoan Kiem Lake, Old Quarter, Temple of Literature & Ngoc Son Temple.', icon: Compass, image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ha Long Bay', desc: 'UNESCO World Heritage — 1,969 limestone karst islands rising from emerald waters. Caves, kayaking & sunset on a junk boat.', icon: Ship, image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hue', desc: 'Vietnam\'s imperial capital. The Imperial Citadel, royal tombs, Thien Mu Pagoda & authentic Hue cuisine.', icon: TreePine, image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80' },
];

const TOURS = {
  standard: {
    label: 'Best of Vietnam (8D)',
    sublabel: '7N / 8 Days',
    price: '₹1,35,000/person',
    days: [
      { day: 'Day 1', title: 'Mumbai → Ho Chi Minh City (Saigon)', details: 'Depart Mumbai. Arrive Ho Chi Minh City — the pulsating heart of southern Vietnam. Hotel check-in. Evening walk through Ben Thanh Market for street food and local flavours.', highlights: ['Ho Chi Minh City', 'Ben Thanh Market', 'Street Food'], stay: 'Ho Chi Minh City' },
      { day: 'Day 2', title: 'Ho Chi Minh City Sightseeing', details: 'Visit the legendary Cu Chi Tunnels — the 250 km underground network used by the Viet Cong. Afternoon — Reunification Palace, Notre-Dame Cathedral, Central Post Office & War Remnants Museum.', highlights: ['Cu Chi Tunnels', 'Reunification Palace', 'Notre-Dame Cathedral', 'War Remnants Museum'], stay: 'Ho Chi Minh City' },
      { day: 'Day 3', title: 'Ho Chi Minh City → Da Nang', details: 'Morning flight to Da Nang. Visit the magnificent My Son Sanctuary — 4th-century Cham temples (UNESCO World Heritage). Evening at My Khe Beach — one of Asia\'s most beautiful urban beaches.', highlights: ['My Son Sanctuary', 'My Khe Beach', 'Da Nang'], stay: 'Da Nang' },
      { day: 'Day 4', title: 'Hoi An Ancient Town', details: 'Full day in the magical Hoi An. Walk across the 400-year-old Japanese Covered Bridge. Explore Ancient Houses and assembly halls. Evening lantern boat ride on the Thu Bon River under hundreds of glowing lanterns.', highlights: ['Japanese Covered Bridge', 'Ancient Houses', 'Lantern Boat Ride', 'Thu Bon River'], stay: 'Da Nang / Hoi An' },
      { day: 'Day 5', title: 'Da Nang → Hanoi', details: 'Morning flight to Hanoi — Vietnam\'s thousand-year-old capital. Old Quarter cyclo ride. Hoan Kiem Lake and Ngoc Son Temple. Evening street food tour through the Old Quarter\'s 36 ancient streets.', highlights: ['Hanoi Old Quarter', 'Hoan Kiem Lake', 'Ngoc Son Temple', 'Street Food Tour'], stay: 'Hanoi' },
      { day: 'Day 6', title: 'Hanoi → Ha Long Bay (Cruise)', details: 'Drive to Ha Long Bay (3.5 hrs). Board a luxury junk boat for an overnight cruise. Visit stunning Sung Sot Cave (Surprise Cave). Kayaking through limestone karsts. Sunset cocktails on the deck.', highlights: ['Ha Long Bay', 'Luxury Junk Boat', 'Sung Sot Cave', 'Kayaking'], stay: 'Ha Long Bay Cruise' },
      { day: 'Day 7', title: 'Ha Long Bay → Hanoi', details: 'Morning Tai Chi on the sun deck. Breakfast on board. Cooking class — learn to make Vietnamese spring rolls. Cruise back to harbour. Return to Hanoi by afternoon. Evening farewell dinner in Old Quarter.', highlights: ['Tai Chi on Deck', 'Vietnamese Cooking Class', 'Old Quarter Dinner'], stay: 'Hanoi' },
      { day: 'Day 8', title: 'Hanoi → Mumbai', details: 'Morning visit to Temple of Literature (Van Mieu) and Ho Chi Minh Mausoleum. Transfer to Noi Bai International Airport. Flight to Mumbai. Tour ends with beautiful Vietnam memories.', highlights: ['Temple of Literature', 'Ho Chi Minh Mausoleum', 'Departure'], stay: '' },
    ]
  },
  senior: {
    label: 'Senior Special Vietnam (8D)',
    sublabel: '7N / 8 Days',
    price: '₹1,40,000/person',
    days: [
      { day: 'Day 1', title: 'Mumbai → Ho Chi Minh City', details: 'Depart Mumbai. Arrive Ho Chi Minh City. Premium hotel check-in. Relaxed welcome dinner featuring Vietnamese cuisine. Early rest after a comfortable transfer.', highlights: ['Ho Chi Minh City', 'Premium Hotel', 'Welcome Dinner'], stay: 'Ho Chi Minh City' },
      { day: 'Day 2', title: 'Ho Chi Minh City at Leisure', details: 'Gentle city tour — Reunification Palace, Notre-Dame Cathedral & Central Post Office at an easy pace. Ben Thanh Market for souvenirs. Afternoon rest. Evening optional river cruise on the Saigon River.', highlights: ['Reunification Palace', 'Notre-Dame Cathedral', 'Ben Thanh Market'], stay: 'Ho Chi Minh City' },
      { day: 'Day 3', title: 'Ho Chi Minh City → Da Nang', details: 'Morning flight to Da Nang. Gentle visit to My Son Sanctuary (Cham temples) with wheelchair-accessible pathways. Relaxed afternoon at My Khe Beach for fresh seafood and sea breeze.', highlights: ['My Son Sanctuary', 'My Khe Beach'], stay: 'Da Nang' },
      { day: 'Day 4', title: 'Hoi An Ancient Town', details: 'Easy-paced Hoi An walking tour. Japanese Covered Bridge, colourful Ancient Houses & local tailors. Boat ride on the Thu Bon River to view lanterns at own pace. Early dinner at a heritage house restaurant.', highlights: ['Japanese Covered Bridge', 'Ancient Houses', 'River Boat Ride'], stay: 'Da Nang / Hoi An' },
      { day: 'Day 5', title: 'Da Nang → Hanoi', details: 'Flight to Hanoi. Comfortable hotel check-in. Leisurely Old Quarter walk with cyclo ride. Hoan Kiem Lake and Ngoc Son Temple. Early evening street food tasting — Pho, Banh Mi & Vietnamese coffee.', highlights: ['Hanoi Old Quarter', 'Cyclo Ride', 'Hoan Kiem Lake', 'Street Food'], stay: 'Hanoi' },
      { day: 'Day 6', title: 'Hanoi → Ha Long Bay (Cruise)', details: 'Drive to Ha Long Bay. Board a premium junk boat with comfortable cabins and accessible deck. Visit Thien Cung Cave. Relaxed afternoon on the sundeck with herbal tea and scenic cruising.', highlights: ['Ha Long Bay', 'Thien Cung Cave', 'Premium Cabin', 'Sundeck Relaxation'], stay: 'Ha Long Bay Cruise' },
      { day: 'Day 7', title: 'Ha Long Bay → Hanoi', details: 'Peaceful morning on board with fresh sea air. Return cruise to harbour. Back to Hanoi. Afternoon spa and Ayurvedic relaxation session. Farewell dinner at a premium Vietnamese restaurant.', highlights: ['Morning Cruise', 'Ayurvedic Spa', 'Farewell Dinner'], stay: 'Hanoi' },
      { day: 'Day 8', title: 'Hanoi → Mumbai', details: 'Morning visit to Ho Chi Minh Mausoleum and Temple of Literature. Transfer to airport in a premium vehicle. Flight to Mumbai. Tour ends with wonderful memories of Vietnam.', highlights: ['Ho Chi Minh Mausoleum', 'Temple of Literature', 'Departure'], stay: '' },
    ]
  }
};

export default function VietnamPage() {
  const navigate = useNavigate();
  const [activeItinerary, setActiveItinerary] = useState('standard');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tour = TOURS[activeItinerary];

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center overflow-hidden" data-testid="vietnam-hero">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Vietnam Tour" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="flex flex-wrap justify-center gap-2 mb-5 animate-fade-in">
            {['History & Culture', 'Ha Long Bay Cruise', 'Hoi An Lanterns'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full border border-white/20">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight font-['Cormorant_Garamond',serif] mb-4 animate-fade-in-up" data-testid="vietnam-title">
            Vietnam
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in-up stagger-2">
            From the lantern-lit streets of Hoi An to the emerald waters of Ha Long Bay — explore one of Southeast Asia's most captivating countries
          </p>
          <button
            onClick={() => { const el = document.querySelector('#enquire'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3 bg-amber-700 text-white font-semibold rounded-full text-sm hover:bg-amber-800 transition-all inline-flex items-center gap-2 animate-fade-in-up stagger-3"
            data-testid="vietnam-enquire-hero"
          >
            Enquire Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--brand-bg)] to-transparent" />
      </section>

      {/* About */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="vietnam-about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img src={ABOUT_IMG} alt="Vietnam landscape" className="w-full h-64 sm:h-80 lg:h-96 object-cover" loading="lazy" />
            </div>
            <div>
              <p className="overline mb-3">The S-Shaped Jewel</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight mb-6 font-['Cormorant_Garamond',serif]">
                About This Journey
              </h2>
              <div className="space-y-4 text-[var(--brand-text-muted)] text-sm sm:text-base leading-relaxed">
                <p>
                  Vietnam is a country of extraordinary beauty and diversity. From the frenetic energy of Ho Chi Minh City to the timeless charm of Hoi An's ancient lantern-lit streets, from Hanoi's thousand-year-old temples to the otherworldly limestone karsts of Ha Long Bay — every corner tells a story.
                </p>
                <p>
                  Our carefully crafted Vietnam tour takes you through the country's most iconic destinations — covering history, culture, natural wonders and world-class cuisine. Whether you choose the classic Best of Vietnam package or the thoughtfully paced Senior Special, you'll discover why Vietnam is one of Asia's most beloved destinations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 sm:py-12 bg-white border-y border-[var(--brand-border)]" data-testid="vietnam-quickinfo">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {QUICK_INFO.map((info) => (
              <div key={info.label} className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-2">
                  <info.icon className="w-5 h-5 text-amber-700" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] mb-0.5">{info.label}</p>
                <p className="text-sm font-semibold text-amber-700">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="vietnam-destinations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-amber-800 tracking-tight font-['Cormorant_Garamond',serif]">
              Destinations Covered
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-2xl mx-auto">
              Explore Vietnam's most iconic cities, ancient towns and natural wonders.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {DESTINATIONS.map((dest) => (
              <div key={dest.name} className="bg-white rounded-lg border border-[var(--brand-border)] overflow-hidden card-lift group">
                <div className="h-44 overflow-hidden relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy" />
                  <div className="absolute top-3 left-3">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <dest.icon className="w-4 h-4 text-amber-700" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-[var(--brand-text)] font-['Cormorant_Garamond',serif] mb-1">{dest.name}</h3>
                  <p className="text-xs text-[var(--brand-text-muted)] leading-relaxed">{dest.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-muted-bg)]" data-testid="vietnam-itinerary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-amber-800 tracking-tight font-['Cormorant_Garamond',serif]">
              Itinerary
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-xl mx-auto mb-6">
              Choose between our standard and specially curated senior-friendly tour.
            </p>
            <div className="inline-flex flex-wrap justify-center rounded-xl bg-white border border-[var(--brand-border)] p-1 gap-1" data-testid="vietnam-itinerary-toggle">
              {Object.entries(TOURS).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setActiveItinerary(key)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${activeItinerary === key ? 'bg-amber-700 text-white' : 'text-[var(--brand-text-muted)] hover:text-amber-700'}`}
                  data-testid={`toggle-${key}`}
                >
                  <span className="block">{t.label}</span>
                  <span className="block text-[10px] opacity-70">{t.sublabel}</span>
                  {t.price && <span className="block text-[10px] font-bold text-amber-300">{t.price}</span>}
                </button>
              ))}
            </div>
          </div>

          <Accordion type="single" collapsible defaultValue="day-0" className="w-full space-y-3" data-testid="vietnam-itinerary-accordion">
            {tour.days.map((day, idx) => (
              <AccordionItem key={`${activeItinerary}-${idx}`} value={`day-${idx}`} className="bg-white rounded-lg border border-[var(--brand-border)] px-5 overflow-hidden">
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-[var(--brand-text)] hover:no-underline py-4">
                  <span className="flex items-center gap-3 text-left">
                    <span className="w-8 h-8 flex items-center justify-center bg-amber-700 text-white text-xs rounded-full font-bold flex-shrink-0">{idx + 1}</span>
                    <span>
                      <span className="block text-amber-700 text-xs font-bold">{day.day}</span>
                      <span className="block">{day.title}</span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--brand-text-muted)] pb-5 pl-11 leading-relaxed">
                  <p className="mb-3">{day.details}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {day.highlights.map((h) => (
                      <span key={h} className="text-xs px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full font-medium border border-amber-100">{h}</span>
                    ))}
                  </div>
                  {day.stay && <p className="text-xs text-[var(--brand-text-muted)] mt-2 flex items-center gap-1"><MapPin className="w-3 h-3" /> Night Stay: <strong>{day.stay}</strong></p>}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section id="enquire" className="relative py-16 sm:py-24 overflow-hidden" data-testid="vietnam-cta">
        <div className="absolute inset-0">
          <img src={CTA_BG} alt="Hoi An Vietnam" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-amber-900/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight font-['Cormorant_Garamond',serif] mb-3">
            Ready to Discover Vietnam?
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            From Ha Long Bay's emerald waters to Hoi An's golden lanterns — let us craft your perfect Vietnam journey.
          </p>
          <button
            onClick={() => navigate('/#contact')}
            className="px-8 py-3.5 bg-white text-amber-800 font-semibold rounded-full text-sm hover:bg-stone-100 transition-all inline-flex items-center gap-2"
            data-testid="vietnam-enquire-bottom"
          >
            Enquire Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
