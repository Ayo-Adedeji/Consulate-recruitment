import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import Breadcrumbs from '../layout/Breadcrumbs';
import { DataTable, FormBuilder, ConfirmDialog, LoadingSpinner } from '../ui';
import { useToast } from '../ui/Toast';
import { Service } from '../../types/content';
import { TableColumn, FormField } from '../../types/ui';
import { storageManager } from '../../utils/storage';

const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; service: Service | null }>({
    isOpen: false,
    service: null,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [formLoading, setFormLoading] = useState(false);

  const { showToast } = useToast();

  // Load services on component mount
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = useCallback(async () => {
    try {
      setLoading(true);
      const servicesData = await storageManager.list<Service>('services');
      setServices(servicesData);
    } catch (error) {
      console.error('Failed to load services:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to load services. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Filter services based on search term and category
  const filteredServices = services.filter(service => {
    const matchesSearch = !searchTerm || 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !categoryFilter || service.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Table columns configuration
  const columns: TableColumn<Service>[] = [
    {
      key: 'title',
      title: 'Service Title',
      sortable: true,
      render: (value, record) => (
        <div className="font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: 'category',
      title: 'Category',
      sortable: true,
      filterable: true,
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'recruitment' 
            ? 'bg-blue-100 text-blue-800'
            : value === 'cleaning'
            ? 'bg-green-100 text-green-800'
            : 'bg-purple-100 text-purple-800'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: 'description',
      title: 'Description',
      render: (value) => (
        <div className="text-sm text-gray-600 max-w-xs truncate" title={value}>
          {value}
        </div>
      ),
    },
    {
      key: 'features',
      title: 'Features',
      render: (value: string[]) => (
        <div className="text-sm text-gray-600">
          {value.length} feature{value.length !== 1 ? 's' : ''}
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

  // Actions column (separate to avoid TypeScript issues)
  const actionsColumn: TableColumn<Service> = {
    key: 'id' as keyof Service, // Use 'id' as the key since it exists on Service
    title: 'Actions',
    render: (_, record) => (
      <div className="flex items-center space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(record);
          }}
          className="text-azure hover:text-azureSoft transition-colors duration-200"
          title="Edit service"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteConfirm(record);
          }}
          className="text-red-600 hover:text-red-800 transition-colors duration-200"
          title="Delete service"
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
      label: 'Service Title',
      type: 'text',
      required: true,
      placeholder: 'Enter service title',
      validation: {
        min: 3,
        max: 100,
      },
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { label: 'Recruitment', value: 'recruitment' },
        { label: 'Cleaning', value: 'cleaning' },
        { label: 'Consultation', value: 'consultation' },
      ],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      placeholder: 'Enter detailed service description',
      validation: {
        min: 10,
        max: 1000,
      },
    },
    {
      name: 'features',
      label: 'Features (one per line)',
      type: 'textarea',
      required: true,
      placeholder: 'Enter service features, one per line',
      validation: {
        min: 5,
        custom: (value: string) => {
          if (!value) return null;
          const features = value.split('\n').filter(f => f.trim());
          if (features.length === 0) return 'At least one feature is required';
          if (features.length > 10) return 'Maximum 10 features allowed';
          return null;
        },
      },
    },
    {
      name: 'pricing',
      label: 'Pricing (optional)',
      type: 'text',
      placeholder: 'e.g., Starting from $50/hour',
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
    setEditingService(null);
    setIsFormOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = (service: Service) => {
    setDeleteConfirm({ isOpen: true, service });
  };

  const handleFormSubmit = async (values: Record<string, any>) => {
    try {
      setFormLoading(true);
      
      // Process features from textarea to array
      const features = values.features
        .split('\n')
        .map((f: string) => f.trim())
        .filter((f: string) => f.length > 0);

      const serviceData = {
        title: values.title,
        description: values.description,
        category: values.category as 'recruitment' | 'cleaning' | 'consultation',
        features,
        pricing: values.pricing || undefined,
        status: values.status as 'draft' | 'published' | 'archived',
        createdBy: 'current-user', // TODO: Get from auth context
      };

      if (editingService) {
        // Update existing service
        await storageManager.update<Service>('services', editingService.id, serviceData);
        showToast({
          type: 'success',
          title: 'Success',
          message: 'Service updated successfully!',
        });
      } else {
        // Create new service
        await storageManager.create<Service>('services', serviceData);
        showToast({
          type: 'success',
          title: 'Success',
          message: 'Service created successfully!',
        });
      }

      setIsFormOpen(false);
      setEditingService(null);
      await loadServices();
    } catch (error) {
      console.error('Failed to save service:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to save service. Please try again.',
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingService(null);
  };

  const handleDelete = async () => {
    if (!deleteConfirm.service) return;

    try {
      await storageManager.delete('services', deleteConfirm.service.id);
      showToast({
        type: 'success',
        title: 'Success',
        message: 'Service deleted successfully!',
      });
      setDeleteConfirm({ isOpen: false, service: null });
      await loadServices();
    } catch (error) {
      console.error('Failed to delete service:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to delete service. Please try again.',
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, service: null });
  };

  // Prepare initial form values for editing
  const getInitialFormValues = () => {
    if (!editingService) return {};
    
    return {
      ...editingService,
      features: editingService.features.join('\n'),
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
            <h1 className="text-2xl font-bold text-primary font-heading">Services Management</h1>
            <p className="text-footerText mt-1">
              Manage recruitment, cleaning, and consultation services
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="inline-flex items-center px-4 py-2 bg-azure text-white text-sm font-medium rounded-lg hover:bg-azureSoft focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azure transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Service
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
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-azure focus:border-transparent transition-colors duration-200"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-azure focus:border-transparent transition-colors duration-200"
            >
              <option value="">All Categories</option>
              <option value="recruitment">Recruitment</option>
              <option value="cleaning">Cleaning</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <DataTable
          data={filteredServices}
          columns={allColumns}
          loading={false}
          pagination={true}
          pageSize={10}
          onRowClick={(service) => handleEdit(service)}
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
                  {editingService ? 'Edit Service' : 'Create New Service'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {editingService 
                    ? 'Update the service information below.'
                    : 'Fill in the details to create a new service.'
                  }
                </p>
              </div>
              <FormBuilder
                fields={formFields}
                initialValues={getInitialFormValues()}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                loading={formLoading}
                submitText={editingService ? 'Update Service' : 'Create Service'}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Service"
        message={`Are you sure you want to delete "${deleteConfirm.service?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleDelete}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default ServicesManager;