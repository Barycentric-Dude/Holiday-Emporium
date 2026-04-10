import { X } from 'lucide-react';
import { useState } from 'react';

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="relative bg-[var(--brand-secondary)] text-white py-2.5 px-4 text-center z-40"
      data-testid="promo-banner"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <span className="text-sm font-semibold tracking-wide">
          Get <span className="font-extrabold">10% Off</span> on Your Next Travel — Explore curated spiritual, wildlife, and cultural experiences!
        </span>
        <a
          href="#packages"
          className="hidden sm:inline-block px-4 py-1 bg-white text-[var(--brand-primary)] text-xs font-bold rounded-full hover:bg-stone-100 transition-colors"
          data-testid="promo-cta"
        >
          EXPLORE TOURS
        </a>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2"
        data-testid="promo-close"
        aria-label="Close promotion"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
