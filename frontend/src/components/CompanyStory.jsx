const STORY_BG = "/images/rajasthan/udaipur.jpg";

const STATS = [
  { number: '35+', label: 'Years Experience' },
  { number: '50K+', label: 'Happy Travelers' },
  { number: '100+', label: 'Destinations' },
  { number: '4.8', label: 'Average Rating' },
];

export default function CompanyStory() {
  return (
    <section id="story" className="relative py-12 sm:py-20 lg:py-28 overflow-hidden" data-testid="company-story">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${STORY_BG})` }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="overline mb-3 text-white/80">Our Story</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-6">
              35 Years of Creating Meaningful Journeys
            </h2>
            <div className="space-y-4 text-white/90 text-base font-semibold leading-relaxed">
              <p>
                Every great journey begins with a vision. Our story began 35 years ago, when our founder set out
                with a simple yet powerful idea — to help people discover the world in a way that is seamless,
                meaningful, and unforgettable.
              </p>
              <p>
                What started as a small travel initiative gradually evolved into a respected name in the travel
                industry. With a deep belief that travel is not just about destinations but about experiences,
                cultures, and human connections, Holiday Emporium grew steadily through commitment, integrity,
                and an unwavering focus on customer satisfaction.
              </p>
              <p>
                Today, after three and a half decades, we remain rooted in the same values of trust, excellence,
                and personalized service that shaped our beginnings — proudly serving travelers from our home
                base in <strong className="text-[var(--brand-accent)]">Pune, Maharashtra</strong>.
              </p>
            </div>
          </div>

          {/* Stats + Image */}
          <div>
            <div className="relative rounded-lg overflow-hidden mb-8 shadow-xl">
              <img
                src="https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome011.jpg"
                alt="35 years of travel"
                className="w-full h-72 lg:h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-primary)]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-4xl font-bold font-['Cormorant_Garamond',serif]">Since 1990</p>
                <p className="text-sm opacity-80">Pune, Maharashtra</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" data-testid="company-stats">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-white rounded-lg border border-[var(--brand-border)]"
                  data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="text-2xl lg:text-3xl font-bold text-[var(--brand-primary)] font-['Cormorant_Garamond',serif]">
                    {stat.number}
                  </div>
                  <div className="text-xs text-[var(--brand-text-muted)] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
