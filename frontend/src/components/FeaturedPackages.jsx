import { useState, useEffect } from 'react';
import { Clock, MapPin, Users, ChevronRight } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function FeaturedPackages() {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get(`${API}/tours`).then((res) => {
      setTours(res.data.tours);
    }).catch(console.error);
  }, []);

  const categories = ['all', 'spiritual', 'wildlife', 'international', 'coastal'];
  const filtered = filter === 'all' ? tours : tours.filter((t) => t.category === filter);

  return (
    <section id="packages" className="py-20 lg:py-28 bg-[var(--brand-muted-bg)]" data-testid="featured-packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="overline mb-3">Curated Experiences</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight">
            Featured Travel Packages
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" data-testid="package-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setSelectedTour(null); }}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                filter === cat
                  ? 'bg-[var(--brand-primary)] text-white'
                  : 'bg-white text-[var(--brand-text-muted)] border border-[var(--brand-border)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]'
              }`}
              data-testid={`filter-${cat}`}
            >
              {cat === 'all' ? 'All Tours' : cat}
            </button>
          ))}
        </div>

        {/* Tour Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-lg border border-[var(--brand-border)] overflow-hidden card-lift group"
              data-testid={`tour-card-${tour.id}`}
            >
              {/* Image */}
              <div className="img-zoom h-52 relative">
                <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-[var(--brand-primary)] text-white text-xs font-bold rounded-full uppercase">
                    {tour.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-medium text-[var(--brand-text)] font-['Cormorant_Garamond',serif] mb-1">
                  {tour.title}
                </h3>
                <p className="text-xs text-[var(--brand-text-muted)] font-['Cormorant_Garamond',serif] italic mb-3">
                  {tour.title_mr}
                </p>
                <p className="text-sm text-[var(--brand-text-muted)] mb-4 line-clamp-2">{tour.tagline}</p>

                <div className="flex items-center gap-4 text-xs text-[var(--brand-text-muted)] mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {tour.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Pune Departure
                  </span>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tour.highlights?.slice(0, 3).map((h) => (
                    <span key={h} className="text-xs px-2 py-0.5 bg-[var(--brand-muted-bg)] text-[var(--brand-text-muted)] rounded">
                      {h}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[var(--brand-primary)]">{tour.price}</span>
                  <button
                    onClick={() => setSelectedTour(selectedTour === tour.id ? null : tour.id)}
                    className="flex items-center gap-1 text-sm font-semibold text-[var(--brand-secondary)] hover:text-[var(--brand-primary)] transition-colors"
                    data-testid={`view-itinerary-${tour.id}`}
                  >
                    View Itinerary <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Itinerary Accordion */}
              {selectedTour === tour.id && (
                <div className="border-t border-[var(--brand-border)] px-5 pb-5 animate-fade-in" data-testid={`itinerary-${tour.id}`}>
                  <Accordion type="single" collapsible className="w-full">
                    {tour.itinerary?.map((day, idx) => (
                      <AccordionItem key={idx} value={`day-${idx}`} className="border-stone-200">
                        <AccordionTrigger className="text-sm font-semibold text-[var(--brand-text)] hover:no-underline py-3">
                          <span className="flex items-center gap-2">
                            <span className="w-7 h-7 flex items-center justify-center bg-[var(--brand-primary)] text-white text-xs rounded-full font-bold">
                              {idx + 1}
                            </span>
                            {day.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-[var(--brand-text-muted)] pl-9">
                          {day.details}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
