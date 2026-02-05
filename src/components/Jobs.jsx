import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import jobsBg from "../assets/jobsBg.jpg";
import { simpleCloudStorageManager } from "../dashboard/utils";

const Jobs = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    loadRecentJobs();
  }, []);

  const loadRecentJobs = async () => {
    try {
      // Get published job listings only
      const allJobs = await simpleCloudStorageManager.list('jobs');
      const publishedJobs = allJobs
        .filter(job => job.status === 'published')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3); // Get 3 most recent jobs
      
      setRecentJobs(publishedJobs);
    } catch (error) {
      console.error('Failed to load recent jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEmploymentTypeColor = (type) => {
    switch (type) {
      case 'permanent':
        return 'bg-green-100 text-green-800';
      case 'temporary':
        return 'bg-blue-100 text-blue-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        ref={sectionRef}
        className="bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${jobsBg})` }}
      >
        <div className="max-w-7xl mx-auto px-6 py-28 text-center text-white">

          {/* Heading — LEFT */}
          <h2
            className={`
              text-3xl md:text-4xl font-bold mb-4
              transition-all duration-1000 delay-[600ms]
              ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}
            `}
          >
            Careers & Opportunities
          </h2>

          {/* Text — RIGHT */}
          <p
            className={`
              text-base md:text-lg mb-6
              transition-all duration-1000 delay-[600ms]
              ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}
            `}
          >
            Interested in working with Consulate Recruitment?
            View available opportunities when they become available.
          </p>

          {/* Button — BOTTOM */}
          <Link
            to="/jobs"
            className={`
              inline-block bg-azureSoft px-8 py-3 rounded-md font-semibold
              hover:bg-footer/90 transition text-white
              transition-all duration-1000 delay-[600ms]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
          >
            VIEW JOBS
          </Link>

        </div>
      </section>

      {/* Recent Jobs Section */}
      {!loading && recentJobs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Latest Job Opportunities</h2>
              <p className="text-xl text-footerText max-w-3xl mx-auto">
                Discover exciting career opportunities with leading companies
              </p>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    {/* Employment Type Badge */}
                    <div className="mb-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEmploymentTypeColor(job.employmentType)}`}>
                        <Clock className="h-3 w-3 mr-1" />
                        {job.employmentType.charAt(0).toUpperCase() + job.employmentType.slice(1)}
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-azure transition-colors duration-200">
                      {job.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center text-footerText mb-3">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </div>

                    {/* Description */}
                    <p className="text-footerText mb-4 leading-relaxed">
                      {job.description.length > 120 
                        ? job.description.substring(0, 120) + '...'
                        : job.description
                      }
                    </p>

                    {/* Salary Range */}
                    {job.salaryRange && (
                      <div className="text-sm text-gray-600 mb-4">
                        <strong>Salary:</strong> {job.salaryRange}
                      </div>
                    )}

                    {/* Requirements Preview */}
                    <div className="mb-4">
                      <div className="text-sm text-gray-600">
                        <strong>Requirements:</strong> {job.requirements.length} requirement{job.requirements.length !== 1 ? 's' : ''}
                      </div>
                    </div>

                    {/* Apply Button */}
                    <Link
                      to={`/jobs/${job.id}`}
                      className="inline-flex items-center text-azure hover:text-azureSoft transition-colors duration-200 font-medium"
                    >
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Jobs Button */}
            <div className="text-center">
              <Link
                to="/jobs"
                className="inline-flex items-center px-8 py-3 bg-azure text-white font-medium rounded-lg hover:bg-azureSoft transition-colors duration-200"
              >
                View All Job Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
