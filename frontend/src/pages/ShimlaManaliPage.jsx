import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Heart, Users, ArrowRight, Mountain, Snowflake, TreePine, Landmark, Camera, Tent } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const HERO_BG = "/images/shimla-manali/rohtang.jpg";
const ABOUT_IMG = "/images/shimla-manali/shimla.jpg";
const CTA_BG = "/images/shimla-manali/manali.jpg";

const QUICK_INFO = [
  { icon: Clock, label: 'Duration', value: '8 or 9 Days' },
  { icon: MapPin, label: 'Starting Point', value: 'Delhi' },
  { icon: Heart, label: 'Trip Type', value: 'Hill Station & Snow' },
  { icon: Users, label: 'Ideal For', value: 'Families, Couples & Solo' },
];

const DESTINATIONS = [
  { name: 'Delhi', desc: 'Starting point with Akshardham Swaminarayan Temple visit and orientation.', icon: Landmark, image: '/images/shimla-manali/delhi.jpg' },
  { name: 'Shimla', desc: 'Colonial charm at 6,800ft. Mall Road, Shimla Church, Lakkad Bazar.', icon: Mountain, image: '/images/shimla-manali/shimla.jpg' },
  { name: 'Kufri', desc: 'Winter sports capital at 8,500ft. Himalayan Zoo, Indira Bunglow & horse rides.', icon: Snowflake, image: '/images/shimla-manali/shimla.jpg' },
  { name: 'Manali', desc: 'Adventure hub at 6,317ft. Hidimba Temple, Manu Mandir, Club House & Vashishtha Kund.', icon: TreePine, image: '/images/shimla-manali/manali.jpg' },
  { name: 'Rohtang Pass', desc: 'Snow Point at 13,450ft. Skiing, sledging, horse riding & snow adventures.', icon: Snowflake, image: '/images/shimla-manali/rohtang.jpg' },
  { name: 'Solang Valley', desc: 'Paragliding, zorbing, skating & parachuting amidst stunning valley views.', icon: Tent, image: '/images/shimla-manali/solang.jpg' },
  { name: 'Kullu Valley', desc: 'Scenic shawl factories, Prati Vaishnodevi Mandir & charming river valley views.', icon: Camera, image: '/images/shimla-manali/kullu.jpg' },
];

const ITINERARY_9D = [
  { day: 'Day 1', title: 'Delhi', details: 'Report to Sachin Travels\' Tour Manager at Hazrat Nizamuddin Railway Station. Proceed to hotel and check in. After lunch visit Akshardham (Swaminarayan Temple). Evening get-together and introduction to tour mates.', highlights: ['Akshardham Temple', 'Delhi'], stay: 'Delhi' },
  { day: 'Day 2', title: 'Delhi \u2192 Shimla (378 KM)', details: 'After breakfast, proceed to Shimla. En route lunch stop. Evening arrival at Shimla \u2014 the Queen of Hill Stations.', highlights: ['Shimla'], stay: 'Shimla' },
  { day: 'Day 3', title: 'Shimla & Kufri (6,800 ft)', details: 'After breakfast, proceed to Kufri (8,500ft \u2014 Winter Sports Capital). Visit Indira Bunglow and Himalayan Zoo. Click photographs in traditional Himachali outfits. Optional horse ride. After lunch, visit Shimla Church, Lakkad Bazar. Shopping at Mall Road.', highlights: ['Kufri', 'Himalayan Zoo', 'Mall Road', 'Shimla Church'], stay: 'Shimla' },
  { day: 'Day 4', title: 'Shimla \u2192 Manali (257 KM)', details: 'After breakfast, proceed to Manali. En route lunch and visit Kullu Shawl Factory. On arrival at Manali, enjoy hot delicious dinner.', highlights: ['Kullu Shawl Factory', 'Manali'], stay: 'Manali' },
  { day: 'Day 5', title: 'Manali Sightseeing (6,317 ft)', details: 'After breakfast, visit ancient Hidimba Temple, Manu Mandir, and Manali Club House. Return to hotel for lunch. Evening visit Nagar sightseeing, Nagar Art Gallery, and Jagatsukh Gaytri Temple.', highlights: ['Hidimba Temple', 'Manu Mandir', 'Club House', 'Nagar Art Gallery'], stay: 'Manali' },
  { day: 'Day 6', title: 'Manali \u2192 Rohtang Pass (51 KM)', details: 'Early breakfast, proceed to Snow Point (Rohtang Pass \u2014 13,450ft). Experience horse riding, skiing, sledging and other adventure activities. Pick up overcoats, gloves and boots en route. Enjoy the chilling climate and hot coffee. Evening campfire with singing and dancing.', highlights: ['Rohtang Pass', 'Skiing', 'Sledging', 'Campfire'], stay: 'Manali' },
  { day: 'Day 7', title: 'Solang Valley', details: 'After breakfast, visit scenic Solang Valley. Enjoy summer and winter sports like parachuting, paragliding, skating, and zorbing (optional). Visit Vashishtha Kund (hot streams). Evening free for shopping and relaxation.', highlights: ['Solang Valley', 'Paragliding', 'Zorbing', 'Vashishtha Kund'], stay: 'Manali' },
  { day: 'Day 8', title: 'Manali \u2192 Chandigarh (260 KM)', details: 'After breakfast, depart to Chandigarh. En route visit Prati Vaishnodevi Mata Mandir and Kullu Valley. Lunch at Sundar Nagar. Visit Pinjore Garden on the way to Chandigarh.', highlights: ['Prati Vaishnodevi', 'Kullu Valley', 'Pinjore Garden'], stay: 'Chandigarh' },
  { day: 'Day 9', title: 'Chandigarh \u2192 Delhi', details: 'After breakfast, proceed to Hazrat Nizamuddin Railway Station / Delhi Airport. Tour ends with unforgettable Himalayan memories.', highlights: ['Departure'], stay: '' },
];

const ITINERARY_8D = [
  { day: 'Day 1', title: 'Delhi', details: 'Report to Sachin Travels\' Tour Manager at Hazrat Nizamuddin Railway Station. Proceed to hotel and check in. Evening get-together and introduction to tour mates.', highlights: ['Delhi'], stay: 'Delhi' },
  { day: 'Day 2', title: 'Delhi \u2192 Shimla (378 KM)', details: 'After breakfast, proceed to Shimla. En route lunch stop. Evening arrival at Shimla.', highlights: ['Shimla'], stay: 'Shimla' },
  { day: 'Day 3', title: 'Shimla & Kufri (6,800 ft)', details: 'After breakfast, proceed to Kufri (8,500ft). Click photographs in traditional Himachali outfits. Optional horse ride. After lunch, visit Shimla Church, Lakkad Bazar. Shopping at Mall Road.', highlights: ['Kufri', 'Mall Road', 'Shimla Church'], stay: 'Shimla' },
  { day: 'Day 4', title: 'Shimla \u2192 Manali (257 KM)', details: 'After breakfast, proceed to Manali. En route lunch and visit Kullu Shawl Factory. On arrival enjoy hot delicious dinner.', highlights: ['Kullu Shawl Factory', 'Manali'], stay: 'Manali' },
  { day: 'Day 5', title: 'Manali Sightseeing (6,317 ft)', details: 'Visit ancient Hidimba Temple, Manu Mandir, Vashishtha Kund (hot streams) and Manali Club House. Evening free for shopping and relaxation.', highlights: ['Hidimba Temple', 'Manu Mandir', 'Vashishtha Kund'], stay: 'Manali' },
  { day: 'Day 6', title: 'Manali \u2192 Rohtang Pass (51 KM)', details: 'Proceed to Snow Point (Rohtang Pass \u2014 13,450ft). Enjoy horse riding, skiing, sledging. The chilling climate and hot coffee would excite you. Evening campfire with Himachali folk dance.', highlights: ['Rohtang Pass', 'Skiing', 'Sledging', 'Folk Dance'], stay: 'Manali' },
  { day: 'Day 7', title: 'Manali \u2192 Delhi (576 KM)', details: 'After breakfast, visit scenic Solang Valley. Enjoy paragliding. After lunch, visit Prati Vaishnodevi Mata Mandir and Kullu Valley. Proceed to Delhi. Overnight bus journey.', highlights: ['Solang Valley', 'Paragliding', 'Kullu Valley'], stay: 'Overnight bus' },
  { day: 'Day 8', title: 'Delhi \u2192 Departure', details: 'Arrival in Delhi. Proceed to Hazrat Nizamuddin Railway Station. Tour ends.', highlights: ['Departure'], stay: '' },
];

export default function ShimlaManaliPage() {
  const navigate = useNavigate();
  const [activeItinerary, setActiveItinerary] = useState('9day');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const itinerary = activeItinerary === '9day' ? ITINERARY_9D : ITINERARY_8D;

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center overflow-hidden" data-testid="shimla-hero">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Shimla Manali Tour" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="flex flex-wrap justify-center gap-2 mb-5 animate-fade-in">
            {['Himalayan Escape', 'Snow Adventures', 'Hill Station Magic'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full border border-white/20">{tag}</span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight font-['Cormorant_Garamond',serif] mb-4 animate-fade-in-up" data-testid="shimla-title">
            Shimla Kullu Manali
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in-up stagger-2">
            Colonial hill stations, snow-capped peaks, adventure sports, and Himalayan serenity — the ultimate mountain escape
          </p>
          <button onClick={() => { const el = document.querySelector('#enquire'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="px-8 py-3 bg-sky-700 text-white font-semibold rounded-full text-sm hover:bg-sky-800 transition-all inline-flex items-center gap-2 animate-fade-in-up stagger-3" data-testid="shimla-enquire-hero">
            Enquire Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--brand-bg)] to-transparent" />
      </section>

      {/* About */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="shimla-about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img src={ABOUT_IMG} alt="Shimla" className="w-full h-64 sm:h-80 lg:h-96 object-cover" loading="lazy" />
            </div>
            <div>
              <p className="overline mb-3">Himalayan Paradise</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight mb-6 font-['Cormorant_Garamond',serif]">About This Journey</h2>
              <div className="space-y-4 text-[var(--brand-text-muted)] text-sm sm:text-base leading-relaxed">
                <p>Himachal Pradesh, with its pristine mountain landscapes and cool climate, is a paradise for nature lovers and adventure enthusiasts alike. Shimla introduces travelers to colonial architecture, bustling markets, and cultural attractions, while Kufri offers thrilling winter sports and panoramic views of snow-covered peaks.</p>
                <p>Manali combines scenic beauty with adventure — from ancient temples like Hidimba and Manu Mandir to outdoor sports at Rohtang Pass and Solang Valley. Whether it's shopping at local markets, snow adventures, or serene rivers and valleys, this itinerary is ideal for families, couples, and solo travelers seeking a memorable mountain escape.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 sm:py-12 bg-white border-y border-[var(--brand-border)]" data-testid="shimla-quickinfo">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {QUICK_INFO.map((info) => (
              <div key={info.label} className="text-center">
                <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center mx-auto mb-2">
                  <info.icon className="w-5 h-5 text-sky-700" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] mb-0.5">{info.label}</p>
                <p className="text-sm font-semibold text-sky-700">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="shimla-destinations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-sky-800 tracking-tight font-['Cormorant_Garamond',serif]">Destinations Covered</h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-2xl mx-auto">From colonial hill stations to snow-capped peaks and adventure valleys.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" data-testid="shimla-destinations-grid">
            {DESTINATIONS.map((dest) => (
              <div key={dest.name} className="bg-white rounded-lg border border-[var(--brand-border)] overflow-hidden card-lift group" data-testid={`shimla-dest-${dest.name.toLowerCase().replace(/[\s]/g, '-')}`}>
                <div className="h-40 overflow-hidden relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy" />
                  <div className="absolute top-3 left-3"><div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"><dest.icon className="w-4 h-4 text-sky-700" /></div></div>
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
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-muted-bg)]" data-testid="shimla-itinerary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-sky-800 tracking-tight font-['Cormorant_Garamond',serif]">Itinerary</h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-xl mx-auto mb-6">Choose from two curated Himalayan experiences.</p>
            <div className="inline-flex rounded-full bg-white border border-[var(--brand-border)] p-1" data-testid="shimla-itinerary-toggle">
              <button onClick={() => setActiveItinerary('9day')} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeItinerary === '9day' ? 'bg-sky-700 text-white' : 'text-[var(--brand-text-muted)] hover:text-sky-700'}`} data-testid="toggle-9day">9 Days (via Chandigarh)</button>
              <button onClick={() => setActiveItinerary('8day')} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeItinerary === '8day' ? 'bg-sky-700 text-white' : 'text-[var(--brand-text-muted)] hover:text-sky-700'}`} data-testid="toggle-8day">8 Days (Express)</button>
            </div>
          </div>

          <Accordion type="single" collapsible defaultValue="day-0" className="w-full space-y-3" data-testid="shimla-itinerary-accordion">
            {itinerary.map((day, idx) => (
              <AccordionItem key={`${activeItinerary}-${idx}`} value={`day-${idx}`} className="bg-white rounded-lg border border-[var(--brand-border)] px-5 overflow-hidden">
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-[var(--brand-text)] hover:no-underline py-4">
                  <span className="flex items-center gap-3 text-left">
                    <span className="w-8 h-8 flex items-center justify-center bg-sky-700 text-white text-xs rounded-full font-bold flex-shrink-0">{idx + 1}</span>
                    <span>
                      <span className="block text-sky-700 text-xs font-bold">{day.day}</span>
                      <span className="block">{day.title}</span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--brand-text-muted)] pb-5 pl-11 leading-relaxed">
                  <p className="mb-3">{day.details}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {day.highlights.map((h) => (<span key={h} className="text-xs px-2.5 py-1 bg-sky-50 text-sky-700 rounded-full font-medium border border-sky-100">{h}</span>))}
                  </div>
                  {day.stay && <p className="text-xs text-[var(--brand-text-muted)] mt-2 flex items-center gap-1"><MapPin className="w-3 h-3" /> Night Stay: <strong>{day.stay}</strong></p>}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section id="enquire" className="relative py-16 sm:py-24 overflow-hidden" data-testid="shimla-cta">
        <div className="absolute inset-0">
          <img src={CTA_BG} alt="Himalayan adventure" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-sky-900/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight font-['Cormorant_Garamond',serif] mb-3">Ready for a Himalayan Adventure?</h2>
          <p className="text-white/80 text-sm sm:text-base mb-8 max-w-xl mx-auto">Experience snow-capped peaks, ancient temples, thrilling sports, and the serenity of the Himalayas.</p>
          <button onClick={() => navigate('/#contact')} className="px-8 py-3.5 bg-white text-sky-800 font-semibold rounded-full text-sm hover:bg-stone-100 transition-all inline-flex items-center gap-2" data-testid="shimla-enquire-bottom">Enquire Now <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
