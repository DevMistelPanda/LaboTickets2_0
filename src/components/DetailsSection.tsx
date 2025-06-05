
import { MapPin, Calendar, Clock, Users, Euro, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DetailsSection = () => {
  const details = [
    {
      icon: <Calendar size={28} className="text-party-purple" />,
      title: "Datum",
      info: "Samstag, Juli 15, 2025"
    },
    {
      icon: <Clock size={28} className="text-party-purple" />,
      title: "Zeiten",
      info: "16:00 Uhr - 22:00 Uhr"
    },
    {
      icon: <MapPin size={28} className="text-party-purple" />,
      title: "Ort",
      info: "In unserem Schulhof"
    },
    {
      icon: <Users size={28} className="text-party-purple" />,
      title: "Dress Code",
      info: "Masken im venezianischen Stil"
    },
    {
      icon: <Euro size={28} className="text-party-purple" />,
      title: "Eintritt",
      info: "Der Eintritt wird noch bekannt gegeben"
    },
    {
      icon: <Ticket size={28} className="text-party-purple" />,
      title: "Tickets",
      info: "Tickets könnt ihr nach den Pfingstferien in den Pausen erwerben, oder an der Abendkasse kaufen."
    }
  ];

  return (
    <section id="details" className="py-16 md:py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Details</h2>
          <div className="w-24 h-1 bg-party-purple mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-party-dark/80">
            Alles was es zu wissen gibt zum Schulball 2025
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5186.574405136288!2d11.082098812366588!3d49.460187758048825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479f57bbc4f14e41%3A0xf3b84176aa35f091!2sLabenwolf-Gymnasium%20N%C3%BCrnberg!5e0!3m2!1sde!2sde!4v1749117811019!5m2!1sde!2sde" 
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
      </div>
    </section>
  );
};

export default DetailsSection;
