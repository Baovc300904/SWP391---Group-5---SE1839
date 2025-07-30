import React from 'react';
import HeroSection from './sections/HeroSection.jsx';
import FeaturesSection from './sections/FeaturesSection.jsx';
import BenefitsSection from './sections/BenefitsSection.jsx';
import BloodTypesSection from './sections/BloodTypesSection.jsx';
import CallToActionSection from './sections/CallToActionSection.jsx';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <BloodTypesSection />
      <CallToActionSection />
    </div>
  );
};

export default Home;
