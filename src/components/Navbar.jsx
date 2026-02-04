import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import consulateLogo from "../assets/consulateLogo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Consultations", href: "#consultations" },
    { name: "Candidates", href: "#candidates" },
    { name: "Clients", href: "#clients" },
    { name: "Jobs", href: "#jobs" },
  ];

  const serviceItems = [
    { name: "CLIENT SUPPORT", href: "#client-support" },
    { name: "PERMANENT RECRUITMENT", href: "#permanent-recruitment" },
    { name: "TEMPORARY RECRUITMENT", href: "#temporary-recruitment" },
    { name: "CLEANING SERVICES", href: "#cleaning-services" },
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
    }, 300); // 300ms delay before closing
    setDropdownTimeout(timeout);
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
    <header className="w-full bg-azure shadow-lg fixed top-0 z-50 h-24">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative">
        
        {/* LEFT — LOGO */}
        <div className="flex-shrink-0">
          <img src={consulateLogo} alt="Consulate Recruitment" className="h-20" />
        </div>

        {/* CENTER — NAV LINKS */}
        <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 text-sm font-medium text-white">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-footer transition">
              {link.name}
            </a>
          ))}
          
          {/* Services Dropdown */}
          <div 
            className="relative services-dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="flex items-center space-x-1 hover:text-footer transition"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              <span>Services</span>
              <ChevronDown size={16} className={`transform transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {servicesOpen && (
              <div 
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-max bg-white rounded-md shadow-lg py-3 px-6 z-50 border border-gray-200"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="grid grid-cols-1 gap-1">
                  {serviceItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-azure transition rounded-md whitespace-nowrap text-center"
                      onClick={() => setServicesOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* RIGHT — ACTIONS */}
        <div className="hidden lg:flex items-center space-x-4">
          <a href="#contact" className="text-sm font-medium text-white hover:text-footer">
            Contact
          </a>

          <a
            href="/timesheets"
            className="bg-footer text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-footer/90 transition"
          >
            Timesheets
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-white ml-auto"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-6 py-6 space-y-4 text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block hover:text-footer"
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Services Dropdown */}
            <div>
              <button 
                className="flex items-center justify-between w-full hover:text-footer transition"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>Services</span>
                <ChevronDown size={16} className={`transform transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {servicesOpen && (
                <div className="mt-2 ml-4 space-y-1">
                  {serviceItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block text-gray-600 hover:text-azure transition font-medium whitespace-nowrap py-1"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#contact" onClick={() => setOpen(false)} className="block hover:text-azureSoft">
              Contact
            </a>

            <a
              href="/timesheets"
              className="block text-center bg-footer text-white py-3 rounded-md font-semibold"
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
