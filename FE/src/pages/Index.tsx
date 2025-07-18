import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import DetailsSection from '@/components/DetailsSection';
import ScheduleSection from '@/components/ScheduleSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';


const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = 'Schulball 2025 - Labenwolf Gymnasium';
    
    // Scroll to the top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <AboutSection />
      <DetailsSection />
      <ScheduleSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default Index;
