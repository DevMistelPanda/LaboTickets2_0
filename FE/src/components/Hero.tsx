import { Calendar, Clock } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background with animated rainbow overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 opacity-40 animate-rainbow z-10"></div>
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('')" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            Schul Ball 2026
            <span className="block text-party-purple text-shadow">Ein weiteres Jahr Labenwolf</span>
          </h1>
          
          {/* Countdown Timer using the component */}
          <div className="mb-8 bg-black/30 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm font-medium mb-2">Zeit bis zum Ball:</p>
            <CountdownTimer targetDate="2026-07-10T16:00:00" />
          </div>

          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Sei mit dabei, ein weiteres Jahr am Labenwolf-Gymnasium zu feiern!
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <div className="flex items-center">
              <Calendar className="mr-2 text-party-purple" size={24} />
              <span className="text-lg">10. Juli 2026</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 text-party-purple" size={24} />
              <span className="text-lg">Ab 16:00 Uhr</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 13L12 18L17 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 7L12 12L17 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
