import React, { useEffect, useRef, useState } from "react";

const Consultation = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-azureSoft overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 text-center flex flex-col items-center">
        
        {/* Heading — LEFT */}
        <h2
          className={`text-3xl md:text-4xl font-bold text-white mb-6 transition-all duration-1000 delay-200
            ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}
          `}
        >
          Our Consultation Services
        </h2>

        {/* Text — RIGHT */}
        <p
          className={`text-white text-base md:text-lg leading-relaxed mb-8 transition-all duration-1000 delay-400
            ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}
          `}
        >
          Our consultation services are designed to provide support with CV restructuring and 
          optimisation, graphic design, interview coaching and preparation, UK university 
          application support, CPD-certified online care training and business set up. 
          Whether you are a newcomer to the UK, an international student, support worker, 
          or a job seeker in general, we understand that navigating each of these areas can 
          feel overwhelming. With many years of experience in helping people adapt and succeed, 
          our dedicated team is committed to making your journey as smooth and effective as 
          possible. We assist you at every step from handling paperwork and applications to 
          building essential skills and earning certifications so you can focus on achieving your goals.
        </p>

        {/* Button — LEFT */}
        <a
          href="#book-appointment"
          className={`bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-muted transition-all duration-1000 delay-600
            ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}
          `}
        >
          Book an Appointment
        </a>

      </div>
    </section>
  );
};

export default Consultation;
