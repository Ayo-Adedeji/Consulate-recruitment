import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaYoutube
} from "react-icons/fa";
import consulateLogo from "../assets/consulateLogo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Consultations", href: "/consultations" },
    { name: "Candidates", href: "/candidates" },
    { name: "Clients", href: "/clients" },
    { name: "Jobs", href: "/jobs" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, href: "https://www.facebook.com/consulaterecruitmentagency", color: "hover:bg-blue-600" },
    { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/consulaterecruitmentagency/?hl=en", color: "hover:bg-pink-600" },
    { name: "LinkedIn", icon: FaLinkedinIn, href: "https://www.linkedin.com/company/consulate-recruitment-agency/?viewAsMember=true", color: "hover:bg-blue-700" },
    { name: "YouTube", icon: FaYoutube, href: "https://www.youtube.com/watch?v=RhV8N4PQwgk", color: "hover:bg-red-600" },
  ];

  return (
    <footer className="bg-gradient-to-br from-footer via-primary to-footer text-white relative overflow-hidden" style={{ maxHeight: "60vh" }}>
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 bg-azure rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Company Info */}
            <div>
              <a href="/" className="inline-block mb-4 group">
                <img 
                  src={consulateLogo} 
                  alt="Consulate Recruitment" 
                  className="h-24 group-hover:scale-105 transition-transform duration-300" 
                />
              </a>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Your trusted partner in recruitment excellence across the UK.
              </p>
              
              {/* Social Media */}
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110`}
                    aria-label={social.name}
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-white font-heading font-bold text-base mb-4 relative inline-block">
                Quick Links
                <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-accent"></div>
              </h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-accent transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-heading font-bold text-base mb-4 relative inline-block">
                Get in Touch
                <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-accent"></div>
              </h3>
              <div className="space-y-2">
                <a 
                  href="https://maps.google.com/?q=71-75+Shelton+Street+Covent+Garden+London+WC2H+9JQ" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-white/70 hover:text-accent transition-colors duration-300 group text-sm"
                >
                  <FaMapMarkerAlt className="text-accent mt-0.5 flex-shrink-0 text-xs" />
                  <span>71-75 Shelton Street, London, WC2H 9JQ</span>
                </a>
                
                <a 
                  href="mailto:admin@consulaterecruitment.co.uk" 
                  className="flex items-center gap-2 text-white/70 hover:text-accent transition-colors duration-300 group text-sm"
                >
                  <FaEnvelope className="text-accent flex-shrink-0 text-xs" />
                  <span>admin@consulaterecruitment.co.uk</span>
                </a>
                
                <a 
                  href="tel:01623255223" 
                  className="flex items-center gap-2 text-white/70 hover:text-accent transition-colors duration-300 group text-sm"
                >
                  <FaPhone className="text-accent flex-shrink-0 text-xs" />
                  <span>01623 255 223</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
              
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-white/60">
                  &copy; {currentYear} Consulate Recruitment Agency. All rights reserved. | Reg: 16096801
                </p>
              </div>

              {/* Legal Links */}
              <div className="flex gap-3">
                <a 
                  href="/terms" 
                  className="text-white/60 hover:text-accent transition-colors duration-300"
                >
                  Terms & Conditions
                </a>
                <span className="text-white/30">|</span>
                <a 
                  href="/privacy" 
                  className="text-white/60 hover:text-accent transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
