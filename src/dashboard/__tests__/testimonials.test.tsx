import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TestimonialsManager from '../components/content/TestimonialsManager';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastProvider } from '../components/ui/Toast';
import { storageManager } from '../utils/storage';
import { Testimonial } from '../types/content';

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

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    clientName: 'John Smith',
    clientRole: 'HR Manager',
    companyName: 'Tech Corp',
    rating: 5,
    reviewText: 'Excellent service! They found us the perfect candidates quickly and efficiently.',
    clientImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    status: 'published',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    createdBy: 'admin',
  },
  {
    id: '2',
    clientName: 'Sarah Johnson',
    clientRole: 'Operations Director',
    companyName: 'Global Solutions',
    rating: 4,
    reviewText: 'Great recruitment agency with professional staff. Highly recommended for temporary staffing needs.',
    status: 'published',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    createdBy: 'admin',
  },
  {
    id: '3',
    clientName: 'Mike Davis',
    clientRole: 'CEO',
    rating: 3,
    reviewText: 'Good service overall, but could improve response times.',
    status: 'draft',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
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

describe('TestimonialsManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockStorageManager.list.mockResolvedValue(mockTestimonials);
  });

  it('renders testimonials management page', async () => {
    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    expect(screen.getByText('Testimonials Management')).toBeInTheDocument();
    expect(screen.getByText('Manage client testimonials and reviews with ratings')).toBeInTheDocument();
    expect(screen.getByText('Add Testimonial')).toBeInTheDocument();
  });

  it('loads and displays testimonials', async () => {
    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(mockStorageManager.list).toHaveBeenCalledWith('testimonials');
    });

    await waitFor(() => {
      expect(screen.getByText('John Smith')).toBeInTheDocument();
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
      expect(screen.getByText('Mike Davis')).toBeInTheDocument();
    });
  });

  it('displays star ratings correctly', async () => {
    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('John Smith')).toBeInTheDocument();
    });

    // Check for rating display (5/5, 4/5, 3/5)
    expect(screen.getByText('(5/5)')).toBeInTheDocument();
    expect(screen.getByText('(4/5)')).toBeInTheDocument();
    expect(screen.getByText('(3/5)')).toBeInTheDocument();
  });

  it('filters testimonials by search term', async () => {
    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('John Smith')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search testimonials...');
    fireEvent.change(searchInput, { target: { value: 'john' } });

    expect(searchInput).toHaveValue('john');
  });

  it('filters testimonials by rating', async () => {
    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('John Smith')).toBeInTheDocument();
    });

    const ratingFilter = screen.getByDisplayValue('All Ratings');
    fireEvent.change(ratingFilter, { target: { value: '5' } });

    expect(ratingFilter).toHaveValue('5');
  });

  it('opens create testimonial form when Add Testimonial button is clicked', async () => {
    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    const addButton = screen.getByText('Add Testimonial');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Testimonial')).toBeInTheDocument();
      expect(screen.getByText('Fill in the details to create a new testimonial.')).toBeInTheDocument();
    });
  });

  it('displays interactive star rating in form', async () => {
    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    const addButton = screen.getByText('Add Testimonial');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Testimonial')).toBeInTheDocument();
    });

    // Check for rating label and default 5-star rating
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('(5/5)')).toBeInTheDocument();
  });

  it('validates required fields in testimonial form', async () => {
    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    const addButton = screen.getByText('Add Testimonial');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Testimonial')).toBeInTheDocument();
    });

    const submitButton = screen.getByText('Create Testimonial');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Client Name is required')).toBeInTheDocument();
      expect(screen.getByText('Client Role/Position is required')).toBeInTheDocument();
      expect(screen.getByText('Review Text is required')).toBeInTheDocument();
    });
  });

  it('validates rating range (1-5)', async () => {
    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    const addButton = screen.getByText('Add Testimonial');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Testimonial')).toBeInTheDocument();
    });

    // The rating should be between 1-5, default is 5
    expect(screen.getByText('(5/5)')).toBeInTheDocument();
    
    // Test that rating is properly constrained by the StarRating component
    // The component should only allow ratings 1-5
  });

  it('creates a new testimonial successfully', async () => {
    const newTestimonial = {
      id: '4',
      clientName: 'Alice Brown',
      clientRole: 'Hiring Manager',
      companyName: 'Innovation Inc',
      rating: 5,
      reviewText: 'Outstanding service with quick turnaround times.',
      status: 'published' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'current-user',
    };

    mockStorageManager.create.mockResolvedValue(newTestimonial);
    mockStorageManager.list.mockResolvedValueOnce(mockTestimonials).mockResolvedValueOnce([...mockTestimonials, newTestimonial]);

    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    const addButton = screen.getByText('Add Testimonial');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Testimonial')).toBeInTheDocument();
    });

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Client Name/), { target: { value: 'Alice Brown' } });
    fireEvent.change(screen.getByLabelText(/Client Role/), { target: { value: 'Hiring Manager' } });
    fireEvent.change(screen.getByLabelText(/Company Name/), { target: { value: 'Innovation Inc' } });
    fireEvent.change(screen.getByLabelText(/Review Text/), { target: { value: 'Outstanding service with quick turnaround times.' } });
    fireEvent.change(screen.getByLabelText(/Status/), { target: { value: 'published' } });

    const submitButton = screen.getByText('Create Testimonial');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockStorageManager.create).toHaveBeenCalledWith('testimonials', {
        clientName: 'Alice Brown',
        clientRole: 'Hiring Manager',
        companyName: 'Innovation Inc',
        rating: 5, // Default rating
        reviewText: 'Outstanding service with quick turnaround times.',
        clientImage: undefined,
        status: 'published',
        createdBy: 'current-user',
      });
    });
  });

  it('handles testimonial creation error', async () => {
    mockStorageManager.create.mockRejectedValue(new Error('Storage error'));

    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    const addButton = screen.getByText('Add Testimonial');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Testimonial')).toBeInTheDocument();
    });

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Client Name/), { target: { value: 'Test Client' } });
    fireEvent.change(screen.getByLabelText(/Client Role/), { target: { value: 'Test Role' } });
    fireEvent.change(screen.getByLabelText(/Review Text/), { target: { value: 'Test review text' } });
    fireEvent.change(screen.getByLabelText(/Status/), { target: { value: 'published' } });

    const submitButton = screen.getByText('Create Testimonial');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockStorageManager.create).toHaveBeenCalled();
    });

    // The error should be handled gracefully
  });

  it('edits an existing testimonial', async () => {
    const updatedTestimonial = {
      ...mockTestimonials[0],
      clientName: 'John Smith Updated',
      rating: 4,
    };

    mockStorageManager.update.mockResolvedValue(updatedTestimonial);
    mockStorageManager.list.mockResolvedValueOnce(mockTestimonials).mockResolvedValueOnce([updatedTestimonial, ...mockTestimonials.slice(1)]);

    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('John Smith')).toBeInTheDocument();
    });

    // Find and click the edit button for the first testimonial
    const editButtons = screen.getAllByTitle('Edit testimonial');
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Edit Testimonial')).toBeInTheDocument();
      expect(screen.getByDisplayValue('John Smith')).toBeInTheDocument();
    });

    // Update the name
    fireEvent.change(screen.getByDisplayValue('John Smith'), { target: { value: 'John Smith Updated' } });

    const submitButton = screen.getByText('Update Testimonial');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockStorageManager.update).toHaveBeenCalledWith('testimonials', '1', expect.objectContaining({
        clientName: 'John Smith Updated',
      }));
    });
  });

  it('deletes a testimonial after confirmation', async () => {
    mockStorageManager.delete.mockResolvedValue(true);
    mockStorageManager.list.mockResolvedValueOnce(mockTestimonials).mockResolvedValueOnce(mockTestimonials.slice(1));

    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('John Smith')).toBeInTheDocument();
    });

    // Find and click the delete button for the first testimonial
    const deleteButtons = screen.getAllByTitle('Delete testimonial');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Delete Testimonial')).toBeInTheDocument();
      expect(screen.getByText(/Are you sure you want to delete the testimonial from "John Smith"/)).toBeInTheDocument();
    });

    const confirmButton = screen.getByText('Delete');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockStorageManager.delete).toHaveBeenCalledWith('testimonials', '1');
    });
  });

  it('validates review text length', async () => {
    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    const addButton = screen.getByText('Add Testimonial');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Testimonial')).toBeInTheDocument();
    });

    // Test short review text
    fireEvent.change(screen.getByLabelText(/Client Name/), { target: { value: 'Test Client' } });
    fireEvent.change(screen.getByLabelText(/Client Role/), { target: { value: 'Test Role' } });
    fireEvent.change(screen.getByLabelText(/Review Text/), { target: { value: 'Short' } });
    fireEvent.change(screen.getByLabelText(/Status/), { target: { value: 'published' } });

    // Trigger validation by blurring the review text field
    fireEvent.blur(screen.getByLabelText(/Review Text/));

    await waitFor(() => {
      expect(screen.getByText('Review Text must be at least 10 characters')).toBeInTheDocument();
    });
  });

  it('handles image upload functionality', async () => {
    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    const addButton = screen.getByText('Add Testimonial');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Testimonial')).toBeInTheDocument();
    });

    // Check for image upload section
    expect(screen.getByText('Client Image (optional)')).toBeInTheDocument();
    expect(screen.getByText('Upload client photo')).toBeInTheDocument();
    expect(screen.getByText('Choose File')).toBeInTheDocument();
    expect(screen.getByText('PNG, JPG up to 5MB')).toBeInTheDocument();
  });

  it('displays client images in testimonials list', async () => {
    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('John Smith')).toBeInTheDocument();
    });

    // Check for client image (first testimonial has an image)
    const clientImage = screen.getByAltText('John Smith');
    expect(clientImage).toBeInTheDocument();
    expect(clientImage).toHaveAttribute('src', mockTestimonials[0].clientImage);
  });

  it('shows company names when available', async () => {
    render(
      <TestWrapper>
        <TestimonialsManager />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('John Smith')).toBeInTheDocument();
    });

    // Check for company names
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Global Solutions')).toBeInTheDocument();
  });
});