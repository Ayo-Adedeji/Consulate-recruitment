import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaUsers, FaHandshake } from "react-icons/fa";

const Process = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-body py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h1
            className={`
              text-3xl md:text-4xl font-heading font-bold text-azure
              transition-all duration-1000 delay-[200ms]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
          >
            Our Process
          </h1>

          <p
            className={`
              mt-4 text-primary max-w-2xl mx-auto
              transition-all duration-1000 delay-[400ms]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
          >
            A structured and transparent approach to delivering the right talent
            for your organisation.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">

          {/* Card 1 */}
          <div
            className={`
              bg-card rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition
              transition-all duration-1000 delay-[600ms]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
          >
            <div
              className={`
                w-16 h-16 mx-auto mb-6 rounded-full bg-primaryLight/10 flex items-center justify-center
                transition-all duration-1000 delay-[700ms]
                ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
              `}
            >
              <FaSearch className="text-azureSoft text-2xl" />
            </div>

            <h2
              className={`
                text-xl font-heading font-semibold text-azureSoft mb-3
                transition-all duration-1000 delay-[800ms]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              Understanding Your Needs
            </h2>

            <p
              className={`
                text-primary
                transition-all duration-1000 delay-[900ms]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              Personalised consultation to clearly define your staffing
              requirements.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className={`
              bg-card rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition
              transition-all duration-1000 delay-[800ms]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
          >
            <div
              className={`
                w-16 h-16 mx-auto mb-6 rounded-full bg-primaryLight/10 flex items-center justify-center
                transition-all duration-1000 delay-[900ms]
                ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
              `}
            >
              <FaUsers className="text-azureSoft text-2xl" />
            </div>

            <h2
              className={`
                text-xl font-heading font-semibold text-azureSoft mb-3
                transition-all duration-1000 delay-[1000ms]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              Sourcing & Screening
            </h2>

            <p
              className={`
                text-primary mb-2
                transition-all duration-1000 delay-[1100ms]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              Access to a large pool of pre-vetted candidates.
            </p>

            <p
              className={`
                text-primary
                transition-all duration-1000 delay-[1200ms]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              Comprehensive background checks and certifications.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className={`
              bg-card rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition
              transition-all duration-1000 delay-[1000ms]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
          >
            <div
              className={`
                w-16 h-16 mx-auto mb-6 rounded-full bg-primaryLight/10 flex items-center justify-center
                transition-all duration-1000 delay-[1100ms]
                ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
              `}
            >
              <FaHandshake className="text-azureSoft text-2xl" />
            </div>

            <h2
              className={`
                text-xl font-heading font-semibold text-azureSoft mb-3
                transition-all duration-1000 delay-[1200ms]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              Placement & Follow-Up
            </h2>

            <p
              className={`
                text-primary mb-2
                transition-all duration-1000 delay-[1300ms]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              Seamless integration of staff into your team.
            </p>

            <p
              className={`
                text-primary
                transition-all duration-1000 delay-[1400ms]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              Continuous support to ensure satisfaction.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Process;
