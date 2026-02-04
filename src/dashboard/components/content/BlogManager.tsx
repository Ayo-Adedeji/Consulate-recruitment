import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Calendar, Eye, Tag, BookOpen, Clock, User } from 'lucide-react';
import Breadcrumbs from '../layout/Breadcrumbs';
import { DataTable, FormBuilder, ConfirmDialog, LoadingSpinner } from '../ui';
import { useToast } from '../ui/Toast';
import { BlogPost } from '../../types/content';
import { TableColumn, FormField } from '../../types/ui';
import { storageManager } from '../../utils/storage';

const BlogManager: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; post: BlogPost | null }>({
    isOpen: false,
    post: null,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [formLoading, setFormLoading] = useState(false);

  const { showToast } = useToast();

  // Load blog posts on component mount
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      const postsData = await storageManager.list<BlogPost>('blog');
      setPosts(postsData);
    } catch (error) {
      console.error('Failed to load blog posts:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to load blog posts. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Filter posts based on search term, category, and status
  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !categoryFilter || post.categories.includes(categoryFilter);
    const matchesStatus = !statusFilter || post.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories for filter dropdown
  const uniqueCategories = Array.from(new Set(posts.flatMap(post => post.categories))).sort();

  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Table columns configuration
  const columns: TableColumn<BlogPost>[] = [
    {
      key: 'title',
      title: 'Title',
      sortable: true,
      render: (value, record) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500 mt-1 truncate max-w-xs">
            {record.excerpt}
          </div>
        </div>
      ),
    },
    {
      key: 'categories',
      title: 'Categories',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map(category => (
            <span
              key={category}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              <Tag className="h-3 w-3 mr-1" />
              {category}
            </span>
          ))}
          {value.length > 2 && (
            <span className="text-xs text-gray-500">+{value.length - 2} more</span>
          )}
        </div>
      ),
    },
    {
      key: 'tags',
      title: 'Tags',
      render: (value: string[]) => (
        <div className="text-sm text-gray-600">
          {value.length} tag{value.length !== 1 ? 's' : ''}
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      filterable: true,
      render: (value, record) => {
        let statusColor = '';
        let statusText = value;
        
        if (value === 'published') {
          statusColor = 'bg-green-100 text-green-800';
        } else if (value === 'draft') {
          statusColor = 'bg-yellow-100 text-yellow-800';
        } else if (value === 'archived') {
          statusColor = 'bg-gray-100 text-gray-800';
        }

        // Check if scheduled
        if (record.scheduledFor && new Date(record.scheduledFor) > new Date()) {
          statusColor = 'bg-purple-100 text-purple-800';
          statusText = 'scheduled';
        }

        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
            <Clock className="h-3 w-3 mr-1" />
            {statusText.charAt(0).toUpperCase() + statusText.slice(1)}
          </span>
        );
      },
    },
    {
      key: 'publishedAt',
      title: 'Published',
      sortable: true,
      render: (value, record) => {
        if (record.status === 'published' && value) {
          return (
            <div className="text-sm text-gray-600">
              {new Date(value).toLocaleDateString()}
            </div>
          );
        } else if (record.scheduledFor) {
          return (
            <div className="text-sm text-purple-600">
              Scheduled: {new Date(record.scheduledFor).toLocaleDateString()}
            </div>
          );
        }
        return <span className="text-gray-400">-</span>;
      },
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
  const actionsColumn: TableColumn<BlogPost> = {
    key: 'id' as keyof BlogPost,
    title: 'Actions',
    render: (_, record) => (
      <div className="flex items-center space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(record);
          }}
          className="text-azure hover:text-azureSoft transition-colors duration-200"
          title="Edit blog post"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteConfirm(record);
          }}
          className="text-red-600 hover:text-red-800 transition-colors duration-200"
          title="Delete blog post"
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
      label: 'Post Title',
      type: 'text',
      required: true,
      placeholder: 'Enter blog post title',
      validation: {
        min: 5,
        max: 200,
      },
    },
    {
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea',
      required: true,
      placeholder: 'Brief summary of the blog post (used in previews)',
      validation: {
        min: 20,
        max: 300,
      },
    },
    {
      name: 'content',
      label: 'Content',
      type: 'rich-text',
      required: true,
      placeholder: 'Write your blog post content here...',
      validation: {
        min: 100,
        max: 10000,
      },
    },
    {
      name: 'categories',
      label: 'Categories (comma-separated)',
      type: 'text',
      required: true,
      placeholder: 'e.g., Recruitment, Industry News, Tips',
      validation: {
        min: 3,
        custom: (value: string) => {
          if (!value) return null;
          const categories = value.split(',').map(c => c.trim()).filter(c => c);
          if (categories.length === 0) return 'At least one category is required';
          if (categories.length > 5) return 'Maximum 5 categories allowed';
          return null;
        },
      },
    },
    {
      name: 'tags',
      label: 'Tags (comma-separated)',
      type: 'text',
      required: true,
      placeholder: 'e.g., jobs, career, advice, london',
      validation: {
        min: 3,
        custom: (value: string) => {
          if (!value) return null;
          const tags = value.split(',').map(t => t.trim()).filter(t => t);
          if (tags.length === 0) return 'At least one tag is required';
          if (tags.length > 10) return 'Maximum 10 tags allowed';
          return null;
        },
      },
    },
    {
      name: 'seoTitle',
      label: 'SEO Title (optional)',
      type: 'text',
      placeholder: 'Custom title for search engines',
      validation: {
        max: 60,
      },
    },
    {
      name: 'seoDescription',
      label: 'SEO Description (optional)',
      type: 'textarea',
      placeholder: 'Meta description for search engines',
      validation: {
        max: 160,
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
    {
      name: 'scheduledFor',
      label: 'Schedule for Later (optional)',
      type: 'date',
      placeholder: 'Select date to publish',
    },
  ];

  // Event handlers
  const handleCreate = () => {
    setEditingPost(null);
    setIsFormOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = (post: BlogPost) => {
    setDeleteConfirm({ isOpen: true, post });
  };

  const handleFormSubmit = async (values: Record<string, any>) => {
    try {
      setFormLoading(true);
      
      // Process categories and tags from comma-separated strings to arrays
      const categories = values.categories
        .split(',')
        .map((c: string) => c.trim())
        .filter((c: string) => c.length > 0);

      const tags = values.tags
        .split(',')
        .map((t: string) => t.trim())
        .filter((t: string) => t.length > 0);

      // Generate slug from title if not editing
      const slug = editingPost ? editingPost.slug : generateSlug(values.title);

      const postData = {
        title: values.title,
        content: values.content,
        excerpt: values.excerpt,
        slug,
        categories,
        tags,
        seoTitle: values.seoTitle || undefined,
        seoDescription: values.seoDescription || undefined,
        status: values.status as 'draft' | 'published' | 'archived',
        scheduledFor: values.scheduledFor ? new Date(values.scheduledFor) : undefined,
        publishedAt: values.status === 'published' && !editingPost ? new Date() : editingPost?.publishedAt,
        createdBy: 'current-user', // TODO: Get from auth context
      };

      if (editingPost) {
        // Update existing post
        await storageManager.update<BlogPost>('blog', editingPost.id, postData);
        showToast({
          type: 'success',
          title: 'Success',
          message: 'Blog post updated successfully!',
        });
      } else {
        // Create new post
        await storageManager.create<BlogPost>('blog', postData);
        showToast({
          type: 'success',
          title: 'Success',
          message: 'Blog post created successfully!',
        });
      }

      setIsFormOpen(false);
      setEditingPost(null);
      await loadPosts();
    } catch (error) {
      console.error('Failed to save blog post:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to save blog post. Please try again.',
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingPost(null);
  };

  const handleDelete = async () => {
    if (!deleteConfirm.post) return;

    try {
      await storageManager.delete('blog', deleteConfirm.post.id);
      showToast({
        type: 'success',
        title: 'Success',
        message: 'Blog post deleted successfully!',
      });
      setDeleteConfirm({ isOpen: false, post: null });
      await loadPosts();
    } catch (error) {
      console.error('Failed to delete blog post:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to delete blog post. Please try again.',
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, post: null });
  };

  // Prepare initial form values for editing
  const getInitialFormValues = () => {
    if (!editingPost) return {};
    
    return {
      ...editingPost,
      categories: editingPost.categories.join(', '),
      tags: editingPost.tags.join(', '),
      scheduledFor: editingPost.scheduledFor ? new Date(editingPost.scheduledFor).toISOString().split('T')[0] : '',
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
            <h1 className="text-2xl font-bold text-primary font-heading">Blog Management</h1>
            <p className="text-footerText mt-1">
              Create and manage blog posts with rich content and SEO optimization
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="inline-flex items-center px-4 py-2 bg-azure text-white text-sm font-medium rounded-lg hover:bg-azureSoft focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azure transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Blog Post
          </button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-azure focus:border-transparent transition-colors duration-200"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-azure focus:border-transparent transition-colors duration-200"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
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

      {/* Blog Statistics */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Posts</p>
              <p className="text-lg font-semibold text-gray-900">{posts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Eye className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Published</p>
              <p className="text-lg font-semibold text-gray-900">
                {posts.filter(post => post.status === 'published').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Edit className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Drafts</p>
              <p className="text-lg font-semibold text-gray-900">
                {posts.filter(post => post.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Scheduled</p>
              <p className="text-lg font-semibold text-gray-900">
                {posts.filter(post => post.scheduledFor && new Date(post.scheduledFor) > new Date()).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <DataTable
          data={filteredPosts}
          columns={allColumns}
          loading={false}
          pagination={true}
          pageSize={10}
          onRowClick={(post) => handleEdit(post)}
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
                  {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {editingPost 
                    ? 'Update the blog post information below.'
                    : 'Fill in the details to create a new blog post.'
                  }
                </p>
              </div>
              <FormBuilder
                fields={formFields}
                initialValues={getInitialFormValues()}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                loading={formLoading}
                submitText={editingPost ? 'Update Blog Post' : 'Create Blog Post'}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${deleteConfirm.post?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleDelete}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default BlogManager;