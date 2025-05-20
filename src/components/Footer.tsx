
import { Button } from '@/components/ui/button';
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
        { name: "Contact", href: "#contact" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "School Website", href: "#" },
        { name: "Student Council", href: "#" },
        { name: "School Calendar", href: "#" },
        { name: "Code of Conduct", href: "#" },
      ]
    },
    {
      title: "Follow Us",
      links: [
        { name: "Instagram", href: "#" },
        { name: "Twitter", href: "#" },
        { name: "Facebook", href: "#" },
        { name: "TikTok", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-party-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <a href="#" className="text-white font-display font-bold text-2xl">
              School<span className="text-party-purple">Party</span>
            </a>
            <p className="mt-4 text-gray-400 max-w-xs">
              Join us for an unforgettable summer night of music, dancing, and memories that will last a lifetime.
            </p>
            <div className="mt-6">
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-party-purple" />
                <span>schoolparty@example.com</span>
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
            
            <div>
              <h3 className="font-bold text-lg mb-4">Subscribe</h3>
              <p className="text-gray-400 mb-4">Stay updated with the latest party news and updates.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 bg-white/10 rounded-l-md focus:outline-none focus:ring-2 focus:ring-party-purple flex-grow"
                />
                <Button className="bg-party-purple hover:bg-party-blue rounded-r-md rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left">
            © {currentYear} School Party. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-party-purple">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-party-purple">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-party-purple">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
