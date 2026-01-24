import React from "react";
import { FaSearch, FaUsers, FaHandshake } from "react-icons/fa";

const Process = () => {
  return (
    <section className="bg-section py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-heading">
            Our Process
          </h1>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            A structured and transparent approach to delivering the right talent
            for your organisation.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-card rounded-2xl shadow-card p-8 text-center hover:shadow-soft transition">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primaryLight/10 flex items-center justify-center">
              <FaSearch className="text-primary text-2xl" />
            </div>
            <h2 className="text-xl font-heading font-semibold text-heading mb-3">
              Understanding Your Needs
            </h2>
            <p className="text-body">
              Personalised consultation to clearly define your staffing
              requirements.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-card rounded-2xl shadow-card p-8 text-center hover:shadow-soft transition">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primaryLight/10 flex items-center justify-center">
              <FaUsers className="text-primary text-2xl" />
            </div>
            <h2 className="text-xl font-heading font-semibold text-heading mb-3">
              Sourcing & Screening
            </h2>
            <p className="text-body mb-2">
              Access to a large pool of pre-vetted candidates.
            </p>
            <p className="text-body">
              Comprehensive background checks and certifications.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-card rounded-2xl shadow-card p-8 text-center hover:shadow-soft transition">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primaryLight/10 flex items-center justify-center">
              <FaHandshake className="text-primary text-2xl" />
            </div>
            <h2 className="text-xl font-heading font-semibold text-heading mb-3">
              Placement & Follow-Up
            </h2>
            <p className="text-body mb-2">
              Seamless integration of staff into your team.
            </p>
            <p className="text-body">
              Continuous support to ensure satisfaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
