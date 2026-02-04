import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BlogManager from '../components/content/BlogManager';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastProvider } from '../components/ui/Toast';
import { storageManager } from '../utils/storage';
import { BlogPost } from '../types/content';

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

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Find Your Dream Job',
    content: 'Finding your dream job requires careful planning and preparation...',
    excerpt: 'A comprehensive guide to landing your ideal position',
    slug: 'how-to-find-your-dream-job',
    categories: ['Career Advice', 'Job Search'],
    tags: ['jobs', 'career', 'advice'],
    status: 'published',
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
    createdBy: 'admin',
    seoTitle: 'Find Your Dream Job - Career Guide',
    seoDescription: 'Learn how to find and land your dream job with our comprehensive career guide.',
  },
  {
    id: '2',
    title: 'Remote Work Best Practices',
    content: 'Working remotely has become increasingly popular...',
    excerpt: 'Tips for successful remote work',
    slug: 'remote-work-best-practices',
    categories: ['Remote Work', 'Productivity'],
    tags: ['remote', 'work', 'productivity', 'tips'],
    status: 'draft',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    createdBy: 'editor',
  },
  {
    id: '3',
    title: 'Future of Recruitment',
    content: 'The recruitment industry is evolving rapidly...',
    excerpt: 'Exploring trends in modern recruitment',
    slug: 'future-of-recruitment',
    categories: ['Industry News', 'Recruitment'],
    tags: ['recruitment', 'trends', 'future', 'technology'],
    status: 'published',
    publishedAt: new Date('2024-01-25'),
    scheduledFor: new Date('2024-02-01'),
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-25'),
    createdBy: 'admin',
  },
];

const renderBlogManager = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <BlogManager />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('BlogManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (storageManager.list as jest.Mock).mockResolvedValue(mockBlogPosts);
  });

  describe('Component Rendering', () => {
    it('should render blog management interface', async () => {
      renderBlogManager();

      await waitFor(() => {
        expect(screen.getByText('Blog Management')).toBeInTheDocument();
        expect(screen.getByText('Create and manage blog posts with rich content and SEO optimization')).toBeInTheDocument();
        expect(screen.getByText('New Blog Post')).toBeInTheDocument();
      });
    });

    it('should display loading state initially', () => {
      renderBlogManager();
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('should display blog posts after loading', async () => {
      renderBlogManager();

      await waitFor(() => {
        expect(screen.getByText('How to Find Your Dream Job')).toBeInTheDocument();
        expect(screen.getByText('Remote Work Best Practices')).toBeInTheDocument();
        expect(screen.getByText('Future of Recruitment')).toBeInTheDocument();
      });
    });
  });

  describe('Blog Statistics', () => {
    it('should display correct blog statistics', async () => {
      renderBlogManager();

      await waitFor(() => {
        expect(screen.getByText('3')).toBeInTheDocument(); // Total Posts
        expect(screen.getByText('2')).toBeInTheDocument(); // Published (posts with status 'published')
        expect(screen.getByText('1')).toBeInTheDocument(); // Drafts
      });
    });

    it('should show scheduled posts count', async () => {
      renderBlogManager();

      await waitFor(() => {
        // Should show scheduled posts (posts with scheduledFor in the future)
        const scheduledCount = mockBlogPosts.filter(post => 
          post.scheduledFor && new Date(post.scheduledFor) > new Date()
        ).length;
        expect(screen.getByText(scheduledCount.toString())).toBeInTheDocument();
      });
    });
  });

  describe('Search and Filtering', () => {
    it('should filter posts by search term', async () => {
      renderBlogManager();

      await waitFor(() => {
        expect(screen.getByText('How to Find Your Dream Job')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search blog posts...');
      fireEvent.change(searchInput, { target: { value: 'remote' } });

      await waitFor(() => {
        expect(screen.getByText('Remote Work Best Practices')).toBeInTheDocument();
        expect(screen.queryByText('How to Find Your Dream Job')).not.toBeInTheDocument();
      });
    });

    it('should filter posts by category', async () => {
      renderBlogManager();

      await waitFor(() => {
        expect(screen.getByText('How to Find Your Dream Job')).toBeInTheDocument();
      });

      const categoryFilter = screen.getByDisplayValue('All Categories');
      fireEvent.change(categoryFilter, { target: { value: 'Career Advice' } });

      await waitFor(() => {
        expect(screen.getByText('How to Find Your Dream Job')).toBeInTheDocument();
        expect(screen.queryByText('Remote Work Best Practices')).not.toBeInTheDocument();
      });
    });

    it('should filter posts by status', async () => {
      renderBlogManager();

      await waitFor(() => {
        expect(screen.getByText('How to Find Your Dream Job')).toBeInTheDocument();
      });

      const statusFilter = screen.getByDisplayValue('All Status');
      fireEvent.change(statusFilter, { target: { value: 'draft' } });

      await waitFor(() => {
        expect(screen.getByText('Remote Work Best Practices')).toBeInTheDocument();
        expect(screen.queryByText('How to Find Your Dream Job')).not.toBeInTheDocument();
      });
    });
  });

  describe('Blog Post Creation', () => {
    it('should open create form when New Blog Post button is clicked', async () => {
      renderBlogManager();

      await waitFor(() => {
        expect(screen.getByText('New Blog Post')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('New Blog Post'));

      await waitFor(() => {
        expect(screen.getByText('Create New Blog Post')).toBeInTheDocument();
        expect(screen.getByLabelText('Post Title')).toBeInTheDocument();
        expect(screen.getByLabelText('Content')).toBeInTheDocument();
      });
    });

    it('should create new blog post with valid data', async () => {
      (storageManager.create as jest.Mock).mockResolvedValue({
        id: '4',
        title: 'New Test Post',
        content: 'This is test content for the new blog post.',
        excerpt: 'Test excerpt',
        slug: 'new-test-post',
        categories: ['Test'],
        tags: ['test'],
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'current-user',
      });

      renderBlogManager();

      await waitFor(() => {
        fireEvent.click(screen.getByText('New Blog Post'));
      });

      await waitFor(() => {
        expect(screen.getByLabelText('Post Title')).toBeInTheDocument();
      });

      // Fill in the form
      fireEvent.change(screen.getByLabelText('Post Title'), {
        target: { value: 'New Test Post' }
      });
      fireEvent.change(screen.getByLabelText('Excerpt'), {
        target: { value: 'Test excerpt for the new blog post' }
      });
      fireEvent.change(screen.getByLabelText('Content'), {
        target: { value: 'This is test content for the new blog post with sufficient length to meet validation requirements.' }
      });
      fireEvent.change(screen.getByLabelText('Categories (comma-separated)'), {
        target: { value: 'Test, Example' }
      });
      fireEvent.change(screen.getByLabelText('Tags (comma-separated)'), {
        target: { value: 'test, example, blog' }
      });

      // Submit the form
      fireEvent.click(screen.getByText('Create Blog Post'));

      await waitFor(() => {
        expect(storageManager.create).toHaveBeenCalledWith('blog', expect.objectContaining({
          title: 'New Test Post',
          excerpt: 'Test excerpt for the new blog post',
          categories: ['Test', 'Example'],
          tags: ['test', 'example', 'blog'],
          slug: 'new-test-post',
        }));
      });
    });
  });

  describe('Blog Post Editing', () => {
    it('should open edit form when edit button is clicked', async () => {
      renderBlogManager();

      await waitFor(() => {
        expect(screen.getByText('How to Find Your Dream Job')).toBeInTheDocument();
      });

      const editButtons = screen.getAllByTitle('Edit blog post');
      fireEvent.click(editButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Edit Blog Post')).toBeInTheDocument();
        expect(screen.getByDisplayValue('How to Find Your Dream Job')).toBeInTheDocument();
      });
    });

    it('should update blog post with modified data', async () => {
      (storageManager.update as jest.Mock).mockResolvedValue({
        ...mockBlogPosts[0],
        title: 'Updated Job Search Guide',
      });

      renderBlogManager();

      await waitFor(() => {
        expect(screen.getByText('How to Find Your Dream Job')).toBeInTheDocument();
      });

      const editButtons = screen.getAllByTitle('Edit blog post');
      fireEvent.click(editButtons[0]);

      await waitFor(() => {
        expect(screen.getByDisplayValue('How to Find Your Dream Job')).toBeInTheDocument();
      });

      // Update the title
      const titleInput = screen.getByDisplayValue('How to Find Your Dream Job');
      fireEvent.change(titleInput, { target: { value: 'Updated Job Search Guide' } });

      // Submit the form
      fireEvent.click(screen.getByText('Update Blog Post'));

      await waitFor(() => {
        expect(storageManager.update).toHaveBeenCalledWith('blog', '1', expect.objectContaining({
          title: 'Updated Job Search Guide',
        }));
      });
    });
  });

  describe('Blog Post Deletion', () => {
    it('should show delete confirmation dialog', async () => {
      renderBlogManager();

      await waitFor(() => {
        expect(screen.getByText('How to Find Your Dream Job')).toBeInTheDocument();
      });

      const deleteButtons = screen.getAllByTitle('Delete blog post');
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Delete Blog Post')).toBeInTheDocument();
        expect(screen.getByText(/Are you sure you want to delete "How to Find Your Dream Job"/)).toBeInTheDocument();
      });
    });

    it('should delete blog post when confirmed', async () => {
      (storageManager.delete as jest.Mock).mockResolvedValue(true);

      renderBlogManager();

      await waitFor(() => {
        expect(screen.getByText('How to Find Your Dream Job')).toBeInTheDocument();
      });

      const deleteButtons = screen.getAllByTitle('Delete blog post');
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Delete Blog Post')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Delete'));

      await waitFor(() => {
        expect(storageManager.delete).toHaveBeenCalledWith('blog', '1');
      });
    });

    it('should cancel deletion when cancel is clicked', async () => {
      renderBlogManager();

      await waitFor(() => {
        expect(screen.getByText('How to Find Your Dream Job')).toBeInTheDocument();
      });

      const deleteButtons = screen.getAllByTitle('Delete blog post');
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Delete Blog Post')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Cancel'));

      await waitFor(() => {
        expect(screen.queryByText('Delete Blog Post')).not.toBeInTheDocument();
      });

      expect(storageManager.delete).not.toHaveBeenCalled();
    });
  });

  describe('SEO Features', () => {
    it('should generate slug from title for new posts', async () => {
      (storageManager.create as jest.Mock).mockResolvedValue({
        id: '4',
        title: 'Test Post with Special Characters!',
        slug: 'test-post-with-special-characters',
      });

      renderBlogManager();

      await waitFor(() => {
        fireEvent.click(screen.getByText('New Blog Post'));
      });

      await waitFor(() => {
        expect(screen.getByLabelText('Post Title')).toBeInTheDocument();
      });

      // Fill in required fields
      fireEvent.change(screen.getByLabelText('Post Title'), {
        target: { value: 'Test Post with Special Characters!' }
      });
      fireEvent.change(screen.getByLabelText('Excerpt'), {
        target: { value: 'Test excerpt for slug generation' }
      });
      fireEvent.change(screen.getByLabelText('Content'), {
        target: { value: 'This is test content for slug generation with sufficient length to meet validation requirements.' }
      });
      fireEvent.change(screen.getByLabelText('Categories (comma-separated)'), {
        target: { value: 'Test' }
      });
      fireEvent.change(screen.getByLabelText('Tags (comma-separated)'), {
        target: { value: 'test' }
      });

      fireEvent.click(screen.getByText('Create Blog Post'));

      await waitFor(() => {
        expect(storageManager.create).toHaveBeenCalledWith('blog', expect.objectContaining({
          slug: 'test-post-with-special-characters',
        }));
      });
    });

    it('should handle SEO title and description fields', async () => {
      renderBlogManager();

      await waitFor(() => {
        fireEvent.click(screen.getByText('New Blog Post'));
      });

      await waitFor(() => {
        expect(screen.getByLabelText('SEO Title (optional)')).toBeInTheDocument();
        expect(screen.getByLabelText('SEO Description (optional)')).toBeInTheDocument();
      });
    });
  });

  describe('Status Management', () => {
    it('should display correct status badges', async () => {
      renderBlogManager();

      await waitFor(() => {
        expect(screen.getByText('Published')).toBeInTheDocument();
        expect(screen.getByText('Draft')).toBeInTheDocument();
      });
    });

    it('should handle scheduled posts', async () => {
      renderBlogManager();

      await waitFor(() => {
        // Check if scheduled posts are handled correctly
        const scheduledPosts = mockBlogPosts.filter(post => 
          post.scheduledFor && new Date(post.scheduledFor) > new Date()
        );
        
        if (scheduledPosts.length > 0) {
          expect(screen.getByText('Scheduled')).toBeInTheDocument();
        }
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle loading errors gracefully', async () => {
      (storageManager.list as jest.Mock).mockRejectedValue(new Error('Failed to load'));

      renderBlogManager();

      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });
    });

    it('should handle creation errors', async () => {
      (storageManager.create as jest.Mock).mockRejectedValue(new Error('Failed to create'));

      renderBlogManager();

      await waitFor(() => {
        fireEvent.click(screen.getByText('New Blog Post'));
      });

      await waitFor(() => {
        expect(screen.getByLabelText('Post Title')).toBeInTheDocument();
      });

      // Fill in minimal required fields
      fireEvent.change(screen.getByLabelText('Post Title'), {
        target: { value: 'Test Post' }
      });
      fireEvent.change(screen.getByLabelText('Excerpt'), {
        target: { value: 'Test excerpt' }
      });
      fireEvent.change(screen.getByLabelText('Content'), {
        target: { value: 'This is test content with sufficient length to meet validation requirements.' }
      });
      fireEvent.change(screen.getByLabelText('Categories (comma-separated)'), {
        target: { value: 'Test' }
      });
      fireEvent.change(screen.getByLabelText('Tags (comma-separated)'), {
        target: { value: 'test' }
      });

      fireEvent.click(screen.getByText('Create Blog Post'));

      await waitFor(() => {
        expect(storageManager.create).toHaveBeenCalled();
      });
    });
  });
});