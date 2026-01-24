import React, { useEffect, useRef, useState } from "react";
import { FaHeartbeat, FaBroom, FaTools } from "react-icons/fa";

const cardsData = [
  {
    title: "Healthcare Staffing Services",
    text: "Every role in health and social care carries unique responsibilities, and so do its staffing needs. At Consulate Recruitment, we take a personalized approach to healthcare staffing. Through thorough background checks, qualification verification, and role-specific skill assessments, we ensure every candidate meets the highest standards of care, competence, and professionalism.",
    icon: <FaHeartbeat className="w-10 h-10 text-primary mb-3" />,
    theme: "light",
    animation: "left",
  },
  {
    title: "Cleaning Services",
    text: "We understand the importance of keeping your environment clean, safe, and consistently maintained. That’s why we focus on delivering reliable and timely cleaning support. Whether you need immediate cover for unexpected gaps or ongoing cleaning solutions, we provide the right team at the right time without compromising on quality or standards.",
    icon: <FaBroom className="w-10 h-10 text-white mb-3" />,
    theme: "azure",
    animation: "bottom",
  },
  {
    title: "Management Services",
    text: "We go beyond providing services; we build lasting partnerships. Our team delivers ongoing support to ensure smooth and effective management within your operations. By understanding the complexities of service management, we ensure every solution is aligned with your requirements and fully compliant with industry standards.",
    icon: <FaTools className="w-10 h-10 text-primary mb-3" />,
    theme: "light",
    animation: "right",
  },
];

const HeroCards = () => {
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

  const animationClasses = {
    left: isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
    right: isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12",
    bottom: isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-gray-50 relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute -top-40 -left-40 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-3xl animate-pulse z-0"></div>
      <div className="absolute -bottom-40 -right-40 w-72 h-72 bg-purple-200 opacity-20 rounded-full blur-3xl animate-pulse z-0"></div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative z-10">
        {cardsData.map((card, index) => {
          const isLight = card.theme === "light";

          return (
            <div
              key={index}
              className={`
                relative flex flex-col p-6 rounded-lg shadow-lg overflow-hidden
                ${isLight ? "bg-blue-50 text-gray-900" : "bg-azure text-white"}
                transition-all duration-1000 delay-[${600 + index * 200}ms]
                ${animationClasses[card.animation]}
              `}
            >
              {/* Card content */}
              <div className="flex flex-col items-center text-center gap-4 h-[450px] md:h-[500px]">
                {/* Icon */}
                <div className="text-3xl">{card.icon}</div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold">{card.title}</h3>

                {/* Text */}
                <p
                  className={`text-sm md:text-base flex-grow ${
                    isLight ? "text-gray-700" : "text-white/90"
                  }`}
                >
                  {card.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HeroCards;
