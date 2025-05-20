
import { MapPin, Calendar, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DetailsSection = () => {
  const details = [
    {
      icon: <Calendar size={28} className="text-party-purple" />,
      title: "Date",
      info: "Saturday, June 15, 2025"
    },
    {
      icon: <Clock size={28} className="text-party-purple" />,
      title: "Time",
      info: "7:00 PM - 12:00 AM"
    },
    {
      icon: <MapPin size={28} className="text-party-purple" />,
      title: "Location",
      info: "School Main Hall & Garden"
    },
    {
      icon: <Users size={28} className="text-party-purple" />,
      title: "Dress Code",
      info: "Semi-formal / Summer Chic"
    }
  ];

  return (
    <section id="details" className="py-16 md:py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Details</h2>
          <div className="w-24 h-1 bg-party-purple mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-party-dark/80">
            Everything you need to know about the biggest school event of the year.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {details.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-party-light-purple p-3 rounded-full mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">{item.title}</h3>
                    <p className="text-party-gray">{item.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-md h-[350px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369674859906!3d40.71329937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007%2C%20USA!5e0!3m2!1sen!2sus!4v1652209323665!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Event Location"
            ></iframe>
          </div>
        </div>

        <div id="rsvp" className="bg-gradient-to-r from-party-purple to-party-blue p-8 md:p-12 rounded-xl text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Secure Your Spot!</h3>
          <p className="mb-8 max-w-2xl mx-auto">
            Tickets are limited and going fast! Reserve your place now to avoid disappointment. Early bird tickets available until May 15th.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h4 className="text-xl font-bold mb-2">Early Bird</h4>
              <p className="text-3xl font-bold mb-2">$15</p>
              <p className="text-sm mb-4">Until May 15th</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl transform scale-105 border-2 border-white">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-party-blue px-4 py-1 rounded-full text-sm font-bold">POPULAR</div>
              <h4 className="text-xl font-bold mb-2">Standard</h4>
              <p className="text-3xl font-bold mb-2">$20</p>
              <p className="text-sm mb-4">May 16th - June 10th</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h4 className="text-xl font-bold mb-2">Last Minute</h4>
              <p className="text-3xl font-bold mb-2">$25</p>
              <p className="text-sm mb-4">After June 10th</p>
            </div>
          </div>
          <Button size="lg" className="bg-white text-party-purple hover:bg-white/90 rounded-full px-8 py-6 text-lg font-semibold">
            Reserve Your Ticket
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
