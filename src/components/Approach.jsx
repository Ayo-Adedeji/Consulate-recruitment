import React, { useRef, useEffect, useState } from "react";
import { FaBullseye, FaUsers, FaHeart, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import approachImage from "../assets/approachImage.jpg";

const Approach = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: <FaBullseye className="w-5 h-5" />,
      text: "Precision & attention to detail"
    },
    {
      icon: <FaUsers className="w-5 h-5" />,
      text: "Tailored to specific requirements"
    },
    {
      icon: <FaHeart className="w-5 h-5" />,
      text: "Compassionate & reliable candidates"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden"
    >
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-azure/10 to-blue-300/10 rounded-full blur-3xl transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        ></div>
        <div
          className={`absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-azureSoft/10 to-primary/10 rounded-full blur-3xl transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-azure/5 to-blue-200/5 rounded-full blur-2xl transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 bg-azure/10 text-azure px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <FaBullseye className="w-4 h-4" />
            Our Methodology
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Image Section */}
          <div
            className={`relative transition-all duration-1000 delay-100 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            {/* Image container with enhanced styling */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-azure/20 to-azureSoft/20 rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform duration-500"></div>
              <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                <img
                  src={approachImage}
                  alt="Our Approach"
                  className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-3 bg-gradient-to-t from-azure/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className={`absolute -bottom-6 -right-6 bg-azure text-white px-6 py-3 rounded-full shadow-lg transition-all duration-1000 delay-600 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <span className="text-sm font-semibold">Expert Team</span>
            </div>
          </div>

          {/* Right Content Section */}
          <div className="space-y-8">
            {/* Main Heading */}
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight transition-all duration-1000 delay-200 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              Our <span className="text-azure">Approach</span>
            </h2>

            {/* Highlight Cards */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-azure/10 transition-all duration-1000 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-azure/10 text-azure rounded-full flex items-center justify-center">
                    {highlight.icon}
                  </div>
                  <span className="text-gray-700 font-medium">{highlight.text}</span>
                </div>
              ))}
            </div>

            {/* First Paragraph */}
            <p
              className={`text-gray-700 text-lg leading-relaxed transition-all duration-1000 delay-600 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              We take pride in our approach to the recruitment process. Our team of skilled professionals is dedicated to handling the work with precision, care, and attention to detail. We understand the unique needs of each client and tailor our services to meet their specific requirements. Whether it's residential, care, or cleaning settings, we go above and beyond to deliver a spotless and welcoming standard environment.
            </p>

            {/* Second Paragraph */}
            <p
              className={`text-gray-700 text-lg leading-relaxed transition-all duration-1000 delay-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              With years of expertise in the recruitment industry, we understand the unique challenges faced by care homes and the cleaning industry. Our deep knowledge ensures we connect you with candidates who are not only qualified but also compassionate, reliable, and perfectly suited to your specific requirements.
            </p>

            {/* Enhanced CTA */}
            <div
              className={`pt-4 transition-all duration-1000 delay-800 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <a
                href="/about"
                className="inline-flex items-center gap-2 bg-azure text-white font-semibold px-8 py-4 rounded-xl hover:bg-azureSoft transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                FIND OUT MORE
                <FaArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Stats/Features */}
        <div className="mt-20">
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-900 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {[
              { number: "100%", label: "Client Satisfaction", icon: <FaCheckCircle className="w-6 h-6" /> },
              { number: "24/7", label: "Support Available", icon: <FaUsers className="w-6 h-6" /> },
              { number: "Expert", label: "Professional Team", icon: <FaBullseye className="w-6 h-6" /> }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-azure/10 hover:border-azure/20 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-azure/10 text-azure rounded-xl mb-4">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-azure mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;