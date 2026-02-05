import React, { useEffect, useRef, useState } from "react";
import { FaUsers, FaUserTie, FaBroom, FaArrowRight } from "react-icons/fa";
import cleaning from "../assets/cleaning.jpg";
import permanent from "../assets/permanent.jpg"; 
import temporary from "../assets/temporary.jpg";  

const recruitmentData = [
  {
    title: "Temporary Recruitment",
    text: "When you need to fill workforce gaps, whether planned or on short notice, we have access to a wide pool of skilled professionals ready to step in when required. Be it covering holidays, managing staff absences, strengthening your team during busy periods or your cleaning support services, our candidates bring the qualifications and experience needed to make an immediate impact.",
    image: temporary,
    icon: <FaUsers className="w-8 h-8" />,
    color: "from-blue-500 to-azure",
    buttonLink: "#temporary-recruitment"
  },
  {
    title: "Permanent Recruitment", 
    text: "When it comes to permanent recruitment, we connect you with a diverse pool of talented professionals who are ready to contribute to your team for the long term. Whether you're expanding your workforce, filling critical roles, or looking for fresh expertise, our candidates are carefully vetted to meet your requirements and align with your organisational goals.",
    image: permanent,
    icon: <FaUserTie className="w-8 h-8" />,
    color: "from-azure to-azureSoft",
    buttonLink: "#permanent-recruitment"
  },
  {
    title: "Cleaning Services",
    text: "We provide access to a broad range of professional cleaners with the right skills to meet your exact cleaning requirements. Our flexible service options make it easy to adjust cleaning choices as needed. Every cleaner is carefully selected through a thorough vetting process, equipped with training and ensuring consistent quality, reliability, and a seamless fit with your organisation's standards.",
    image: cleaning,
    icon: <FaBroom className="w-8 h-8" />,
    color: "from-azureSoft to-primary",
    buttonLink: "#cleaning-services"
  }
];

const Recruitment = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 bg-azure/10 text-azure px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <FaUsers className="w-4 h-4" />
            Our Services
          </div>
          
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 transition-all duration-1000 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Recruitment <span className="text-azure">Excellence</span>
          </h2>
          
          <p
            className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Connecting talent with opportunity through our comprehensive recruitment and cleaning services
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {recruitmentData.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                {/* Icon Badge */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-azure group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-azure transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-6">
                  {item.text}
                </p>

                {/* CTA Button */}
                <a
                  href={item.buttonLink}
                  className="inline-flex items-center gap-2 bg-azure text-white font-semibold px-6 py-3 rounded-xl hover:bg-azureSoft transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 group-hover:scale-105"
                >
                  Discover More
                  <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              {/* Decorative Element */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="text-gray-600 mb-6">
              Ready to find the perfect match for your organization?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-azure to-azureSoft text-white font-semibold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaUsers className="w-5 h-5" />
              Get Started Today
              <FaArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recruitment;