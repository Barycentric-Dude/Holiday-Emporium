import { useEffect, useRef } from 'react';

const CATEGORIES = [
  {
    title: 'Spiritual Trails',
    description: 'Ashtavinayak & Temple Circuits',
    image: '/images/temples/lenyadri.jpg',
    span: 'md:col-span-5 md:row-span-2',
    height: 'h-64 md:h-full',
  },
  {
    title: 'Wildlife & Nature',
    description: 'Tiger Safaris & National Parks',
    image: '/images/rajasthan/ranthambore.jpg',
    span: 'md:col-span-3',
    height: 'h-48 md:h-56',
  },
  {
    title: 'Heritage Trails',
    description: 'Forts, Palaces & History',
    image: '/images/rajasthan/jaipur.jpg',
    span: 'md:col-span-4',
    height: 'h-48 md:h-56',
  },
  {
    title: 'International Tours',
    description: 'Dubai, Singapore, Bali & More',
    image: '/images/dubai/burj-khalifa.jpg',
    span: 'md:col-span-4',
    height: 'h-48 md:h-56',
  },
  {
    title: 'Family Getaways',
    description: 'Hill Stations & Resorts',
    image: '/images/shimla-manali/shimla.jpg',
    span: 'md:col-span-3',
    height: 'h-48 md:h-56',
  },
  {
    title: 'Customized Tours',
    description: 'Your Dream, Our Planning',
    image: '/images/kerala/munnar.jpg',
    span: 'md:col-span-5',
    height: 'h-48 md:h-56',
  },
];

export default function TourCategories() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const items = sectionRef.current?.querySelectorAll('.reveal');
    items?.forEach((item) => observer.observe(item));
    return () => items?.forEach((item) => observer.unobserve(item));
  }, []);

  return (
    <section id="tours" className="py-12 sm:py-20 lg:py-28 bg-[var(--brand-bg)]" ref={sectionRef} data-testid="tour-categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-14 reveal">
          <p className="overline mb-3">Explore Our World</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight">
            Explore Our Most Loved Journeys
          </h2>
          <p className="mt-4 text-base text-[var(--brand-text-muted)] max-w-xl mx-auto">
            From sacred temples to wild safaris, coastal retreats to international destinations — find your perfect journey.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5" data-testid="tour-bento-grid">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.title}
              className={`bento-item cursor-pointer reveal ${cat.span} ${cat.height}`}
              style={{ animationDelay: `${i * 0.1}s` }}
              data-testid={`tour-category-${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="bento-content">
                <h3 className="text-xl sm:text-2xl font-medium font-['Cormorant_Garamond',serif] mb-1">{cat.title}</h3>
                <p className="text-sm text-white/80 font-['Manrope',sans-serif]">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
