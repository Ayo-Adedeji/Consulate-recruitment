import React from "react";
import jobsBg from "../assets/jobsBg.jpg";

const Jobs = () => {
  return (
    <section
      className="bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${jobsBg})` }}
    >
      <div className="max-w-7xl mx-auto px-6 py-28 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Careers & Opportunities
        </h2>

        <p className="text-base md:text-lg mb-6">
          Interested in working with Consulate Recruitment?
          View available opportunities when they become available.
        </p>

        <button className="bg-footer px-8 py-3 rounded-md font-semibold hover:bg-footer/90 transition">
          VIEW JOBS
        </button>
      </div>
    </section>
  );
};

export default Jobs;
