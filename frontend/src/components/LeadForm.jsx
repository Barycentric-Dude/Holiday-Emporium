import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const PACKAGES = [
  'Ashtavinayak Yatra',
  'Wildlife Safaris',
  'Domestic Tours',
  'Coastal Tours',
  'International Tours',
];

export default function LeadForm() {
  const [form, setForm] = useState({
    first_name: '', last_name: '', phone: '', email: '', package_interest: '', message: '',
  });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.phone || !form.email || !form.package_interest) {
      setStatus('error');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, form);
      setStatus('success');
      setForm({ first_name: '', last_name: '', phone: '', email: '', package_interest: '', message: '' });
    } catch {
      setStatus('error');
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[var(--brand-muted-bg)]" data-testid="lead-form-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Info */}
          <div>
            <p className="overline mb-3">Start Your Journey</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight mb-4">
              Plan Your Journey With Holiday Emporium
            </h2>
            <p className="text-base text-[var(--brand-text-muted)] mb-3 leading-relaxed">
              Holiday Emporium brings over 35 years of travel expertise in crafting memorable journeys.
              Share your travel interest with us and our team will get back to you with the best itinerary
              and package details.
            </p>
            <p className="text-sm text-[var(--brand-text-muted)] mb-6 italic">
              तुमच्या प्रवासाची आवड आमच्याशी शेअर करा. आमची टीम तुम्हाला सर्वोत्तम सहल आणि पॅकेज तपशील देईल.
            </p>

            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/Nainital-9-1024x709.png"
                alt="Travel destinations"
                className="w-full h-64 lg:h-72 object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white p-6 lg:p-8 rounded-lg border border-[var(--brand-border)] shadow-sm" data-testid="lead-form">
            {status === 'success' ? (
              <div className="text-center py-12" data-testid="lead-form-success">
                <CheckCircle className="w-16 h-16 text-[var(--brand-primary)] mx-auto mb-4" />
                <h3 className="text-2xl font-medium text-[var(--brand-text)] font-['Cormorant_Garamond',serif] mb-2">
                  Thank You!
                </h3>
                <p className="text-[var(--brand-text-muted)]">
                  We have received your enquiry. Our team will contact you within 24 hours.
                </p>
                <p className="text-sm text-[var(--brand-text-muted)] mt-2 italic">
                  धन्यवाद! आमची टीम तुमच्याशी लवकरच संपर्क करेल.
                </p>
                <button
                  onClick={() => setStatus(null)}
                  className="mt-6 px-6 py-2 bg-[var(--brand-primary)] text-white rounded-full text-sm font-semibold"
                  data-testid="lead-form-reset"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name" className="text-[var(--brand-text)] mb-1.5 block">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="first_name"
                      value={form.first_name}
                      onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                      placeholder="पहिलं नाव / First Name"
                      className="bg-stone-50 border-stone-200 focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                      data-testid="lead-input-first-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name" className="text-[var(--brand-text)] mb-1.5 block">
                      Last Name
                    </Label>
                    <Input
                      id="last_name"
                      value={form.last_name}
                      onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                      placeholder="आडनाव / Last Name"
                      className="bg-stone-50 border-stone-200 focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                      data-testid="lead-input-last-name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[var(--brand-text)] mb-1.5 block">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="bg-stone-50 border-stone-200 focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                    data-testid="lead-input-phone"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[var(--brand-text)] mb-1.5 block">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="bg-stone-50 border-stone-200 focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                    data-testid="lead-input-email"
                  />
                </div>

                <div>
                  <Label className="text-[var(--brand-text)] mb-1.5 block">
                    Package Interest <span className="text-red-500">*</span>
                  </Label>
                  <Select value={form.package_interest} onValueChange={(v) => setForm({ ...form, package_interest: v })}>
                    <SelectTrigger className="bg-stone-50 border-stone-200" data-testid="lead-select-package">
                      <SelectValue placeholder="Select a package / पॅकेज निवडा" />
                    </SelectTrigger>
                    <SelectContent>
                      {PACKAGES.map((pkg) => (
                        <SelectItem key={pkg} value={pkg} data-testid={`lead-option-${pkg.toLowerCase().replace(/\s+/g, '-')}`}>
                          {pkg}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-[var(--brand-text)] mb-1.5 block">
                    Message (Optional)
                  </Label>
                  <textarea
                    id="message"
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your travel plans..."
                    className="w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none"
                    data-testid="lead-input-message"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 text-sm" data-testid="lead-form-error">
                    <AlertCircle className="w-4 h-4" />
                    Please fill all required fields.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[var(--brand-primary)] text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-[var(--brand-primary)]/90 transition-all disabled:opacity-60"
                  data-testid="lead-form-submit"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Enquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
