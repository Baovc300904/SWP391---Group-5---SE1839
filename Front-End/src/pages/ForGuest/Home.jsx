import React from 'react';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import BenefitsSection from './sections/BenefitsSection';
import BloodTypesSection from './sections/BloodTypesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CallToActionSection from './sections/CallToActionSection';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <BloodTypesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
};

export default Home;
