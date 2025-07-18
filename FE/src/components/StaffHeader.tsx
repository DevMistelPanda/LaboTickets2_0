import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { toast } from 'sonner';

const StaffHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');// 🧹 Clear token
    localStorage.removeItem('username');// 🧹 Clear user
    localStorage.removeItem('role'); // 🧹 Clear role
    
    toast.success("Logged out successfully."); // Optional
    navigate('/login'); // Redirect
  };

  const navLinks = [
    { name: 'Ausgabe', href: './ausgabe' },
    { name: 'Scanning', href: './scanning' },
    { name: 'Staff Panel', href: './staff' },
    { name: 'Admin Panel', href: './admin' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className={`${isScrolled ? 'text-party-dark' : 'text-white'} font-display font-bold text-xl md:text-2xl}`}>
              Schul Ball<span className="text-party-purple">25</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`${isScrolled ? 'text-party-dark' : 'text-white'} hover:text-party-purple font-medium transition-colors`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              className="bg-party-purple hover:bg-party-blue text-white rounded-full px-6"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden ${isScrolled ? 'text-party-dark' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2 bg-white rounded-xl shadow-lg p-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-party-dark hover:text-party-purple font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button
              className="w-full bg-party-purple hover:bg-party-blue text-white rounded-full px-6 mt-4"
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
            >
              Logout
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default StaffHeader;
