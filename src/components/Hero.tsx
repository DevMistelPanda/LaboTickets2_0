
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-party-dark/80 to-party-purple/50 z-10"></div>
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            Summer Night
            <span className="block text-party-purple text-shadow">School Party 2025</span>
          </h1>
          
          {/* Countdown Timer placed here, below the slogan */}
          <div className="mb-8 bg-black/30 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm font-medium mb-2">Countdown to the Party:</p>
            <div className="flex justify-center items-center space-x-4 sm:space-x-8">
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-bold" id="days">0</span>
                <span className="text-xs uppercase tracking-wide opacity-80">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-bold" id="hours">0</span>
                <span className="text-xs uppercase tracking-wide opacity-80">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-bold" id="minutes">0</span>
                <span className="text-xs uppercase tracking-wide opacity-80">Minutes</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-bold" id="seconds">0</span>
                <span className="text-xs uppercase tracking-wide opacity-80">Seconds</span>
              </div>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Join us for an unforgettable night of music, dance, and memories that will last a lifetime.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <div className="flex items-center">
              <Calendar className="mr-2 text-party-purple" size={24} />
              <span className="text-lg">June 15, 2025</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 text-party-purple" size={24} />
              <span className="text-lg">7:00 PM - 12:00 AM</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-party-purple hover:bg-party-blue text-white rounded-full px-8 py-6 text-lg font-semibold transition-colors duration-300">
              <a href="#rsvp" className="w-full h-full flex items-center justify-center">RSVP Now</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/20 rounded-full px-8 py-6 text-lg font-semibold transition-colors duration-300"
            >
              <a href="#details" className="w-full h-full flex items-center justify-center">Event Details</a>
            </Button>
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
