import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Heart, Users, ArrowRight, Building, Palmtree, Camera, Landmark, Ship, Mountain } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const HERO_BG = "/images/dubai/burj-khalifa.jpg";
const ABOUT_IMG = "/images/dubai/dubai-creek.jpg";
const CTA_BG = "/images/dubai/desert-safari.jpg";

const QUICK_INFO = [
  { icon: Clock, label: 'Duration', value: '3N/4D' },
  { icon: MapPin, label: 'Country', value: 'UAE' },
  { icon: Heart, label: 'Trip Type', value: 'Luxury & Adventure' },
  { icon: Users, label: 'Ideal For', value: 'All Travelers' },
];

const DESTINATIONS = [
  { name: 'Burj Al Arab', desc: 'The iconic sail-shaped hotel and symbol of Dubai\'s luxury. Photo stop at the world\'s most luxurious hotel.', icon: Building, image: '/images/dubai/burj-al-arab.jpg' },
  { name: 'Dubai Mall', desc: 'One of the world\'s largest shopping malls with Dubai Aquarium, ice rink, and endless entertainment.', icon: Camera, image: '/images/dubai/dubai-mall.jpg' },
  { name: 'Desert Safari', desc: 'Thrilling dune bashing, camel rides, sandboarding, belly dancing, and BBQ dinner under the stars.', icon: Mountain, image: '/images/dubai/desert-safari.jpg' },
  { name: 'Dubai Creek', desc: 'Historic waterway with traditional abra rides, Gold Souk, Spice Souk, and dhow cruises.', icon: Ship, image: '/images/dubai/dubai-creek.jpg' },
  { name: 'Jumeirah Beach', desc: 'Pristine white sand beach with stunning views of Burj Al Arab and Atlantis The Palm.', icon: Palmtree, image: '/images/dubai/jumeirah.jpg' },
  { name: 'Madinat Jumeirah', desc: 'Luxury resort complex with traditional Arabian architecture, souks, and waterways.', icon: Landmark, image: '/images/dubai/madinat.jpg' },
];

const ITINERARY = [
  { day: 'Day 1', title: 'Mumbai - Dubai', details: 'Report 3 hrs before flight at Chhatrapati Shivaji Terminal (Sahar International Airport). Depart to Dubai. Arrival at Dubai. Transfer to hotel. Check-in and rest.', highlights: ['Dubai Airport', 'Hotel Check-in'], stay: 'Dubai' },
  { day: 'Day 2', title: 'Dubai City Tour', details: 'After breakfast, half day city sightseeing tour of Dubai. Visit iconic Burj Al Arab (photo stop), Jumeira Mosque, Sheikh Zayed Road Skyline, The Dubai Museum, The Glittering Gold Souk, Dubai Spice Souk, Sheikh Mohammad\'s Palace, Madinat Jumeirah, and Dubai Creek. Afternoon free time for shopping at Dubai Mall. In the evening proceed for Dhow Cruise with dinner — enjoy the illuminated skyline while cruising along Dubai Creek with delicious dinner.', highlights: ['Burj Al Arab', 'Gold Souk', 'Spice Souk', 'Dhow Cruise', 'Dinner'], stay: 'Dubai' },
  { day: 'Day 3', title: 'Dubai - Desert Safari', details: 'After breakfast, free time for shopping at your leisure. In the afternoon, proceed for Desert Safari tour — experience thrilling dune bashing in 4x4 vehicles, camel rides, sandboarding, and traditional belly dancing entertainment. Evening BBQ dinner under the stars in the desert camp.', highlights: ['Desert Safari', 'Dune Bashing', 'Camel Ride', 'Belly Dance', 'BBQ Dinner'], stay: 'Dubai' },
  { day: 'Day 4', title: 'Dubai - Mumbai', details: 'After breakfast, check out from the hotel. Proceed to Dubai Airport to board the flight to Mumbai. Tour ends with wonderful memories of Dubai!', highlights: ['Departure', 'Dubai Airport'], stay: '' },
];

export default function DubaiPage() {
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center overflow-hidden" data-testid="dubai-hero">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Dubai Tour" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="flex flex-wrap justify-center gap-2 mb-5 animate-fade-in">
            {['Luxury Destination', 'Desert Adventure', 'Shopping Paradise'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full border border-white/20">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight font-['Cormorant_Garamond',serif] mb-4 animate-fade-in-up" data-testid="dubai-title">
            Dubai
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in-up stagger-2">
            Luxury, innovation, and cultural fusion — experience the world's most exciting destination
          </p>
          <button
            onClick={() => { const el = document.querySelector('#enquire'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-full text-sm hover:bg-amber-700 transition-all inline-flex items-center gap-2 animate-fade-in-up stagger-3"
            data-testid="dubai-enquire-hero"
          >
            Enquire Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--brand-bg)] to-transparent" />
      </section>

      {/* About */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="dubai-about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img src={ABOUT_IMG} alt="Dubai" className="w-full h-64 sm:h-80 lg:h-96 object-cover" loading="lazy" />
            </div>
            <div>
              <p className="overline mb-3">United Arab Emirates</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight mb-6 font-['Cormorant_Garamond',serif]">
                About This Journey
              </h2>
              <div className="space-y-4 text-[var(--brand-text-muted)] text-sm sm:text-base leading-relaxed">
                <p>
                  Dubai is a city that truly exemplifies luxury, innovation, and cultural fusion, making it one of the world's 
                  most exciting destinations. From the iconic Burj Al Arab and the soaring skyline of Sheikh Zayed Road to the 
                  historic charm of Dubai Creek and the vibrant Gold and Spice Souks, the city offers a unique blend of modern 
                  marvels and traditional experiences.
                </p>
                <p>
                  For adventure and leisure enthusiasts, Dubai provides experiences that are unmatched. A Desert Safari offers 
                  an exhilarating ride through golden dunes, complete with camel rides, sandboarding, and traditional entertainment 
                  like belly dancing, followed by a sumptuous BBQ dinner under the stars.
                </p>
                <p>
                  Whether you are drawn to luxurious experiences, cultural exploration, or thrilling adventures, Dubai stands out 
                  as a destination that combines grandeur, excitement, and hospitality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 sm:py-12 bg-white border-y border-[var(--brand-border)]" data-testid="dubai-quickinfo">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {QUICK_INFO.map((info) => (
              <div key={info.label} className="text-center" data-testid={`dubai-qi-${info.label.toLowerCase().replace(/\s/g, '-')}`}>
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-2">
                  <info.icon className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] mb-0.5">{info.label}</p>
                <p className="text-sm font-semibold text-amber-600">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="dubai-destinations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-amber-700 tracking-tight font-['Cormorant_Garamond',serif]">
              Highlights
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-2xl mx-auto">
              From iconic landmarks to thrilling desert adventures — experience the best of Dubai.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" data-testid="dubai-destinations-grid">
            {DESTINATIONS.map((dest) => (
              <div
                key={dest.name}
                className="bg-white rounded-lg border border-[var(--brand-border)] overflow-hidden card-lift group"
                data-testid={`dubai-dest-${dest.name.toLowerCase().replace(/[\s&()]/g, '-')}`}
              >
                <div className="h-44 overflow-hidden relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy" />
                  <div className="absolute top-3 left-3">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <dest.icon className="w-4 h-4 text-amber-600" />
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
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-muted-bg)]" data-testid="dubai-itinerary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-amber-700 tracking-tight font-['Cormorant_Garamond',serif]">
              Itinerary
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-xl mx-auto mb-6">
              3 Nights / 4 Days — Experience Dubai's luxury, culture, and adventure.
            </p>
          </div>

          <Accordion type="single" collapsible defaultValue="day-0" className="w-full space-y-3" data-testid="dubai-itinerary-accordion">
            {ITINERARY.map((day, idx) => (
              <AccordionItem
                key={`${idx}`}
                value={`day-${idx}`}
                className="bg-white rounded-lg border border-[var(--brand-border)] px-5 overflow-hidden"
              >
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-[var(--brand-text)] hover:no-underline py-4">
                  <span className="flex items-center gap-3 text-left">
                    <span className="w-8 h-8 flex items-center justify-center bg-amber-600 text-white text-xs rounded-full font-bold flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>
                      <span className="block text-amber-600 text-xs font-bold">{day.day}</span>
                      <span className="block">{day.title}</span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--brand-text-muted)] pb-5 pl-11 leading-relaxed">
                  <p className="mb-3">{day.details}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {day.highlights.map((h) => (
                      <span key={h} className="text-xs px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full font-medium border border-amber-100">
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
      <section id="enquire" className="relative py-16 sm:py-24 overflow-hidden" data-testid="dubai-cta">
        <div className="absolute inset-0">
          <img src={CTA_BG} alt="Dubai desert" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-amber-900/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight font-['Cormorant_Garamond',serif] mb-3">
            Ready for Dubai Adventure?
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Experience luxury, desert adventures, and world-class shopping in the city of dreams!
          </p>
          <button
            onClick={() => navigate('/#contact')}
            className="px-8 py-3.5 bg-white text-amber-800 font-semibold rounded-full text-sm hover:bg-stone-100 transition-all inline-flex items-center gap-2"
            data-testid="dubai-enquire-bottom"
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
