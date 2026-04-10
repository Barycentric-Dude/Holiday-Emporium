import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '../components/ui/sheet';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Tours', href: '#tours' },
  { label: 'Packages', href: '#packages' },
  { label: 'Explore Asia', href: '#explore-asia' },
  { label: 'Our Story', href: '#story' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 flex-shrink-0" data-testid="navbar-logo">
            <div className={`font-bold text-lg sm:text-xl lg:text-2xl font-['Cormorant_Garamond',serif] tracking-tight transition-colors ${scrolled ? 'text-[var(--brand-primary)]' : 'text-white'}`}>
              Holiday <span className="text-[var(--brand-accent)]">Emporium</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-[var(--brand-accent)] ${
                  scrolled ? 'text-[var(--brand-text)]' : 'text-white/90'
                }`}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors ${scrolled ? 'text-[var(--brand-primary)]' : 'text-white'}`}
              data-testid="navbar-phone"
            >
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </a>

            <button
              onClick={() => scrollTo('#contact')}
              className="hidden lg:block px-5 py-2.5 bg-[var(--brand-primary)] text-white text-sm font-semibold rounded-full hover:bg-[var(--brand-primary)]/90 transition-all"
              data-testid="navbar-cta"
            >
              Get Quote
            </button>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className={`lg:hidden p-2 ${scrolled ? 'text-[var(--brand-text)]' : 'text-white'}`}
                  data-testid="mobile-menu-toggle"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col pt-8">
                  <div className="font-bold text-2xl font-['Cormorant_Garamond',serif] text-[var(--brand-primary)] mb-8">
                    Holiday <span className="text-[var(--brand-accent)]">Emporium</span>
                  </div>
                  {NAV_LINKS.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      className="text-left py-3 text-lg font-medium text-[var(--brand-text)] hover:text-[var(--brand-primary)] border-b border-stone-100 transition-colors"
                      data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {link.label}
                    </button>
                  ))}
                  <div className="mt-8 flex items-center gap-2 text-sm text-[var(--brand-text-muted)]">
                    <MapPin className="w-4 h-4" />
                    <span>Pune, Maharashtra</span>
                  </div>
                  <a href="tel:+919876543210" className="mt-3 flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)]">
                    <Phone className="w-4 h-4" />
                    <span>+91 98765 43210</span>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
