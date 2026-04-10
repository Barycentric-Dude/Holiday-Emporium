import { useState, useEffect } from 'react';
import { Compass, Mountain, Sparkles } from 'lucide-react';

const HERO_SPIRITUAL = "https://static.prod-images.emergentagent.com/jobs/12736aef-be45-437d-8d0e-4ed5d086849e/images/e3fb3cd48ef1b7b5f70423c87563a6e33d6547938ffbb24d831f38fdf3f5cb28.png";
const HERO_ADVENTURE = "https://static.prod-images.emergentagent.com/jobs/12736aef-be45-437d-8d0e-4ed5d086849e/images/8960f6c25825394df05b8b2b3c5773bcc747738318dbbf3fe4955771eb28c110.png";

const MODES = [
  {
    key: 'spiritual',
    label: 'Spiritual Trails',
    icon: Sparkles,
    image: HERO_SPIRITUAL,
    headline: 'Discover Journeys That Inspire',
    subline: 'Sacred pilgrimages, divine temples, and spiritual experiences across Maharashtra and beyond.',
    cta: 'Explore Divine Paths',
  },
  {
    key: 'adventure',
    label: 'Adventure & Wildlife',
    icon: Mountain,
    image: HERO_ADVENTURE,
    headline: 'Where the Wild Awaits',
    subline: 'Tiger safaris, coastal escapes, and international adventures crafted for the bold traveler.',
    cta: 'Book Your Safari',
  },
];

export default function HeroSection() {
  const [activeMode, setActiveMode] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(() => {
      setActiveMode((prev) => (prev + 1) % MODES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const mode = MODES[activeMode];

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
      {/* Background Images */}
      {MODES.map((m, i) => (
        <div
          key={m.key}
          className="absolute inset-0 hero-bg"
          style={{
            backgroundImage: `url(${m.image})`,
            opacity: activeMode === i ? 1 : 0,
          }}
          data-testid={`hero-bg-${m.key}`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Mode Toggle */}
        <div className={`flex justify-center mb-10 ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="mode-toggle" data-testid="hero-mode-toggle">
            {MODES.map((m, i) => (
              <button
                key={m.key}
                onClick={() => setActiveMode(i)}
                className={activeMode === i ? 'active' : ''}
                data-testid={`hero-toggle-${m.key}`}
              >
                <span className="flex items-center gap-1.5">
                  <m.icon className="w-4 h-4" />
                  {m.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Headline */}
        <h1
          className={`text-4xl sm:text-5xl lg:text-7xl font-medium text-white tracking-tight leading-none mb-6 font-['Cormorant_Garamond',serif] ${loaded ? 'animate-fade-in-up' : 'opacity-0'}`}
          data-testid="hero-headline"
        >
          {mode.headline}
        </h1>

        {/* Subline */}
        <p
          className={`text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light ${loaded ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}
          data-testid="hero-subline"
        >
          {mode.subline}
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${loaded ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
          <button
            onClick={() => scrollToSection('#packages')}
            className="px-8 py-3.5 bg-[var(--brand-primary)] text-white font-semibold rounded-full text-sm tracking-wide hover:bg-[var(--brand-primary)]/90 transition-all hover:scale-105"
            data-testid="hero-cta-primary"
          >
            <span className="flex items-center gap-2">
              <Compass className="w-4 h-4" />
              {mode.cta}
            </span>
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="px-8 py-3.5 border border-white/40 text-white font-semibold rounded-full text-sm tracking-wide hover:bg-white/10 transition-all"
            data-testid="hero-cta-secondary"
          >
            Request Custom Quote
          </button>
        </div>

        {/* Scroll indicator */}
        <div className={`mt-16 ${loaded ? 'animate-fade-in stagger-5' : 'opacity-0'}`}>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full mx-auto flex justify-center">
            <div className="w-1.5 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--brand-bg)] to-transparent" />
    </section>
  );
}
