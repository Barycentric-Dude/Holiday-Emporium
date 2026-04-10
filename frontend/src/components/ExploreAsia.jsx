const DESTINATIONS = [
  { name: 'Japan', image: 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome010.jpg' },
  { name: 'India', image: 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome09.jpg' },
  { name: 'Singapore', image: 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome015.jpg' },
  { name: 'Philippines', image: 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome016.jpg' },
  { name: 'Everest', image: 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome013.jpg' },
  { name: 'Thailand', image: 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome014.jpg' },
  { name: 'Bali', image: 'https://images.unsplash.com/photo-1656247203824-3d6f99461ba4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxCYWxpJTIwcmljZSUyMHRlcnJhY2VzfGVufDB8fHx8MTc3NTU3NTE5OHww&ixlib=rb-4.1.0&q=85' },
  { name: 'Egypt', image: 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome012.jpg' },
];

export default function ExploreAsia() {
  const doubled = [...DESTINATIONS, ...DESTINATIONS];

  return (
    <section id="explore-asia" className="py-12 sm:py-20 lg:py-28 bg-[var(--brand-bg)] overflow-hidden" data-testid="explore-asia">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="text-center">
          <p className="overline mb-3">Discover the World</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight">
            Explore Asia & Beyond
          </h2>
          <p className="mt-4 text-base text-[var(--brand-text-muted)] max-w-xl mx-auto">
            From the cherry blossoms of Japan to the pyramids of Egypt — we craft journeys across continents.
          </p>
        </div>
      </div>

      {/* Infinite scroll carousel */}
      <div className="relative" data-testid="asia-carousel">
        <div className="flex carousel-scroll" style={{ width: `${doubled.length * 280}px` }}>
          {doubled.map((dest, i) => (
            <div
              key={`${dest.name}-${i}`}
              className="flex-shrink-0 w-56 sm:w-72 mx-2 sm:mx-3 group cursor-pointer"
              data-testid={`asia-dest-${dest.name.toLowerCase()}-${i}`}
            >
              <div className="relative h-72 sm:h-96 rounded-lg overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-2xl font-medium text-white font-['Cormorant_Garamond',serif]">{dest.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
