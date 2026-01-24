import React from "react";
import { FaHeartbeat, FaBroom, FaTools } from "react-icons/fa";

const cardsData = [
  {
    title: "Healthcare Staffing Services",
    text: "Every role in health and social care carries unique responsibilities, and so do its staffing needs. At Consulate Recruitment, we take a personalized approach to healthcare staffing. Through thorough background checks, qualification verification, and role-specific skill assessments, we ensure every candidate meets the highest standards of care, competence, and professionalism.",
    icon: <FaHeartbeat className="w-10 h-10 text-primary mb-3" />,
    theme: "light", // light blue
  },
  {
    title: "Cleaning Services",
    text: "We understand the importance of keeping your environment clean, safe, and consistently maintained. That’s why we focus on delivering reliable and timely cleaning support. Whether you need immediate cover for unexpected gaps or ongoing cleaning solutions, we provide the right team at the right time without compromising on quality or standards.",
    icon: <FaBroom className="w-10 h-10 text-white mb-3" />,
    theme: "footer", // footer blue
  },
  {
    title: "Management Services",
    text: "We go beyond providing services; we build lasting partnerships. Our team delivers ongoing support to ensure smooth and effective management within your operations. By understanding the complexities of service management, we ensure every solution is aligned with your requirements and fully compliant with industry standards.",
    icon: <FaTools className="w-10 h-10 text-primary mb-3" />,
    theme: "light", // light blue
  },
];

const HeroCards = () => {
  return (
    <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">

        {cardsData.map((card, index) => {
          const isLight = card.theme === "light";

          return (
            <div
              key={index}
              className={`
                relative flex flex-col p-6 rounded-lg shadow-lg overflow-hidden
                ${isLight ? "bg-blue-50 text-gray-900" : "bg-footer text-white"}
                hover:shadow-2xl transition
              `}
            >
              {/* Decorative blob */}
              {isLight && (
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 opacity-20 rounded-full mix-blend-multiply animate-pulse"></div>
              )}
              {!isLight && (
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-800 opacity-20 rounded-full mix-blend-multiply animate-pulse"></div>
              )}

              {/* Content */}
              <div className="relative flex flex-col items-center text-center gap-4 h-[450px] md:h-[500px]">
                {/* Icon */}
                <div>{card.icon}</div>

                {/* Title */}
                <h3 className={`text-xl md:text-2xl font-bold ${isLight ? "" : "text-white"}`}>
                  {card.title}
                </h3>

                {/* Text */}
                <p className={`text-sm md:text-base flex-grow ${isLight ? "text-gray-700" : "text-white/90"}`}>
                  {card.text}
                </p>

                {/* Button
                <button className={`${isLight ? "bg-footer text-white" : "bg-white text-footer"} px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition`}>
                  FIND OUT MORE
                </button> */}
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
};

export default HeroCards;
