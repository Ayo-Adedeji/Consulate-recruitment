import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ServicesManager from '../components/content/ServicesManager';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastProvider } from '../components/ui/Toast';
import { Service } from '../types/content';

// Mock the storage manager with a more realistic implementation
const mockServices: Service[] = [];

const mockStorageManager = {
  list: jest.fn().mockImplementation(() => Promise.resolve([...mockServices])),
  create: jest.fn().mockImplementation((collection: string, item: any) => {
    const newService: Service = {
      ...item,
      id: `service-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockServices.push(newService);
    return Promise.resolve(newService);
  }),
  update: jest.fn().mockImplementation((collection: string, id: string, updates: any) => {
    const index = mockServices.findIndex(s => s.id === id);
    if (index >= 0) {
      mockServices[index] = { ...mockServices[index], ...updates, updatedAt: new Date() };
      return Promise.resolve(mockServices[index]);
    }
    throw new Error('Service not found');
  }),
  delete: jest.fn().mockImplementation((collection: string, id: string) => {
    const index = mockServices.findIndex(s => s.id === id);
    if (index >= 0) {
      mockServices.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }),
};

jest.mock('../utils/storage', () => ({
  storageManager: mockStorageManager,
}));

// Mock Breadcrumbs component
jest.mock('../components/layout/Breadcrumbs', () => {
  return function MockBreadcrumbs() {
    return <div data-testid="breadcrumbs">Breadcrumbs</div>;
  };
});

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('ServicesManager Integration Tests', () => {
  beforeEach(() => {
    // Clear mock services before each test
    mockServices.length = 0;
    jest.clearAllMocks();
  });

  it('completes full CRUD workflow for services', async () => {
    render(
      <TestWrapper>
        <ServicesManager />
      </TestWrapper>
    );

    // Initially no services
    await waitFor(() => {
      expect(screen.getByText('No data found')).toBeInTheDocument();
    });

    // Create a new service
    const addButton = screen.getByText('Add Service');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Service')).toBeInTheDocument();
    });

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Service Title/), { 
      target: { value: 'Professional Recruitment' } 
    });
    fireEvent.change(screen.getByLabelText(/Category/), { 
      target: { value: 'recruitment' } 
    });
    fireEvent.change(screen.getByLabelText(/Description/), { 
      target: { value: 'Comprehensive recruitment services for all industries' } 
    });
    fireEvent.change(screen.getByLabelText(/Features/), { 
      target: { value: 'Candidate screening\nInterview coordination\nBackground checks' } 
    });
    fireEvent.change(screen.getByLabelText(/Pricing/), { 
      target: { value: 'Starting from $500 per placement' } 
    });
    fireEvent.change(screen.getByLabelText(/Status/), { 
      target: { value: 'published' } 
    });

    const submitButton = screen.getByText('Create Service');
    fireEvent.click(submitButton);

    // Wait for service to be created and form to close
    await waitFor(() => {
      expect(mockStorageManager.create).toHaveBeenCalledWith('services', {
        title: 'Professional Recruitment',
        description: 'Comprehensive recruitment services for all industries',
        category: 'recruitment',
        features: ['Candidate screening', 'Interview coordination', 'Background checks'],
        pricing: 'Starting from $500 per placement',
        status: 'published',
        createdBy: 'current-user',
      });
    });

    // Service should now appear in the table
    await waitFor(() => {
      expect(screen.getByText('Professional Recruitment')).toBeInTheDocument();
    });

    // Test search functionality
    const searchInput = screen.getByPlaceholderText('Search services...');
    fireEvent.change(searchInput, { target: { value: 'recruitment' } });

    // Service should still be visible
    expect(screen.getByText('Professional Recruitment')).toBeInTheDocument();

    // Test category filter
    const categoryFilter = screen.getByDisplayValue('All Categories');
    fireEvent.change(categoryFilter, { target: { value: 'recruitment' } });

    // Service should still be visible
    expect(screen.getByText('Professional Recruitment')).toBeInTheDocument();

    // Change filter to different category
    fireEvent.change(categoryFilter, { target: { value: 'cleaning' } });

    // Service should still be in DOM but filtered out by the table component
    expect(screen.getByText('Professional Recruitment')).toBeInTheDocument();

    // Reset filter
    fireEvent.change(categoryFilter, { target: { value: '' } });
    fireEvent.change(searchInput, { target: { value: '' } });

    // Edit the service
    const editButtons = screen.getAllByTitle('Edit service');
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Edit Service')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Professional Recruitment')).toBeInTheDocument();
    });

    // Update the title
    const titleInput = screen.getByDisplayValue('Professional Recruitment');
    fireEvent.change(titleInput, { target: { value: 'Premium Recruitment Services' } });

    const updateButton = screen.getByText('Update Service');
    fireEvent.click(updateButton);

    // Wait for update to complete
    await waitFor(() => {
      expect(mockStorageManager.update).toHaveBeenCalled();
    });

    // Updated service should appear
    await waitFor(() => {
      expect(screen.getByText('Premium Recruitment Services')).toBeInTheDocument();
    });

    // Delete the service
    const deleteButtons = screen.getAllByTitle('Delete service');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Delete Service')).toBeInTheDocument();
      expect(screen.getByText(/Are you sure you want to delete "Premium Recruitment Services"/)).toBeInTheDocument();
    });

    const confirmDeleteButton = screen.getByText('Delete');
    fireEvent.click(confirmDeleteButton);

    // Wait for deletion to complete
    await waitFor(() => {
      expect(mockStorageManager.delete).toHaveBeenCalled();
    });

    // Service should be removed
    await waitFor(() => {
      expect(screen.getByText('No data found')).toBeInTheDocument();
    });
  });

  it('handles form validation correctly', async () => {
    render(
      <TestWrapper>
        <ServicesManager />
      </TestWrapper>
    );

    // Open create form
    const addButton = screen.getByText('Add Service');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Service')).toBeInTheDocument();
    });

    // Try to submit empty form
    const submitButton = screen.getByText('Create Service');
    fireEvent.click(submitButton);

    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText('Service Title is required')).toBeInTheDocument();
      expect(screen.getByText('Category is required')).toBeInTheDocument();
      expect(screen.getByText('Description is required')).toBeInTheDocument();
    });

    // Fill in minimum required fields
    fireEvent.change(screen.getByLabelText(/Service Title/), { 
      target: { value: 'Test Service' } 
    });
    fireEvent.change(screen.getByLabelText(/Category/), { 
      target: { value: 'consultation' } 
    });
    fireEvent.change(screen.getByLabelText(/Description/), { 
      target: { value: 'Test description for the service' } 
    });
    fireEvent.change(screen.getByLabelText(/Features/), { 
      target: { value: 'Feature 1\nFeature 2' } 
    });
    fireEvent.change(screen.getByLabelText(/Status/), { 
      target: { value: 'draft' } 
    });

    // Submit should now work
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockStorageManager.create).toHaveBeenCalledWith('services', {
        title: 'Test Service',
        description: 'Test description for the service',
        category: 'consultation',
        features: ['Feature 1', 'Feature 2'],
        pricing: undefined,
        status: 'draft',
        createdBy: 'current-user',
      });
    });
  });

  it('handles multiple services with different categories', async () => {
    render(
      <TestWrapper>
        <ServicesManager />
      </TestWrapper>
    );

    // Create recruitment service
    let addButton = screen.getByText('Add Service');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Service')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Service Title/), { target: { value: 'Recruitment Service' } });
    fireEvent.change(screen.getByLabelText(/Category/), { target: { value: 'recruitment' } });
    fireEvent.change(screen.getByLabelText(/Description/), { target: { value: 'Recruitment description' } });
    fireEvent.change(screen.getByLabelText(/Features/), { target: { value: 'Recruitment feature' } });
    fireEvent.change(screen.getByLabelText(/Status/), { target: { value: 'published' } });

    fireEvent.click(screen.getByText('Create Service'));

    await waitFor(() => {
      expect(screen.getByText('Recruitment Service')).toBeInTheDocument();
    });

    // Create cleaning service
    addButton = screen.getByText('Add Service');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Service')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Service Title/), { target: { value: 'Cleaning Service' } });
    fireEvent.change(screen.getByLabelText(/Category/), { target: { value: 'cleaning' } });
    fireEvent.change(screen.getByLabelText(/Description/), { target: { value: 'Cleaning description' } });
    fireEvent.change(screen.getByLabelText(/Features/), { target: { value: 'Cleaning feature' } });
    fireEvent.change(screen.getByLabelText(/Status/), { target: { value: 'published' } });

    fireEvent.click(screen.getByText('Create Service'));

    await waitFor(() => {
      expect(screen.getByText('Cleaning Service')).toBeInTheDocument();
    });

    // Both services should be visible
    expect(screen.getByText('Recruitment Service')).toBeInTheDocument();
    expect(screen.getByText('Cleaning Service')).toBeInTheDocument();

    // Test category filtering
    const categoryFilter = screen.getByDisplayValue('All Categories');
    fireEvent.change(categoryFilter, { target: { value: 'recruitment' } });

    // Both services should still be in DOM (filtering is handled by DataTable internally)
    expect(screen.getByText('Recruitment Service')).toBeInTheDocument();
    expect(screen.getByText('Cleaning Service')).toBeInTheDocument();
  });
});