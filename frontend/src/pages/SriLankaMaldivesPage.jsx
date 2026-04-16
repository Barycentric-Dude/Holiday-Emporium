import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Heart, Users, ArrowRight, Palmtree, Building, Waves, Mountain, Camera, Ship, Landmark } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const HERO_BG = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwxfHxNYWxkaXZlc3QlMjB0cm9waWNhbCUyMGJlYWNoJTIwcmVzb3J0fGVufDB8fHx8fDE3NzU4MTQ4NTh8MA&ixlib=rb-4.1.0&q=85";
const ABOUT_IMG = "https://images.unsplash.com/photo-1586611292717-f828b167408c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwyfHxTcmlsJTIwTGFua2ElMjB0ZW1wbGUlMjB0b3VyJTIwY3VsdHVyZXxlbnwwfHx8fDE3NzU4MTQ4NTh8MA&ixlib=rb-4.1.0&q=85";
const CTA_BG = "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwzfHxNYWxkaXZlc3QlMjB3YXRlciUyMHZpbGxhJTIwcmVzb3J0fGVufDB8fHx8fDE3NzU4MTQ4NTh8MA&ixlib=rb-4.1.0&q=85";

const QUICK_INFO = [
  { icon: Clock, label: 'Duration', value: '6N/7D' },
  { icon: MapPin, label: 'Countries', value: 'Sri Lanka & Maldives' },
  { icon: Heart, label: 'Trip Type', value: 'Cultural & Beach' },
  { icon: Users, label: 'Ideal For', value: 'Honeymoon & Families' },
];

const DESTINATIONS = [
  { name: 'Colombo', desc: 'Sri Lanka\'s commercial capital. City tour with ODEL shopping, Buddhist Temple & Freedom Memorial.', icon: Landmark, image: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwyfHxTcmlsJTIwTGFua2ElMjB0ZW1wbGUlMjB0b3VyJTIwY3VsdHVyZXxlbnwwfHx8fDE3NzU4MTQ4NTh8MA&ixlib=rb-4.1.0&q=85' },
  { name: 'Kandy', desc: 'Cultural capital of Sri Lanka. Visit the sacred Temple of the Tooth & gem factories.', icon: Building, image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHw0fHxLYW5keSUyMGN1bHR1cmFsJTIwY2l0eSUyMFNyaSUyMExhbmlhJTIwdGVtcGxlfGVufDB8fHx8fDE3NzU4MTQ4NTh8MA&ixlib=rb-4.1.0&q=85' },
  { name: 'Pinnawala', desc: 'Pinnawala Elephant Orphanage — home to orphaned elephants rescued from the wild.', icon: Ship, image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHw1fHxFbGVwaGFudCUyMG9ycGhhbnRhZ2V8ZW58MHx8fHwxNzc1ODE0ODU4fDA&ixlib=rb-4.1.0&q=85' },
  { name: 'Nuwara Eliya', desc: '"Little England" of Sri Lanka. Tea estates, misty hills & Sita Amman Temple.', icon: Mountain, image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHw2fHxTdXJhJTIwTGFua2ElMjB0ZWElMjBlc3RhdGVzfGVufDB8fHx8fDE3NzU4MTQ4NTh8MA&ixlib=rb-4.1.0&q=85' },
  { name: 'Maldives', desc: 'Crystal-clear waters, white sandy beaches & overwater villas. Tropical paradise!', icon: Palmtree, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwxfHxNYWxkaXZlc3QlMjB0cm9waWNhbCUyMGJlYWNoJTIwcmVzb3J0fGVufDB8fHx8fDE3NzU4MTQ4NTh8MA&ixlib=rb-4.1.0&q=85' },
  { name: 'Male', desc: 'Capital of Maldives. Gateway to paradise islands with stunning marine life.', icon: Waves, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwzfHxNYWxkaXZlc3QlMjB3YXRlciUyMHZpbGxhJTIwcmVzb3J0fGVufDB8fHx8fDE3NzU4MTQ4NTh8MA&ixlib=rb-4.1.0&q=85' },
];

const ITINERARY = [
  { day: 'Day 1', title: 'Mumbai - Colombo - Kandy', details: 'Report 3 hrs before flight at Chhatrapati Shivaji Terminal. Depart to Colombo. On arrival, proceed to Kandy. En route visit Pinnawala Elephant Orphanage — home to rescued orphaned elephants.', highlights: ['Pinnawala Elephant Orphanage', 'Kandy'], stay: 'Kandy' },
  { day: 'Day 2', title: 'Kandy City Tour', details: 'Proceed to Kandy city tour. Visit Spice Garden — explore exotic Sri Lankan spices. Stop at Gems Factory — discover the island\'s famous sapphires and rubies. Evening visit the sacred Temple of the Tooth (Sri Dalada Maligawa).', highlights: ['Spice Garden', 'Gems Factory', 'Temple of the Tooth'], stay: 'Kandy' },
  { day: 'Day 3', title: 'Kandy - Nuwara Eliya', details: 'Proceed to Nuwara Eliya, also known as "Little England" of Sri Lanka. En route visit Tea Estate and Tea Factory — learn about Ceylon tea production and taste fresh tea. Later visit Sita Eliya (Sita Amman Temple) — a sacred Hindu temple associated with the Ramayana.', highlights: ['Tea Estate', 'Tea Factory', 'Sita Amman Temple'], stay: 'Nuwara Eliya' },
  { day: 'Day 4', title: 'Nuwara Eliya - Colombo', details: 'Proceed to Colombo. See Bandaranaike Memorial International Conference Hall from outside. Visit Freedom Memorial, National Museum, Colombo Beach, and Clock Tower. Explore Buddhist Temple. Afternoon free for shopping at ODEL, House of Fashion, and Noritaki outlets.', highlights: ['Freedom Memorial', 'Colombo Beach', 'ODEL Shopping'], stay: 'Colombo' },
  { day: 'Day 5', title: 'Colombo - Maldives', details: 'Depart to Male. Arrive at Male airport. Meet & greet by our representative. Transfer to Jetty point for Speed boat. After arrival at Resort, check-in. Day at leisure to enjoy the pristine beaches and stunning ocean views.', highlights: ['Male Airport', 'Speed Boat', 'Beach Resort'], stay: 'Maldives' },
  { day: 'Day 6', title: 'Maldives - Leisure Day', details: 'Breakfast at the resort. Day is free for your relaxation — laze around at the beach or by the pool. Optional water sports available at your own cost: Parasailing, Scuba diving, Fishing, Snorkeling, and Seaplane rides.', highlights: ['Beach Relaxation', 'Parasailing', 'Scuba Diving', 'Snorkeling'], stay: 'Maldives' },
  { day: 'Day 7', title: 'Maldives - Mumbai', details: 'Breakfast at the resort. Check-out and depart to Male airport for your flight to Mumbai. Tour ends with beautiful memories of Sri Lanka & Maldives!', highlights: ['Departure'], stay: '' },
];

export default function SriLankaMaldivesPage() {
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center overflow-hidden" data-testid="slm-hero">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Sri Lanka Maldives Tour" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="flex flex-wrap justify-center gap-2 mb-5 animate-fade-in">
            {['Cultural & Beach', 'Two Destinations', 'Tropical Paradise'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full border border-white/20">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight font-['Cormorant_Garamond',serif] mb-4 animate-fade-in-up" data-testid="slm-title">
            Sri Lanka With Maldives
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in-up stagger-2">
            Rich cultural immersion in Sri Lanka combined with the unmatched luxury of the Maldives — a perfect dual experience
          </p>
          <button
            onClick={() => { const el = document.querySelector('#enquire'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3 bg-teal-700 text-white font-semibold rounded-full text-sm hover:bg-teal-800 transition-all inline-flex items-center gap-2 animate-fade-in-up stagger-3"
            data-testid="slm-enquire-hero"
          >
            Enquire Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--brand-bg)] to-transparent" />
      </section>

      {/* About */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="slm-about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img src={ABOUT_IMG} alt="Sri Lanka with Maldives" className="w-full h-64 sm:h-80 lg:h-96 object-cover" loading="lazy" />
            </div>
            <div>
              <p className="overline mb-3">Cultural & Tropical</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight mb-6 font-['Cormorant_Garamond',serif]">
                About This Journey
              </h2>
              <div className="space-y-4 text-[var(--brand-text-muted)] text-sm sm:text-base leading-relaxed">
                <p>
                  This itinerary offers a seamless blend of cultural exploration and tropical luxury, beginning in Colombo 
                  and moving into the scenic heart of Kandy. En route, experience the unique charm of the Pinnawala 
                  Elephant Orphanage, followed by a city tour featuring spice gardens, gem factories, and the sacred Temple of the Tooth.
                </p>
                <p>
                  The second half of the journey transitions into pure relaxation in the Maldives — one of the world's most 
                  sought-after tropical destinations. Stay at a beachfront or water villa resort and unwind amidst 
                  crystal-clear waters, white sandy beaches, and stunning sunsets.
                </p>
                <p>
                  Ideal for honeymooners, couples, and leisure travelers seeking both exploration and relaxation within 
                  a compact, well-curated itinerary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 sm:py-12 bg-white border-y border-[var(--brand-border)]" data-testid="slm-quickinfo">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {QUICK_INFO.map((info) => (
              <div key={info.label} className="text-center" data-testid={`slm-qi-${info.label.toLowerCase().replace(/\s/g, '-')}`}>
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-2">
                  <info.icon className="w-5 h-5 text-teal-700" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] mb-0.5">{info.label}</p>
                <p className="text-sm font-semibold text-teal-700">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="slm-destinations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-teal-800 tracking-tight font-['Cormorant_Garamond',serif]">
              Destinations Covered
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-2xl mx-auto">
              From ancient temples and tea estates to crystal-clear waters — explore two amazing destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" data-testid="slm-destinations-grid">
            {DESTINATIONS.map((dest) => (
              <div
                key={dest.name}
                className="bg-white rounded-lg border border-[var(--brand-border)] overflow-hidden card-lift group"
                data-testid={`slm-dest-${dest.name.toLowerCase().replace(/[\s&()]/g, '-')}`}
              >
                <div className="h-44 overflow-hidden relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy" />
                  <div className="absolute top-3 left-3">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <dest.icon className="w-4 h-4 text-teal-700" />
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
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-muted-bg)]" data-testid="slm-itinerary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-teal-800 tracking-tight font-['Cormorant_Garamond',serif]">
              Itinerary
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-xl mx-auto mb-6">
              6 Nights / 7 Days — A perfect blend of culture and tropical luxury.
            </p>
          </div>

          <Accordion type="single" collapsible defaultValue="day-0" className="w-full space-y-3" data-testid="slm-itinerary-accordion">
            {ITINERARY.map((day, idx) => (
              <AccordionItem
                key={`${idx}`}
                value={`day-${idx}`}
                className="bg-white rounded-lg border border-[var(--brand-border)] px-5 overflow-hidden"
              >
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-[var(--brand-text)] hover:no-underline py-4">
                  <span className="flex items-center gap-3 text-left">
                    <span className="w-8 h-8 flex items-center justify-center bg-teal-700 text-white text-xs rounded-full font-bold flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>
                      <span className="block text-teal-700 text-xs font-bold">{day.day}</span>
                      <span className="block">{day.title}</span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--brand-text-muted)] pb-5 pl-11 leading-relaxed">
                  <p className="mb-3">{day.details}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {day.highlights.map((h) => (
                      <span key={h} className="text-xs px-2.5 py-1 bg-teal-50 text-teal-700 rounded-full font-medium border border-teal-100">
                        {h}
                      </span>
                    ))}
                  </div>
                  {day.stay && (
                    <p className="text-xs text-[var(--brand-text-muted)] mt-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Night Stay: <strong>{day.stay}</strong>
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section id="enquire" className="relative py-16 sm:py-24 overflow-hidden" data-testid="slm-cta">
        <div className="absolute inset-0">
          <img src={CTA_BG} alt="Maldives resort" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight font-['Cormorant_Garamond',serif] mb-3">
            Ready for a Tropical Adventure?
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Experience the best of both worlds — Sri Lanka's cultural heritage and the Maldives' pristine beaches!
          </p>
          <button
            onClick={() => navigate('/#contact')}
            className="px-8 py-3.5 bg-white text-teal-800 font-semibold rounded-full text-sm hover:bg-stone-100 transition-all inline-flex items-center gap-2"
            data-testid="slm-enquire-bottom"
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
