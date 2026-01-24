import React from "react";
import { FaUsers, FaUserTie, FaBroom } from "react-icons/fa";
import cleaning from "../assets/cleaning.jpg";
import permanent from "../assets/permanent.jpg"; 
import temporary from "../assets/temporary.jpg";  

const recruitmentData = [
  {
    title: "Temporary Recruitment",
    text: "When you need to fill workforce gaps, whether planned or on short notice, we have access to a wide pool of skilled professionals ready to step in when required. Be it covering holidays, managing staff absences, strengthening your team during busy periods or your cleaning support services, our candidates bring the qualifications and experience needed to make an immediate impact. We handle the recruitment process, so you can stay focused on what matters most to your business.",
    image: temporary,
    icon: <FaUsers className="w-10 h-10 text-primary mb-3" />
  },
  {
    title: "Permanent Recruitment",
    text: "When it comes to permanent recruitment, we connect you with a diverse pool of talented professionals who are ready to contribute to your team for the long term. Whether you’re expanding your workforce, filling critical roles, or looking for fresh expertise, our candidates are carefully vetted to meet your requirements and align with your organisational goals. We manage the entire recruitment process, allowing you to focus on building a strong and committed team.",
    image: permanent,
    icon: <FaUserTie className="w-10 h-10 text-primary mb-3" />
  },
  {
    title: "Cleaning Services",
    text: "We provide access to a broad range of professional cleaners with the right skills to meet your exact cleaning requirements. Our flexible service options make it easy to adjust cleaning choices as needed. We are always available. You only pay for the cleaning services you require. Every cleaner is carefully selected through a thorough vetting process, equipped with training and ensuring consistent quality, reliability, and a seamless fit with your organisation’s standards.",
    image: cleaning,
    icon: <FaBroom className="w-10 h-10 text-primary mb-3" />
  }
];

const Recruitment = () => {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-heading">
            Recruitment Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {recruitmentData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition items-center text-center"
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
                <div className="flex justify-center">{item.icon}</div>

                {/* Title */}
                <h3 className="text-xl font-semibold mt-2">{item.title}</h3>

                {/* Text */}
                <p className="text-gray-700 text-sm md:text-base mt-2 flex-grow">
                  {item.text}
                </p>

                {/* Discover More button always at bottom */}
                <div className="mt-4">
                  <button className="w-full bg-footer text-white font-semibold px-6 py-3 rounded-lg hover:bg-footer/90 transition">
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
