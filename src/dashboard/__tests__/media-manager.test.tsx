import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MediaManager from '../components/content/MediaManager';
import { BrowserRouter } from 'react-router-dom';

// Mock the storage manager
vi.mock('../utils/storage', () => ({
  storageManager: {
    list: vi.fn().mockResolvedValue([]),
    uploadMedia: vi.fn(),
    deleteMedia: vi.fn(),
    findMediaReferences: vi.fn().mockResolvedValue([]),
    getMediaMetadata: vi.fn(),
    replaceMedia: vi.fn(),
  },
}));

// Mock the hooks
vi.mock('../hooks/useMediaReferences', () => ({
  useMediaReferences: () => ({
    loading: false,
    findReferences: vi.fn().mockResolvedValue([]),
    getMetadata: vi.fn(),
    replaceMedia: vi.fn(),
    deleteWithReferenceCheck: vi.fn().mockResolvedValue(true),
    canDelete: vi.fn().mockResolvedValue({ canDelete: true, referenceCount: 0 }),
  }),
}));

// Mock the toast hook
vi.mock('../components/ui/Toast', () => ({
  useToast: () => ({
    showToast: vi.fn(),
  }),
}));

// Mock Breadcrumbs component
vi.mock('../components/layout/Breadcrumbs', () => ({
  default: () => <div data-testid="breadcrumbs">Breadcrumbs</div>,
}));

// Mock MediaUploader component
vi.mock('../components/ui/MediaUploader', () => ({
  default: ({ onUpload }: { onUpload: (files: File[]) => void }) => (
    <div data-testid="media-uploader">
      <button
        onClick={() => {
          const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
          onUpload([mockFile]);
        }}
      >
        Upload Test File
      </button>
    </div>
  ),
}));

// Mock other UI components
vi.mock('../components/ui', () => ({
  ConfirmDialog: ({ isOpen, onConfirm, onCancel }: any) =>
    isOpen ? (
      <div data-testid="confirm-dialog">
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    ) : null,
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}));

const renderMediaManager = () => {
  return render(
    <BrowserRouter>
      <MediaManager />
    </BrowserRouter>
  );
};

describe('MediaManager Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the media library interface', async () => {
    renderMediaManager();
    
    await waitFor(() => {
      expect(screen.getByText('Media Library')).toBeInTheDocument();
      expect(screen.getByText('Upload and manage images, videos, and documents')).toBeInTheDocument();
    });
  });

  it('should show upload button and new folder button', async () => {
    renderMediaManager();
    
    await waitFor(() => {
      expect(screen.getByText('Upload Files')).toBeInTheDocument();
      expect(screen.getByText('New Folder')).toBeInTheDocument();
    });
  });

  it('should have search and filter controls', async () => {
    renderMediaManager();
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search media...')).toBeInTheDocument();
      expect(screen.getByText('Sort by Date')).toBeInTheDocument();
    });
  });

  it('should toggle between grid and list view modes', async () => {
    renderMediaManager();
    
    await waitFor(() => {
      const gridButton = screen.getByRole('button', { name: /grid/i });
      const listButton = screen.getByRole('button', { name: /list/i });
      
      expect(gridButton).toBeInTheDocument();
      expect(listButton).toBeInTheDocument();
      
      fireEvent.click(listButton);
      // View mode should change (this would be tested with actual media items)
    });
  });

  it('should open upload modal when upload button is clicked', async () => {
    renderMediaManager();
    
    await waitFor(() => {
      const uploadButton = screen.getByText('Upload Files');
      fireEvent.click(uploadButton);
      
      expect(screen.getByText('Upload Media Files')).toBeInTheDocument();
    });
  });

  it('should open new folder modal when new folder button is clicked', async () => {
    renderMediaManager();
    
    await waitFor(() => {
      const newFolderButton = screen.getByText('New Folder');
      fireEvent.click(newFolderButton);
      
      expect(screen.getByText('Create New Folder')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Folder name')).toBeInTheDocument();
    });
  });

  it('should show empty state when no media files exist', async () => {
    renderMediaManager();
    
    await waitFor(() => {
      expect(screen.getByText('No media files')).toBeInTheDocument();
      expect(screen.getByText('Get started by uploading your first media file.')).toBeInTheDocument();
    });
  });

  it('should handle search functionality', async () => {
    renderMediaManager();
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Search media...');
      fireEvent.change(searchInput, { target: { value: 'test search' } });
      
      expect(searchInput).toHaveValue('test search');
    });
  });

  it('should handle sort order toggle', async () => {
    renderMediaManager();
    
    await waitFor(() => {
      const sortOrderButton = screen.getByText('↓'); // Default descending
      fireEvent.click(sortOrderButton);
      
      expect(screen.getByText('↑')).toBeInTheDocument(); // Should change to ascending
    });
  });

  it('should close modals when cancel or close buttons are clicked', async () => {
    renderMediaManager();
    
    await waitFor(() => {
      // Open upload modal
      const uploadButton = screen.getByText('Upload Files');
      fireEvent.click(uploadButton);
      
      expect(screen.getByText('Upload Media Files')).toBeInTheDocument();
      
      // Close modal
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      
      expect(screen.queryByText('Upload Media Files')).not.toBeInTheDocument();
    });
  });
});