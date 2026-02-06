import { useState, useEffect } from 'react';
import { MapPin, Clock, Search, DollarSign, Users, Briefcase, Star, Award, User, Phone, Mail, FileText, Send, CheckCircle, Heart, ArrowRight, X } from 'lucide-react';
import { simpleCloudStorageManager } from '../dashboard/utils';
import Navbar from './Navbar';
import Footer from './Footer';
import Process from './Process';
import IcoImage from './IcoImage';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [interestFormData, setInterestFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    jobType: '',
    experience: '',
    message: ''
  });
  const [isSubmittingInterest, setIsSubmittingInterest] = useState(false);
  const [interestSubmitted, setInterestSubmitted] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    loadJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, locationFilter, typeFilter]);

  // Advanced Intersection Observer for sequential animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          entry.target.classList.remove('animate-out');
        } else {
          entry.target.classList.add('animate-out');
          entry.target.classList.remove('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-animate-id]');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredJobs]);

  const loadJobs = async () => {
    try {
      // Get published job listings only
      const allJobs = await simpleCloudStorageManager.list('jobs');
      const publishedJobs = allJobs.filter(job => job.status === 'published');
      setJobs(publishedJobs);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term) ||
        job.requirements.some(req => req.toLowerCase().includes(term)) ||
        job.benefits.some(benefit => benefit.toLowerCase().includes(term))
      );
    }

    // Filter by location
    if (locationFilter) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Filter by employment type
    if (typeFilter) {
      filtered = filtered.filter(job => job.employmentType === typeFilter);
    }

    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredJobs(filtered);
  };

  const getUniqueLocations = () => {
    const locations = new Set();
    jobs.forEach(job => locations.add(job.location));
    return Array.from(locations).sort();
  };

  const getEmploymentTypeColor = (type) => {
    switch (type) {
      case 'permanent':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'temporary':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contract':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleRegisterInterest = () => {
    console.log('Register Interest button clicked!');
    setShowInterestForm(true);
    // Scroll to the form
    setTimeout(() => {
      document.getElementById('interest-form')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  const handleCloseInterestForm = () => {
    setShowInterestForm(false);
    setInterestSubmitted(false);
    // Reset form data when closing
    setInterestFormData({
      fullName: '',
      email: '',
      phone: '',
      jobType: '',
      experience: '',
      message: ''
    });
  };

  const handleInterestFormChange = (e) => {
    const { name, value } = e.target;
    setInterestFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingInterest(true);

    // FormSubmit will handle the submission
    // Form has action and method attributes
    setTimeout(() => {
      setInterestSubmitted(true);
      setIsSubmittingInterest(false);
      
      // Reset form
      setInterestFormData({
        fullName: '',
        email: '',
        phone: '',
        jobType: '',
        experience: '',
        message: ''
      });
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-azure/20 border-t-azure"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-azure animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      {/* Enhanced CSS for animations */}
      <style>{`
        .animate-slide-in-left {
          opacity: 0;
          transform: translateX(-100px) rotateY(-10deg);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-slide-in-right {
          opacity: 0;
          transform: translateX(100px) rotateY(10deg);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-slide-in-up {
          opacity: 0;
          transform: translateY(80px) scale(0.95);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-scale-in {
          opacity: 0;
          transform: scale(0.8) rotateX(10deg);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-in {
          opacity: 1 !important;
          transform: translateX(0) translateY(0) scale(1) rotateX(0) rotateY(0) !important;
        }
        
        .animate-out {
          opacity: 0 !important;
          transform: translateX(-30px) translateY(15px) scale(0.98) rotateY(-5deg) !important;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.6, 1) !important;
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        .stagger-6 { transition-delay: 0.6s; }
        .stagger-7 { transition-delay: 0.7s; }
        .stagger-8 { transition-delay: 0.8s; }
        
        .card-hover {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 127, 255, 0.15);
        }
        
        .job-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 127, 255, 0.12);
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-azure via-azureSoft to-primary relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-accent rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-accent rounded-full animate-pulse"></div>
        </div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 animate-float">
            <Briefcase className="h-8 w-8 text-white opacity-20" />
          </div>
          <div className="absolute top-40 right-1/4 animate-float-delayed">
            <Star className="h-6 w-6 text-accent opacity-30" />
          </div>
          <div className="absolute bottom-40 left-1/3 animate-float">
            <Award className="h-7 w-7 text-white opacity-25" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-5xl md:text-5xl font-bold text-white font-heading mb-8 leading-tight drop-shadow-2xl">
                Current Job Opportunities
              </h1>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-lg">
                Discover exciting career opportunities with leading companies across various industries
              </p>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-current text-blue-50">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search and Filter */}
          <div 
            className="animate-slide-in-up mb-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
            data-animate-id="search-filters"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-azure focus:border-azure transition-all duration-300 hover:border-azure/50"
                />
              </div>
              
              <div className="flex items-center gap-3 relative">
                <MapPin className="h-5 w-5 text-azure absolute left-4 z-10" />
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-azure focus:border-azure transition-all duration-300 hover:border-azure/50 appearance-none bg-white"
                >
                  <option value="">All Locations</option>
                  {getUniqueLocations().map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 relative">
                <Clock className="h-5 w-5 text-azure absolute left-4 z-10" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-azure focus:border-azure transition-all duration-300 hover:border-azure/50 appearance-none bg-white"
                >
                  <option value="">All Types</option>
                  <option value="permanent">Permanent</option>
                  <option value="temporary">Temporary</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              <div className="flex items-center justify-center bg-gradient-to-r from-azure/10 to-purple/10 rounded-xl p-4 border border-azure/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-azure">{filteredJobs.length}</div>
                  <div className="text-sm text-gray-600">Job{filteredJobs.length !== 1 ? 's' : ''} Found</div>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          {filteredJobs.length === 0 ? (
            <div 
              className="animate-slide-in-up text-center py-20 bg-white rounded-2xl shadow-lg"
              data-animate-id="no-jobs"
            >
              <div className="text-gray-400 mb-6">
                <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <Briefcase className="h-12 w-12" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No jobs found</h3>
              <p className="text-gray-500 text-lg max-w-md mx-auto">
                {searchTerm || locationFilter || typeFilter 
                  ? 'Try adjusting your search or filter criteria to find more opportunities.'
                  : 'Check back soon for new exciting opportunities!'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredJobs.map((job, index) => (
                <div
                  key={job.id}
                  className={`animate-scale-in stagger-${(index % 8) + 1} job-card bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border-2 border-gray-100 hover:border-azure/30`}
                  data-animate-id={`job-${job.id}`}
                >
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        {/* Job Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <h2 className="text-2xl md:text-3xl font-bold text-primary hover:text-azure transition-colors duration-200">
                                <a href={`/jobs/${job.id}`}>
                                  {job.title}
                                </a>
                              </h2>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getEmploymentTypeColor(job.employmentType)}`}>
                                <Clock className="h-4 w-4 mr-2" />
                                {job.employmentType.charAt(0).toUpperCase() + job.employmentType.slice(1)}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-gray-600 mb-4">
                              <MapPin className="h-5 w-5 mr-3 text-azure" />
                              <span className="text-lg">{job.location}</span>
                            </div>
                          </div>

                          <div className="text-sm text-gray-500 mt-2 sm:mt-0 bg-gray-50 px-3 py-2 rounded-lg">
                            Posted {formatDate(job.createdAt)}
                          </div>
                        </div>

                        {/* Job Description */}
                        <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                          {job.description.length > 200 
                            ? job.description.substring(0, 200) + '...'
                            : job.description
                          }
                        </p>

                        {/* Job Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                          {job.salaryRange && (
                            <div className="flex items-center text-gray-700 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                              <DollarSign className="h-5 w-5 mr-3 text-emerald-600" />
                              <div>
                                <div className="font-semibold text-emerald-800">Salary</div>
                                <div className="text-sm">{job.salaryRange}</div>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <Users className="h-5 w-5 mr-3 text-blue-600" />
                            <div>
                              <div className="font-semibold text-blue-800">Requirements</div>
                              <div className="text-sm">{job.requirements.length} requirement{job.requirements.length !== 1 ? 's' : ''}</div>
                            </div>
                          </div>

                          <div className="flex items-center text-gray-700 bg-purple-50 p-3 rounded-lg border border-purple-200">
                            <Star className="h-5 w-5 mr-3 text-purple-600" />
                            <div>
                              <div className="font-semibold text-purple-800">Benefits</div>
                              <div className="text-sm">{job.benefits.length} benefit{job.benefits.length !== 1 ? 's' : ''}</div>
                            </div>
                          </div>
                        </div>

                        {/* Key Requirements Preview */}
                        {job.requirements.length > 0 && (
                          <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                              <Users className="h-5 w-5 mr-2 text-azure" />
                              Key Requirements:
                            </h4>
                            <ul className="text-gray-700 space-y-2">
                              {job.requirements.slice(0, 3).map((requirement, reqIndex) => (
                                <li key={reqIndex} className="flex items-start">
                                  <span className="text-azure mr-3 mt-1">•</span>
                                  <span>{requirement}</span>
                                </li>
                              ))}
                              {job.requirements.length > 3 && (
                                <li className="text-azure font-medium italic">
                                  +{job.requirements.length - 3} more requirements...
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="mt-6 lg:mt-0 lg:ml-8">
                        <a
                          href={`/jobs/${job.id}`}
                          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-azure via-azureSoft to-primary text-white font-semibold rounded-xl hover:from-azureSoft hover:via-primary hover:to-azure focus:outline-none focus:ring-4 focus:ring-azure/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
                        >
                          View Details
                          <ArrowRight className="ml-3 h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div 
            className="animate-slide-in-up mt-20 bg-gradient-to-r from-azure via-azureSoft to-primary rounded-2xl p-12 text-center text-white shadow-2xl"
            data-animate-id="cta-section"
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Don't See the Right Opportunity?</h3>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Register your interest and we'll notify you when suitable positions become available. 
                Our team is always working to match talented professionals with their perfect roles.
              </p>
              <button 
                onClick={handleRegisterInterest}
                className="inline-flex items-center px-8 py-4 bg-white text-azure font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Heart className="mr-3 h-5 w-5" />
                Register Interest
              </button>
            </div>
          </div>

          {/* Register Interest Form */}
          {showInterestForm && (
            <div 
              id="interest-form"
              className="mt-12 bg-white rounded-2xl shadow-xl border border-gray-200 animate-fade-in relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseInterestForm}
                className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-azure/20"
                aria-label="Close form"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="p-6 sm:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-azure to-primary rounded-full mb-4">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">Register Your Interest</h2>
                    <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                      Tell us about your ideal job and we'll keep you informed when suitable positions become available.
                    </p>
                  </div>

                  {interestSubmitted ? (
                    <div className="text-center py-8 sm:py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-4">Thank You!</h3>
                      <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                        Your interest has been registered successfully. We'll be in touch when suitable opportunities arise.
                      </p>
                      <button
                        onClick={handleCloseInterestForm}
                        className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-azure to-primary text-white font-semibold rounded-xl hover:from-azureSoft hover:to-azure transition-all duration-300 transform hover:scale-105"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <form 
                      action="https://formsubmit.co/admin@consulaterecruitment.co.uk"
                      method="POST"
                      onSubmit={handleInterestFormSubmit} 
                      className="space-y-6 sm:space-y-8"
                    >
                      {/* FormSubmit Configuration */}
                      <input type="hidden" name="_subject" value="Job Interest Registration" />
                      <input type="hidden" name="_captcha" value="false" />
                      <input type="hidden" name="_template" value="table" />
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                            <User className="inline h-4 w-4 mr-2" />
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="full_name"
                            value={interestFormData.fullName}
                            onChange={handleInterestFormChange}
                            required
                            className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-azure focus:border-azure transition-all duration-300 hover:border-azure/50 text-base"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            <Mail className="inline h-4 w-4 mr-2" />
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={interestFormData.email}
                            onChange={handleInterestFormChange}
                            required
                            className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-azure focus:border-azure transition-all duration-300 hover:border-azure/50 text-base"
                            placeholder="Enter your email address"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                            <Phone className="inline h-4 w-4 mr-2" />
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={interestFormData.phone}
                            onChange={handleInterestFormChange}
                            className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-azure focus:border-azure transition-all duration-300 hover:border-azure/50 text-base"
                            placeholder="Enter your phone number"
                          />
                        </div>

                        <div>
                          <label htmlFor="jobType" className="block text-sm font-semibold text-gray-700 mb-2">
                            <Briefcase className="inline h-4 w-4 mr-2" />
                            Preferred Job Type *
                          </label>
                          <select
                            id="jobType"
                            name="job_type"
                            value={interestFormData.jobType}
                            onChange={handleInterestFormChange}
                            required
                            className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-azure focus:border-azure transition-all duration-300 hover:border-azure/50 appearance-none bg-white text-base"
                          >
                            <option value="">Select job type</option>
                            <option value="permanent">Permanent</option>
                            <option value="temporary">Temporary</option>
                            <option value="contract">Contract</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="cleaning">Cleaning Services</option>
                            <option value="management">Management</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                          <Award className="inline h-4 w-4 mr-2" />
                          Years of Experience
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          value={interestFormData.experience}
                          onChange={handleInterestFormChange}
                          className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-azure focus:border-azure transition-all duration-300 hover:border-azure/50 appearance-none bg-white text-base"
                        >
                          <option value="">Select experience level</option>
                          <option value="0-1">0-1 years (Entry Level)</option>
                          <option value="2-5">2-5 years</option>
                          <option value="6-10">6-10 years</option>
                          <option value="11-15">11-15 years</option>
                          <option value="15+">15+ years (Senior Level)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                          <FileText className="inline h-4 w-4 mr-2" />
                          Additional Information
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={interestFormData.message}
                          onChange={handleInterestFormChange}
                          rows={4}
                          className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-azure focus:border-azure transition-all duration-300 hover:border-azure/50 resize-none text-base"
                          placeholder="Tell us about your ideal role, skills, or any specific requirements..."
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                        <button
                          type="submit"
                          disabled={isSubmittingInterest}
                          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-azure via-azureSoft to-primary text-white font-semibold text-lg rounded-xl hover:from-azureSoft hover:via-primary hover:to-azure focus:outline-none focus:ring-4 focus:ring-azure/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmittingInterest ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="mr-3 h-5 w-5" />
                              Submit Interest
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleCloseInterestForm}
                          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-700 font-semibold text-lg rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300/20 transition-all duration-300 transform hover:scale-105"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="text-center text-sm text-gray-500 mt-4 px-4 sm:px-0">
                        <p>
                          By submitting this form, you agree to be contacted about suitable job opportunities.
                          Your information will be sent to admin@consulaterecruitment.co.uk
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Process Component */}
      <Process />

      {/* ICO Component */}
      <IcoImage />

      <Footer />
    </div>
  );
};

export default JobsList;