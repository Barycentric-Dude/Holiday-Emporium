import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Heart, Users, ArrowRight, Crown, Mountain, Landmark, TreePine, Compass, Tent, Camera } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const HERO_BG = "https://images.unsplash.com/photo-1636996627212-ce5d24bca63a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHxSYWphc3RoYW4lMjBwYWxhY2UlMjBmb3J0JTIwSmFpcHVyJTIwSGF3YSUyME1haGFsfGVufDB8fHx8MTc3NTgxNjI2NHww&ixlib=rb-4.1.0&q=85";
const ABOUT_IMG = "https://images.unsplash.com/photo-1710987759549-db4263464211?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwzfHxVZGFpcHVyJTIwbGFrZSUyMHBhbGFjZSUyMFJhamFzdGhhbnxlbnwwfHx8fDE3NzU4MTYyNjR8MA&ixlib=rb-4.1.0&q=85";
const CTA_BG = "https://images.unsplash.com/photo-1730303558511-cbd9e6a4295e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwzfHxKYWlzYWxtZXIlMjBkZXNlcnQlMjBzYW5kJTIwZHVuZXMlMjBjYW1lbCUyMHN1bnNldHxlbnwwfHx8fDE3NzU4MTYyNjR8MA&ixlib=rb-4.1.0&q=85";

const QUICK_INFO = [
  { icon: Clock, label: 'Duration', value: '7 / 9 / 15 Days' },
  { icon: MapPin, label: 'Starting Point', value: 'Abu Road / Bikaner' },
  { icon: Heart, label: 'Trip Type', value: 'Heritage & Desert' },
  { icon: Users, label: 'Ideal For', value: 'All Travelers' },
];

const DESTINATIONS = [
  { name: 'Mount Abu', desc: 'Rajasthan\'s only hill station at 3,960ft. Nakki Lake boating, Dilwara Jain Temples & sunset views.', icon: Mountain, image: 'https://images.unsplash.com/photo-1661246709684-39a2d71856dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwxfHxSYWphc3RoYW4lMjBmb3J0JTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc3NTU3NTE5OHww&ixlib=rb-4.1.0&q=85' },
  { name: 'Udaipur', desc: 'The City of Lakes. City Palace, Crystal Gallery, Sahelion ki Badi & romantic lake views.', icon: Crown, image: 'https://images.unsplash.com/photo-1622018135960-249abd263aeb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwxfHxVZGFpcHVyJTIwbGFrZSUyMHBhbGFjZSUyMFJhamFzdGhhbnxlbnwwfHx8fDE3NzU4MTYyNjR8MA&ixlib=rb-4.1.0&q=85' },
  { name: 'Chittorgarh', desc: 'Rajput valor and sacrifice. Padmini Palace, Vijay Stambha & Kirti Stambha.', icon: Landmark, image: 'https://images.unsplash.com/photo-1582136283473-28db6e70ee3e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxSYWphc3RoYW4lMjBwYWxhY2UlMjBmb3J0JTIwSmFpcHVyJTIwSGF3YSUyME1haGFsfGVufDB8fHx8MTc3NTgxNjI2NHww&ixlib=rb-4.1.0&q=85' },
  { name: 'Pushkar & Ajmer', desc: 'Sacred Brahma Mandir at Pushkar and the revered Khwaja Dargah at Ajmer.', icon: Compass, image: 'https://images.unsplash.com/photo-1675772120474-b9d7811220f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwyfHxVZGFpcHVyJTIwbGFrZSUyMHBhbGFjZSUyMFJhamFzdGhhbnxlbnwwfHx8fDE3NzU4MTYyNjR8MA&ixlib=rb-4.1.0&q=85' },
  { name: 'Ranthambore', desc: 'Thrilling wildlife safari in India\'s famous tiger reserve. Spot exotic jungle creatures.', icon: TreePine, image: 'https://images.unsplash.com/photo-1700562554203-5b8644512759?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxSYW50aGFtYm9yZSUyMHRpZ2VyJTIwc2FmYXJpJTIwbmF0aW9uYWwlMjBwYXJrJTIwSW5kaWF8ZW58MHx8fHwxNzc1ODE2MjczfDA&ixlib=rb-4.1.0&q=85' },
  { name: 'Jaipur', desc: 'The Pink City. Hawa Mahal, Amer Fort, City Palace, Jantar Mantar & Chokhi Dhani.', icon: Landmark, image: 'https://images.unsplash.com/photo-1662696938959-8e1dac3f1bd0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxSYWphc3RoYW4lMjBwYWxhY2UlMjBmb3J0JTIwSmFpcHVyJTIwSGF3YSUyME1haGFsfGVufDB8fHx8MTc3NTgxNjI2NHww&ixlib=rb-4.1.0&q=85' },
  { name: 'Bikaner', desc: 'Desert grandeur. Junagad Fort, Lalgarh Palace & the unique Karni Mata Temple.', icon: Crown, image: 'https://images.unsplash.com/photo-1700756102943-fa388b2ed119?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwxfHxKYWlzYWxtZXIlMjBkZXNlcnQlMjBzYW5kJTIwZHVuZXMlMjBjYW1lbCUyMHN1bnNldHxlbnwwfHx8fDE3NzU4MTYyNjR8MA&ixlib=rb-4.1.0&q=85' },
  { name: 'Jaisalmer', desc: 'The Golden City. Jaisalmer Fort, Jain Temples, Gadisar Lake & Sam Sand Dunes.', icon: Tent, image: 'https://images.unsplash.com/photo-1730303557183-5478e66e22e4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwyfHxKYWlzYWxtZXIlMjBkZXNlcnQlMjBzYW5kJTIwZHVuZXMlMjBjYW1lbCUyMHN1bnNldHxlbnwwfHx8fDE3NzU4MTYyNjR8MA&ixlib=rb-4.1.0&q=85' },
  { name: 'Jodhpur', desc: 'The Blue City. Mehrangarh Fort, Umaid Bhawan Palace & vibrant bazaars.', icon: Camera, image: 'https://images.unsplash.com/photo-1714893520131-4fb6dd335e83?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwxfHxKb2RocHVyJTIwYmx1ZSUyMGNpdHklMjBNZWhyYW5nYXJoJTIwZm9ydCUyMEluZGlhfGVufDB8fHx8MTc3NTgxNjI3Mnww&ixlib=rb-4.1.0&q=85' },
];

const TOURS = {
  full: {
    label: 'Mewad Marwad (15D)',
    sublabel: '14N / 15 Days',
    days: [
      { day: 'Day 1', title: 'Abu Road \u2192 Mount Abu (28 KM)', details: 'Report to Sachin Travels\' Tour Manager at Abu Road Railway Station. Proceed to Mount Abu. Hotel check-in.', highlights: ['Abu Road', 'Mount Abu'], stay: 'Mount Abu' },
      { day: 'Day 2', title: 'Mount Abu Sightseeing (3,960 ft)', details: 'After breakfast, boating in Nakki Lake. Visit Brahmakumari Ashram, Arbuja Devi Temple, Dilwara Temple & Sunset Point.', highlights: ['Nakki Lake', 'Dilwara Temple', 'Sunset Point'], stay: 'Mount Abu' },
      { day: 'Day 3', title: 'Mount Abu \u2192 Udaipur (185 KM)', details: 'After breakfast, proceed to Udaipur. Visit City Palace, Rana Pratap Smarak & Sahelion ki Badi.', highlights: ['City Palace', 'Rana Pratap Smarak'], stay: 'Udaipur' },
      { day: 'Day 4', title: 'Udaipur Sightseeing', details: 'Visit Crystal Gallery. Evening excursion to Haldi Ghati, Nathdwara Mandir & Eklingji Mandir.', highlights: ['Crystal Gallery', 'Haldi Ghati', 'Nathdwara'], stay: 'Udaipur' },
      { day: 'Day 5', title: 'Udaipur \u2192 Chittod \u2192 Pushkar (333 KM)', details: 'Visit Chittorgarh Fort, Padmini Palace, Kirti Stambha & Vijay Stambha. Continue to Pushkar.', highlights: ['Chittorgarh Fort', 'Padmini Palace', 'Vijay Stambha'], stay: 'Pushkar' },
      { day: 'Day 6', title: 'Pushkar \u2192 Ajmer \u2192 Ranthambore (305 KM)', details: 'Visit Pushkar Tirth & Brahma Mandir. Proceed to Ajmer for Khwaja Dargah. Continue to Ranthambore.', highlights: ['Brahma Mandir', 'Khwaja Dargah'], stay: 'Ranthambore' },
      { day: 'Day 7', title: 'Ranthambore \u2192 Jaipur (130 KM)', details: 'Morning wildlife safari at Ranthambore Sanctuary. Carry Photo ID for safari. Proceed to Jaipur.', highlights: ['Wildlife Safari', 'Tiger Reserve'], stay: 'Jaipur' },
      { day: 'Day 8', title: 'Jaipur Sightseeing', details: 'Visit City Palace, Jantar Mantar, Hawa Mahal & Amer Fort. Evening dinner at Chokhi Dhani. Shopping time.', highlights: ['Hawa Mahal', 'Amer Fort', 'Chokhi Dhani'], stay: 'Jaipur' },
      { day: 'Day 9', title: 'Jaipur \u2192 Bikaner (330 KM)', details: 'After breakfast, proceed to Bikaner. Long scenic drive through Rajasthani countryside.', highlights: ['Bikaner'], stay: 'Bikaner' },
      { day: 'Day 10', title: 'Bikaner Sightseeing', details: 'Visit Junagad Fort, Lalgarh Palace & the famous Karni Mata Temple.', highlights: ['Junagad Fort', 'Lalgarh Palace', 'Karni Mata'], stay: 'Bikaner' },
      { day: 'Day 11', title: 'Bikaner \u2192 Jaisalmer (326 KM)', details: 'After breakfast, depart for Jaisalmer. Arrival and hotel check-in.', highlights: ['Jaisalmer'], stay: 'Jaisalmer' },
      { day: 'Day 12', title: 'Jaisalmer Sightseeing', details: 'Visit Jaisalmer Fort, Jain Temples, Gadisar Lake & Sam Sand Dunes for sunset camel safari.', highlights: ['Jaisalmer Fort', 'Sam Dunes', 'Camel Safari'], stay: 'Jaisalmer' },
      { day: 'Day 13', title: 'Jaisalmer \u2192 Jodhpur (275 KM)', details: 'After breakfast, proceed to Jodhpur \u2014 the Blue City.', highlights: ['Jodhpur'], stay: 'Jodhpur' },
      { day: 'Day 14', title: 'Jodhpur Sightseeing', details: 'Visit Umaid Bhawan Palace & Mehrangarh Fort. Explore the blue lanes and local bazaars.', highlights: ['Mehrangarh Fort', 'Umaid Bhawan Palace'], stay: 'Jodhpur' },
      { day: 'Day 15', title: 'Jodhpur \u2192 Departure', details: 'After breakfast, proceed to Jodhpur Railway Station. Tour ends with royal memories.', highlights: ['Departure'], stay: '' },
    ]
  },
  mewad: {
    label: 'Mewad + Ranthambore (9D)',
    sublabel: '8N / 9 Days',
    days: [
      { day: 'Day 1', title: 'Abu Road \u2192 Mount Abu (28 KM)', details: 'Report to Tour Manager at Abu Road Railway Station. Proceed to Mount Abu. Hotel check-in.', highlights: ['Abu Road', 'Mount Abu'], stay: 'Mount Abu' },
      { day: 'Day 2', title: 'Mount Abu Sightseeing (3,960 ft)', details: 'Boating at Nakki Lake. Visit Brahmakumari Ashram, Arbuja Devi, Dilwara Temple & Sunset Point.', highlights: ['Nakki Lake', 'Dilwara Temple', 'Sunset Point'], stay: 'Mount Abu' },
      { day: 'Day 3', title: 'Mount Abu \u2192 Udaipur (185 KM)', details: 'En route visit Haldi Ghati, Nathdwara Mandir and Eklingji Mandir. Arrival at Udaipur.', highlights: ['Haldi Ghati', 'Nathdwara', 'Eklingji'], stay: 'Udaipur' },
      { day: 'Day 4', title: 'Udaipur Sightseeing', details: 'Visit City Palace, Rana Pratap Smarak, Sahelion ki Badi, Crystal Gallery. Shopping time.', highlights: ['City Palace', 'Crystal Gallery', 'Sahelion ki Badi'], stay: 'Udaipur' },
      { day: 'Day 5', title: 'Udaipur \u2192 Chittod \u2192 Pushkar (333 KM)', details: 'Visit Chittorgarh Fort, Padmini Palace, Kirti Stambha & Vijay Stambha. Continue to Pushkar.', highlights: ['Chittorgarh Fort', 'Padmini Palace'], stay: 'Pushkar' },
      { day: 'Day 6', title: 'Pushkar \u2192 Ajmer \u2192 Ranthambore (305 KM)', details: 'Visit Pushkar Tirth & Brahma Mandir. Ajmer Khwaja Dargah. Proceed to Ranthambore.', highlights: ['Brahma Mandir', 'Khwaja Dargah'], stay: 'Ranthambore' },
      { day: 'Day 7', title: 'Ranthambore \u2192 Jaipur (130 KM)', details: 'Morning wildlife safari at Ranthambore. Carry Photo ID. Proceed to Jaipur. Dinner at Chokhi Dhani.', highlights: ['Wildlife Safari', 'Chokhi Dhani'], stay: 'Jaipur' },
      { day: 'Day 8', title: 'Jaipur Sightseeing', details: 'Visit City Palace, Jantar Mantar, Hawa Mahal and Amer Fort. Free time for shopping.', highlights: ['Hawa Mahal', 'Amer Fort', 'City Palace'], stay: 'Jaipur' },
      { day: 'Day 9', title: 'Jaipur \u2192 Departure', details: 'After breakfast, proceed to Jaipur Railway Station. Tour ends.', highlights: ['Departure'], stay: '' },
    ]
  },
  marwad: {
    label: 'Marwad Desert (7D)',
    sublabel: '6N / 7 Days',
    days: [
      { day: 'Day 1', title: 'Arrive Bikaner', details: 'Report to Sachin Travels\' Tour Manager at Bikaner Station. Proceed to hotel. Check-in.', highlights: ['Bikaner'], stay: 'Bikaner' },
      { day: 'Day 2', title: 'Bikaner Sightseeing', details: 'Visit Junagad Fort, Lalgarh Palace & Karni Mata Temple.', highlights: ['Junagad Fort', 'Lalgarh Palace', 'Karni Mata'], stay: 'Bikaner' },
      { day: 'Day 3', title: 'Bikaner \u2192 Jaisalmer (326 KM)', details: 'Proceed to Jaisalmer. Arrival and hotel check-in.', highlights: ['Jaisalmer'], stay: 'Jaisalmer' },
      { day: 'Day 4', title: 'Jaisalmer Sightseeing', details: 'Visit Jaisalmer Fort, Jain Temples, Gadisar Lake & Sam Sand Dunes for sunset experience.', highlights: ['Jaisalmer Fort', 'Sam Dunes', 'Gadisar Lake'], stay: 'Jaisalmer' },
      { day: 'Day 5', title: 'Jaisalmer \u2192 Jodhpur (275 KM)', details: 'After breakfast, proceed to Jodhpur.', highlights: ['Jodhpur'], stay: 'Jodhpur' },
      { day: 'Day 6', title: 'Jodhpur Sightseeing', details: 'Visit Umaid Bhawan Palace & Mehrangarh Fort. Explore the blue streets and local markets.', highlights: ['Mehrangarh Fort', 'Umaid Bhawan Palace'], stay: 'Jodhpur' },
      { day: 'Day 7', title: 'Jodhpur \u2192 Departure', details: 'After breakfast, proceed to Jodhpur Railway Station. Tour ends.', highlights: ['Departure'], stay: '' },
    ]
  }
};

export default function RajasthanPage() {
  const navigate = useNavigate();
  const [activeItinerary, setActiveItinerary] = useState('full');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tour = TOURS[activeItinerary];

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center overflow-hidden" data-testid="rajasthan-hero">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Rajasthan Tour" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="flex flex-wrap justify-center gap-2 mb-5 animate-fade-in">
            {['Royal Heritage', 'Desert Safari', 'Forts & Palaces'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full border border-white/20">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight font-['Cormorant_Garamond',serif] mb-4 animate-fade-in-up" data-testid="rajasthan-title">
            Rajasthan Mewad Marwad
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in-up stagger-2">
            Royal heritage, vibrant culture, and desert grandeur — from the palaces of Udaipur to the golden dunes of Jaisalmer
          </p>
          <button
            onClick={() => { const el = document.querySelector('#enquire'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3 bg-amber-700 text-white font-semibold rounded-full text-sm hover:bg-amber-800 transition-all inline-flex items-center gap-2 animate-fade-in-up stagger-3"
            data-testid="rajasthan-enquire-hero"
          >
            Enquire Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--brand-bg)] to-transparent" />
      </section>

      {/* About */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="rajasthan-about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img src={ABOUT_IMG} alt="Rajasthan" className="w-full h-64 sm:h-80 lg:h-96 object-cover" loading="lazy" />
            </div>
            <div>
              <p className="overline mb-3">Land of Kings</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight mb-6 font-['Cormorant_Garamond',serif]">
                About This Journey
              </h2>
              <div className="space-y-4 text-[var(--brand-text-muted)] text-sm sm:text-base leading-relaxed">
                <p>
                  Rajasthan, including the regions of Mewad and Marwad, offers travelers an unmatched combination
                  of royal heritage, vibrant culture, and architectural grandeur. From the hill station of Mount Abu
                  to the romantic palaces of Udaipur, visitors experience centuries-old forts, temples, and palaces
                  that tell tales of valiant kings and rich traditions.
                </p>
                <p>
                  The wildlife at Ranthambore, the golden sand dunes of Jaisalmer with camel safaris, traditional
                  Rajasthani cuisine, folk music, and cultural festivals create a perfect blend of leisure, history,
                  spirituality, and adventure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 sm:py-12 bg-white border-y border-[var(--brand-border)]" data-testid="rajasthan-quickinfo">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {QUICK_INFO.map((info) => (
              <div key={info.label} className="text-center" data-testid={`raj-qi-${info.label.toLowerCase().replace(/\s/g, '-')}`}>
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
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="rajasthan-destinations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-amber-800 tracking-tight font-['Cormorant_Garamond',serif]">
              Destinations Covered
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-2xl mx-auto">
              Explore the royal cities, sacred temples, desert forts, and wildlife sanctuaries of Rajasthan.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" data-testid="raj-destinations-grid">
            {DESTINATIONS.map((dest) => (
              <div key={dest.name} className="bg-white rounded-lg border border-[var(--brand-border)] overflow-hidden card-lift group" data-testid={`raj-dest-${dest.name.toLowerCase().replace(/[\s&()]/g, '-')}`}>
                <div className="h-40 overflow-hidden relative">
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
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-muted-bg)]" data-testid="rajasthan-itinerary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-amber-800 tracking-tight font-['Cormorant_Garamond',serif]">
              Itinerary
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--brand-text-muted)] max-w-xl mx-auto mb-6">
              Choose from three curated Rajasthan experiences.
            </p>
            <div className="inline-flex flex-wrap justify-center rounded-xl bg-white border border-[var(--brand-border)] p-1 gap-1" data-testid="raj-itinerary-toggle">
              {Object.entries(TOURS).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setActiveItinerary(key)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${activeItinerary === key ? 'bg-amber-700 text-white' : 'text-[var(--brand-text-muted)] hover:text-amber-700'}`}
                  data-testid={`toggle-${key}`}
                >
                  <span className="block">{t.label}</span>
                  <span className="block text-[10px] opacity-70">{t.sublabel}</span>
                </button>
              ))}
            </div>
          </div>

          <Accordion type="single" collapsible defaultValue="day-0" className="w-full space-y-3" data-testid="raj-itinerary-accordion">
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
      <section id="enquire" className="relative py-16 sm:py-24 overflow-hidden" data-testid="rajasthan-cta">
        <div className="absolute inset-0">
          <img src={CTA_BG} alt="Rajasthan desert" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-amber-900/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight font-['Cormorant_Garamond',serif] mb-3">
            Ready for a Royal Adventure?
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Experience the grandeur of Rajasthan's forts, the magic of desert sunsets, and the warmth of Rajasthani hospitality.
          </p>
          <button onClick={() => navigate('/#contact')} className="px-8 py-3.5 bg-white text-amber-800 font-semibold rounded-full text-sm hover:bg-stone-100 transition-all inline-flex items-center gap-2" data-testid="rajasthan-enquire-bottom">
            Enquire Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
