import React, { useEffect, useRef, useState } from "react";
import { FaUserGraduate, FaFileAlt, FaPalette, FaUsers, FaGraduationCap, FaBriefcase, FaCalendarAlt, FaArrowRight, FaCheckCircle } from "react-icons/fa";

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

  const services = [
    {
      icon: <FaFileAlt className="w-6 h-6" />,
      title: "CV Review & Optimization",
      description: "Professional CV enhancement to make you stand out"
    },
    {
      icon: <FaPalette className="w-6 h-6" />,
      title: "Graphic Design",
      description: "Creative design solutions for your professional needs"
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Interview Coaching & Job Preparation",
      description: "Comprehensive preparation for successful interviews"
    },
    {
      icon: <FaGraduationCap className="w-6 h-6" />,
      title: "Online Training Support",
      description: "CPD-certified training with professional certification"
    },
    {
      icon: <FaUserGraduate className="w-6 h-6" />,
      title: "Management Consultation",
      description: "Expert guidance for business management and strategy"
    },
    {
      icon: <FaBriefcase className="w-6 h-6" />,
      title: "Business Set-Up",
      description: "Complete assistance for starting your business"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-gradient-to-br from-azure via-azureSoft to-primary overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl transition-all duration-1000 ${
          isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}></div>
        <div className={`absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-2xl transition-all duration-1000 delay-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}></div>
        <div className={`absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl transition-all duration-1000 delay-500 ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <FaUserGraduate className="w-4 h-4" />
            Professional Consultation
          </div>
          
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-1000 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Expert <span className="text-yellow-300">Consultation</span> Services
          </h2>
          
          <p
            className={`text-xl text-white/90 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Our consultation services are designed to provide practical, end-to-end support across a wide range of needs, including staffing solutions, cleaning services, management consulting, business set-up, interview coaching and job preparation, CV review and optimisation, graphic design, and online training support.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 border border-white/20 hover:border-white/30 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white mb-4 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                {service.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Key Benefits */}
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Why Choose Our Consultation Services?
            </h3>
            
            <div className="space-y-4">
              {[
                "Experienced professionals with years of UK market knowledge",
                "Personalized approach tailored to your specific goals",
                "End-to-end support from strategy to implementation",
                "Proven track record of successful outcomes"
              ].map((benefit, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 transition-all duration-1000 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  <FaCheckCircle className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <span className="text-white/90 leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Description */}
          <div
            className={`transition-all duration-1000 delay-900 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">
                Comprehensive Support for Your Success
              </h3>
              <p className="text-white/90 leading-relaxed mb-6">
                Whether you are a business owner, a first-time entrepreneur, a newcomer to the UK, an international student, a support worker, or a job seeker, we understand that navigating these areas can be complex and overwhelming. With years of experience supporting individuals and organisations, our team is committed to delivering clear guidance and effective solutions tailored to your goals.
              </p>
              <p className="text-white/90 leading-relaxed">
                We support you at every stage from business strategy, paperwork, and applications to skills development and professional certification, so you can stay focused on growth, confidence, and long-term success.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div
            className={`transition-all duration-1000 delay-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="text-white/90 mb-6 text-lg">
              Ready to take the next step in your professional journey?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/consultations"
                className="inline-flex items-center gap-2 bg-white text-azure font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaCalendarAlt className="w-5 h-5" />
                Book an Appointment
                <FaArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-azure transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consultation;