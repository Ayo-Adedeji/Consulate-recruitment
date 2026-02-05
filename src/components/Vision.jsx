import React, { useRef, useEffect, useState } from "react";
import visionImage from "../assets/visionImage.jpeg";
import { FaEye, FaBullseye, FaUsers, FaArrowRight } from "react-icons/fa";

const Vision = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const visionPoints = [
    {
      icon: <FaBullseye className="w-5 h-5" />,
      text: "Trusted leader in staffing solutions"
    },
    {
      icon: <FaUsers className="w-5 h-5" />,
      text: "Empowering individuals and organizations"
    },
    {
      icon: <FaEye className="w-5 h-5" />,
      text: "Achieving fullest potential together"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-azure/10 overflow-hidden"
    >
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-azure/20 to-blue-300/20 rounded-full blur-xl transition-all duration-1000 ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}></div>
        <div className={`absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-indigo-200/20 to-azure/20 rounded-full blur-xl transition-all duration-1000 delay-200 ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}></div>
        <div className={`absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-200/10 to-azure/10 rounded-full blur-2xl transition-all duration-1000 delay-400 ${
          isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Enhanced Image Section */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            {/* Image container with enhanced styling */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-azure/20 to-indigo-300/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                <img
                  src={visionImage}
                  alt="Our Vision"
                  className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-3 bg-gradient-to-t from-azure/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Floating badge */}
            <div className={`absolute -bottom-6 -right-6 bg-azure text-white px-6 py-3 rounded-full shadow-lg transition-all duration-1000 delay-600 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}>
              <span className="text-sm font-semibold">Since 2020</span>
            </div>
          </div>

          {/* Enhanced Content Section */}
          <div className="space-y-8">
            {/* Section badge */}
            <div
              className={`inline-flex items-center gap-2 bg-azure/10 text-azure px-4 py-2 rounded-full text-sm font-medium transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <FaEye className="w-4 h-4" />
              Our Vision
            </div>

            {/* Main heading */}
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight transition-all duration-1000 delay-100 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              Empowering Success Through 
              <span className="text-azure block mt-2">Trusted Partnership</span>
            </h2>

            {/* Vision statement */}
            <p
              className={`text-gray-600 text-lg leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              Our vision is to become a trusted leader in staffing, cleaning, and
              management consulting services, empowering individuals and
              organizations to achieve their fullest potential through innovative solutions and unwavering commitment to excellence.
            </p>

            {/* Vision points */}
            <div className="space-y-4">
              {visionPoints.map((point, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 transition-all duration-1000 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-azure/10 text-azure rounded-full flex items-center justify-center">
                    {point.icon}
                  </div>
                  <span className="text-gray-700 font-medium">{point.text}</span>
                </div>
              ))}
            </div>

            {/* Enhanced CTA */}
            <div className="pt-4">
              <a
                href="/about"
                className={`inline-flex items-center gap-2 bg-azure text-white font-semibold px-8 py-4 rounded-xl hover:bg-azureSoft transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                Learn More About Us
                <FaArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
