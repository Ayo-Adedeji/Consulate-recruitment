import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Star, Upload, X } from 'lucide-react';
import Breadcrumbs from '../layout/Breadcrumbs';
import { DataTable, FormBuilder, ConfirmDialog, LoadingSpinner } from '../ui';
import { useToast } from '../ui/Toast';
import { Testimonial } from '../../types/content';
import { TableColumn, FormField } from '../../types/ui';
import { storageManager } from '../../utils/storage';

// Star Rating Component
const StarRating: React.FC<{ 
  rating: number; 
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}> = ({ rating, size = 'md', interactive = false, onChange }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const handleClick = (starRating: number) => {
    if (interactive && onChange) {
      onChange(starRating);
    }
  };

  const handleMouseEnter = (starRating: number) => {
    if (interactive) {
      setHoverRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hoverRating || rating);
        return (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              filled ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''} transition-colors duration-150`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
};

// Image Upload Component
const ImageUpload: React.FC<{
  value?: string;
  onChange: (imageUrl: string | undefined) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder = "Upload client image" }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      // Convert to base64 for demo purposes
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Client"
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
          />
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors duration-200 ${
            dragOver
              ? 'border-azure bg-azure/5'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {uploading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" />
              <span className="ml-2 text-sm text-gray-600">Uploading...</span>
            </div>
          ) : (
            <>
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">{placeholder}</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              >
                Choose File
              </label>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG up to 5MB
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const TestimonialsManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; testimonial: Testimonial | null }>({
    isOpen: false,
    testimonial: null,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<string>('');
  const [formLoading, setFormLoading] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formImage, setFormImage] = useState<string | undefined>();

  const { showToast } = useToast();

  // Load testimonials on component mount
  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      const testimonialsData = await storageManager.list<Testimonial>('testimonials');
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error('Failed to load testimonials:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to load testimonials. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Filter testimonials based on search term and rating
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = !searchTerm || 
      testimonial.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.clientRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.reviewText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (testimonial.companyName && testimonial.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRating = !ratingFilter || testimonial.rating.toString() === ratingFilter;
    
    return matchesSearch && matchesRating;
  });

  // Table columns configuration
  const columns: TableColumn<Testimonial>[] = [
    {
      key: 'clientName',
      title: 'Client',
      sortable: true,
      render: (value, record) => (
        <div className="flex items-center space-x-3">
          {record.clientImage && (
            <img
              src={record.clientImage}
              alt={value}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{record.clientRole}</div>
            {record.companyName && (
              <div className="text-xs text-gray-400">{record.companyName}</div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'rating',
      title: 'Rating',
      sortable: true,
      filterable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <StarRating rating={value} size="sm" />
          <span className="text-sm text-gray-600">({value}/5)</span>
        </div>
      ),
    },
    {
      key: 'reviewText',
      title: 'Review',
      render: (value) => (
        <div className="text-sm text-gray-600 max-w-xs truncate" title={value}>
          {value}
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
  ];

  // Actions column
  const actionsColumn: TableColumn<Testimonial> = {
    key: 'id' as keyof Testimonial,
    title: 'Actions',
    render: (_, record) => (
      <div className="flex items-center space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(record);
          }}
          className="text-azure hover:text-azureSoft transition-colors duration-200"
          title="Edit testimonial"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteConfirm(record);
          }}
          className="text-red-600 hover:text-red-800 transition-colors duration-200"
          title="Delete testimonial"
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
      name: 'clientName',
      label: 'Client Name',
      type: 'text',
      required: true,
      placeholder: 'Enter client full name',
      validation: {
        min: 2,
        max: 100,
      },
    },
    {
      name: 'clientRole',
      label: 'Client Role/Position',
      type: 'text',
      required: true,
      placeholder: 'e.g., HR Manager, CEO, etc.',
      validation: {
        min: 2,
        max: 100,
      },
    },
    {
      name: 'companyName',
      label: 'Company Name (optional)',
      type: 'text',
      placeholder: 'Enter company name',
      validation: {
        max: 100,
      },
    },
    {
      name: 'reviewText',
      label: 'Review Text',
      type: 'textarea',
      required: true,
      placeholder: 'Enter the client testimonial...',
      validation: {
        min: 10,
        max: 1000,
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
    setEditingTestimonial(null);
    setFormRating(5);
    setFormImage(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormRating(testimonial.rating);
    setFormImage(testimonial.clientImage);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = (testimonial: Testimonial) => {
    setDeleteConfirm({ isOpen: true, testimonial });
  };

  const handleFormSubmit = async (values: Record<string, any>) => {
    try {
      setFormLoading(true);
      
      const testimonialData = {
        clientName: values.clientName,
        clientRole: values.clientRole,
        companyName: values.companyName || undefined,
        rating: formRating,
        reviewText: values.reviewText,
        clientImage: formImage,
        status: values.status as 'draft' | 'published' | 'archived',
        createdBy: 'current-user', // TODO: Get from auth context
      };

      if (editingTestimonial) {
        // Update existing testimonial
        await storageManager.update<Testimonial>('testimonials', editingTestimonial.id, testimonialData);
        showToast({
          type: 'success',
          title: 'Success',
          message: 'Testimonial updated successfully!',
        });
      } else {
        // Create new testimonial
        await storageManager.create<Testimonial>('testimonials', testimonialData);
        showToast({
          type: 'success',
          title: 'Success',
          message: 'Testimonial created successfully!',
        });
      }

      setIsFormOpen(false);
      setEditingTestimonial(null);
      setFormRating(5);
      setFormImage(undefined);
      await loadTestimonials();
    } catch (error) {
      console.error('Failed to save testimonial:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to save testimonial. Please try again.',
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingTestimonial(null);
    setFormRating(5);
    setFormImage(undefined);
  };

  const handleDelete = async () => {
    if (!deleteConfirm.testimonial) return;

    try {
      await storageManager.delete('testimonials', deleteConfirm.testimonial.id);
      showToast({
        type: 'success',
        title: 'Success',
        message: 'Testimonial deleted successfully!',
      });
      setDeleteConfirm({ isOpen: false, testimonial: null });
      await loadTestimonials();
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to delete testimonial. Please try again.',
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, testimonial: null });
  };

  // Prepare initial form values for editing
  const getInitialFormValues = () => {
    if (!editingTestimonial) return {};
    
    return {
      clientName: editingTestimonial.clientName,
      clientRole: editingTestimonial.clientRole,
      companyName: editingTestimonial.companyName || '',
      reviewText: editingTestimonial.reviewText,
      status: editingTestimonial.status,
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
            <h1 className="text-2xl font-bold text-primary font-heading">Testimonials Management</h1>
            <p className="text-footerText mt-1">
              Manage client testimonials and reviews with ratings
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="inline-flex items-center px-4 py-2 bg-azure text-white text-sm font-medium rounded-lg hover:bg-azureSoft focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azure transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-azure focus:border-transparent transition-colors duration-200"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-azure focus:border-transparent transition-colors duration-200"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {/* Testimonials Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <DataTable
          data={filteredTestimonials}
          columns={allColumns}
          loading={false}
          pagination={true}
          pageSize={10}
          onRowClick={(testimonial) => handleEdit(testimonial)}
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {editingTestimonial ? 'Edit Testimonial' : 'Create New Testimonial'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {editingTestimonial 
                    ? 'Update the testimonial information below.'
                    : 'Fill in the details to create a new testimonial.'
                  }
                </p>
              </div>

              {/* Custom Rating and Image Fields */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-3">
                    <StarRating 
                      rating={formRating} 
                      size="lg" 
                      interactive 
                      onChange={setFormRating}
                    />
                    <span className="text-sm text-gray-600">({formRating}/5)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Image (optional)
                  </label>
                  <ImageUpload 
                    value={formImage} 
                    onChange={setFormImage}
                    placeholder="Upload client photo"
                  />
                </div>
              </div>

              <FormBuilder
                fields={formFields}
                initialValues={getInitialFormValues()}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                loading={formLoading}
                submitText={editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${deleteConfirm.testimonial?.clientName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleDelete}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default TestimonialsManager;