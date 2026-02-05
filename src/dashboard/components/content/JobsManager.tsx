import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Search, Filter, MapPin, Clock, DollarSign, Users, Briefcase } from 'lucide-react';
import Breadcrumbs from '../layout/Breadcrumbs';
import { DataTable, FormBuilder, ConfirmDialog, LoadingSpinner } from '../ui';
import { useToast } from '../ui/Toast';
import { JobListing } from '../../types/content';
import { TableColumn, FormField } from '../../types/ui';
import { simpleCloudStorageManager } from '../../utils';

const JobsManager: React.FC = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; job: JobListing | null }>({
    isOpen: false,
    job: null,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [formLoading, setFormLoading] = useState(false);

  const { showToast } = useToast();

  // Load jobs on component mount
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = useCallback(async () => {
    try {
      setLoading(true);
      const jobsData = await simpleCloudStorageManager.list<JobListing>('jobs');
      setJobs(jobsData);
    } catch (error) {
      console.error('Failed to load jobs:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to load job listings. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Filter jobs based on search term, location, type, and status
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchTerm || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase())) ||
      job.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !typeFilter || job.employmentType === typeFilter;
    const matchesStatus = !statusFilter || job.status === statusFilter;
    
    return matchesSearch && matchesLocation && matchesType && matchesStatus;
  });

  // Get unique locations for filter dropdown
  const uniqueLocations = Array.from(new Set(jobs.map(job => job.location))).sort();

  // Table columns configuration
  const columns: TableColumn<JobListing>[] = [
    {
      key: 'title',
      title: 'Job Title',
      sortable: true,
      render: (value, record) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            {record.location}
          </div>
        </div>
      ),
    },
    {
      key: 'employmentType',
      title: 'Employment Type',
      sortable: true,
      filterable: true,
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'permanent' 
            ? 'bg-green-100 text-green-800'
            : value === 'temporary'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-purple-100 text-purple-800'
        }`}>
          <Clock className="h-3 w-3 mr-1" />
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: 'salaryRange',
      title: 'Salary Range',
      render: (value) => (
        <div className="flex items-center text-sm text-gray-600">
          {value ? (
            <>
              <DollarSign className="h-3 w-3 mr-1" />
              {value}
            </>
          ) : (
            <span className="text-gray-400">Not specified</span>
          )}
        </div>
      ),
    },
    {
      key: 'requirements',
      title: 'Requirements',
      render: (value: string[]) => (
        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-3 w-3 mr-1" />
          {value.length} requirement{value.length !== 1 ? 's' : ''}
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      filterable: true,
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'published' 
            ? 'bg-green-100 text-green-800'
            : value === 'draft'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: 'createdAt',
      title: 'Created',
      sortable: true,
      render: (value) => (
        <div className="text-sm text-gray-600">
          {new Date(value).toLocaleDateString()}
        </div>
      ),
    },
  ];

  // Actions column
  const actionsColumn: TableColumn<JobListing> = {
    key: 'id' as keyof JobListing,
    title: 'Actions',
    render: (_, record) => (
      <div className="flex items-center space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(record);
          }}
          className="text-azure hover:text-azureSoft transition-colors duration-200"
          title="Edit job listing"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteConfirm(record);
          }}
          className="text-red-600 hover:text-red-800 transition-colors duration-200"
          title="Delete job listing"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  };

  // Combine all columns
  const allColumns = [...columns, actionsColumn];

  // Form fields configuration
  const formFields: FormField[] = [
    {
      name: 'title',
      label: 'Job Title',
      type: 'text',
      required: true,
      placeholder: 'Enter job title',
      validation: {
        min: 3,
        max: 100,
      },
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      required: true,
      placeholder: 'e.g., London, UK or Remote',
      validation: {
        min: 2,
        max: 100,
      },
    },
    {
      name: 'employmentType',
      label: 'Employment Type',
      type: 'select',
      required: true,
      options: [
        { label: 'Permanent', value: 'permanent' },
        { label: 'Temporary', value: 'temporary' },
        { label: 'Contract', value: 'contract' },
      ],
    },
    {
      name: 'description',
      label: 'Job Description',
      type: 'textarea',
      required: true,
      placeholder: 'Enter detailed job description',
      validation: {
        min: 20,
        max: 2000,
      },
    },
    {
      name: 'requirements',
      label: 'Requirements (one per line)',
      type: 'textarea',
      required: true,
      placeholder: 'Enter job requirements, one per line',
      validation: {
        min: 10,
        custom: (value: string) => {
          if (!value) return null;
          const requirements = value.split('\n').filter(r => r.trim());
          if (requirements.length === 0) return 'At least one requirement is required';
          if (requirements.length > 20) return 'Maximum 20 requirements allowed';
          return null;
        },
      },
    },
    {
      name: 'benefits',
      label: 'Benefits (one per line)',
      type: 'textarea',
      required: true,
      placeholder: 'Enter job benefits, one per line',
      validation: {
        min: 5,
        custom: (value: string) => {
          if (!value) return null;
          const benefits = value.split('\n').filter(b => b.trim());
          if (benefits.length === 0) return 'At least one benefit is required';
          if (benefits.length > 15) return 'Maximum 15 benefits allowed';
          return null;
        },
      },
    },
    {
      name: 'salaryRange',
      label: 'Salary Range (optional)',
      type: 'text',
      placeholder: 'e.g., £25,000 - £35,000 per annum',
      validation: {
        max: 100,
      },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
  ];

  // Event handlers
  const handleCreate = () => {
    setEditingJob(null);
    setIsFormOpen(true);
  };

  const handleEdit = (job: JobListing) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = (job: JobListing) => {
    setDeleteConfirm({ isOpen: true, job });
  };

  const handleFormSubmit = async (values: Record<string, any>) => {
    try {
      setFormLoading(true);
      
      // Process requirements and benefits from textarea to array
      const requirements = values.requirements
        .split('\n')
        .map((r: string) => r.trim())
        .filter((r: string) => r.length > 0);

      const benefits = values.benefits
        .split('\n')
        .map((b: string) => b.trim())
        .filter((b: string) => b.length > 0);

      const jobData = {
        title: values.title,
        description: values.description,
        location: values.location,
        employmentType: values.employmentType as 'temporary' | 'permanent' | 'contract',
        requirements,
        benefits,
        salaryRange: values.salaryRange || undefined,
        status: values.status as 'draft' | 'published' | 'archived',
        createdBy: 'current-user', // TODO: Get from auth context
      };

      if (editingJob) {
        // Update existing job
        await simpleCloudStorageManager.update<JobListing>('jobs', editingJob.id, jobData);
        showToast({
          type: 'success',
          title: 'Success',
          message: 'Job listing updated successfully!',
        });
      } else {
        // Create new job
        await simpleCloudStorageManager.create<JobListing>('jobs', jobData);
        showToast({
          type: 'success',
          title: 'Success',
          message: 'Job listing created successfully!',
        });
      }

      // Dispatch custom event to update dashboard stats
      window.dispatchEvent(new CustomEvent('cms-data-updated'));

      setIsFormOpen(false);
      setEditingJob(null);
      await loadJobs();
    } catch (error) {
      console.error('Failed to save job:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to save job listing. Please try again.',
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingJob(null);
  };

  const handleDelete = async () => {
    if (!deleteConfirm.job) return;

    try {
      await simpleCloudStorageManager.delete('jobs', deleteConfirm.job.id);
      showToast({
        type: 'success',
        title: 'Success',
        message: 'Job listing deleted successfully!',
      });
      
      // Dispatch custom event to update dashboard stats
      window.dispatchEvent(new CustomEvent('cms-data-updated'));
      
      setDeleteConfirm({ isOpen: false, job: null });
      await loadJobs();
    } catch (error) {
      console.error('Failed to delete job:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to delete job listing. Please try again.',
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, job: null });
  };

  // Prepare initial form values for editing
  const getInitialFormValues = () => {
    if (!editingJob) return {};
    
    return {
      ...editingJob,
      requirements: editingJob.requirements.join('\n'),
      benefits: editingJob.benefits.join('\n'),
    };
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6">
        <Breadcrumbs />
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <Breadcrumbs />
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary font-heading">Job Listings Management</h1>
            <p className="text-footerText mt-1">
              Manage job postings with employment types, locations, and status
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="inline-flex items-center px-4 py-2 bg-azure text-white text-sm font-medium rounded-lg hover:bg-azureSoft focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azure transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Job Listing
          </button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-azure focus:border-transparent transition-colors duration-200"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-azure focus:border-transparent transition-colors duration-200"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-azure focus:border-transparent transition-colors duration-200"
            >
              <option value="">All Types</option>
              <option value="permanent">Permanent</option>
              <option value="temporary">Temporary</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-azure focus:border-transparent transition-colors duration-200"
            >
              <option value="">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Statistics */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Jobs</p>
              <p className="text-lg font-semibold text-gray-900">{jobs.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Published</p>
              <p className="text-lg font-semibold text-gray-900">
                {jobs.filter(job => job.status === 'published').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Draft</p>
              <p className="text-lg font-semibold text-gray-900">
                {jobs.filter(job => job.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Locations</p>
              <p className="text-lg font-semibold text-gray-900">{uniqueLocations.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <DataTable
          data={filteredJobs}
          columns={allColumns}
          loading={false}
          pagination={true}
          pageSize={10}
          onRowClick={(job) => handleEdit(job)}
        />
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={handleFormCancel}
            />
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {editingJob ? 'Edit Job Listing' : 'Create New Job Listing'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {editingJob 
                    ? 'Update the job listing information below.'
                    : 'Fill in the details to create a new job listing.'
                  }
                </p>
              </div>
              <FormBuilder
                fields={formFields}
                initialValues={getInitialFormValues()}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                loading={formLoading}
                submitText={editingJob ? 'Update Job Listing' : 'Create Job Listing'}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Job Listing"
        message={`Are you sure you want to delete "${deleteConfirm.job?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleDelete}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default JobsManager;