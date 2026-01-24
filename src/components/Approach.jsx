import React from "react";
import approachImage from "../assets/approachImage.jpg";
const Approach = () => {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16">
        
        {/* Left Image */}
        <div className="w-full md:w-7/12">
          <img
            src={approachImage}
            alt="Our Approach"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-5/12 flex flex-col gap-6 md:gap-8">
          
          <h2 className="text-3xl md:text-4xl font-bold text-heading">
            Our Approach
          </h2>
          
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            We take pride in our approach to the recruitment process. Our team of skilled professionals is dedicated to handling the work with precision, care, and attention to detail. We understand the unique needs of each client and tailor our services to meet their specific requirements. Whether it’s residential, care, or cleaning settings, we go above and beyond to deliver a spotless and welcoming standard environment.
          </p>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            With years of expertise in the recruitment industry, we understand the unique challenges faced by care homes and the cleaning industry. Our deep knowledge ensures we connect you with candidates who are not only qualified but also compassionate, reliable, and perfectly suited to your specific requirements.
          </p>

          {/* CTA Button */}
          <div className="mt-4">
            <button className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition">
              FIND OUT MORE
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Approach;
