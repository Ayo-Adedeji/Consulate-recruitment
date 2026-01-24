import React, { useEffect, useRef, useState } from "react";
import jobsBg from "../assets/jobsBg.jpg";

const Jobs = () => {
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

  return (
    <section
      ref={sectionRef}
      className="bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${jobsBg})` }}
    >
      <div className="max-w-7xl mx-auto px-6 py-28 text-center text-white">

        {/* Heading — LEFT */}
        <h2
          className={`
            text-3xl md:text-4xl font-bold mb-4
            transition-all duration-1000 delay-[600ms]
            ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}
          `}
        >
          Careers & Opportunities
        </h2>

        {/* Text — RIGHT */}
        <p
          className={`
            text-base md:text-lg mb-6
            transition-all duration-1000 delay-[600ms]
            ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}
          `}
        >
          Interested in working with Consulate Recruitment?
          View available opportunities when they become available.
        </p>

        {/* Button — BOTTOM */}
        <button
          className={`
            bg-azureSoft px-8 py-3 rounded-md font-semibold
            hover:bg-footer/90 transition text-white
            transition-all duration-1000 delay-[600ms]
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
          `}
        >
          VIEW JOBS
        </button>

      </div>
    </section>
  );
};

export default Jobs;
