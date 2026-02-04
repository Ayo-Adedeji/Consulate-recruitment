import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa';

const FloatingButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jumping animation for back to top button
  useEffect(() => {
    const jumpInterval = setInterval(() => {
      if (showBackToTop) {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 600);
      }
    }, 3000); // Jump every 3 seconds

    return () => clearInterval(jumpInterval);
  }, [showBackToTop]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openWhatsApp = () => {
    // Replace with your actual WhatsApp number (include country code without +)
    const phoneNumber = '447786043535'; // Example UK number
    const message = 'Hello! I would like to inquire about your recruitment services.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`bg-azure hover:bg-azureSoft text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            isJumping ? 'animate-bounce' : ''
          }`}
          aria-label="Back to top"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 animate-pulse"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FloatingButtons;