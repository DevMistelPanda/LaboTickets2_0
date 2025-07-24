import { Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "About", href: "#about" },
        { name: "Details", href: "#details" },
        { name: "Schedule", href: "#schedule" },
        { name: "FAQ", href: "#faq" },
      ]
    },
    {
      title: "Folgt unserer Schule",
      links: [
        { name: "Instagram", href: "https://www.instagram.com/_labenwolf/" },
        { name: "Webseite", href: "https://www.labenwolf.de" },
      ]
    }
  ];

  return (
    <footer className="bg-party-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <a href="#" className="text-white font-display font-bold text-2xl">
              Labo Ball<span className="text-party-purple">25</span>
            </a>
            <p className="mt-4 text-gray-400 max-w-xs">
              Seit dabei und feiere mit uns ein weiteres Jahr Labenwolf!
            </p>
            <div className="mt-6">
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-party-purple" />
                <span>info@winaudio.de</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:col-span-1 lg:col-span-2">
            {footerLinks.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="font-bold text-lg mb-4">{group.title}</h3>
                <ul className="space-y-2">
                  {group.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href} 
                        className="text-gray-400 hover:text-party-purple transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left">
            © {currentYear}{" "}
            <a
              href="https://winaudio.de"
              className="underline hover:text-party-purple transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              WinAudio
            </a>
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a
              href="https://winaudio.de/impressum"
              className="text-gray-400 hover:text-party-purple"
              target="_blank"
              rel="noopener noreferrer"
            >
              Impressum & Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
