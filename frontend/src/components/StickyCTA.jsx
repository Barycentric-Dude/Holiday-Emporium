import { useState } from 'react';
import { MapPin, X, ArrowRight } from 'lucide-react';

export default function StickyCTA() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="sticky-cta animate-fade-in-up" style={{ animationDelay: '2s' }} data-testid="sticky-cta">
      <div className="bg-white rounded-xl shadow-xl border border-[var(--brand-border)] p-4 relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-stone-400 hover:text-stone-600 transition-colors"
          data-testid="sticky-cta-close"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 pr-4">
            <p className="text-sm font-semibold text-[var(--brand-text)] mb-1">
              Pune-Departure Specialist
            </p>
            <p className="text-xs text-[var(--brand-text-muted)] mb-2">
              Get a custom quote for your next journey from Pune.
            </p>
            <button
              onClick={scrollToContact}
              className="flex items-center gap-1 text-xs font-bold text-[var(--brand-secondary)] hover:text-[var(--brand-primary)] transition-colors"
              data-testid="sticky-cta-button"
            >
              Request Quote <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
