
import { PartyPopper, Music, Users } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <PartyPopper size={40} className="text-party-purple mb-4" />,
      title: "Unforgettable Experience",
      description: "A night filled with amazing performances, activities, and surprises that will create lasting memories."
    },
    {
      icon: <Music size={40} className="text-party-purple mb-4" />,
      title: "Live Music & DJ",
      description: "Dance the night away with our professional DJ and live performances from talented student bands."
    },
    {
      icon: <Users size={40} className="text-party-purple mb-4" />,
      title: "Connect & Celebrate",
      description: "An opportunity to connect with friends, meet new people, and celebrate the end of the academic year."
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-party-light-purple">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About the Party</h2>
          <div className="w-24 h-1 bg-party-purple mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-party-dark/80">
            The annual school party is back and bigger than ever! This year, we're transforming our school into the ultimate summer night paradise for an evening you won't forget.
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
          <h3 className="text-2xl font-bold mb-4 text-center text-party-dark">What to Expect</h3>
          <p className="text-party-gray mb-6">
            Our Summer Night School Party is the perfect way to celebrate the end of the academic year. This year's theme embraces the magic of summer nights with:
          </p>
          <ul className="space-y-2 text-party-gray">
            <li className="flex items-start">
              <span className="text-party-purple mr-2">✓</span>
              <span>Professionally decorated venue with summer night theme</span>
            </li>
            <li className="flex items-start">
              <span className="text-party-purple mr-2">✓</span>
              <span>Photo booth with props and professional photography</span>
            </li>
            <li className="flex items-start">
              <span className="text-party-purple mr-2">✓</span>
              <span>Delicious food and refreshments throughout the evening</span>
            </li>
            <li className="flex items-start">
              <span className="text-party-purple mr-2">✓</span>
              <span>Games, activities and entertainment for everyone</span>
            </li>
            <li className="flex items-start">
              <span className="text-party-purple mr-2">✓</span>
              <span>Special performances from talented students and professional artists</span>
            </li>
            <li className="flex items-start">
              <span className="text-party-purple mr-2">✓</span>
              <span>End-of-year awards and recognition ceremony</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
