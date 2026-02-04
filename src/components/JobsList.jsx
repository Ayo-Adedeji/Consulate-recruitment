import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Search, Filter, ArrowRight, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { storageManager } from '../dashboard/utils/storage';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, locationFilter, typeFilter]);

  const loadJobs = async () => {
    try {
      // Get published job listings only
      const allJobs = await storageManager.list('jobs');
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
        return 'bg-green-100 text-green-800';
      case 'temporary':
        return 'bg-blue-100 text-blue-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azure"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Current Job Opportunities</h1>
          <p className="text-xl text-footerText max-w-3xl mx-auto">
            Discover exciting career opportunities with leading companies across various industries
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azure focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azure focus:border-transparent"
              >
                <option value="">All Locations</option>
                {getUniqueLocations().map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azure focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="permanent">Permanent</option>
                <option value="temporary">Temporary</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div className="flex items-center justify-center">
              <span className="text-sm text-gray-600">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500">
              {searchTerm || locationFilter || typeFilter 
                ? 'Try adjusting your search or filter criteria.'
                : 'Check back soon for new opportunities!'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      {/* Job Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-semibold text-primary hover:text-azure transition-colors duration-200">
                              <Link to={`/jobs/${job.id}`}>
                                {job.title}
                              </Link>
                            </h2>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEmploymentTypeColor(job.employmentType)}`}>
                              <Clock className="h-3 w-3 mr-1" />
                              {job.employmentType.charAt(0).toUpperCase() + job.employmentType.slice(1)}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-footerText mb-3">
                            <MapPin className="h-4 w-4 mr-2" />
                            {job.location}
                          </div>
                        </div>

                        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
                          Posted {formatDate(job.createdAt)}
                        </div>
                      </div>

                      {/* Job Description */}
                      <p className="text-footerText mb-4 leading-relaxed">
                        {job.description.length > 200 
                          ? job.description.substring(0, 200) + '...'
                          : job.description
                        }
                      </p>

                      {/* Job Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {job.salaryRange && (
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="h-4 w-4 mr-2" />
                            <span><strong>Salary:</strong> {job.salaryRange}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span><strong>Requirements:</strong> {job.requirements.length} requirement{job.requirements.length !== 1 ? 's' : ''}</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span><strong>Benefits:</strong> {job.benefits.length} benefit{job.benefits.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>

                      {/* Key Requirements Preview */}
                      {job.requirements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Key Requirements:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {job.requirements.slice(0, 3).map((requirement, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-azure mr-2">•</span>
                                {requirement}
                              </li>
                            ))}
                            {job.requirements.length > 3 && (
                              <li className="text-gray-500 italic">
                                +{job.requirements.length - 3} more requirements...
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="inline-flex items-center px-6 py-3 bg-azure text-white font-medium rounded-lg hover:bg-azureSoft transition-colors duration-200"
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-azure rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Don't See the Right Opportunity?</h3>
          <p className="text-azure-100 mb-6">
            Register your interest and we'll notify you when suitable positions become available.
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-white text-azure font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200">
            Register Interest
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsList;