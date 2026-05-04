import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Heart, Users, ArrowRight, Sunrise, Ship, Mountain, TreePine, Landmark, Waves } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const HERO_BG = "/images/kerala/alleppey.jpg";
const ABOUT_IMG = "/images/kerala/munnar.jpg";
const CTA_BG = "/images/kerala/kanyakumari.jpg";

const QUICK_INFO = [
  { icon: Clock, label: 'Duration', value: '4N/5D to 9N/10D' },
  { icon: MapPin, label: 'Starting Point', value: 'Cochin / Trivandrum' },
  { icon: Heart, label: 'Trip Type', value: 'Nature & Cultural' },
  { icon: Users, label: 'Ideal For', value: 'All Travelers' },
];

const DESTINATIONS = [
  { name: 'Kanyakumari', desc: 'Witness sunrise & sunset at the southernmost tip of India. Visit Vivekananda Rock Memorial & Triveni Sangam.', icon: Sunrise, image: '/images/kerala/kanyakumari.jpg' },
  { name: 'Trivandrum', desc: 'Visit Padmanabhaswamy Temple, Velli Lake, and relax at the iconic Kovalam Beach.', icon: Landmark, image: '/images/kerala/trivandrum.jpg' },
  { name: 'Alleppey', desc: 'Experience the famous backwater cruise on Vembanad Lake amidst serene tropical canals.', icon: Ship, image: '/images/kerala/alleppey.jpg' },
  { name: 'Periyar', desc: 'Explore wildlife with a boat ride in Periyar Lake. Home to elephants, tigers & exotic birds at 3,630ft.', icon: TreePine, image: '/images/kerala/periyar.jpg' },
  { name: 'Munnar', desc: 'Tea gardens, Mattupetty Dam & Echo Point at 5,280ft. Spice plantations and misty hill views.', icon: Mountain, image: '/images/kerala/munnar.jpg' },
  { name: 'Guruvayur', desc: 'Darshan at the famous Lord Krishna temple, one of the most sacred shrines in South India.', icon: Landmark, image: '/images/kerala/guruvayur.jpg' },
  { name: 'Cochin (Kochi)', desc: 'Harbor cruise, Chinese Fishing Nets, Dutch Palace, Synagogues & colonial heritage.', icon: Waves, image: '/images/kerala/kochi.jpg' },
];

const ITINERARY_10D = [
  { day: 'Day 1', title: 'Trivandrum \u2192 Kanyakumari (87 KM)', details: 'All passengers report to Sachin Travels Tour Manager at Trivandrum Railway Station. Proceed to Kanyakumari. After dinner, late night hotel check-in.', highlights: ['Trivandrum', 'Kanyakumari'], stay: 'Kanyakumari' },
  { day: 'Day 2', title: 'Kanyakumari Sightseeing', details: 'After breakfast, visit Swami Vivekananda Rock Memorial, Suchindram Temple, Kanyakumari Temple and Gandhi Mandap. In the evening visit Sunset Point and Triveni Sangam.', highlights: ['Vivekananda Rock', 'Kanyakumari Temple', 'Triveni Sangam'], stay: 'Kanyakumari' },
  { day: 'Day 3', title: 'Kanyakumari \u2192 Trivandrum (87 KM)', details: 'Wake up early to see the Sunrise. After breakfast, proceed to Trivandrum. Visit Padmanabha Swami Temple and Velli Lake. Evening enjoy at Kovalam Beach.', highlights: ['Sunrise', 'Padmanabhaswamy Temple', 'Kovalam Beach'], stay: 'Trivandrum' },
  { day: 'Day 4', title: 'Trivandrum \u2192 Alleppey (170 KM)', details: 'After breakfast, proceed to Alleppey. Enjoy the famous Backwater Cruise Ride in Vembanad Lake \u2014 a quintessential Kerala experience.', highlights: ['Backwater Cruise', 'Vembanad Lake'], stay: 'Alleppey' },
  { day: 'Day 5', title: 'Alleppey \u2192 Periyar (120 KM)', details: 'After breakfast, proceed to Periyar (3,630ft above sea level). Arrival and check-in at the hill resort.', highlights: ['Periyar', 'Hill Resort'], stay: 'Periyar' },
  { day: 'Day 6', title: 'Periyar \u2192 Munnar (110 KM)', details: 'After breakfast, take a Boat Ride in Periyar Lake to see the Wildlife Sanctuary. After lunch, proceed to Munnar (5,280ft above sea level). En route visit Spice Plantations.', highlights: ['Wildlife Boat Ride', 'Spice Plantations', 'Munnar'], stay: 'Munnar' },
  { day: 'Day 7', title: 'Munnar Sightseeing', details: 'After breakfast, visit Tea Gardens, Mattupetty Dam and Echo Point. Free time for shopping and relaxation amidst the misty hills.', highlights: ['Tea Gardens', 'Mattupetty Dam', 'Echo Point'], stay: 'Munnar' },
  { day: 'Day 8', title: 'Munnar \u2192 Guruvayur (175 KM)', details: 'After breakfast, proceed to Athirappilly Waterfalls. En route lunch. Continue to Guruvayur for overnight stay.', highlights: ['Athirappilly Waterfalls', 'Guruvayur'], stay: 'Guruvayur' },
  { day: 'Day 9', title: 'Guruvayur \u2192 Cochin (90 KM)', details: 'Early morning darshan of Lord Krishna. After breakfast, proceed to Cochin. Enjoy Cochin Harbour Cruise, Synagogues, Dutch Palace, Saint Francis Church, Chinese Fishing Nets and Bolgatty Island.', highlights: ['Krishna Temple', 'Harbour Cruise', 'Chinese Nets', 'Dutch Palace'], stay: 'Cochin' },
  { day: 'Day 10', title: 'Cochin \u2192 Departure', details: 'Proceed to Cochin Railway Station or Airport. Departure to Mumbai/Pune. Tour ends with beautiful memories.', highlights: ['Departure'], stay: '' },
];

const ITINERARY_8D = [
  { day: 'Day 1', title: 'Trivandrum \u2192 Kanyakumari (87 KM)', details: 'Report to Sachin Travels Tour Manager at Trivandrum Railway Station. Proceed to Kanyakumari. After dinner, late night hotel check-in.', highlights: ['Trivandrum', 'Kanyakumari'], stay: 'Kanyakumari' },
  { day: 'Day 2', title: 'Kanyakumari Sightseeing', details: 'Visit Swami Vivekananda Rock Memorial, Suchindram Temple, Kanyakumari Temple and Gandhi Mandap. Evening visit Sunset Point and Triveni Sangam.', highlights: ['Vivekananda Rock', 'Kanyakumari Temple', 'Triveni Sangam'], stay: 'Kanyakumari' },
  { day: 'Day 3', title: 'Kanyakumari \u2192 Trivandrum (87 KM)', details: 'Early sunrise viewing. Visit Padmanabha Swami Temple and Velli Lake. Evening at Kovalam Beach.', highlights: ['Sunrise', 'Padmanabhaswamy Temple', 'Kovalam Beach'], stay: 'Trivandrum' },
  { day: 'Day 4', title: 'Trivandrum \u2192 Alleppey \u2192 Periyar (290 KM)', details: 'Proceed to Alleppey for backwater cruise on Vembanad Lake. After lunch continue to Periyar (3,630ft above sea level).', highlights: ['Backwater Cruise', 'Vembanad Lake', 'Periyar'], stay: 'Periyar' },
  { day: 'Day 5', title: 'Periyar Wildlife Sanctuary', details: 'Boat Ride in Periyar Lake to see Wildlife Sanctuary. Free time for shopping and relaxation.', highlights: ['Wildlife Boat Ride', 'Shopping'], stay: 'Periyar' },
  { day: 'Day 6', title: 'Periyar \u2192 Munnar (110 KM)', details: 'Proceed to Munnar (5,280ft). Visit Tea Gardens, Mattupetty Dam and Echo Point. Evening visit Spice Plantations.', highlights: ['Tea Gardens', 'Mattupetty Dam', 'Echo Point', 'Spice Plantations'], stay: 'Munnar' },
  { day: 'Day 7', title: 'Munnar \u2192 Cochin (140 KM)', details: 'Proceed to Cochin. After lunch enjoy Cochin Harbour Cruise \u2014 Synagogues, Dutch Palace, Saint Francis Church, Chinese Fishing Nets and Bolgatty Island.', highlights: ['Harbour Cruise', 'Chinese Nets', 'Dutch Palace'], stay: 'Cochin' },
  { day: 'Day 8', title: 'Cochin \u2192 Departure', details: 'Proceed to Cochin Railway Station or Airport. Departure. Tour ends.', highlights: ['Departure'], stay: '' },
];

const ITINERARY_WOMENS = [
  { day: 'Day 1', title: 'Arrive Cochin → Munnar (130 KM)', details: 'Welcome at Cochin. Scenic drive through spice and tea plantations to Munnar. Hotel check-in. Welcome dinner with traditional Kathakali cultural performance.', highlights: ['Cochin', 'Munnar', 'Kathakali Performance'], stay: 'Munnar' },
  { day: 'Day 2', title: 'Munnar Sightseeing', details: 'After breakfast, visit the lush Tea Gardens and Tea Museum. Explore Mattupetty Dam & Echo Point for stunning views. Afternoon visit Eravikulam National Park (Nilgiri Tahr habitat) and Spice Plantation. Evening leisure and shopping.', highlights: ['Tea Gardens', 'Mattupetty Dam', 'Echo Point', 'Spice Plantation'], stay: 'Munnar' },
  { day: 'Day 3', title: 'Munnar → Alleppey (160 KM)', details: 'After breakfast, drive down to Alleppey. Board a traditional Kerala houseboat for an overnight backwater cruise on the serene Vembanad Lake. Enjoy authentic Kerala meals on board with spectacular backwater views.', highlights: ['Houseboat Cruise', 'Vembanad Lake', 'Backwaters'], stay: 'Houseboat' },
  { day: 'Day 4', title: 'Alleppey → Cochin (53 KM)', details: 'Morning breakfast on the houseboat. Disembark and drive to Cochin. Harbour cruise past Chinese Fishing Nets. Visit Dutch Palace, Jewish Synagogue & Fort Kochi heritage area. Evening shopping at local boutiques and spice markets.', highlights: ['Harbour Cruise', 'Chinese Fishing Nets', 'Dutch Palace', 'Synagogue'], stay: 'Cochin' },
  { day: 'Day 5', title: 'Cochin → Departure', details: 'After breakfast, proceed to Cochin International Airport or Railway Station. Tour ends with beautiful memories of Gods Own Country.', highlights: ['Departure'], stay: '' },
];

const ITINERARY_HONEYMOON = [
  { day: 'Day 1', title: 'Arrive Cochin → Munnar (130 KM)', details: 'Welcome at Cochin with flower garlands. Scenic couple\'s drive through tea country to Munnar. Check-in at a romantic hillside resort. Candle-lit welcome dinner.', highlights: ['Romantic Resort', 'Cochin', 'Munnar'], stay: 'Munnar' },
  { day: 'Day 2', title: 'Munnar Sightseeing & Spa', details: 'Visit the famous Tea Gardens, Mattupetty Dam & Echo Point. Afternoon couples Ayurvedic massage and spa at the resort. Evening stroll through misty tea estates at sunset.', highlights: ['Tea Gardens', 'Mattupetty Dam', 'Couples Spa', 'Echo Point'], stay: 'Munnar' },
  { day: 'Day 3', title: 'Munnar → Thekkady / Periyar (110 KM)', details: 'Drive to Thekkady. Boat ride in Periyar Lake to spot elephants, bison & exotic birds in the wildlife sanctuary. Evening Kathakali performance and Kalaripayattu martial arts show.', highlights: ['Periyar Lake', 'Wildlife Sanctuary', 'Kathakali', 'Boat Ride'], stay: 'Periyar' },
  { day: 'Day 4', title: 'Periyar → Alleppey (175 KM)', details: 'Drive to Alleppey and board a private overnight houseboat on Kerala\'s famed backwaters. Enjoy a candlelit dinner on deck under starlight while gliding through tranquil Vembanad Lake.', highlights: ['Private Houseboat', 'Candlelit Dinner', 'Backwater Cruise'], stay: 'Houseboat' },
  { day: 'Day 5', title: 'Alleppey → Kovalam Beach (160 KM)', details: 'Disembark after breakfast. Drive to Trivandrum and check in at a beach resort in Kovalam. Evening romantic sunset walk along the crescent-shaped Kovalam Beach.', highlights: ['Kovalam Beach', 'Beach Resort', 'Sunset'], stay: 'Kovalam' },
  { day: 'Day 6', title: 'Trivandrum Sightseeing', details: 'Morning visit Padmanabhaswamy Temple and Velli Lake. Afternoon leisure at Kovalam Beach — swimming, Ayurvedic massage, or watersports. Romantic farewell dinner by the sea.', highlights: ['Padmanabhaswamy Temple', 'Velli Lake', 'Beach Leisure', 'Farewell Dinner'], stay: 'Kovalam' },
  { day: 'Day 7', title: 'Trivandrum → Departure', details: 'After breakfast, transfer to Trivandrum International Airport or Railway Station. Tour ends with cherished honeymoon memories from God\'s Own Country.', highlights: ['Departure'], stay: '' },
];

const TOURS = {
  womens: { label: "Women's Special (5D)", sublabel: '4N / 5 Days', price: '₹34,000/person', itinerary: ITINERARY_WOMENS },
  honeymoon: { label: 'Honeymoon Special (7D)', sublabel: '6N / 7 Days', price: '₹52,000/person', itinerary: ITINERARY_HONEYMOON },
  '8day': { label: 'Express Kerala (8D)', sublabel: '7N / 8 Days', itinerary: ITINERARY_8D },
  '10day': { label: 'Full Kerala (10D)', sublabel: '9N / 10 Days', itinerary: ITINERARY_10D },
};

export default function KeralaPage() {
  const navigate = useNavigate();
  const [activeItinerary, setActiveItinerary] = useState('womens');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tour = TOURS[activeItinerary];
  const itinerary = tour.itinerary;

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center overflow-hidden" data-testid="kerala-hero">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Kerala Kanyakumari Tour" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="flex flex-wrap justify-center gap-2 mb-5 animate-fade-in">
            {['God\'s Own Country', 'Backwaters & Hills', 'Spiritual & Cultural'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full border border-white/20">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight font-['Cormorant_Garamond',serif] mb-4 animate-fade-in-up" data-testid="kerala-title">
            Kerala Kanyakumari
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in-up stagger-2">
            A perfect blend of spirituality, scenic beauty, and cultural richness — from the southernmost tip of India to God's Own Country
          </p>
          <button
            onClick={() => { const el = document.querySelector('#enquire'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3 bg-emerald-700 text-white font-semibold rounded-full text-sm hover:bg-emerald-800 transition-all inline-flex items-center gap-2 animate-fade-in-up stagger-3"
            data-testid="kerala-enquire-hero"
          >
            Enquire Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--brand-bg)] to-transparent" />
      </section>

      {/* About */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="kerala-about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img src={ABOUT_IMG} alt="Kerala landscape" className="w-full h-64 sm:h-80 lg:h-96 object-cover" loading="lazy" />
            </div>
            <div>
              <p className="overline mb-3">Kerala & Kanyakumari</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight mb-6 font-['Cormorant_Garamond',serif]">
                About This Journey
              </h2>
              <div className="space-y-4 text-[var(--brand-text-muted)] text-sm sm:text-base leading-relaxed">
                <p>
                  A journey through Kanyakumari and Kerala offers a perfect blend of spirituality, scenic beauty,
                  and cultural richness. Kanyakumari, the southernmost tip of India, is a truly unique destination
                  where you can witness both sunrise and sunset over the ocean.
                </p>
                <p>
                  As the tour continues into Kerala, often called "God's Own Country," you experience a refreshing
                  shift into lush greenery and tranquil landscapes. The serene backwaters of Alleppey, the wildlife
                  of Periyar, the tea gardens of Munnar, the sacred Guruvayur temple, and the colonial heritage of
                  Kochi create an unforgettable journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 sm:py-12 bg-white border-y border-[var(--brand-border)]" data-testid="kerala-quickinfo">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {QUICK_INFO.map((info) => (
              <div key={info.label} className="text-center" data-testid={`kerala-qi-${info.label.toLowerCase().replace(/\s/g, '-')}`}>
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-2">
                  <info.icon className="w-5 h-5 text-emerald-700" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] mb-0.5">{info.label}</p>
                <p className="text-sm font-semibold text-emerald-700">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="kerala-destinations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-emerald-800 tracking-tight font-['Cormorant_Garamond',serif]">
              Destinations Covered
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-2xl mx-auto">
              From ocean sunrises to misty hill stations — explore the diverse beauty of South India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" data-testid="destinations-grid">
            {DESTINATIONS.map((dest) => (
              <div
                key={dest.name}
                className="bg-white rounded-lg border border-[var(--brand-border)] overflow-hidden card-lift group"
                data-testid={`dest-${dest.name.toLowerCase().replace(/[\s()]/g, '-')}`}
              >
                <div className="h-44 overflow-hidden relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy" />
                  <div className="absolute top-3 left-3">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <dest.icon className="w-4 h-4 text-emerald-700" />
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
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-muted-bg)]" data-testid="kerala-itinerary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-emerald-800 tracking-tight font-['Cormorant_Garamond',serif]">
              Itinerary
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-xl mx-auto mb-6">
              Choose from four curated Kerala tour options.
            </p>

            {/* Toggle */}
            <div className="inline-flex flex-wrap justify-center rounded-xl bg-white border border-[var(--brand-border)] p-1 gap-1" data-testid="itinerary-toggle">
              {Object.entries(TOURS).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setActiveItinerary(key)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${activeItinerary === key ? 'bg-emerald-700 text-white' : 'text-[var(--brand-text-muted)] hover:text-emerald-700'}`}
                  data-testid={`toggle-${key}`}
                >
                  <span className="block">{t.label}</span>
                  <span className="block text-[10px] opacity-70">{t.sublabel}</span>
                  {t.price && <span className="block text-[10px] font-bold text-emerald-300">{t.price}</span>}
                </button>
              ))}
            </div>
          </div>

          <Accordion type="single" collapsible defaultValue="day-0" className="w-full space-y-3" data-testid="kerala-itinerary-accordion">
            {itinerary.map((day, idx) => (
              <AccordionItem
                key={`${activeItinerary}-${idx}`}
                value={`day-${idx}`}
                className="bg-white rounded-lg border border-[var(--brand-border)] px-5 overflow-hidden"
              >
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-[var(--brand-text)] hover:no-underline py-4">
                  <span className="flex items-center gap-3 text-left">
                    <span className="w-8 h-8 flex items-center justify-center bg-emerald-700 text-white text-xs rounded-full font-bold flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>
                      <span className="block text-emerald-700 text-xs font-bold">{day.day}</span>
                      <span className="block">{day.title}</span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--brand-text-muted)] pb-5 pl-11 leading-relaxed">
                  <p className="mb-3">{day.details}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {day.highlights.map((h) => (
                      <span key={h} className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium border border-emerald-100">
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
      <section id="enquire" className="relative py-16 sm:py-24 overflow-hidden" data-testid="kerala-cta">
        <div className="absolute inset-0">
          <img src={CTA_BG} alt="Kerala journey" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-emerald-900/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight font-['Cormorant_Garamond',serif] mb-3">
            Ready to Explore God's Own Country?
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Experience the magic of Kerala and Kanyakumari with a well-planned journey designed for devotion, nature, relaxation, and culture.
          </p>
          <button
            onClick={() => navigate('/#contact')}
            className="px-8 py-3.5 bg-white text-emerald-800 font-semibold rounded-full text-sm hover:bg-stone-100 transition-all inline-flex items-center gap-2"
            data-testid="kerala-enquire-bottom"
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
