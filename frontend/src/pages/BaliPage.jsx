import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Heart, Users, ArrowRight, Palmtree, Mountain, Landmark, Waves, Sun, Camera } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const HERO_BG = 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80';
const ABOUT_IMG = 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1200&q=80';
const CTA_BG = 'https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=1920&q=80';

const QUICK_INFO = [
  { icon: Clock, label: 'Duration', value: '6N / 7 Days' },
  { icon: MapPin, label: 'Starting Point', value: 'Denpasar, Bali' },
  { icon: Heart, label: 'Trip Type', value: 'Beach & Culture' },
  { icon: Users, label: 'Ideal For', value: 'Couples & Groups' },
];

const DESTINATIONS = [
  { name: 'Ubud', desc: 'Bali\'s cultural heart — Sacred Monkey Forest, Tegalalang Rice Terraces, Tirta Empul Temple & Ubud Palace.', icon: Landmark, image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80' },
  { name: 'Seminyak', desc: 'Upscale beach town with world-renowned beach clubs, sunset cocktails and boutique shopping.', icon: Sun, image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tanah Lot', desc: 'Iconic ocean temple perched on a dramatic sea stack — one of Bali\'s most photographed sunsets.', icon: Waves, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80' },
  { name: 'Uluwatu', desc: 'Clifftop temple 70m above crashing waves. Famous for breathtaking views and Kecak fire dance performances.', icon: Mountain, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80' },
  { name: 'Nusa Penida', desc: 'Dramatic cliffs, crystal-clear waters and untouched beaches — Kelingking, Crystal Bay & Angel\'s Billabong.', icon: Camera, image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80' },
  { name: 'Kuta Beach', desc: 'Bali\'s famous surf beach with golden sands, vibrant nightlife and spectacular Indian Ocean sunsets.', icon: Palmtree, image: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&w=800&q=80' },
];

const TOURS = {
  best_bali: {
    label: 'Best of Bali (7D)',
    sublabel: '6N / 7 Days',
    price: '₹1,25,000/person',
    days: [
      { day: 'Day 1', title: 'Arrive Denpasar — Kuta / Seminyak', details: 'Welcome at Ngurah Rai International Airport. Transfer to Kuta or Seminyak resort. Evening leisure walk along Kuta Beach. Spectacular sunset over the Indian Ocean. Welcome dinner at a beachside warung.', highlights: ['Ngurah Rai Airport', 'Kuta Beach', 'Sunset'], stay: 'Kuta / Seminyak' },
      { day: 'Day 2', title: 'Ubud Cultural Day', details: 'Explore the Sacred Monkey Forest Sanctuary. Visit the spectacular Tegalalang Rice Terraces. Tirta Empul Holy Spring Temple — purification ritual. Ubud Art Market and Ubud Palace. Traditional Kecak dance performance at dusk.', highlights: ['Monkey Forest', 'Tegalalang Rice Terraces', 'Tirta Empul', 'Kecak Dance'], stay: 'Ubud' },
      { day: 'Day 3', title: 'Mount Batur Sunrise Trek', details: 'Early morning 4 AM trek to Mount Batur crater rim (1,717m) for a magical sunrise above the clouds. Breakfast cooked using volcanic steam on the summit. Afternoon traditional Balinese healing massage and spa.', highlights: ['Mount Batur Sunrise', 'Volcanic Trek', 'Balinese Spa'], stay: 'Ubud' },
      { day: 'Day 4', title: 'Tanah Lot & Seminyak', details: 'Visit the ancient sea temple of Tanah Lot at golden hour. Drive to Seminyak for beach clubs and upscale dining. Sunset cocktails at a famous rooftop club with ocean views.', highlights: ['Tanah Lot Temple', 'Seminyak Beach Club', 'Sunset Cocktails'], stay: 'Seminyak' },
      { day: 'Day 5', title: 'Uluwatu & Jimbaran', details: 'Morning visit to the dramatic clifftop Uluwatu Temple, 70m above the crashing waves. Watch the traditional Kecak Fire Dance at sunset. Romantic Jimbaran seafood dinner on the beach under the stars.', highlights: ['Uluwatu Temple', 'Kecak Fire Dance', 'Jimbaran Seafood Dinner'], stay: 'Kuta / Seminyak' },
      { day: 'Day 6', title: 'Nusa Penida Day Trip', details: 'Early boat from Sanur to Nusa Penida — Bali\'s most dramatic island. Visit Kelingking Beach (the T-Rex shaped cliff), Crystal Bay, Broken Beach & Angel\'s Billabong. Snorkeling with manta rays (seasonal).', highlights: ['Kelingking Beach', 'Crystal Bay', 'Broken Beach', 'Snorkeling'], stay: 'Kuta / Seminyak' },
      { day: 'Day 7', title: 'Departure', details: 'Morning leisure for last-minute souvenir shopping at Sukawati or Seminyak boutiques. Transfer to Ngurah Rai International Airport. Flight to Mumbai. Tour ends with beautiful Bali memories.', highlights: ['Souvenir Shopping', 'Departure'], stay: '' },
    ]
  }
};

export default function BaliPage() {
  const navigate = useNavigate();
  const [activeItinerary, setActiveItinerary] = useState('best_bali');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tour = TOURS[activeItinerary];

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center overflow-hidden" data-testid="bali-hero">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Bali Tour" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="flex flex-wrap justify-center gap-2 mb-5 animate-fade-in">
            {['Island Paradise', 'Temples & Culture', 'Beach & Adventure'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full border border-white/20">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight font-['Cormorant_Garamond',serif] mb-4 animate-fade-in-up" data-testid="bali-title">
            Best of Bali
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in-up stagger-2">
            Rice terraces, ancient temples, volcanic peaks and pristine beaches — experience the Island of the Gods in all its glory
          </p>
          <button
            onClick={() => { const el = document.querySelector('#enquire'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-full text-sm hover:bg-teal-700 transition-all inline-flex items-center gap-2 animate-fade-in-up stagger-3"
            data-testid="bali-enquire-hero"
          >
            Enquire Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--brand-bg)] to-transparent" />
      </section>

      {/* About */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="bali-about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img src={ABOUT_IMG} alt="Bali landscape" className="w-full h-64 sm:h-80 lg:h-96 object-cover" loading="lazy" />
            </div>
            <div>
              <p className="overline mb-3">Island of the Gods</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight mb-6 font-['Cormorant_Garamond',serif]">
                About This Journey
              </h2>
              <div className="space-y-4 text-[var(--brand-text-muted)] text-sm sm:text-base leading-relaxed">
                <p>
                  Bali, Indonesia's most iconic island, is a world of contrasts — where terraced rice paddies cascade down volcanic hillsides, ancient Hindu temples perch on dramatic clifftops, and pristine beaches meet crystal-clear waters. It is truly a destination like no other.
                </p>
                <p>
                  From the artistic and spiritual heart of Ubud to the vibrant beach scene of Seminyak and Kuta, from the dramatic sea temple of Tanah Lot to the wild beauty of Nusa Penida's cliffs — our 7-day tour covers the very best of this magical island. Every day brings a new wonder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 sm:py-12 bg-white border-y border-[var(--brand-border)]" data-testid="bali-quickinfo">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {QUICK_INFO.map((info) => (
              <div key={info.label} className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-2">
                  <info.icon className="w-5 h-5 text-teal-600" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] mb-0.5">{info.label}</p>
                <p className="text-sm font-semibold text-teal-600">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="bali-destinations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-teal-700 tracking-tight font-['Cormorant_Garamond',serif]">
              Destinations Covered
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-2xl mx-auto">
              From sacred temples and volcanic peaks to tropical beaches and azure waters — discover the full spectrum of Bali.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {DESTINATIONS.map((dest) => (
              <div key={dest.name} className="bg-white rounded-lg border border-[var(--brand-border)] overflow-hidden card-lift group">
                <div className="h-44 overflow-hidden relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy" />
                  <div className="absolute top-3 left-3">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <dest.icon className="w-4 h-4 text-teal-600" />
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
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-muted-bg)]" data-testid="bali-itinerary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-teal-700 tracking-tight font-['Cormorant_Garamond',serif]">
              Itinerary
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-xl mx-auto mb-6">
              Best of Bali — 6 Nights / 7 Days · <span className="font-bold text-teal-600">₹1,25,000/person</span>
            </p>
          </div>

          <Accordion type="single" collapsible defaultValue="day-0" className="w-full space-y-3" data-testid="bali-itinerary-accordion">
            {tour.days.map((day, idx) => (
              <AccordionItem key={`bali-${idx}`} value={`day-${idx}`} className="bg-white rounded-lg border border-[var(--brand-border)] px-5 overflow-hidden">
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-[var(--brand-text)] hover:no-underline py-4">
                  <span className="flex items-center gap-3 text-left">
                    <span className="w-8 h-8 flex items-center justify-center bg-teal-600 text-white text-xs rounded-full font-bold flex-shrink-0">{idx + 1}</span>
                    <span>
                      <span className="block text-teal-600 text-xs font-bold">{day.day}</span>
                      <span className="block">{day.title}</span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--brand-text-muted)] pb-5 pl-11 leading-relaxed">
                  <p className="mb-3">{day.details}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {day.highlights.map((h) => (
                      <span key={h} className="text-xs px-2.5 py-1 bg-teal-50 text-teal-700 rounded-full font-medium border border-teal-100">{h}</span>
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
      <section id="enquire" className="relative py-16 sm:py-24 overflow-hidden" data-testid="bali-cta">
        <div className="absolute inset-0">
          <img src={CTA_BG} alt="Bali Tanah Lot" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight font-['Cormorant_Garamond',serif] mb-3">
            Ready for the Island of the Gods?
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Let us craft your perfect Bali escape — from misty rice terraces to pristine beaches and ancient temples.
          </p>
          <button
            onClick={() => navigate('/#contact')}
            className="px-8 py-3.5 bg-white text-teal-800 font-semibold rounded-full text-sm hover:bg-stone-100 transition-all inline-flex items-center gap-2"
            data-testid="bali-enquire-bottom"
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
