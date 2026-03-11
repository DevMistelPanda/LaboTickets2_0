import { useState } from 'react';
import { Button } from '@/components/ui/button';

const ScheduleSection = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  
  const scheduleItems = [
    {
      time: "16:00 Uhr",
      title: "Es geht los!",
      description: "Einlass beginnt, die ersten Gäste treffen ein. Unser Team begrüßt euch herzlich."
    },
    {
      time: "TBA",
      title: "In Planung...",
      description: "Unsere Planungen für den Abend sind noch nicht ganz abgeschlossen, aber seid gespannt auf tolle Überraschungen!"
    }
  ];
  
  const highlights = [
    {
      name: "AK Licht & Ton",
      role: "DJ",
      image: "https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg",
      description: "Unser AK Licht & Ton wird den Abend mit einem DJ begleiten, der für die richtige Stimmung sorgt."
    },
        {
      name: "Überraschung",
      role: "In Planung",
      image: "https://st3.depositphotos.com/2777531/12741/v/450/depositphotos_127410624-stock-illustration-surprise-inscription-with-sunrays.jpg",
      description: "Wir haben noch ein paar Überraschungen für euch geplant, die wir hier aber noch nicht verraten wollen. Seid gespannt!"
      
    },
    {
      name: "Schulball Playlist 2025",
      role: <a href="https://open.spotify.com/playlist/5gLhpUbpP8fuMhHPQCI4XI?si=583efdb5e17942b2"> Klicke hier</a>,
      image: "https://developer.spotify.com/images/guidelines/design/using-our-logo.svg",
      description: <a href="https://open.spotify.com/playlist/5gLhpUbpP8fuMhHPQCI4XI?si=583efdb5e17942b2" className="text-gray-400 hover:text-party-purple">
      Bekommt mit der Schulball Playlist 2025 einen Vorgeschmack auf die Musik, die euch erwartet!
      </a>
    }

  ];

  return (
    <section id="schedule" className="py-16 md:py-24 bg-party-light-blue">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Party Programm</h2>
          <div className="w-24 h-1 bg-party-purple mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-party-dark/80">
           Auch wenn wir noch mitten in der Planung stecken, können wir euch schon jetzt versprechen, dass es ein unvergesslicher Abend wird! Hier bekommt ihr einen kleinen Vorgeschmack auf das, was euch erwartet.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white p-1 rounded-full shadow-md">
            <Button
              className={`rounded-full px-6 ${activeTab === 'schedule' ? 'bg-party-purple text-white' : 'bg-transparent text-party-dark hover:bg-gray-100'}`}
              onClick={() => setActiveTab('schedule')}
            >
              Ablauf
            </Button>
            <Button
              className={`rounded-full px-6 ${activeTab === 'hightlights' ? 'bg-party-purple text-white' : 'bg-transparent text-party-dark hover:bg-gray-100'}`}
              onClick={() => setActiveTab('hightlights')}
            >
              Hightlights
            </Button>
          </div>
        </div>

        {activeTab === 'schedule' ? (
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="relative">
              {scheduleItems.map((item, index) => (
                <div key={index} className="mb-8 last:mb-0 relative pl-8 md:pl-0">
                  {/* Timeline for medium screens and up */}
                  <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-party-light-purple -translate-x-1/2 top-0 z-0"></div>
                  {index < scheduleItems.length - 1 && (
                    <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-party-purple -translate-x-1/2 top-8 z-0" 
                         style={{ height: 'calc(100% - 4rem)' }}></div>
                  )}
                  
                  {/* Timeline for mobile */}
                  <div className="md:hidden absolute left-0 h-full w-0.5 bg-party-light-purple top-0 z-0"></div>
                  {index < scheduleItems.length - 1 && (
                    <div className="md:hidden absolute left-0 h-full w-0.5 bg-party-purple top-8 z-0" 
                         style={{ height: 'calc(100% - 4rem)' }}></div>
                  )}
                  
                  <div className="md:grid md:grid-cols-5 md:gap-8 items-start relative z-10">
                    <div className="md:text-right mb-2 md:mb-0">
                      <span className="inline-block bg-party-purple text-white py-1 px-3 rounded-full text-sm font-medium">
                        {item.time}
                      </span>
                    </div>
                    
                    <div className="absolute md:static left-0 top-0 transform -translate-x-1/2 md:translate-x-0 md:flex md:justify-center">
                      <div className="w-4 h-4 rounded-full bg-white border-4 border-party-purple"></div>
                    </div>
                    
                    <div className="md:col-span-3">
                      <h3 className="text-xl font-bold text-party-dark mb-2">{item.title}</h3>
                      <p className="text-party-gray">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <img 
                  src={highlight.image} 
                  alt={highlight.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm font-medium text-party-purple mb-1">{highlight.role}</div>
                  <h3 className="text-xl font-bold text-party-dark mb-2">{highlight.name}</h3>
                  <p className="text-party-gray">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ScheduleSection;
