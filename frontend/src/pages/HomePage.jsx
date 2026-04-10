import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PromoBanner from "../components/PromoBanner";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TourCategories from "../components/TourCategories";
import FeaturedPackages from "../components/FeaturedPackages";
import ExploreAsia from "../components/ExploreAsia";
import TrustIndicators from "../components/TrustIndicators";
import CompanyStory from "../components/CompanyStory";
import LeadForm from "../components/LeadForm";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import StickyCTA from "../components/StickyCTA";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.hash]);

  return (
    <>
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
    </>
  );
}
