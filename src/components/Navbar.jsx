import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import consulateLogo from "../assets/consulateLogo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [currentPath, setCurrentPath] = useState('');

  // Get current path for active link highlighting
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const navLinks = [
    { name: "About Us", href: "/about" },
    { name: "Consultations", href: "/consultations" },
    { name: "Candidates", href: "/candidates" },
    { name: "Clients", href: "/clients" },
    { name: "Jobs", href: "/jobs" },
  ];

  const serviceItems = [
    { name: "CLIENT SUPPORT", href: "/client-support" },
    { name: "PERMANENT RECRUITMENT", href: "/permanent-recruitment" },
    { name: "TEMPORARY RECRUITMENT", href: "/temporary-recruitment" },
    { name: "CLEANING SERVICES", href: "/cleaning-services" },
  ];

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setServicesOpen(false);
    }, 300);
    setDropdownTimeout(timeout);
  };

  // Check if link is active
  const isActiveLink = (href) => {
    if (href === '/' && currentPath === '/') return true;
    if (href !== '/' && currentPath.startsWith(href)) return true;
    return false;
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesOpen && !event.target.closest('.services-dropdown')) {
        setServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [servicesOpen]);

  return (
    <header className="w-full bg-gradient-to-r from-azure via-azureSoft to-primary shadow-2xl fixed top-0 z-50 h-24 backdrop-blur-sm">
      {/* Subtle top border for extra elegance */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-white to-accent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative">
        
        {/* LEFT — LOGO */}
        <div className="flex-shrink-0">
          <a href="/" className="block group">
            <img 
              src={consulateLogo} 
              alt="Consulate Recruitment" 
              className="h-20 group-hover:scale-105 transition-all duration-300 drop-shadow-lg" 
            />
          </a>
        </div>

        {/* CENTER — NAV LINKS */}
        <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
          <div className="bg-white/95 backdrop-blur-lg rounded-full shadow-lg border-2 border-azure/30 shadow-azure/20 px-6 py-1">
            <div className="flex items-center gap-4 text-sm font-semibold">
              {/* Home Link */}
              <a 
                href="/" 
                className={`py-2 transition-all duration-300 relative ${
                  isActiveLink('/') 
                    ? 'text-azure' 
                    : 'text-azure/80 hover:text-azure'
                }`}
              >
                Home
                {isActiveLink('/') && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
                )}
              </a>
              
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`py-2 transition-all duration-300 relative ${
                    isActiveLink(link.href) 
                      ? 'text-azure' 
                      : 'text-azure/80 hover:text-azure'
                  }`}
                >
                  {link.name}
                  {isActiveLink(link.href) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
                  )}
                </a>
              ))}
              
              {/* Services Dropdown */}
              <div 
                className="relative services-dropdown"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className="flex items-center space-x-1 py-2 text-azure/80 hover:text-azure transition-all duration-300"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  <span>Services</span>
                  <ChevronDown size={16} className={`transform transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {servicesOpen && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 min-w-max bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl py-4 px-2 z-50 border border-azure/20"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="grid grid-cols-1 gap-1">
                      {serviceItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-6 py-3 text-sm font-semibold text-primary hover:bg-azure/10 hover:text-azure transition-all duration-300 rounded-xl whitespace-nowrap text-center"
                          onClick={() => setServicesOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* RIGHT — ACTIONS */}
        <div className="hidden lg:flex items-center gap-3">
          <a 
            href="/contact" 
            className={`py-2 transition-all duration-300 relative ${
              isActiveLink('/contact') 
                ? 'text-white' 
                : 'text-white/90 hover:text-white'
            }`}
          >
            Contact Us
            {isActiveLink('/contact') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/80 font-bold rounded-full"></div>
            )}
          </a>

          <a
            href="/timesheets"
            className="bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg border border-white/30"
          >
            Timesheets
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-white ml-auto p-2 rounded-full hover:bg-white/10 transition-all duration-300"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-white/20 shadow-2xl">
          <div className="px-6 py-6 space-y-3 text-sm font-semibold">
            {/* Mobile Home Link */}
            <a
              href="/"
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                isActiveLink('/') 
                  ? 'bg-azure/10 text-azure border border-azure/20' 
                  : 'text-primary hover:bg-azure/5 hover:text-azure'
              }`}
            >
              Home
            </a>
            
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActiveLink(link.href) 
                    ? 'bg-azure/10 text-azure border border-azure/20' 
                    : 'text-primary hover:bg-azure/5 hover:text-azure'
                }`}
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Services Dropdown */}
            <div>
              <button 
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-primary hover:bg-azure/5 hover:text-azure transition-all duration-300"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>Services</span>
                <ChevronDown size={16} className={`transform transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {servicesOpen && (
                <div className="mt-2 ml-4 space-y-2 bg-azure/5 rounded-xl p-3">
                  {serviceItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block text-azure/80 hover:text-azure transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-azure/10"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a 
              href="/contact" 
              onClick={() => setOpen(false)} 
              className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                isActiveLink('/contact') 
                  ? 'bg-azure/10 text-azure border border-azure/20' 
                  : 'text-primary hover:bg-azure/5 hover:text-azure'
              }`}
            >
              Contact Us
            </a>

            <a
              href="/timesheets"
              onClick={() => setOpen(false)}
              className="block text-center bg-gradient-to-r from-azure to-azureSoft text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Timesheets
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
