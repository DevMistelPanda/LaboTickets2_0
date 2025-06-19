
import { PartyPopper, Music, Users } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <PartyPopper size={40} className="text-party-purple mb-4" />,
      title: "Unvergessliches Erlebnis",
      description: "Eine Nacht voller Spaß, Musik und unvergesslicher Erinnerungen, die du nicht verpassen solltest!"
    },
    {
      icon: <Music size={40} className="text-party-purple mb-4" />,
      title: "Gute Musik und eure Wünsche",
      description: "Genießt die besten Hits und bringt eure Musikwünsche mit, um die Tanzfläche zum Beben zu bringen!"
    },
    {
      icon: <Users size={40} className="text-party-purple mb-4" />,
      title: "Feiert gemeinsam mit Freunden",
      description: "Treffe alte Freunde und knüpfe neue Bekanntschaften bei der besten Schulparty des Jahres!"
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-party-light-purple">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Infos zum Ball</h2>
          <div className="w-24 h-1 bg-party-purple mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-party-dark/80">
            Auch dieses Jahr ist es wieder soweit: Der Schulball steht vor der Tür! Wir freuen uns darauf, mit euch eine unvergesslichen Abend voller Musik, Tanz und guter Laune zu verbringen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-party-dark">{feature.title}</h3>
              <p className="text-party-gray">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-center text-party-dark">Was erwartet euch</h3>
          <p className="text-party-gray mb-6">
                Unsere Schulball ist der perfekte Weg, um das Ende des Schuljahres zu feiern. Mit dabei sind:
                </p>
                <ul className="space-y-2 text-party-gray">
                <li className="flex items-start">
                  <span className="text-party-purple mr-2">✓</span>
                  <span>Ein professionell dekorierter Veranstaltungsort</span>
                </li>
                <li className="flex items-start">
                  <span className="text-party-purple mr-2">✓</span>
                  <span>Fotowand mit Requisiten für die Perfekten Erinnerungen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-party-purple mr-2">✓</span>
                  <span>Erfrischungsgetränke werden über den ganzen Abend verkauft</span>
                </li>
                <li className="flex items-start">
                  <span className="text-party-purple mr-2">✓</span>
                  <span>Ruhiger Bereich zum reden abseits der lauten Musik</span>
                </li>
                <li className="flex items-start">
                  <span className="text-party-purple mr-2">✓</span>
                  <span>Musikwünsche sind immer Wilkommen</span>
                </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
