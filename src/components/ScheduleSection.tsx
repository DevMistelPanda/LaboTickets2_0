
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const ScheduleSection = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  
  const scheduleItems = [
    {
      time: "7:00 PM - 7:30 PM",
      title: "Doors Open & Welcome Reception",
      description: "Arrive, get your welcome pack, and enjoy welcome drinks."
    },
    {
      time: "7:30 PM - 8:00 PM",
      title: "Opening Ceremony",
      description: "Welcome speech by the principal and student council president."
    },
    {
      time: "8:00 PM - 9:30 PM",
      title: "Dinner & Social Time",
      description: "Enjoy a delicious buffet dinner while socializing with friends."
    },
    {
      time: "9:30 PM - 10:00 PM",
      title: "Special Performances",
      description: "Performances by the school band, dance team, and choir."
    },
    {
      time: "10:00 PM - 11:30 PM",
      title: "Main Party",
      description: "DJ takes over with dance music and special party games."
    },
    {
      time: "11:30 PM - 12:00 AM",
      title: "Closing Surprise & Farewell",
      description: "Special closing ceremony with a surprise announcement."
    }
  ];
  
  const performers = [
    {
      name: "DJ Groove Master",
      role: "Main DJ",
      image: "https://images.unsplash.com/photo-1506252374453-ef5237291d83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      description: "Professional DJ who will keep the dance floor packed all night long."
    },
    {
      name: "The Wildcats",
      role: "School Band",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      description: "Our school's talented rock band playing their original songs and covers."
    },
    {
      name: "Dance Fusion",
      role: "Dance Crew",
      image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      description: "Award-winning dance crew that will showcase amazing choreography."
    }
  ];

  return (
    <section id="schedule" className="py-16 md:py-24 bg-party-light-blue">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Party Program</h2>
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
              Timeline
            </Button>
            <Button
              className={`rounded-full px-6 ${activeTab === 'performers' ? 'bg-party-purple text-white' : 'bg-transparent text-party-dark hover:bg-gray-100'}`}
              onClick={() => setActiveTab('performers')}
            >
              Performers
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
