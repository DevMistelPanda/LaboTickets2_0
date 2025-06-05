
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
      time: "16:30 Uhr",
      title: "Begrüßung der ersten Gäste",
      description: "Kurze Ansprache durch die Organisatoren und Vorstellung des Programms."
    },
    {
      time: "bis 20:00 Uhr",
      title: "Ende für 5. -8. KLassen",
      description: "Aus Rechtlichen Gründen müssen die jüngeren Schüler um 20:00 Uhr den Ball verlassen."
    },
    {
      time: "22:00 Uhr",
      title: "Ende Des Balls",
      description: "Der Ball endet offiziell."
    },
    {
      time: "nach 22 Uhr",
      title: "Gemeinsames Aufräumen",
      description: "Alle Helfer und Organisatoren packen mit an, um den Veranstaltungsort sauber zu hinterlassen. Wir freuen uns über jede helfende Hand!"
    }
  ];
  
  const performers = [
    {
      name: "Unsere Live Band",
      role: "TBA",
      image: "TBA",
      description: "Unsere Live Band wird den Abend mit toller Musik begleiten. Details folgen bald!"
    },
    {
      name: "DJ",
      role: "DJ",
      image: "TBA",
      description: "Our school's talented rock band playing their original songs and covers."
    },
    {
      name: "Schulball Playlist 2024",
      role: <a href="https://open.spotify.com/playlist/5gLhpUbpP8fuMhHPQCI4XI?si=583efdb5e17942b2"> Klicke hier</a>,
      image: "https://developer.spotify.com/images/guidelines/design/using-our-logo.svg",
      description: <a href="https://open.spotify.com/playlist/5gLhpUbpP8fuMhHPQCI4XI?si=583efdb5e17942b2" className="text-gray-400 hover:text-party-purple">
      Bekommt mit der Schulball Playlist 2024 einen Vorgeschmack auf die Musik, die euch erwartet!
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
            A carefully planned evening to ensure everyone has a fantastic time. Here's what to expect.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white p-1 rounded-full shadow-md">
            <Button
              className={`rounded-full px-6 ${activeTab === 'schedule' ? 'bg-party-purple text-white' : 'bg-transparent text-party-dark hover:bg-gray-100'}`}
              onClick={() => setActiveTab('schedule')}
            >
              Programm
            </Button>
            <Button
              className={`rounded-full px-6 ${activeTab === 'performers' ? 'bg-party-purple text-white' : 'bg-transparent text-party-dark hover:bg-gray-100'}`}
              onClick={() => setActiveTab('performers')}
            >
              Unsere Musik
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
          <div className="grid md:grid-cols-3 gap-8">
            {performers.map((performer, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <img 
                  src={performer.image} 
                  alt={performer.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm font-medium text-party-purple mb-1">{performer.role}</div>
                  <h3 className="text-xl font-bold text-party-dark mb-2">{performer.name}</h3>
                  <p className="text-party-gray">{performer.description}</p>
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
