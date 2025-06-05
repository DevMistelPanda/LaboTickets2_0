
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

          <div className="rounded-xl overflow-hidden shadow-md h-[450px]">
            <a data-pin-do="embedBoard" href="https://www.pinterest.com/08t5h67rdqdlfcq/beautiful-nature/" data-pin-scale-width="120" data-pin-scale-height="400" data-pin-board-width="600" ></a><script async type="text/javascript" src="https://assets.pinterest.com/js/pinit.js"></script>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
