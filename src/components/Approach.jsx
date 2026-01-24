import React, { useRef, useEffect, useState } from "react";
import approachImage from "../assets/approachImage.jpg";

const Approach = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // true if in view, false if out
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden"
    >
      {/* Decorative blobs */}
      <div
        className={`absolute -top-32 -left-32 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-20 -translate-y-20"
        }`}
      ></div>
      <div
        className={`absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-20 translate-y-20"
        }`}
      ></div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16">
        {/* Left Image */}
        <div
          className={`w-full md:w-7/12 transition-all duration-1000 delay-100 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
          }`}
        >
          <img
            src={approachImage}
            alt="Our Approach"
            className="w-full h-full object-cover rounded-2xl transition-transform duration-1000"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-5/12 flex flex-col gap-6 md:gap-8">
          {/* Heading */}
          <h2
            className={`text-3xl md:text-4xl font-bold text-azure transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Our Approach
          </h2>

          {/* Paragraphs */}
          <p
            className={`text-gray-700 text-base md:text-lg leading-relaxed transition-all duration-1000 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            We take pride in our approach to the recruitment process. Our team of skilled professionals is dedicated to handling the work with precision, care, and attention to detail. We understand the unique needs of each client and tailor our services to meet their specific requirements. Whether it’s residential, care, or cleaning settings, we go above and beyond to deliver a spotless and welcoming standard environment.
          </p>

          <p
            className={`text-gray-700 text-base md:text-lg leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            With years of expertise in the recruitment industry, we understand the unique challenges faced by care homes and the cleaning industry. Our deep knowledge ensures we connect you with candidates who are not only qualified but also compassionate, reliable, and perfectly suited to your specific requirements.
          </p>

          {/* CTA Button */}
          <div
            className={`mt-4 transition-all duration-1000 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <button className="bg-azureSoft text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary transition">
              FIND OUT MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
