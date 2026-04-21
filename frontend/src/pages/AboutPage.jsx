import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, HelpCircle, Clock, ChevronRight, ArrowRight, Compass, Trees, Mountain, Globe } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import { Separator } from '../components/ui/separator';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const HERO_BG = "/images/rajasthan/udaipur.jpg";
const FOUNDER_IMG = "https://sachintravels.karveandassociates.com/wp-content/uploads/2026/03/onetrhome011.jpg";
const CTA_BG = "/images/kerala/kanyakumari.jpg";

const EXPERIENCES = [
  {
    icon: Compass,
    title: 'Spiritual Tours',
    description: 'Sacred pilgrimages including Ashtavinayak and Ayodhya – Varanasi.',
    image: '/images/temples/morgaon.jpg',
  },
  {
    icon: Trees,
    title: 'Wildlife Adventures',
    description: "Explore India's premier tiger reserves including Tadoba and Corbett.",
    image: '/images/rajasthan/ranthambore.jpg',
  },
  {
    icon: Mountain,
    title: 'Hill Stations',
    description: 'Discover scenic destinations like Ooty, Kerala, and Kashmir.',
    image: '/images/shimla-manali/shimla.jpg',
  },
  {
    icon: Globe,
    title: 'International Tours',
    description: 'Experience global destinations including Dubai, Singapore, Bali and Europe.',
    image: '/images/dubai/burj-khalifa.jpg',
  },
];

const VALUE_PROPS = [
  { number: '35+', title: 'Years Experience', description: 'Three decades of crafting unforgettable travel experiences with deep industry expertise.' },
  { number: '100+', title: 'Curated Packages', description: 'Thoughtfully designed itineraries covering spiritual, wildlife, cultural, and international tours.' },
  { number: '50K+', title: 'Happy Travelers', description: 'Personalized service and expert guidance ensuring every journey exceeds expectations.' },
];

const CONTACT_INFO = [
  { icon: Mail, label: 'EMAIL', value: 'info@holidayemporium.com', href: 'mailto:info@holidayemporium.com' },
  { icon: Phone, label: 'PHONE', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: MapPin, label: 'OFFICE', value: 'Pune, Maharashtra, India', href: null },
  { icon: HelpCircle, label: 'FAQ', value: 'Frequently Asked Questions', href: '#faq' },
];

const FAQS = [
  {
    question: 'What kind of travel experiences does Holiday Emporium offer?',
    answer: 'We offer a wide range of thoughtfully curated travel experiences across India, including spiritual pilgrimages, wildlife and nature trails, cultural journeys, and heritage tours. Each itinerary is designed to provide comfort, meaningful exploration, and memorable experiences.',
  },
  {
    question: 'Are your travel packages customizable?',
    answer: "Yes, we offer flexible and customizable travel plans based on your preferences, group size, and travel goals. Whether you're planning a family trip, a spiritual journey, or a nature escape, we can tailor the experience to suit your needs.",
  },
  {
    question: 'Do you assist with complete travel planning?',
    answer: 'Absolutely. From itinerary planning to guiding you through your journey, we ensure a smooth and hassle-free travel experience. Our goal is to make your trip comfortable, well-organized, and enjoyable from start to finish.',
  },
  {
    question: 'What destinations do you cover?',
    answer: 'We cover a wide range of destinations across India including Maharashtra, Rajasthan, Kerala, Kashmir, and Uttarakhand. Internationally, we offer packages for Dubai, Singapore, Bali, Thailand, Japan, Egypt, and Europe. All tours depart from Pune, Maharashtra.',
  },
  {
    question: 'How can I book a tour with Holiday Emporium?',
    answer: 'You can reach out to us via our contact form, WhatsApp, email, or phone. Share your travel preferences and our team will get back to you with the best itinerary and package details within 24 hours.',
  },
];

export default function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden" data-testid="about-hero">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="About Holiday Emporium" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[var(--brand-accent)] font-bold mb-4 animate-fade-in">Our Journey In Travel</p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight font-['Cormorant_Garamond',serif] mb-6 animate-fade-in-up" data-testid="about-hero-title">
            About Holiday Emporium
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto animate-fade-in-up stagger-2">
            Holiday Emporium was founded with a simple vision: to help travelers discover the world in a way that
            is seamless, meaningful, and unforgettable. What started as a small initiative focused on building
            personal relationships with travelers gradually grew into a trusted name in the travel industry.
          </p>
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mx-auto animate-fade-in-up stagger-3">
            With years of dedication and a passion for service, Holiday Emporium has created memorable journeys
            for countless travelers across India and international destinations.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--brand-bg)] to-transparent" />
      </section>

      {/* Our Travel Experiences */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="about-experiences">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="overline mb-3">What We Offer</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight">
              Our Travel Experiences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6" data-testid="about-experiences-grid">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.title}
                className="group bg-white rounded-lg border border-[var(--brand-border)] overflow-hidden card-lift"
                data-testid={`about-exp-${exp.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <exp.icon className="w-5 h-5 text-[var(--brand-primary)]" />
                    <h3 className="text-lg font-medium text-[var(--brand-text)] font-['Cormorant_Garamond',serif]">
                      {exp.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--brand-text-muted)] mb-4">{exp.description}</p>
                  <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--brand-secondary)] hover:text-[var(--brand-primary)] transition-colors"
                    data-testid={`about-exp-cta-${exp.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Explore Tour <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-muted-bg)]" data-testid="about-founder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src={FOUNDER_IMG}
                  alt="Founder's journey"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-primary)]/40 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="text-3xl font-bold text-white font-['Cormorant_Garamond',serif]">Est. 1990</p>
                  <p className="text-sm text-white/80">Pune, Maharashtra</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="overline mb-3">Our Legacy</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight mb-6">
                Founder's Story
              </h2>
              <div className="space-y-4 text-[var(--brand-text-muted)] text-sm sm:text-base leading-relaxed">
                <p>
                  Every great journey begins with a vision. Our story began 35 years ago, when our founder set out
                  with a simple yet powerful idea — to help people discover the world in a way that is seamless,
                  meaningful, and unforgettable.
                </p>
                <p>
                  What started as a small travel initiative, built on dedication and personal relationships,
                  gradually evolved into a respected name in the travel industry.
                </p>
                <p>
                  In the early years, the founder personally guided travelers, carefully planning every itinerary
                  and ensuring that each journey was comfortable, safe, and memorable.
                </p>
                <p>
                  With a deep belief that travel is not just about destinations but about experiences, cultures,
                  and human connections, the company grew steadily through commitment and customer satisfaction.
                </p>
                <p className="font-medium text-[var(--brand-text)]">
                  Today, after three and a half decades, the founder's original vision continues to guide
                  everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Travel With Us */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="about-why-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="overline mb-3">Our Promise</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight">
              Why Travel With Holiday Emporium
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" data-testid="about-value-props">
            {VALUE_PROPS.map((prop) => (
              <div
                key={prop.title}
                className="relative bg-white rounded-lg border border-[var(--brand-border)] p-6 sm:p-8 text-center card-lift group"
                data-testid={`about-value-${prop.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] rounded-t-lg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <div className="text-4xl sm:text-5xl font-bold text-[var(--brand-primary)] font-['Cormorant_Garamond',serif] mb-2">
                  {prop.number}
                </div>
                <h3 className="text-lg font-medium text-[var(--brand-text)] font-['Cormorant_Garamond',serif] mb-3">
                  {prop.title}
                </h3>
                <p className="text-sm text-[var(--brand-text-muted)]">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Strip */}
      <section className="py-10 sm:py-14 bg-white border-y border-[var(--brand-border)]" data-testid="about-contact-info">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {CONTACT_INFO.map((item) => {
              const Wrapper = item.href ? 'a' : 'div';
              const wrapperProps = item.href ? { href: item.href } : {};
              return (
                <Wrapper
                  key={item.label}
                  {...wrapperProps}
                  className="text-center group cursor-pointer"
                  data-testid={`about-contact-${item.label.toLowerCase()}`}
                >
                  <div className="w-14 h-14 rounded-full bg-[var(--brand-muted-bg)] flex items-center justify-center mx-auto mb-3 group-hover:bg-[var(--brand-primary)] transition-colors">
                    <item.icon className="w-6 h-6 text-[var(--brand-primary)] group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text-muted)] mb-1">{item.label}</p>
                  <p className="text-sm text-[var(--brand-text)] font-medium">{item.value}</p>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="about-cta-banner">
        <div className="absolute inset-0">
          <img src={CTA_BG} alt="Travel with us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[var(--brand-primary)]/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight font-['Cormorant_Garamond',serif] mb-3">
            We'd Love to Hear From You
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-8">
            Share your travel dreams with us — let's make them a reality.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3.5 bg-white text-[var(--brand-primary)] font-semibold rounded-full text-sm hover:bg-stone-100 transition-colors inline-flex items-center gap-2"
            data-testid="about-cta-explore"
          >
            Explore Tours <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 sm:py-20 lg:py-24 bg-[var(--brand-bg)]" data-testid="about-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="overline mb-3">Common Questions</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--brand-text)] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3" data-testid="about-faq-accordion">
            {FAQS.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="bg-white rounded-lg border border-[var(--brand-border)] px-5 overflow-hidden"
              >
                <AccordionTrigger
                  className="text-sm sm:text-base font-semibold text-[var(--brand-text)] hover:no-underline py-4 text-left"
                  data-testid={`about-faq-q-${idx}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--brand-text-muted)] pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
