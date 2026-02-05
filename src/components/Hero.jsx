import React, { useState, useEffect } from "react";
import bg1 from "../assets/bg1.jpg"; 
import bg2 from "../assets/bg2.jpg"; 
import bg3 from "../assets/bg3.jpg"; 

const backgrounds = [bg1, bg2, bg3];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center text-center overflow-hidden bg-cover bg-no-repeat mt-24"
      style={{
        backgroundImage: `url(${backgrounds[current]})`,
        backgroundPosition: "center center", 
        backgroundSize: "cover",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Enhanced Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>

      {/* Animated Background Elements */}
      <div className="absolute -top-10 -left-10 w-32 h-32 md:w-48 md:h-48 bg-azure/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 md:w-60 md:h-60 bg-azureSoft/20 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/3 left-1/4 w-24 h-24 md:w-36 md:h-36 bg-accent/15 rounded-full blur-2xl animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 lg:gap-8 items-center">
        {/* Main Heading */}
        <div className="space-y-2 md:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
            Consulate Recruitment Agency
          </h1>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-azure to-azureSoft mx-auto rounded-full"></div>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 drop-shadow-lg max-w-2xl leading-relaxed">
          "Your Trusted Staffing, Cleaning, and Management Partner"
        </p>

        {/* Enhanced CTA Buttons */}
        <div className="relative mt-4 md:mt-8 w-full max-w-md sm:max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 p-4 md:p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20">
            <a
              href="/contact"
              className="group bg-gradient-to-r from-azure to-azureSoft text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl hover:from-azureSoft hover:to-azure transition-all duration-300 flex-1 text-center shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
            >
              <span className="flex items-center justify-center gap-2">
                GET STARTED
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <a
              href="/about"
              className="group bg-white/90 backdrop-blur-sm text-primary font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-white hover:text-azure transition-all duration-300 flex-1 text-center shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base border border-white/30"
            >
              <span className="flex items-center justify-center gap-2">
                LEARN MORE
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-4 md:mt-8 flex flex-col sm:flex-row items-center gap-4 md:gap-8 text-white/80 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>24/7 Emergency Staffing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-azure rounded-full animate-pulse"></div>
            <span>East Midlands Coverage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span>Trusted by 100+ Clients</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;