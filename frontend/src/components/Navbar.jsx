import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Phone, MapPin, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '../components/ui/sheet';

const DOMESTIC_TOURS = [
  { label: 'Ashtavinayak Yatra', href: '/tours/ashtavinayak' },
  { label: 'Kerala Kanyakumari', href: '/tours/kerala' },
  { label: 'Rajasthan Mewad Marwad', href: '/tours/rajasthan' },
];

const NAV_LINKS = [
  { label: 'Home', href: '/', type: 'route' },
  { label: 'Tours', type: 'dropdown' },
  { label: 'Packages', href: '#packages', type: 'hash' },
  { label: 'Explore Asia', href: '#explore-asia', type: 'hash' },
  { label: 'About Us', href: '/about', type: 'route' },
  { label: 'Contact', href: '#contact', type: 'hash' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (link) => {
    setOpen(false);
    setMobileToursOpen(false);
    if (link.type === 'route') {
      navigate(link.href);
      if (link.href === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.type === 'hash') {
      if (location.pathname === '/') {
        const el = document.querySelector(link.href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/' + link.href);
      }
    }
  };

  const handleTourNav = (href) => {
    setToursOpen(false);
    setOpen(false);
    setMobileToursOpen(false);
    navigate(href);
  };

  const handleContactCTA = () => {
    if (location.pathname === '/') {
      const el = document.querySelector('#contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#contact');
    }
  };

  const isTourPage = location.pathname.startsWith('/tours/');

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
          <button onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 flex-shrink-0" data-testid="navbar-logo">
            <div className={`font-bold text-lg sm:text-xl lg:text-2xl font-['Cormorant_Garamond',serif] tracking-tight transition-colors ${scrolled ? 'text-[var(--brand-primary)]' : 'text-white'}`}>
              Holiday <span className="text-[var(--brand-accent)]">Emporium</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {NAV_LINKS.map((link) => {
              if (link.type === 'dropdown') {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setToursOpen(true)}
                    onMouseLeave={() => setToursOpen(false)}
                  >
                    <button
                      className={`text-sm font-medium tracking-wide transition-colors hover:text-[var(--brand-accent)] flex items-center gap-1 ${
                        isTourPage
                          ? 'text-[var(--brand-accent)]'
                          : scrolled ? 'text-[var(--brand-text)]' : 'text-white/90'
                      }`}
                      data-testid="nav-link-tours"
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toursOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {toursOpen && (
                      <div className="absolute top-full left-0 pt-2 animate-fade-in" data-testid="tours-dropdown">
                        <div className="bg-white rounded-lg shadow-xl border border-[var(--brand-border)] py-2 min-w-[220px]">
                          <p className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)]">
                            Domestic Tours
                          </p>
                          {DOMESTIC_TOURS.map((tour) => (
                            <button
                              key={tour.href}
                              onClick={() => handleTourNav(tour.href)}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--brand-muted-bg)] transition-colors ${
                                location.pathname === tour.href
                                  ? 'text-[var(--brand-primary)] font-semibold'
                                  : 'text-[var(--brand-text)]'
                              }`}
                              data-testid={`dropdown-${tour.label.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              {tour.label}
                            </button>
                          ))}
                          <div className="border-t border-stone-100 mt-1 pt-1">
                            <p className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)]">
                              International Tours
                            </p>
                            <p className="px-4 py-2 text-xs text-[var(--brand-text-muted)] italic">Coming soon...</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <button
                  key={link.label}
                  onClick={() => handleNav(link)}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-[var(--brand-accent)] ${
                    (link.type === 'route' && location.pathname === link.href)
                      ? 'text-[var(--brand-accent)]'
                      : scrolled ? 'text-[var(--brand-text)]' : 'text-white/90'
                  }`}
                  data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {link.label}
                </button>
              );
            })}
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
              onClick={handleContactCTA}
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

                  {NAV_LINKS.map((link) => {
                    if (link.type === 'dropdown') {
                      return (
                        <div key={link.label}>
                          <button
                            onClick={() => setMobileToursOpen(!mobileToursOpen)}
                            className="w-full flex items-center justify-between py-3 text-lg font-medium text-[var(--brand-text)] border-b border-stone-100"
                            data-testid="mobile-nav-tours"
                          >
                            <span className={isTourPage ? 'text-[var(--brand-primary)]' : ''}>Tours</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${mobileToursOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {mobileToursOpen && (
                            <div className="pl-4 border-b border-stone-100 py-2 animate-fade-in">
                              <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] mb-2">Domestic</p>
                              {DOMESTIC_TOURS.map((tour) => (
                                <button
                                  key={tour.href}
                                  onClick={() => handleTourNav(tour.href)}
                                  className={`block w-full text-left py-2 text-base ${
                                    location.pathname === tour.href
                                      ? 'text-[var(--brand-primary)] font-semibold'
                                      : 'text-[var(--brand-text-muted)]'
                                  }`}
                                  data-testid={`mobile-tour-${tour.label.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                  {tour.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return (
                      <button
                        key={link.label}
                        onClick={() => handleNav(link)}
                        className={`text-left py-3 text-lg font-medium border-b border-stone-100 transition-colors ${
                          (link.type === 'route' && location.pathname === link.href)
                            ? 'text-[var(--brand-primary)]'
                            : 'text-[var(--brand-text)] hover:text-[var(--brand-primary)]'
                        }`}
                        data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                      >
                        {link.label}
                      </button>
                    );
                  })}

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
