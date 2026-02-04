import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import JobsManager from '../components/content/JobsManager';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastProvider } from '../components/ui/Toast';
import { storageManager } from '../utils/storage';
import { JobListing } from '../types/content';

// Mock the storage manager
jest.mock('../utils/storage', () => ({
  storageManager: {
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

// Mock the breadcrumbs component
jest.mock('../components/layout/Breadcrumbs', () => {
  return function MockBreadcrumbs() {
    return <div data-testid="breadcrumbs">Breadcrumbs</div>;
  };
});

const mockJobs: JobListing[] = [
  {
    id: '1',
    title: 'Software Developer',
    description: 'We are looking for a skilled software developer...',
    location: 'London, UK',
    employmentType: 'permanent',
    requirements: ['3+ years experience', 'JavaScript knowledge', 'React experience'],
    benefits: ['Health insurance', 'Flexible hours', 'Remote work'],
    salaryRange: '£40,000 - £60,000',
    status: 'published',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    createdBy: 'admin',
  },
  {
    id: '2',
    title: 'Marketing Manager',
    description: 'Join our marketing team...',
    location: 'Manchester, UK',
    employmentType: 'temporary',
    requirements: ['Marketing degree', '2+ years experience'],
    benefits: ['Training opportunities', 'Team events'],
    status: 'draft',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    createdBy: 'admin',
  },
];

const renderJobsManager = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <JobsManager />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('JobsManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (storageManager.list as jest.Mock).mockResolvedValue(mockJobs);
  });

  it('renders the jobs management page', async () => {
    renderJobsManager();
    
    expect(screen.getByText('Job Listings Management')).toBeInTheDocument();
    expect(screen.getByText('Manage job postings with employment types, locations, and status')).toBeInTheDocument();
    expect(screen.getByText('Add Job Listing')).toBeInTheDocument();
  });

  it('loads and displays job listings', async () => {
    renderJobsManager();
    
    await waitFor(() => {
      expect(storageManager.list).toHaveBeenCalledWith('jobs');
    });

    await waitFor(() => {
      expect(screen.getByText('Software Developer')).toBeInTheDocument();
      expect(screen.getByText('Marketing Manager')).toBeInTheDocument();
    });
  });

  it('displays job statistics correctly', async () => {
    renderJobsManager();
    
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument(); // Total jobs
      expect(screen.getByText('1')).toBeInTheDocument(); // Published jobs
      expect(screen.getByText('1')).toBeInTheDocument(); // Draft jobs
      expect(screen.getByText('2')).toBeInTheDocument(); // Locations count
    });
  });

  it('filters jobs by employment type', async () => {
    renderJobsManager();
    
    await waitFor(() => {
      expect(screen.getByText('Software Developer')).toBeInTheDocument();
      expect(screen.getByText('Marketing Manager')).toBeInTheDocument();
    });

    // Filter by permanent jobs
    const typeFilter = screen.getByDisplayValue('All Types');
    fireEvent.change(typeFilter, { target: { value: 'permanent' } });

    await waitFor(() => {
      expect(screen.getByText('Software Developer')).toBeInTheDocument();
      expect(screen.queryByText('Marketing Manager')).not.toBeInTheDocument();
    });
  });

  it('filters jobs by location', async () => {
    renderJobsManager();
    
    await waitFor(() => {
      expect(screen.getByText('Software Developer')).toBeInTheDocument();
      expect(screen.getByText('Marketing Manager')).toBeInTheDocument();
    });

    // Filter by London location
    const locationFilter = screen.getByDisplayValue('All Locations');
    fireEvent.change(locationFilter, { target: { value: 'London, UK' } });

    await waitFor(() => {
      expect(screen.getByText('Software Developer')).toBeInTheDocument();
      expect(screen.queryByText('Marketing Manager')).not.toBeInTheDocument();
    });
  });

  it('filters jobs by status', async () => {
    renderJobsManager();
    
    await waitFor(() => {
      expect(screen.getByText('Software Developer')).toBeInTheDocument();
      expect(screen.getByText('Marketing Manager')).toBeInTheDocument();
    });

    // Filter by published status
    const statusFilter = screen.getByDisplayValue('All Status');
    fireEvent.change(statusFilter, { target: { value: 'published' } });

    await waitFor(() => {
      expect(screen.getByText('Software Developer')).toBeInTheDocument();
      expect(screen.queryByText('Marketing Manager')).not.toBeInTheDocument();
    });
  });

  it('searches jobs by title and description', async () => {
    renderJobsManager();
    
    await waitFor(() => {
      expect(screen.getByText('Software Developer')).toBeInTheDocument();
      expect(screen.getByText('Marketing Manager')).toBeInTheDocument();
    });

    // Search for "software"
    const searchInput = screen.getByPlaceholderText('Search jobs...');
    fireEvent.change(searchInput, { target: { value: 'software' } });

    await waitFor(() => {
      expect(screen.getByText('Software Developer')).toBeInTheDocument();
      expect(screen.queryByText('Marketing Manager')).not.toBeInTheDocument();
    });
  });

  it('opens create job form when Add Job Listing is clicked', async () => {
    renderJobsManager();
    
    const addButton = screen.getByText('Add Job Listing');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Create New Job Listing')).toBeInTheDocument();
      expect(screen.getByText('Fill in the details to create a new job listing.')).toBeInTheDocument();
    });
  });

  it('displays employment type badges correctly', async () => {
    renderJobsManager();
    
    await waitFor(() => {
      expect(screen.getByText('Permanent')).toBeInTheDocument();
      expect(screen.getByText('Temporary')).toBeInTheDocument();
    });

    // Check that badges have correct styling classes
    const permanentBadge = screen.getByText('Permanent').closest('span');
    const temporaryBadge = screen.getByText('Temporary').closest('span');
    
    expect(permanentBadge).toHaveClass('bg-green-100', 'text-green-800');
    expect(temporaryBadge).toHaveClass('bg-blue-100', 'text-blue-800');
  });

  it('displays status badges correctly', async () => {
    renderJobsManager();
    
    await waitFor(() => {
      expect(screen.getByText('Published')).toBeInTheDocument();
      expect(screen.getByText('Draft')).toBeInTheDocument();
    });

    // Check that status badges have correct styling
    const publishedBadge = screen.getByText('Published').closest('span');
    const draftBadge = screen.getByText('Draft').closest('span');
    
    expect(publishedBadge).toHaveClass('bg-green-100', 'text-green-800');
    expect(draftBadge).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  it('handles loading state correctly', () => {
    (storageManager.list as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves
    
    renderJobsManager();
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('handles error state when loading jobs fails', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    (storageManager.list as jest.Mock).mockRejectedValue(new Error('Failed to load'));
    
    renderJobsManager();
    
    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Failed to load jobs:', expect.any(Error));
    });

    consoleError.mockRestore();
  });
});