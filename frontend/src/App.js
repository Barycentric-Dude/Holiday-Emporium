import "@/App.css";
import PromoBanner from "./components/PromoBanner";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TourCategories from "./components/TourCategories";
import FeaturedPackages from "./components/FeaturedPackages";
import ExploreAsia from "./components/ExploreAsia";
import TrustIndicators from "./components/TrustIndicators";
import CompanyStory from "./components/CompanyStory";
import LeadForm from "./components/LeadForm";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import StickyCTA from "./components/StickyCTA";

function App() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <PromoBanner />
      <Navbar />
      <HeroSection />
      <TourCategories />
      <FeaturedPackages />
      <ExploreAsia />
      <TrustIndicators />
      <CompanyStory />
      <LeadForm />
      <Footer />
      <WhatsAppButton />
      <StickyCTA />
    </div>
  );
}

export default App;
