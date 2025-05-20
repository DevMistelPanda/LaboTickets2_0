
import { useEffect } from 'react';
import Header from '@/components/Header';
import CountdownTimer from '@/components/CountdownTimer';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import DetailsSection from '@/components/DetailsSection';
import ScheduleSection from '@/components/ScheduleSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = 'School Party 2025';
    
    // Scroll to the top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <CountdownTimer />
      <Hero />
      <AboutSection />
      <DetailsSection />
      <ScheduleSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
