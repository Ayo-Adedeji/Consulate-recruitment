import React from "react";
import visionImage from "../assets/visionImage.jpeg"; // replace with your image
import { FaCircle } from "react-icons/fa";

const Vision = () => {
  return (
    <section className="relative py-20 md:py-28 bg-blue-50 overflow-hidden">
      
      {/* Decorative blobs */}
      <FaCircle className="absolute top-0 left-0 w-40 h-40 text-blue-200 opacity-20 -translate-x-20 -translate-y-20" />
      <FaCircle className="absolute bottom-0 right-0 w-60 h-60 text-blue-300 opacity-20 translate-x-20 translate-y-20" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center gap-10 relative z-10">
        
        {/* Image Left */}
        <div className="w-full md:w-1/2">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={visionImage}
              alt="Our Vision"
              className="w-full h-64 md:h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Content Right */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left gap-6 bg-white/50 backdrop-blur-md p-6 ">
          
          <h2 className="text-3xl md:text-4xl font-bold text-heading">
            Our Vision
          </h2>
          
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Our Vision is to become a trusted leader in staffing, cleaning, and management consulting services, empowering individuals and organizations to achieve their fullest potential.
          </p>

          <button className="bg-footer text-white font-semibold px-6 py-3 rounded-lg w-max hover:bg-footer/90 transition">
            FIND OUT MORE
          </button>

        </div>
      </div>
    </section>
  );
};

export default Vision;
