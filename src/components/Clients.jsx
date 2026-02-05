import React, { useEffect, useRef, useState } from "react";
import { FaUsers, FaHandshake, FaStar, FaTrophy } from "react-icons/fa";

const Clients = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    satisfaction: 0,
    years: 0
  });
  
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  const targetStats = {
    clients: 20,
    projects: 20,
    satisfaction: 98,
    years: 4
  };

  const animateStats = () => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setStats({
        clients: Math.floor(easeOutQuart * targetStats.clients),
        projects: Math.floor(easeOutQuart * targetStats.projects),
        satisfaction: Math.floor(easeOutQuart * targetStats.satisfaction),
        years: Math.floor(easeOutQuart * targetStats.years)
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setStats(targetStats);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateStats();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const statsData = [
    {
      icon: <FaUsers className="w-8 h-8" />,
      number: stats.clients,
      suffix: "+",
      label: "Happy Clients",
      description: "Trusted partnerships built"
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      number: stats.projects,
      suffix: "+",
      label: "Projects Completed",
      description: "Successful placements made"
    },
    {
      icon: <FaStar className="w-8 h-8" />,
      number: stats.satisfaction,
      suffix: "%",
      label: "Satisfaction Rate",
      description: "Client satisfaction guaranteed"
    },
    {
      icon: <FaTrophy className="w-8 h-8" />,
      number: stats.years,
      suffix: "+",
      label: "Years Experience",
      description: "Industry expertise delivered"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-br from-heading via-primary to-heading overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 left-10 w-32 h-32 bg-azure/10 rounded-full blur-2xl transition-all duration-1000 ${
          isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}></div>
        <div className={`absolute bottom-20 right-10 w-40 h-40 bg-azureSoft/10 rounded-full blur-2xl transition-all duration-1000 delay-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-azure/5 rounded-full blur-3xl transition-all duration-1000 delay-500 ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 bg-azure/20 text-azure px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <FaTrophy className="w-4 h-4" />
            Our Achievements
          </div>
          
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-1000 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Trusted by <span className="text-azure">Industry Leaders</span>
          </h2>
          
          <p
            className={`text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            We're proud to serve our clients with excellence every day. Your success is our mission, 
            and these numbers reflect our commitment to delivering outstanding results.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Card background with hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/10 group-hover:border-azure/30 transition-all duration-300"></div>
              
              {/* Card content */}
              <div className="relative p-8 text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-azure/20 text-azure rounded-2xl mb-6 group-hover:bg-azure/30 group-hover:scale-110 transition-all duration-300">
                  {stat.icon}
                </div>
                
                {/* Number */}
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-white group-hover:text-azure transition-colors duration-300">
                    {stat.number}
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-azure">
                    {stat.suffix}
                  </span>
                </div>
                
                {/* Label */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-azure transition-colors duration-300">
                  {stat.label}
                </h3>
                
                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
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
            <a
              href="/clients"
              className="inline-flex items-center gap-2 bg-azure text-white font-semibold px-8 py-4 rounded-xl hover:bg-azureSoft transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FaHandshake className="w-5 h-5" />
              Join Our Success Stories
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;