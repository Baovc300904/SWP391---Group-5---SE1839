import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import BloodTypesSection from './sections/BloodTypesSection';
import ProcessTimelineSection from './sections/ProcessTimelineSection';
import BenefitsSection from './sections/BenefitsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ServicesSection from './sections/ServicesSection';
import CallToActionSection from './sections/CallToActionSection';

const Home = () => {
  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <HeroSection />
      <FeaturesSection />
      <BloodTypesSection />
      <ProcessTimelineSection />
      <BenefitsSection />
      <TestimonialsSection />
      <ServicesSection />
      <CallToActionSection />
    </div>
  );
};

export default Home;
