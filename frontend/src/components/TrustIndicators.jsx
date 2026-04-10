import { DollarSign, Globe, Zap, Users } from 'lucide-react';

const INDICATORS = [
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    description: 'Best value packages with transparent pricing. No hidden costs, guaranteed.',
    image: 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome017.jpg',
  },
  {
    icon: Globe,
    title: 'Worldwide Coverage',
    description: '50+ destinations across India and internationally. Wherever you dream, we take you.',
    image: 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome018.jpg',
  },
  {
    icon: Zap,
    title: 'Fast Booking',
    description: 'Quick confirmation and hassle-free booking process. Travel planned in minutes.',
    image: 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome020.jpg',
  },
  {
    icon: Users,
    title: 'Guided Tours',
    description: 'Experienced multilingual guides who know every destination inside out.',
    image: 'https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome019.jpg',
  },
];

export default function TrustIndicators() {
  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-white" data-testid="trust-indicators">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <p className="overline mb-3">Why Choose Us</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight">
            Trusted by Thousands of Travelers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="trust-grid">
          {INDICATORS.map((item) => (
            <div
              key={item.title}
              className="trust-card bg-[var(--brand-muted-bg)] rounded-lg overflow-hidden card-lift"
              data-testid={`trust-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center mb-3 -mt-9 relative z-10 shadow-lg">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-medium text-[var(--brand-text)] font-['Cormorant_Garamond',serif] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--brand-text-muted)]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
