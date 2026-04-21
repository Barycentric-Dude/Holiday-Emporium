import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Heart, Users, ChevronRight, ArrowRight } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const HERO_BG = "https://images.unsplash.com/photo-1745647912842-231631509cc2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB0ZW1wbGUlMjBhcmNoaXRlY3R1cmUlMjBzcGlyaXR1YWx8ZW58MHx8fHwxNzc1NTc1MTc4fDA&ixlib=rb-4.1.0&q=85";
const ABOUT_IMG = "/images/ASHTAVINAYAK.jpg";
const CTA_BG = "https://images.unsplash.com/photo-1663089553004-2e5606d4304e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwzfHxNYWhhcmFzaHRyYSUyMHRlbXBsZSUyMHBpbGdyaW1hZ2UlMjBhbmNpZW50fGVufDB8fHx8MTc3NTgxMzcyMHww&ixlib=rb-4.1.0&q=85";

const QUICK_INFO = [
  { icon: Clock, label: 'Duration', value: '2 Nights / 3 Days' },
  { icon: MapPin, label: 'Starting Point', value: 'Pune' },
  { icon: Heart, label: 'Trip Type', value: 'Spiritual Pilgrimage' },
  { icon: Users, label: 'Ideal For', value: 'Families, Devotees & Groups' },
];

const TEMPLES = [
  { name: 'Morgaon', deity: 'Shri Mayureshwar', description: 'Home to Shri Mayureshwar, the starting point of the sacred Ashtavinayak Yatra.', image: '/images/temples/morgaon.jpg' },
  { name: 'Siddhatek', deity: 'Shri Siddhivinayak', description: 'Known for Shri Siddhivinayak, this temple is believed to bless devotees with success.', image: '/images/temples/siddhatek.jpg' },
  { name: 'Theur', deity: 'Shri Chintamani', description: 'The serene Chintamani temple, a spiritually calming stop on the journey.', image: '/images/temples/theur.jpg' },
  { name: 'Ranjangaon', deity: 'Shri Mahaganapati', description: 'A revered shrine of Shri Mahaganapati, rich in divine significance and heritage.', image: '/images/temples/ranjangaon.jpg' },
  { name: 'Ozar', deity: 'Shri Vighnahar', description: 'Famous for the beautiful Vighnahar temple, associated with removing obstacles.', image: '/images/temples/ozar.jpg' },
  { name: 'Lenyadri', deity: 'Shri Girijatmaj', description: 'A unique hilltop cave temple dedicated to Shri Girijatmaj, surrounded by scenic beauty.', image: '/images/temples/lenyadri.jpg' },
  { name: 'Pali', deity: 'Shri Ballaleshwar', description: 'The sacred abode of Shri Ballaleshwar, known for devotion and spiritual peace.', image: '/images/temples/pali.jpg' },
  { name: 'Mahad', deity: 'Shri Varadvinayak', description: 'The sacred abode of Shri Varadvinayak, known for devotion and spiritual peace.', image: '/images/temples/mahad.jpg' },
];

const EXTRA_STOPS = [
  { name: 'Jejuri', description: 'A vibrant spiritual stop famous for Lord Khandoba and its iconic golden turmeric atmosphere.', image: 'https://images.unsplash.com/photo-1663089553004-2e5606d4304e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwzfHxNYWhhcmFzaHRyYSUyMHRlbXBsZSUyMHBpbGdyaW1hZ2UlMjBhbmNpZW50fGVufDB8fHx8MTc3NTgxMzcyMHww&ixlib=rb-4.1.0&q=85' },
  { name: 'Alandi', description: "A peaceful pilgrimage town deeply connected to Sant Dnyaneshwar and Maharashtra's spiritual heritage.", image: 'https://images.unsplash.com/photo-1696241411557-ab5dccd51f63?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwyfHxJbmRpYW4lMjBHYW5wYXRpJTIwdGVtcGxlJTIwTWFoYXJhc2h0cmF8ZW58MHx8fHwxNzc1ODEzNjg3fDA&ixlib=rb-4.1.0&q=85' },
];

const ITINERARY = [
  {
    day: 'Day 1',
    title: 'Pune \u2192 Morgaon \u2192 Siddhatek \u2192 Theur \u2192 Jejuri \u2192 Alandi',
    details: 'Begin your journey from Pune with visits to Morgaon, Siddhatek, and Theur, three important Ashtavinayak temples. Continue to Jejuri and Alandi, adding deeper spiritual significance to your day. End the day with a peaceful overnight stay.',
    highlights: ['Morgaon', 'Siddhatek', 'Theur', 'Jejuri', 'Alandi'],
  },
  {
    day: 'Day 2',
    title: 'Alandi \u2192 Ranjangaon \u2192 Ozar \u2192 Lenyadri',
    details: 'Visit Ranjangaon followed by Ozar, known for its beautiful temple architecture. Continue to Lenyadri, a unique hilltop cave temple offering a serene and scenic spiritual experience.',
    highlights: ['Ranjangaon', 'Ozar', 'Lenyadri'],
  },
  {
    day: 'Day 3',
    title: 'Lenyadri \u2192 Pali \u2192 Mahad \u2192 Pune',
    details: 'Complete your pilgrimage with visits to Pali and Mahad, the final Ashtavinayak temples. Return to Pune with a heart full of devotion and memorable experiences.',
    highlights: ['Pali', 'Mahad', 'Return to Pune'],
  },
];

export default function AshtavinayakPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center overflow-hidden" data-testid="ashtavinayak-hero">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Ashtavinayak Yatra" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="flex flex-wrap justify-center gap-2 mb-5 animate-fade-in">
            {['Starting from Pune', 'Divine Road Trip', 'Family-Friendly Pilgrimage'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full border border-white/20">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight font-['Cormorant_Garamond',serif] mb-4 animate-fade-in-up" data-testid="ashtavinayak-title">
            Ashtavinayak Special
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in-up stagger-2">
            A sacred 2 Nights / 3 Days spiritual journey across Maharashtra's revered Ganpati temples
          </p>
          <button
            onClick={() => { const el = document.querySelector('#enquire'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3 bg-[var(--brand-secondary)] text-white font-semibold rounded-full text-sm hover:bg-[var(--brand-secondary)]/90 transition-all inline-flex items-center gap-2 animate-fade-in-up stagger-3"
            data-testid="ashtavinayak-enquire-hero"
          >
            Enquire Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--brand-bg)] to-transparent" />
      </section>

      {/* About This Journey */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="ashtavinayak-about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-lg overflow-hidden shadow-xl bg-white">
              <img src={ABOUT_IMG} alt="Ashtavinayak Yatra" className="w-full h-64 sm:h-80 lg:h-96 object-contain" loading="lazy" />
            </div>
            <div>
              <p className="overline mb-3">Sacred Pilgrimage</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight mb-6 font-['Cormorant_Garamond',serif]">
                About This Journey
              </h2>
              <div className="space-y-4 text-[var(--brand-text-muted)] text-sm sm:text-base leading-relaxed">
                <p>
                  The Ashtavinayak Yatra is one of Maharashtra's most spiritually enriching pilgrimages, covering
                  the eight sacred temples of Lord Ganesha. This specially curated journey offers devotees a
                  seamless and soulful travel experience through divine destinations, peaceful landscapes, and
                  culturally rich towns.
                </p>
                <p>
                  Starting from Pune, this route is ideal for families, spiritual seekers, and groups looking
                  to complete the sacred darshan comfortably within 2 nights and 3 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 sm:py-12 bg-white border-y border-[var(--brand-border)]" data-testid="ashtavinayak-quickinfo">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {QUICK_INFO.map((info) => (
              <div key={info.label} className="text-center" data-testid={`quickinfo-${info.label.toLowerCase().replace(/\s/g, '-')}`}>
                <div className="w-12 h-12 rounded-full bg-[var(--brand-muted-bg)] flex items-center justify-center mx-auto mb-2">
                  <info.icon className="w-5 h-5 text-[var(--brand-primary)]" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] mb-0.5">{info.label}</p>
                <p className="text-sm font-semibold text-[var(--brand-secondary)]">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Temples Covered */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="ashtavinayak-temples">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-primary)] tracking-tight font-['Cormorant_Garamond',serif]">
              Temples Covered in This Yatra
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-2xl mx-auto">
              Explore the sacred destinations included in this spiritually enriching journey across Maharashtra.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6" data-testid="temples-grid">
            {TEMPLES.map((temple) => (
              <div
                key={temple.name}
                className="bg-white rounded-lg border border-[var(--brand-border)] p-4 text-center card-lift group"
                data-testid={`temple-${temple.name.toLowerCase()}`}
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3 rounded-full overflow-hidden bg-amber-50 border-4 border-amber-100 group-hover:border-[var(--brand-secondary)] transition-colors">
                  <img src={temple.image} alt={temple.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-[var(--brand-text)] font-['Cormorant_Garamond',serif] mb-1">
                  {temple.name}
                </h3>
                <p className="text-xs text-[var(--brand-text-muted)] leading-relaxed line-clamp-3">{temple.description}</p>
              </div>
            ))}
          </div>

          {/* Extra Stops */}
          <div className="mt-12 sm:mt-16">
            <h3 className="text-xl sm:text-2xl font-medium text-[var(--brand-primary)] tracking-tight font-['Cormorant_Garamond',serif] text-center mb-8">
              Also Included: Stops for an Enriched Spiritual Experience
            </h3>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6" data-testid="extra-stops">
              {EXTRA_STOPS.map((stop) => (
                <div
                  key={stop.name}
                  className="bg-white rounded-lg border border-[var(--brand-border)] p-4 text-center card-lift w-56 sm:w-64"
                  data-testid={`stop-${stop.name.toLowerCase()}`}
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3 rounded-full overflow-hidden border-4 border-emerald-50">
                    <img src={stop.image} alt={stop.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-[var(--brand-text)] font-['Cormorant_Garamond',serif] mb-1">
                    {stop.name}
                  </h4>
                  <p className="text-xs text-[var(--brand-text-muted)] leading-relaxed">{stop.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Explore Divine Path CTA */}
          <div className="mt-10 text-center">
            <button
              onClick={() => { const el = document.querySelector('#enquire'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-8 py-3 bg-[var(--brand-secondary)] text-white font-semibold rounded-full text-sm hover:bg-[var(--brand-secondary)]/90 transition-all inline-flex items-center gap-2"
              data-testid="explore-divine-path-cta"
            >
              Explore the Divine Path <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-muted-bg)]" data-testid="ashtavinayak-itinerary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-primary)] tracking-tight font-['Cormorant_Garamond',serif]">
              Itinerary
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-xl mx-auto">
              Follow the sacred path through Maharashtra's most revered spiritual destinations.
            </p>
          </div>

          <Accordion type="single" collapsible defaultValue="day-0" className="w-full space-y-3" data-testid="itinerary-accordion">
            {ITINERARY.map((day, idx) => (
              <AccordionItem
                key={idx}
                value={`day-${idx}`}
                className="bg-white rounded-lg border border-[var(--brand-border)] px-5 overflow-hidden"
              >
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-[var(--brand-text)] hover:no-underline py-4">
                  <span className="flex items-center gap-3 text-left">
                    <span className="w-8 h-8 flex items-center justify-center bg-[var(--brand-secondary)] text-white text-xs rounded-full font-bold flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>
                      <span className="block text-[var(--brand-secondary)] text-xs font-bold">{day.day}</span>
                      <span className="block">{day.title}</span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--brand-text-muted)] pb-5 pl-11 leading-relaxed">
                  <p className="mb-3">{day.details}</p>
                  <div className="flex flex-wrap gap-2">
                    {day.highlights.map((h) => (
                      <span key={h} className="text-xs px-2.5 py-1 bg-amber-50 text-[var(--brand-secondary)] rounded-full font-medium border border-amber-100">
                        {h}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Banner */}
      <section id="enquire" className="relative py-16 sm:py-24 overflow-hidden" data-testid="ashtavinayak-cta">
        <div className="absolute inset-0">
          <img src={CTA_BG} alt="Divine Journey" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[var(--brand-primary)]/75" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight font-['Cormorant_Garamond',serif] mb-3">
            Ready for a Divine Journey?
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Experience the sacred Ashtavinayak trail with a well-planned spiritual getaway designed for peace, devotion, and comfort.
          </p>
          <button
            onClick={() => navigate('/#contact')}
            className="px-8 py-3.5 bg-[var(--brand-secondary)] text-white font-semibold rounded-full text-sm hover:bg-[var(--brand-secondary)]/90 transition-all inline-flex items-center gap-2"
            data-testid="ashtavinayak-enquire-bottom"
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
