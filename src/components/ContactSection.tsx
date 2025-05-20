
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    alert('Thank you for your message! We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  
  const contactInfo = [
    {
      icon: <Mail size={24} className="text-party-purple" />,
      title: "Email",
      details: "schoolparty@example.com",
      link: "mailto:schoolparty@example.com"
    },
    {
      icon: <Phone size={24} className="text-party-purple" />,
      title: "Phone",
      details: "(123) 456-7890",
      link: "tel:+11234567890"
    },
    {
      icon: <MapPin size={24} className="text-party-purple" />,
      title: "Address",
      details: "123 School Street, Cityville, ST 12345",
      link: "https://maps.google.com"
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-party-light-purple">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <div className="w-24 h-1 bg-party-purple mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-party-dark/80">
            Have questions or need more information about the party? We're here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <a 
              href={item.link} 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-party-light-purple mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-party-dark">{item.title}</h3>
              <p className="text-party-gray">{item.details}</p>
            </a>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-party-dark">Send us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-party-gray mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-party-purple"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-party-gray mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-party-purple"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-party-gray mb-1">
                      Subject
                    </label>
                    <select
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-party-purple"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Ticket Question">Ticket Question</option>
                      <option value="Sponsorship">Sponsorship</option>
                      <option value="Volunteering">Volunteering</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-party-gray mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-party-purple"
                    ></textarea>
                  </div>
                  
                  <div>
                    <Button type="submit" className="w-full bg-party-purple hover:bg-party-blue text-white rounded-md py-2">
                      Send Message
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="bg-party-purple text-white p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-6">Event Committee</h3>
              <p className="mb-6">
                Our dedicated team of students and faculty have been working hard to organize this 
                unforgettable event. If you have any questions or feedback, please don't hesitate to reach out.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="font-bold mr-2">Event Chair:</span>
                  <span>Sarah Johnson</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">Faculty Advisor:</span>
                  <span>Mr. Robert Williams</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">Marketing Team:</span>
                  <span>Alex Chen & Maya Patel</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">Entertainment:</span>
                  <span>Daniel Kim</span>
                </li>
              </ul>
              <div className="mt-8">
                <p className="text-sm opacity-80">
                  Office Hours: Monday to Friday, 3:00 PM - 4:30 PM, Room 203
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
