import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  ArrowLeft, 
  Share2, 
  Calendar,
  CheckCircle,
  Star,
  Building,
  Mail
} from 'lucide-react';
import { simpleCloudStorageManager } from '../dashboard/utils';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationMessage, setShowApplicationMessage] = useState(false);
  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    if (id) {
      loadJobDetail();
    }
  }, [id]);

  const loadJobDetail = async () => {
    try {
      // Get all published jobs
      const allJobs = await simpleCloudStorageManager.list('jobs');
      const publishedJobs = allJobs.filter(job => job.status === 'published');
      
      // Find the job with matching ID
      const foundJob = publishedJobs.find(job => job.id === id);
      
      if (foundJob) {
        setJob(foundJob);
        
        // Get related jobs (same employment type or location, excluding current job)
        const related = publishedJobs
          .filter(j => 
            j.id !== foundJob.id && 
            (j.employmentType === foundJob.employmentType || j.location === foundJob.location)
          )
          .slice(0, 3);
        setRelatedJobs(related);
      }
    } catch (error) {
      console.error('Failed to load job details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job opportunity: ${job.title} at ${job.location}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Job link copied to clipboard!');
    }
  };

  const handleApplyNow = () => {
    setShowApplicationMessage(true);
    // Scroll to the message
    setTimeout(() => {
      document.getElementById('application-message')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azure"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
            <p className="text-gray-600 mb-8">The job you're looking for doesn't exist or has been removed.</p>
            <Link
              to="/jobs"
              className="inline-flex items-center px-6 py-3 bg-azure text-white font-medium rounded-lg hover:bg-azureSoft transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/jobs"
            className="inline-flex items-center text-azure hover:text-azureSoft transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>

          {/* Employment Type Badge */}
          <div className="mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getEmploymentTypeColor(job.employmentType)}`}>
              <Clock className="h-4 w-4 mr-2" />
              {job.employmentType.charAt(0).toUpperCase() + job.employmentType.slice(1)} Position
            </span>
          </div>

          {/* Job Title */}
          <h1 className="text-4xl font-bold text-primary mb-4 leading-tight">
            {job.title}
          </h1>

          {/* Job Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="font-medium">{job.location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Posted {formatDate(job.createdAt)}</span>
            </div>
            {job.salaryRange && (
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                <span className="font-medium">{job.salaryRange}</span>
              </div>
            )}
            <button
              onClick={handleShare}
              className="flex items-center text-azure hover:text-azureSoft transition-colors duration-200"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Job
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Requirements</div>
              <div className="text-lg font-semibold text-gray-900">{job.requirements.length}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Star className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Benefits</div>
              <div className="text-lg font-semibold text-gray-900">{job.benefits.length}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center col-span-2 md:col-span-1">
              <Building className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Job Type</div>
              <div className="text-lg font-semibold text-gray-900 capitalize">{job.employmentType}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              {/* Job Description */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">Job Description</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </section>

              {/* Requirements */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Benefits */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">Benefits & Perks</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="h-5 w-5 text-azure mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Apply Now Section */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-primary mb-4">Ready to Apply?</h2>
                <p className="text-gray-600 mb-6">
                  Take the next step in your career journey with this exciting opportunity.
                </p>
                <button
                  onClick={handleApplyNow}
                  className="inline-flex items-center px-8 py-4 bg-azure text-white font-semibold text-lg rounded-lg hover:bg-azureSoft transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Apply Now
                </button>
              </div>

              {/* Application Message */}
              {showApplicationMessage && (
                <div 
                  id="application-message"
                  className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg animate-fade-in"
                >
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        Submit Your Application
                      </h3>
                      <p className="text-blue-800 mb-3">
                        To apply for this position, please submit your details and CV to:
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <p className="text-blue-900 font-medium">
                          📧 <strong>Email:</strong> <span className="text-azure">careers@consulaterecruitment.com</span>
                        </p>
                        <p className="text-sm text-blue-700 mt-2">
                          Please include the job title "{job.title}" in your email subject line.
                        </p>
                      </div>
                      <p className="text-sm text-blue-700 mt-3">
                        We'll review your application and get back to you within 2-3 business days.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Job Summary Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8 sticky top-8">
              <h3 className="text-lg font-semibold text-primary mb-4">Job Summary</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Position</div>
                  <div className="font-medium text-gray-900">{job.title}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Location</div>
                  <div className="font-medium text-gray-900">{job.location}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Employment Type</div>
                  <div className="font-medium text-gray-900 capitalize">{job.employmentType}</div>
                </div>
                {job.salaryRange && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Salary Range</div>
                    <div className="font-medium text-gray-900">{job.salaryRange}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-gray-500 mb-1">Posted Date</div>
                  <div className="font-medium text-gray-900">{formatDate(job.createdAt)}</div>
                </div>
              </div>
            </div>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Related Jobs</h3>
                <div className="space-y-4">
                  {relatedJobs.map((relatedJob) => (
                    <Link
                      key={relatedJob.id}
                      to={`/jobs/${relatedJob.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-azure hover:shadow-sm transition-all duration-200"
                    >
                      <h4 className="font-medium text-gray-900 mb-2 hover:text-azure transition-colors duration-200">
                        {relatedJob.title}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        {relatedJob.location}
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEmploymentTypeColor(relatedJob.employmentType)}`}>
                        {relatedJob.employmentType.charAt(0).toUpperCase() + relatedJob.employmentType.slice(1)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call to Action Footer */}
      <div className="bg-azure">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Explore More Opportunities</h3>
          <p className="text-azure-100 mb-6">
            Discover other exciting career opportunities that match your skills and interests.
          </p>
          <Link
            to="/jobs"
            className="inline-flex items-center px-6 py-3 bg-white text-azure font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            View All Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;