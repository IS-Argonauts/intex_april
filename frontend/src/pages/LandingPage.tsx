import React from 'react';
import ContentCarousel from '../components/ContentCarousel/ContentCarousel';
import HeroSection from '../components/HeroSection/HeroSection';
import LandingNavbar from '../components/LandingNavbar/LandingNavbar';
import Footer from '../components/Footer/Footer';
import TabsSection from '../components/TabsSection/TabsSection';
import PricingSection from '../components/PricingSection/PricingSection';

const LandingPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      <LandingNavbar />

      <main className="flex-grow">
        <HeroSection />

        {/* Carousel section with tight bottom */}
        <div style={{ marginBottom: '0', paddingBottom: 0 }}>
          <ContentCarousel />
        </div>

        {/* Tabs with controlled top padding */}
        <TabsSection />

        {/* Pricing with clean bottom spacing */}
        <PricingSection />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
