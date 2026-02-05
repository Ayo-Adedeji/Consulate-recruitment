import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaUsers, FaHandshake, FaArrowRight } from "react-icons/fa";

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
    <section ref={sectionRef} className="relative bg-gradient-to-br from-bg via-white to-blue-50 py-20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-azure/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primaryLight/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`
              inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4
              transition-all duration-1000 delay-[100ms]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
          >
            Our Methodology
          </div>
          
          <h1
            className={`
              text-4xl md:text-5xl font-heading font-bold bg-gradient-to-r from-primary via-azure to-primaryLight bg-clip-text text-transparent mb-6
              transition-all duration-1000 delay-[200ms]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
          >
            Our Process
          </h1>

          <p
            className={`
              text-lg text-primary/80 max-w-2xl mx-auto leading-relaxed
              transition-all duration-1000 delay-[400ms]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
          >
            A structured and transparent approach to delivering the right talent
            for your organisation.
          </p>
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* Connection Lines - Desktop Only */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-azure/20 via-azure/40 to-azure/20 transform -translate-y-1/2 z-0"></div>
          
          {/* Cards */}
          <div className="relative grid gap-8 md:grid-cols-3 z-10">
            {/* Card 1 */}
            <div
              className={`
                group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl p-8 text-center 
                border border-azure/10 hover:border-azure/30 transition-all duration-500
                hover:scale-105 hover:-translate-y-2
                transition-all duration-1000 delay-[600ms]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-azure to-primaryLight rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                1
              </div>

              <div
                className={`
                  w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-azure/10 to-primaryLight/10 flex items-center justify-center
                  group-hover:scale-110 group-hover:rotate-3 transition-all duration-500
                  transition-all duration-1000 delay-[700ms]
                  ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                `}
              >
                <FaSearch className="text-azure text-2xl group-hover:text-primaryLight transition-colors duration-300" />
              </div>

              <h2
                className={`
                  text-xl font-heading font-bold text-primary mb-4 group-hover:text-azure transition-colors duration-300
                  transition-all duration-1000 delay-[800ms]
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
              >
                Understanding Your Needs
              </h2>

              <p
                className={`
                  text-primary/70 leading-relaxed
                  transition-all duration-1000 delay-[900ms]
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
              >
                Personalised consultation to clearly define your staffing
                requirements.
              </p>

              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-azure/60">
                <FaArrowRight className="text-lg" />
              </div>
            </div>

            {/* Card 2 */}
            <div
              className={`
                group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl p-8 text-center 
                border border-azure/10 hover:border-azure/30 transition-all duration-500
                hover:scale-105 hover:-translate-y-2
                transition-all duration-1000 delay-[800ms]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-azure to-primaryLight rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                2
              </div>

              <div
                className={`
                  w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-azure/10 to-primaryLight/10 flex items-center justify-center
                  group-hover:scale-110 group-hover:rotate-3 transition-all duration-500
                  transition-all duration-1000 delay-[900ms]
                  ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                `}
              >
                <FaUsers className="text-azure text-2xl group-hover:text-primaryLight transition-colors duration-300" />
              </div>

              <h2
                className={`
                  text-xl font-heading font-bold text-primary mb-4 group-hover:text-azure transition-colors duration-300
                  transition-all duration-1000 delay-[1000ms]
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
              >
                Sourcing & Screening
              </h2>

              <div className="space-y-2">
                <p
                  className={`
                    text-primary/70 leading-relaxed
                    transition-all duration-1000 delay-[1100ms]
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  `}
                >
                  Access to a large pool of pre-vetted candidates.
                </p>

                <p
                  className={`
                    text-primary/70 leading-relaxed
                    transition-all duration-1000 delay-[1200ms]
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  `}
                >
                  Comprehensive background checks and certifications.
                </p>
              </div>

              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-azure/60">
                <FaArrowRight className="text-lg" />
              </div>
            </div>

            {/* Card 3 */}
            <div
              className={`
                group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl p-8 text-center 
                border border-azure/10 hover:border-azure/30 transition-all duration-500
                hover:scale-105 hover:-translate-y-2
                transition-all duration-1000 delay-[1000ms]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-azure to-primaryLight rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                3
              </div>

              <div
                className={`
                  w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-azure/10 to-primaryLight/10 flex items-center justify-center
                  group-hover:scale-110 group-hover:rotate-3 transition-all duration-500
                  transition-all duration-1000 delay-[1100ms]
                  ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                `}
              >
                <FaHandshake className="text-azure text-2xl group-hover:text-primaryLight transition-colors duration-300" />
              </div>

              <h2
                className={`
                  text-xl font-heading font-bold text-primary mb-4 group-hover:text-azure transition-colors duration-300
                  transition-all duration-1000 delay-[1200ms]
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
              >
                Placement & Follow-Up
              </h2>

              <div className="space-y-2">
                <p
                  className={`
                    text-primary/70 leading-relaxed
                    transition-all duration-1000 delay-[1300ms]
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  `}
                >
                  Seamless integration of staff into your team.
                </p>

                <p
                  className={`
                    text-primary/70 leading-relaxed
                    transition-all duration-1000 delay-[1400ms]
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  `}
                >
                  Continuous support to ensure satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div
          className={`
            mt-16 text-center
            transition-all duration-1000 delay-[1500ms]
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <div className="bg-gradient-to-r from-azure/5 via-primaryLight/5 to-azure/5 rounded-2xl p-8 border border-azure/10">
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-primary/70 mb-6 max-w-2xl mx-auto">
              Let us help you find the perfect candidates for your organization with our proven three-step process.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-azure to-primaryLight text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Your Journey
              <FaArrowRight className="ml-2 text-sm" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
