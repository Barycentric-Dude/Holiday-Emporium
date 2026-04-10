import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Separator } from '../components/ui/separator';

const LINKS = {
  Tours: ['Ashtavinayak Yatra', 'Wildlife Safaris', 'International Tours', 'Coastal Retreats', 'Customized Tours'],
  Destinations: ['Dubai', 'Singapore', 'Bali', 'Tadoba', 'Konkan Coast'],
  Company: ['About Us', 'Our Story', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
};

export default function Footer() {
  return (
    <footer className="bg-[var(--brand-text)] text-stone-300 pb-16 md:pb-0" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold font-['Cormorant_Garamond',serif] text-white mb-4">
              Holiday <span className="text-[var(--brand-accent)]">Emporium</span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed mb-6 max-w-sm">
              Over 35 years of crafting meaningful journeys. From sacred pilgrimages to international
              adventures, we make every trip unforgettable.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[var(--brand-accent)]" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--brand-accent)]" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--brand-accent)]" />
                <a href="mailto:info@holidayemporium.com" className="hover:text-white transition-colors">info@holidayemporium.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--brand-accent)]" />
                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-stone-400 hover:text-[var(--brand-accent)] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-stone-700" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} Holiday Emporium (Sachin Travels). All rights reserved.</p>
          <p>Proudly serving travelers from Pune, Maharashtra since 1990.</p>
        </div>
      </div>
    </footer>
  );
}
