import { useEffect, useRef } from 'react';

const CATEGORIES = [
  {
    title: 'Spiritual Trails',
    description: 'Ashtavinayak & Temple Circuits',
    image: 'https://images.unsplash.com/photo-1745647912842-231631509cc2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB0ZW1wbGUlMjBhcmNoaXRlY3R1cmUlMjBzcGlyaXR1YWx8ZW58MHx8fHwxNzc1NTc1MTc4fDA&ixlib=rb-4.1.0&q=85',
    span: 'md:col-span-5 md:row-span-2',
    height: 'h-64 md:h-full',
  },
  {
    title: 'Wildlife & Nature',
    description: 'Tiger Safaris & National Parks',
    image: 'https://images.unsplash.com/photo-1761439737697-ca88ab66c29b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxCZW5nYWwlMjB0aWdlciUyMHNhZmFyaSUyMGZvcmVzdHxlbnwwfHx8fDE3NzU1NzUxNzh8MA&ixlib=rb-4.1.0&q=85',
    span: 'md:col-span-3',
    height: 'h-48 md:h-56',
  },
  {
    title: 'Heritage Trails',
    description: 'Forts, Palaces & History',
    image: 'https://images.unsplash.com/photo-1661246709684-39a2d71856dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwxfHxSYWphc3RoYW4lMjBmb3J0JTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc3NTU3NTE5OHww&ixlib=rb-4.1.0&q=85',
    span: 'md:col-span-4',
    height: 'h-48 md:h-56',
  },
  {
    title: 'International Tours',
    description: 'Dubai, Singapore, Bali & More',
    image: 'https://images.unsplash.com/photo-1728970381371-0be0d47151cb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHw0fHxEdWJhaSUyMHNreWxpbmUlMjBsdXh1cnklMjB0cmF2ZWx8ZW58MHx8fHwxNzc1NTc1MTc4fDA&ixlib=rb-4.1.0&q=85',
    span: 'md:col-span-4',
    height: 'h-48 md:h-56',
  },
  {
    title: 'Family Getaways',
    description: 'Hill Stations & Resorts',
    image: 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/Nainital-9.png',
    span: 'md:col-span-3',
    height: 'h-48 md:h-56',
  },
  {
    title: 'Customized Tours',
    description: 'Your Dream, Our Planning',
    image: 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome014.jpg',
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
    <section id="tours" className="py-20 lg:py-28 bg-[var(--brand-bg)]" ref={sectionRef} data-testid="tour-categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 reveal">
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
