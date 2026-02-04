import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhone, FaPhoneSquare, FaTwitter, FaVoicemail } from "react-icons/fa";
import { FaMessage, FaPhoneVolume } from "react-icons/fa6";
import { Link } from "react-router-dom";
import consulateLogo from "../assets/consulateLogo.png";

export default function Footer() {
  return (
    <footer className="bg-footer text-white pt-12" style={{ minHeight: "50vh" }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
        {/* Left - Logo */}
        <div className="flex-shrink-0">
          {/* Replace with your logo */}
          <img src={consulateLogo} alt="Logo" className="h-40" />
        </div>

        {/* Right - Two Sections */}
        <div className="flex justify-between gap-20">
          {/* Services Section */}
          <div>
            <h1 className="text-white font-heading text-xl mb-4">Our Services</h1>
            <ul className="space-y-2 text-white">
              <li>Consultations</li>
              <li>Temporary Recruitment</li>
              <li>Permanent Recruitment</li>
              <li>Cleaning Services</li>
            </ul>
          </div>

          {/* Get in Touch Section */}
          <div className="w-96">
            <h1 className="text-white font-heading text-xl mb-4 ">Get in Touch</h1>
            <p className="text-white mb-2">
              71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ
            </p>
            <p className="text-white flex items-center gap-1 mb-1">
              <FaMessage/> {" "}
              <a href="mailto:admin@consulaterecruitment.co.uk" className="text-accent hover:underline">
                admin@consulaterecruitment.co.uk
              </a>
            </p>
            <p className="text-white flex items-center gap-3"> <FaPhoneVolume/> 01623255223</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600 mt-12" />

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center py-6 gap-4">
        
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
          <p className="text-white">
           Copyright &copy; 2025 Consulate Recruitment Agency, All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link 
              to="/terms" 
              className="text-white hover:text-accent transition underline"
            >
              Terms & Conditions
            </Link>
            <Link 
              to="/privacy" 
              className="text-white hover:text-accent transition underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        
        <p className="text-white text-sm">
          Business Registration Number: 16096801 
        </p>

        {/* Right - Social Icons */}
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="text-white hover:text-accent transition">
            <FaFacebookF size={18} />
          </a>
          <a href="#" className="text-white hover:text-accent transition">
            <FaInstagram size={18} />
          </a>
          <a href="#" className="text-white hover:text-accent transition">
            <FaLinkedinIn size={18} />
          </a>
          <a href="#" className="text-white hover:text-accent transition">
            <FaTwitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
