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
      className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden bg-cover bg-no-repeat pt-56"
      style={{
        backgroundImage: `url(${backgrounds[current]})`,
        backgroundPosition: "center 10%", // Show even more of the top part
        transition: "background-image 1s ease-in-out",
      }}
    >
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Blobs */}
  <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-300/30 rounded-full blur-3xl animate-pulse"></div>

  {/* Content */}
  <div className="relative z-10 max-w-3xl px-5 md:px-0 flex flex-col gap-6 items-center">
    <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
      Consulate Recruitment Agency
    </h1>
    <p className="text-lg md:text-2xl text-white/90 drop-shadow-md">
      “Your Trusted Staffing, Cleaning, and Management Partner”
    </p>

    <div className="relative mt-6 flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg">
      <a
        href="https://consulaterecruitment.co.uk/contact-us/"
        className="bg-azureSoft text-white font-semibold px-8 py-3 rounded-lg hover:bg-azure/90 transition w-full sm:w-auto text-center"
      >
        GET STARTED
      </a>
      <a
        href="https://consulaterecruitment.co.uk/our-services/"
        className="bg-white text-footer font-semibold px-8 py-3 rounded-lg hover:bg-azure/90 hover:text-white transition w-full sm:w-auto text-center"
      >
        LEARN MORE
      </a>
    </div>
  </div>
</section>

  );
};

export default Hero;
