import React, { useRef, useEffect, useState } from "react";
import visionImage from "../assets/visionImage.jpeg";
import { FaCircle } from "react-icons/fa";

const Vision = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // true when in view, false when out
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-blue-50 overflow-hidden"
    >
      {/* Decorative blobs */}
      <FaCircle
        className={`absolute top-0 left-0 w-40 h-40 text-blue-200 opacity-20 transition-all duration-1000 ${
          isVisible ? "translate-x-0 translate-y-0 opacity-100" : "-translate-x-20 -translate-y-20 opacity-0"
        }`}
      />
      <FaCircle
        className={`absolute bottom-0 right-0 w-60 h-60 text-blue-300 opacity-20 transition-all duration-1000 ${
          isVisible ? "translate-x-0 translate-y-0 opacity-100" : "translate-x-20 translate-y-20 opacity-0"
        }`}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center gap-10 relative z-10">

        {/* Image Left */}
        <div
          className={`w-full md:w-1/2 transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
          }`}
        >
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={visionImage}
              alt="Our Vision"
              className="w-full h-64 md:h-[400px] object-cover transition-transform duration-1000"
            />
          </div>
        </div>

        {/* Content Right */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left gap-6">
          {/* Heading */}
          <h2
            className={`text-3xl md:text-4xl font-bold text-azure transition-all duration-1000 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Our Vision
          </h2>

          {/* Paragraph */}
          <p
            className={`text-gray-700 text-base md:text-lg leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Our Vision is to become a trusted leader in staffing, cleaning, and
            management consulting services, empowering individuals and
            organizations to achieve their fullest potential.
          </p>

          {/* Button */}
          <button
            className={`bg-azureSoft text-white font-semibold px-6 py-3 rounded-lg w-max hover:bg-primary transition-all duration-1000 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            FIND OUT MORE
          </button>
        </div>
      </div>
    </section>
  );
};

export default Vision;
