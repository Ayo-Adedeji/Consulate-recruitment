import { useState } from "react";
import { Menu, X } from "lucide-react";
import consulateLogo from "../assets/consulateLogo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Consultations", href: "#consultations" },
    { name: "Candidates", href: "#candidates" },
    { name: "Clients", href: "#clients" },
    { name: "Jobs", href: "#jobs" },
  ];

  return (
    <header className="w-full bg-white shadow-lg fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-3 items-center">
        
        {/* LEFT — LOGO */}
        <div className="flex justify-start">
          <img
            src={consulateLogo}
            alt="Consulate Recruitment"
            className="h-24"
          />
        </div>

        {/* CENTER — NAV LINKS */}
        <nav className="hidden lg:flex justify-center space-x-8 text- font-medium text-gray-700">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-footer transition"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* RIGHT — ACTIONS */}
        <div className="hidden lg:flex justify-end items-center space-x-4">
          <a
            href="#contact"
            className="text-sm font-medium text-gray-700 hover:text-footer"
          >
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
          className="lg:hidden col-span-2 justify-self-end text-gray-700"
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

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block hover:text-footer"
            >
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
