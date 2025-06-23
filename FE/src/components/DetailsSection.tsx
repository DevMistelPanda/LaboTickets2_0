import { useEffect, useRef } from 'react';
import { MapPin, Calendar, Clock, Users, Euro, Ticket } from 'lucide-react';

const DetailsSection = () => {
  const pinterestRef = useRef<HTMLDivElement>(null);

  const details = [
    {
      icon: <Calendar size={28} className="text-party-purple" />,
      title: "Datum",
      info: "Freitag, Juli 25, 2025"
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

  useEffect(() => {
    const scriptId = "pinterest-script";

    // Load Pinterest script if not already present
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.pinterest.com/js/pinit.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else {
      // If script already loaded, re-render widgets
      // @ts-ignore
      if (window.PinUtils) window.PinUtils.build();
    }
  }, []);

  return (
    <section id="details" className="py-16 md:py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Details</h2>
          <div className="w-24 h-1 bg-party-purple mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-party-dark/80">
            Alles, was es zu wissen gibt zum Schulball 2025. <br />
            Außerdem ein paar inspirierende Bilder von venezianischen Masken.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Event Info */}
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

          {/* Image replacing Pinterest Embed */}
          <div className="rounded-xl overflow-hidden shadow-md h-[450px] flex items-center justify-center bg-white">
            <img
              src="/images/Inspo2025.png"
              alt="Venezianische Masken Inspiration 2025"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
