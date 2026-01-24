import React, { useEffect, useRef, useState } from "react";
import { FaUsers, FaUserTie, FaBroom } from "react-icons/fa";
import cleaning from "../assets/cleaning.jpg";
import permanent from "../assets/permanent.jpg"; 
import temporary from "../assets/temporary.jpg";  

const recruitmentData = [
  {
    title: "Temporary Recruitment",
    text: "When you need to fill workforce gaps, whether planned or on short notice, we have access to a wide pool of skilled professionals ready to step in when required. Be it covering holidays, managing staff absences, strengthening your team during busy periods or your cleaning support services, our candidates bring the qualifications and experience needed to make an immediate impact. We handle the recruitment process, so you can stay focused on what matters most to your business.",
    image: temporary,
    icon: <FaUsers className="w-10 h-10 text-azureSoft mb-3" />
  },
  {
    title: "Permanent Recruitment",
    text: "When it comes to permanent recruitment, we connect you with a diverse pool of talented professionals who are ready to contribute to your team for the long term. Whether you’re expanding your workforce, filling critical roles, or looking for fresh expertise, our candidates are carefully vetted to meet your requirements and align with your organisational goals. We manage the entire recruitment process, allowing you to focus on building a strong and committed team.",
    image: permanent,
    icon: <FaUserTie className="w-10 h-10 text-azureSoft mb-3" />
  },
  {
    title: "Cleaning Services",
    text: "We provide access to a broad range of professional cleaners with the right skills to meet your exact cleaning requirements. Our flexible service options make it easy to adjust cleaning choices as needed. We are always available. You only pay for the cleaning services you require. Every cleaner is carefully selected through a thorough vetting process, equipped with training and ensuring consistent quality, reliability, and a seamless fit with your organisation’s standards.",
    image: cleaning,
    icon: <FaBroom className="w-10 h-10 text-azureSoft mb-3" />
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

  const getAnimationClass = (index) => {
    const animations = ["-translate-x-12", "translate-x-12", "translate-y-12"];
    return isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${animations[index % 3]}`;
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold text-azure transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Recruitment Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {recruitmentData.map((item, index) => (
            <div
              key={index}
              className={`
                flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-1000
                ${getAnimationClass(index)}
              `}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 md:h-64 object-cover"
              />

              {/* Content */}
              <div className="p-6 flex flex-col w-full h-[500px] md:h-[520px]">
                {/* Icon */}
                <div
                  className={`flex justify-center transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                  style={{ transitionDelay: `${index * 300 + 100}ms` }}
                >
                  {item.icon}
                </div>

                {/* Title */}
                <h3
                  className={`text-xl text-azureSoft font-semibold mt-2 transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 300 + 200}ms` }}
                >
                  {item.title}
                </h3>

                {/* Text */}
                <p
                  className={`text-gray-700 text-sm md:text-base mt-2 flex-grow transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 300 + 300}ms` }}
                >
                  {item.text}
                </p>

                {/* Discover More button always at bottom */}
                <div
                  className={`mt-4 transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 300 + 400}ms` }}
                >
                  <button className="w-full bg-azureSoft text-white font-semibold px-6 py-3 rounded-lg hover:bg-footer/90 transition">
                    DISCOVER MORE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recruitment;
