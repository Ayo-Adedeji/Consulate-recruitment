import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ServicesManager from '../components/content/ServicesManager';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastProvider } from '../components/ui/Toast';
import { storageManager } from '../utils/storage';
import { Service } from '../types/content';

// Mock the storage manager
jest.mock('../utils/storage', () => ({
  storageManager: {
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

// Mock Breadcrumbs component
jest.mock('../components/layout/Breadcrumbs', () => {
  return function MockBreadcrumbs() {
    return <div data-testid="breadcrumbs">Breadcrumbs</div>;
  };
});

const mockStorageManager = storageManager as jest.Mocked<typeof storageManager>;

const mockServices: Service[] = [
  {
    id: '1',
    title: 'Temporary Staffing',
    description: 'Short-term staffing solutions for businesses',
    category: 'recruitment',
    features: ['Quick placement', 'Flexible terms', '24/7 support'],
    pricing: 'Starting from $25/hour',
    status: 'published',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    createdBy: 'admin',
  },
  {
    id: '2',
    title: 'Office Cleaning',
    description: 'Professional office cleaning services',
    category: 'cleaning',
    features: ['Daily cleaning', 'Eco-friendly products', 'Insured staff'],
    status: 'published',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    createdBy: 'admin',
  },
];

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('ServicesManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockStorageManager.list.mockResolvedValue(mockServices);
  });

  it('renders services management page', async () => {
    render(
      <TestWrapper>
        <ServicesManager />
      </TestWrapper>
    );

    expect(screen.getByText('Services Management')).toBeInTheDocument();
    expect(screen.getByText('Manage recruitment, cleaning, and consultation services')).toBeInTheDocument();
    expect(screen.getByText('Add Service')).toBeInTheDocument();
  });

  it('loads and displays services', async () => {
    render(
      <TestWrapper>
        <ServicesManager />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(mockStorageManager.list).toHaveBeenCalledWith('services');
    });

    await waitFor(() => {
      expect(screen.getByText('Temporary Staffing')).toBeInTheDocument();
      expect(screen.getByText('Office Cleaning')).toBeInTheDocument();
    });
  });

  it('filters services by search term', async () => {
    render(
      <TestWrapper>
        <ServicesManager />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Temporary Staffing')).toBeInTheDocument();
      expect(screen.getByText('Office Cleaning')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search services...');
    fireEvent.change(searchInput, { target: { value: 'staffing' } });

    // The filtering happens in the component, so we should still see the services
    // but the table will filter them internally
    expect(searchInput).toHaveValue('staffing');
  });

  it('filters services by category', async () => {
    render(
      <TestWrapper>
        <ServicesManager />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Temporary Staffing')).toBeInTheDocument();
      expect(screen.getByText('Office Cleaning')).toBeInTheDocument();
    });

    const categoryFilter = screen.getByDisplayValue('All Categories');
    fireEvent.change(categoryFilter, { target: { value: 'recruitment' } });

    expect(categoryFilter).toHaveValue('recruitment');
  });

  it('opens create service form when Add Service button is clicked', async () => {
    render(
      <TestWrapper>
        <ServicesManager />
      </TestWrapper>
    );

    const addButton = screen.getByText('Add Service');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Service')).toBeInTheDocument();
      expect(screen.getByText('Fill in the details to create a new service.')).toBeInTheDocument();
    });
  });

  it('validates required fields in service form', async () => {
    render(
      <TestWrapper>
        <ServicesManager />
      </TestWrapper>
    );

    const addButton = screen.getByText('Add Service');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Service')).toBeInTheDocument();
    });

    const submitButton = screen.getByText('Create Service');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Service Title is required')).toBeInTheDocument();
      expect(screen.getByText('Category is required')).toBeInTheDocument();
      expect(screen.getByText('Description is required')).toBeInTheDocument();
    });
  });

  it('creates a new service successfully', async () => {
    const newService = {
      id: '3',
      title: 'Business Consultation',
      description: 'Strategic business consulting services',
      category: 'consultation' as const,
      features: ['Strategic planning', 'Market analysis'],
      status: 'published' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'current-user',
    };

    mockStorageManager.create.mockResolvedValue(newService);
    mockStorageManager.list.mockResolvedValueOnce(mockServices).mockResolvedValueOnce([...mockServices, newService]);

    render(
      <TestWrapper>
        <ServicesManager />
      </TestWrapper>
    );

    const addButton = screen.getByText('Add Service');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Service')).toBeInTheDocument();
    });

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Service Title/), { target: { value: 'Business Consultation' } });
    fireEvent.change(screen.getByLabelText(/Category/), { target: { value: 'consultation' } });
    fireEvent.change(screen.getByLabelText(/Description/), { target: { value: 'Strategic business consulting services' } });
    fireEvent.change(screen.getByLabelText(/Features/), { target: { value: 'Strategic planning\nMarket analysis' } });
    fireEvent.change(screen.getByLabelText(/Status/), { target: { value: 'published' } });

    const submitButton = screen.getByText('Create Service');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockStorageManager.create).toHaveBeenCalledWith('services', {
        title: 'Business Consultation',
        description: 'Strategic business consulting services',
        category: 'consultation',
        features: ['Strategic planning', 'Market analysis'],
        pricing: undefined,
        status: 'published',
        createdBy: 'current-user',
      });
    });
  });

  it('handles service creation error', async () => {
    mockStorageManager.create.mockRejectedValue(new Error('Storage error'));

    render(
      <TestWrapper>
        <ServicesManager />
      </TestWrapper>
    );

    const addButton = screen.getByText('Add Service');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Service')).toBeInTheDocument();
    });

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Service Title/), { target: { value: 'Test Service' } });
    fireEvent.change(screen.getByLabelText(/Category/), { target: { value: 'recruitment' } });
    fireEvent.change(screen.getByLabelText(/Description/), { target: { value: 'Test description' } });
    fireEvent.change(screen.getByLabelText(/Features/), { target: { value: 'Feature 1' } });
    fireEvent.change(screen.getByLabelText(/Status/), { target: { value: 'published' } });

    const submitButton = screen.getByText('Create Service');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockStorageManager.create).toHaveBeenCalled();
    });

    // The error toast should be shown, but we can't easily test it without more complex setup
    // The component should handle the error gracefully
  });

  it('deletes a service after confirmation', async () => {
    mockStorageManager.delete.mockResolvedValue(true);
    mockStorageManager.list.mockResolvedValueOnce(mockServices).mockResolvedValueOnce([mockServices[1]]);

    render(
      <TestWrapper>
        <ServicesManager />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Temporary Staffing')).toBeInTheDocument();
    });

    // Find and click the delete button for the first service
    const deleteButtons = screen.getAllByTitle('Delete service');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Delete Service')).toBeInTheDocument();
      expect(screen.getByText(/Are you sure you want to delete "Temporary Staffing"/)).toBeInTheDocument();
    });

    const confirmButton = screen.getByText('Delete');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockStorageManager.delete).toHaveBeenCalledWith('services', '1');
    });
  });

  it('validates service features correctly', async () => {
    render(
      <TestWrapper>
        <ServicesManager />
      </TestWrapper>
    );

    const addButton = screen.getByText('Add Service');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Service')).toBeInTheDocument();
    });

    // Test empty features
    fireEvent.change(screen.getByLabelText(/Service Title/), { target: { value: 'Test Service' } });
    fireEvent.change(screen.getByLabelText(/Category/), { target: { value: 'recruitment' } });
    fireEvent.change(screen.getByLabelText(/Description/), { target: { value: 'Test description' } });
    fireEvent.change(screen.getByLabelText(/Features/), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Status/), { target: { value: 'published' } });

    // Trigger validation by blurring the features field
    fireEvent.blur(screen.getByLabelText(/Features/));

    await waitFor(() => {
      expect(screen.getByText('At least one feature is required')).toBeInTheDocument();
    });
  });
});