import React, { useEffect, useRef, useState } from "react";
import { FaUsers, FaBroom, FaCogs } from "react-icons/fa";

const servicesData = [
  {
    title: "Staffing Solutions",
    text: "Every role in health and social care carries unique responsibilities, and so do its staffing needs. At Consulate Recruitment, we take a personalized approach to healthcare staffing. Through thorough background checks, qualification verification, and role-specific skill assessments, we ensure every candidate meets the highest standards of care, competence, and professionalism.",
    icon: <FaUsers className="w-8 h-8" />,
    color: "blue",
    position: "left"
  },
  {
    title: "Cleaning Services", 
    text: "We understand the importance of keeping your environment clean, safe, and consistently maintained. That's why we focus on delivering reliable and timely cleaning support. Whether you need immediate cover for unexpected gaps or ongoing cleaning solutions, we provide the right team at the right time without compromising on quality or standards.",
    icon: <FaBroom className="w-8 h-8" />,
    color: "azure",
    position: "center"
  },
  {
    title: "Management Consulting",
    text: "We go beyond providing services; we build lasting partnerships. Our team delivers ongoing support to ensure smooth and effective management within your operations. By understanding the complexities of service management, we ensure every solution is aligned with your requirements and fully compliant with industry standards.",
    icon: <FaCogs className="w-8 h-8" />,
    color: "emerald",
    position: "right"
  },
];

const HeroCards = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          text: 'text-gray-700',
          accent: 'bg-blue-500'
        };
      case 'azure':
        return {
          bg: 'bg-azure',
          border: 'border-azure',
          icon: 'text-white',
          text: 'text-white',
          accent: 'bg-white'
        };
      case 'emerald':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          icon: 'text-emerald-600',
          text: 'text-gray-700',
          accent: 'bg-emerald-500'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'text-gray-600',
          text: 'text-gray-700',
          accent: 'bg-gray-500'
        };
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-emerald-50/30"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-azure mx-auto rounded-full"></div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {servicesData.map((service, index) => {
            const colors = getColorClasses(service.color);
            const animationDelay = index * 200;
            
            return (
              <div
                key={index}
                className={`
                  group relative
                  transform transition-all duration-700 ease-out
                  ${isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                  }
                `}
                style={{ transitionDelay: `${animationDelay}ms` }}
              >
                {/* Service item */}
                <div className={`
                  ${colors.bg} ${colors.border}
                  border-2 rounded-xl p-6 md:p-8
                  hover:shadow-lg transition-all duration-300
                  hover:-translate-y-2 hover:scale-105
                  relative overflow-hidden
                  min-h-[320px] sm:min-h-[360px] md:min-h-[400px]
                `}>
                  {/* Icon container */}
                  <div className={`
                    w-14 h-14 sm:w-16 sm:h-16 ${colors.bg === 'bg-azure' ? 'bg-white/20' : 'bg-white'} 
                    rounded-full flex items-center justify-center mb-4 sm:mb-6
                    group-hover:scale-110 transition-transform duration-300
                    shadow-sm
                  `}>
                    <div className={colors.icon}>
                      {service.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold ${colors.text} leading-tight`}>
                      {service.title}
                    </h3>
                    
                    <p className={`text-sm sm:text-base leading-relaxed ${colors.text} ${colors.text === 'text-white' ? 'text-white/90' : ''}`}>
                      {service.text}
                    </p>
                  </div>

                  {/* Decorative accent */}
                  <div className={`
                    absolute bottom-0 left-0 right-0 h-1 ${colors.accent}
                    transform scale-x-0 group-hover:scale-x-100
                    transition-transform duration-500 origin-left
                  `}></div>

                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </div>

                {/* Connection line for desktop only */}
                {index < servicesData.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 xl:-right-8 w-12 xl:w-16 h-0.5 bg-gray-200 transform -translate-y-1/2 z-0">
                    <div className={`
                      h-full bg-azure transform scale-x-0 origin-left
                      transition-transform duration-1000 ease-out
                      ${isVisible ? 'scale-x-100' : 'scale-x-0'}
                    `}
                    style={{ transitionDelay: `${animationDelay + 400}ms` }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-16">
          <div className={`
            flex space-x-2 transition-all duration-1000 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{ transitionDelay: '800ms' }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-azure' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCards;