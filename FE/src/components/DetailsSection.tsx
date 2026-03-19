import { useEffect, useRef } from 'react';
import { MapPin, Calendar, Clock, Users, Ticket, Sandwich } from 'lucide-react';

const DetailsSection = () => {
  const pinterestRef = useRef<HTMLDivElement>(null);

  const details = [
    {
      icon: <Calendar size={28} className="text-party-purple" />,
      title: "Datum",
      info: "Freitag, Juli 10, 2026"
    },
    {
      icon: <Clock size={28} className="text-party-purple" />,
      title: "Zeiten",
      info: "Ab 16:00"
    },
    {
      icon: <MapPin size={28} className="text-party-purple" />,
      title: "Ort",
      info: "In unserem Schulhof"
    },
    {
      icon: <Users size={28} className="text-party-purple" />,
      title: "Dress Code",
      info: "Lasst eurer Kreativität freien Lauf, aber denkt daran: Angemessen ist ein Muss!"
    },
    {
      icon: <Sandwich size={28} className="text-party-purple" />,
      title: "Snacks & Getränke",
      info: "Auch dieses Jahr gibt es wieder eine Auswahl an Getränken und Brezeln"
    },
    {
      icon: <Ticket size={28} className="text-party-purple" />,
      title: "Tickets & Preise",
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
            Alles, was es zu wissen gibt zum Schulball 2025.
          </p>
        </div>
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
        </div>
    </section>
  );
};

export default DetailsSection;
