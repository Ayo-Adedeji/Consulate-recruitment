import React, { useState, useEffect, useCallback } from 'react';
import { 
  Upload, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Trash2, 
  Edit, 
  Download, 
  Eye, 
  Tag, 
  Folder,
  Plus,
  X,
  Image as ImageIcon,
  File,
  Video,
  RefreshCw,
  AlertTriangle,
  Link
} from 'lucide-react';
import Breadcrumbs from '../layout/Breadcrumbs';
import { MediaUploader, ConfirmDialog, LoadingSpinner } from '../ui';
import { useToast } from '../ui/Toast';
import { useMediaReferences } from '../../hooks/useMediaReferences';
import { MediaAsset } from '../../types/content';
import { storageManager } from '../../utils/storage';

interface MediaFolder {
  id: string;
  name: string;
  parentId?: string;
  createdAt: Date;
}

type ViewMode = 'grid' | 'list';
type SortBy = 'name' | 'date' | 'size' | 'type';
type SortOrder = 'asc' | 'desc';

const MediaManager: React.FC = () => {
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [folders, setFolders] = useState<MediaFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);
  const [editingAsset, setEditingAsset] = useState<MediaAsset | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; assets: MediaAsset[] }>({
    isOpen: false,
    assets: [],
  });
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [replaceAsset, setReplaceAsset] = useState<MediaAsset | null>(null);
  const [showReferences, setShowReferences] = useState<{ asset: MediaAsset; references: any[] } | null>(null);

  const { showToast } = useToast();
  const { 
    loading: referencesLoading, 
    findReferences, 
    getMetadata, 
    replaceMedia, 
    deleteWithReferenceCheck,
    canDelete 
  } = useMediaReferences();

  // Load media assets and folders
  useEffect(() => {
    loadMediaAssets();
    loadFolders();
  }, []);

  const loadMediaAssets = useCallback(async () => {
    try {
      setLoading(true);
      const assets = await storageManager.list<MediaAsset>('media');
      setMediaAssets(assets);
    } catch (error) {
      console.error('Failed to load media assets:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to load media assets. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const loadFolders = useCallback(async () => {
    try {
      // For now, we'll use a simple folder structure stored in localStorage
      const storedFolders = localStorage.getItem('cms_media_folders');
      if (storedFolders) {
        setFolders(JSON.parse(storedFolders));
      }
    } catch (error) {
      console.error('Failed to load folders:', error);
    }
  }, []);

  // Get all unique tags from media assets
  const getAllTags = useCallback(() => {
    const tagSet = new Set<string>();
    mediaAssets.forEach(asset => {
      asset.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [mediaAssets]);

  // Filter and sort media assets
  const filteredAssets = useCallback(() => {
    let filtered = [...mediaAssets];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(asset =>
        asset.originalName.toLowerCase().includes(term) ||
        asset.filename.toLowerCase().includes(term) ||
        asset.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(asset =>
        selectedTags.every(tag => asset.tags.includes(tag))
      );
    }

    // Filter by current folder (placeholder - would need folder association)
    // For now, we'll just show all assets

    // Sort assets
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.originalName.localeCompare(b.originalName);
          break;
        case 'date':
          comparison = new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
          break;
        case 'size':
          comparison = a.size - b.size;
          break;
        case 'type':
          comparison = a.mimeType.localeCompare(b.mimeType);
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [mediaAssets, searchTerm, selectedTags, sortBy, sortOrder]);

  // Handle file upload
  const handleUpload = useCallback(async (files: File[]) => {
    setIsUploading(true);
    try {
      const uploadPromises = files.map(file => storageManager.uploadMedia(file));
      await Promise.all(uploadPromises);
      
      showToast({
        type: 'success',
        title: 'Upload successful',
        message: `${files.length} file(s) uploaded successfully`,
      });
      
      await loadMediaAssets();
      setShowUploader(false);
    } catch (error) {
      console.error('Failed to upload files:', error);
      showToast({
        type: 'error',
        title: 'Upload failed',
        message: error instanceof Error ? error.message : 'Failed to upload files',
      });
    } finally {
      setIsUploading(false);
    }
  }, [loadMediaAssets, showToast]);

  // Handle asset selection
  const toggleAssetSelection = useCallback((assetId: string) => {
    setSelectedAssets(prev =>
      prev.includes(assetId)
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  }, []);

  const selectAllAssets = useCallback(() => {
    const filtered = filteredAssets();
    setSelectedAssets(filtered.map(asset => asset.id));
  }, [filteredAssets]);

  const clearSelection = useCallback(() => {
    setSelectedAssets([]);
  }, []);

  // Handle asset deletion with reference checking
  const handleDeleteConfirm = useCallback(async (assets: MediaAsset[]) => {
    // Check if any assets have references
    const assetsWithReferences: MediaAsset[] = [];
    const safeToDelete: MediaAsset[] = [];
    
    for (const asset of assets) {
      const { canDelete: canDeleteAsset, referenceCount } = await canDelete(asset.id);
      if (canDeleteAsset) {
        safeToDelete.push(asset);
      } else {
        assetsWithReferences.push(asset);
      }
    }
    
    if (assetsWithReferences.length > 0) {
      showToast({
        type: 'warning',
        title: 'Cannot Delete Some Assets',
        message: `${assetsWithReferences.length} asset(s) are referenced by other content and cannot be deleted.`,
      });
      
      // Only show confirmation for assets that can be deleted
      if (safeToDelete.length > 0) {
        setDeleteConfirm({ isOpen: true, assets: safeToDelete });
      }
    } else {
      setDeleteConfirm({ isOpen: true, assets });
    }
  }, [canDelete, showToast]);

  const handleDelete = useCallback(async () => {
    try {
      const deletePromises = deleteConfirm.assets.map(asset =>
        deleteWithReferenceCheck(asset.id)
      );
      const results = await Promise.all(deletePromises);
      
      const successCount = results.filter(Boolean).length;
      
      if (successCount > 0) {
        showToast({
          type: 'success',
          title: 'Success',
          message: `${successCount} asset(s) deleted successfully`,
        });
      }

      setDeleteConfirm({ isOpen: false, assets: [] });
      setSelectedAssets([]);
      await loadMediaAssets();
    } catch (error) {
      console.error('Failed to delete assets:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to delete some assets. Please try again.',
      });
    }
  }, [deleteConfirm.assets, deleteWithReferenceCheck, loadMediaAssets, showToast]);

  // Handle media replacement
  const handleReplaceMedia = useCallback(async (files: File[]) => {
    if (!replaceAsset || files.length === 0) return;
    
    try {
      const newMedia = await replaceMedia(replaceAsset.id, files[0]);
      if (newMedia) {
        showToast({
          type: 'success',
          title: 'Success',
          message: 'Media replaced and all references updated successfully',
        });
        setReplaceAsset(null);
        await loadMediaAssets();
      }
    } catch (error) {
      console.error('Failed to replace media:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to replace media',
      });
    }
  }, [replaceAsset, replaceMedia, loadMediaAssets, showToast]);

  // Show asset references
  const handleShowReferences = useCallback(async (asset: MediaAsset) => {
    try {
      const references = await findReferences(asset.id);
      setShowReferences({ asset, references });
    } catch (error) {
      console.error('Failed to load references:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to load asset references',
      });
    }
  }, [findReferences, showToast]);

  // Handle asset editing
  const handleEditAsset = useCallback(async (asset: MediaAsset, updates: Partial<MediaAsset>) => {
    try {
      await storageManager.update<MediaAsset>('media', asset.id, updates);
      showToast({
        type: 'success',
        title: 'Success',
        message: 'Asset updated successfully',
      });
      setEditingAsset(null);
      await loadMediaAssets();
    } catch (error) {
      console.error('Failed to update asset:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to update asset. Please try again.',
      });
    }
  }, [loadMediaAssets, showToast]);

  // Handle folder creation
  const handleCreateFolder = useCallback(async () => {
    if (!newFolderName.trim()) return;

    try {
      const newFolder: MediaFolder = {
        id: Date.now().toString(),
        name: newFolderName.trim(),
        parentId: currentFolder || undefined,
        createdAt: new Date(),
      };

      const updatedFolders = [...folders, newFolder];
      setFolders(updatedFolders);
      localStorage.setItem('cms_media_folders', JSON.stringify(updatedFolders));

      showToast({
        type: 'success',
        title: 'Success',
        message: 'Folder created successfully',
      });

      setNewFolderName('');
      setShowNewFolder(false);
    } catch (error) {
      console.error('Failed to create folder:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to create folder. Please try again.',
      });
    }
  }, [newFolderName, currentFolder, folders, showToast]);

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file type icon
  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <ImageIcon className="h-5 w-5" />;
    } else if (mimeType.startsWith('video/')) {
      return <Video className="h-5 w-5" />;
    } else {
      return <File className="h-5 w-5" />;
    }
  };

  // Get thumbnail or placeholder
  const getThumbnail = (asset: MediaAsset) => {
    if (asset.thumbnail) {
      return asset.thumbnail;
    } else if (asset.mimeType.startsWith('image/')) {
      return asset.url;
    }
    return null;
  };

  const filtered = filteredAssets();
  const allTags = getAllTags();
  const hasSelection = selectedAssets.length > 0;

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
            <h1 className="text-2xl font-bold text-primary font-heading">Media Library</h1>
            <p className="text-footerText mt-1">
              Upload and manage images, videos, and documents
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNewFolder(true)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azure transition-colors duration-200"
            >
              <Folder className="h-4 w-4 mr-2" />
              New Folder
            </button>
            <button
              onClick={() => setShowUploader(true)}
              className="inline-flex items-center px-4 py-2 bg-azure text-white text-sm font-medium rounded-lg hover:bg-azureSoft focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azure transition-colors duration-200"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-azure focus:border-transparent transition-colors duration-200"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-azure focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="size">Sort by Size</option>
              <option value="type">Sort by Type</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          {/* View Mode */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-azure text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-azure text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Tags:</span>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTags(prev =>
                      prev.includes(tag)
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    );
                  }}
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    selectedTags.includes(tag)
                      ? 'bg-azure text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selection Actions */}
        {hasSelection && (
          <div className="mt-4 flex items-center justify-between bg-blue-50 rounded-lg p-3">
            <span className="text-sm text-blue-800">
              {selectedAssets.length} asset(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDeleteConfirm(
                  mediaAssets.filter(asset => selectedAssets.includes(asset.id))
                )}
                className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </button>
              <button
                onClick={clearSelection}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Media Grid/List */}
      <div className="bg-white rounded-lg shadow-sm">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No media files</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedTags.length > 0
                ? 'No files match your search criteria.'
                : 'Get started by uploading your first media file.'}
            </p>
            {!searchTerm && selectedTags.length === 0 && (
              <div className="mt-6">
                <button
                  onClick={() => setShowUploader(true)}
                  className="inline-flex items-center px-4 py-2 bg-azure text-white text-sm font-medium rounded-lg hover:bg-azureSoft"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </button>
              </div>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
            {filtered.map((asset) => {
              const isSelected = selectedAssets.includes(asset.id);
              const thumbnail = getThumbnail(asset);
              
              return (
                <div
                  key={asset.id}
                  className={`relative group cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-azure bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleAssetSelection(asset.id)}
                >
                  {/* Thumbnail */}
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={asset.originalName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {getFileIcon(asset.mimeType)}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-2">
                    <p className="text-xs font-medium text-gray-900 truncate" title={asset.originalName}>
                      {asset.originalName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(asset.size)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewAsset(asset);
                        }}
                        className="p-1 bg-white rounded shadow-sm hover:bg-gray-50"
                        title="Preview"
                      >
                        <Eye className="h-3 w-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowReferences(asset);
                        }}
                        className="p-1 bg-white rounded shadow-sm hover:bg-gray-50"
                        title="Show References"
                      >
                        <Link className="h-3 w-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setReplaceAsset(asset);
                        }}
                        className="p-1 bg-white rounded shadow-sm hover:bg-gray-50"
                        title="Replace"
                      >
                        <RefreshCw className="h-3 w-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingAsset(asset);
                        }}
                        className="p-1 bg-white rounded shadow-sm hover:bg-gray-50"
                        title="Edit"
                      >
                        <Edit className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 left-2">
                      <div className="w-4 h-4 bg-azure rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filtered.map((asset) => {
              const isSelected = selectedAssets.includes(asset.id);
              const thumbnail = getThumbnail(asset);
              
              return (
                <div
                  key={asset.id}
                  className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
                    isSelected ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => toggleAssetSelection(asset.id)}
                >
                  {/* Selection Checkbox */}
                  <div className="flex-shrink-0 mr-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleAssetSelection(asset.id)}
                      className="h-4 w-4 text-azure focus:ring-azure border-gray-300 rounded"
                    />
                  </div>

                  {/* Thumbnail */}
                  <div className="flex-shrink-0 mr-4">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={asset.originalName}
                        className="h-10 w-10 object-cover rounded"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                        {getFileIcon(asset.mimeType)}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {asset.originalName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(asset.size)} • {asset.mimeType} • {new Date(asset.uploadedAt).toLocaleDateString()}
                    </p>
                    {asset.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {asset.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewAsset(asset);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                      title="Preview"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowReferences(asset);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                      title="Show References"
                    >
                      <Link className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setReplaceAsset(asset);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                      title="Replace"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingAsset(asset);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <a
                      href={asset.url}
                      download={asset.originalName}
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-gray-600"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploader && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => !isUploading && setShowUploader(false)}
            />
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Upload Media Files
                </h3>
                {!isUploading && (
                  <button
                    onClick={() => setShowUploader(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              <MediaUploader
                onUpload={handleUpload}
                maxFiles={10}
                maxFileSize={5 * 1024 * 1024} // 5MB
                acceptedTypes={['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf']}
              />
            </div>
          </div>
        </div>
      )}

      {/* New Folder Modal */}
      {showNewFolder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowNewFolder(false)}
            />
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Create New Folder
                </h3>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Folder name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-azure focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowNewFolder(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateFolder}
                    disabled={!newFolderName.trim()}
                    className="px-4 py-2 text-sm font-medium text-white bg-azure rounded-md hover:bg-azureSoft disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
              onClick={() => setPreviewAsset(null)}
            />
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-middle bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-4xl sm:w-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  {previewAsset.originalName}
                </h3>
                <button
                  onClick={() => setPreviewAsset(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                {previewAsset.mimeType.startsWith('image/') ? (
                  <img
                    src={previewAsset.url}
                    alt={previewAsset.originalName}
                    className="max-w-full max-h-96 mx-auto"
                  />
                ) : (
                  <div className="text-center py-8">
                    {getFileIcon(previewAsset.mimeType)}
                    <p className="mt-2 text-sm text-gray-600">
                      Preview not available for this file type
                    </p>
                    <a
                      href={previewAsset.url}
                      download={previewAsset.originalName}
                      className="mt-2 inline-flex items-center px-3 py-2 bg-azure text-white text-sm rounded-md hover:bg-azureSoft"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </div>
                )}
              </div>
              <div className="px-4 pb-4">
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Size:</strong> {formatFileSize(previewAsset.size)}</p>
                  <p><strong>Type:</strong> {previewAsset.mimeType}</p>
                  <p><strong>Uploaded:</strong> {new Date(previewAsset.uploadedAt).toLocaleString()}</p>
                  {previewAsset.tags.length > 0 && (
                    <p><strong>Tags:</strong> {previewAsset.tags.join(', ')}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Asset Modal */}
      {editingAsset && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setEditingAsset(null)}
            />
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Edit Asset
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    defaultValue={editingAsset.tags.join(', ')}
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                      setEditingAsset({ ...editingAsset, tags });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-azure focus:border-transparent"
                    placeholder="e.g., team, office, marketing"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingAsset(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEditAsset(editingAsset, { tags: editingAsset.tags })}
                    className="px-4 py-2 text-sm font-medium text-white bg-azure rounded-md hover:bg-azureSoft"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Replace Media Modal */}
      {replaceAsset && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setReplaceAsset(null)}
            />
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Replace Media File
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Replace "{replaceAsset.originalName}" and automatically update all references
                  </p>
                </div>
                <button
                  onClick={() => setReplaceAsset(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Important:</p>
                    <p>This will replace the current file and automatically update all content that references it. This action cannot be undone.</p>
                  </div>
                </div>
              </div>
              
              <MediaUploader
                onUpload={handleReplaceMedia}
                maxFiles={1}
                maxFileSize={5 * 1024 * 1024} // 5MB
                acceptedTypes={['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf']}
                multiple={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* Show References Modal */}
      {showReferences && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowReferences(null)}
            />
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Media References
                </h3>
                <button
                  onClick={() => setShowReferences(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center space-x-3">
                  {showReferences.asset.mimeType.startsWith('image/') ? (
                    <img
                      src={showReferences.asset.thumbnail || showReferences.asset.url}
                      alt={showReferences.asset.originalName}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                      {getFileIcon(showReferences.asset.mimeType)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{showReferences.asset.originalName}</p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(showReferences.asset.size)} • {showReferences.asset.mimeType}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Used in {showReferences.references.length} content item(s):
                </h4>
                
                {showReferences.references.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">
                    This media file is not currently referenced by any content.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {showReferences.references.map((ref, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900 capitalize">
                            {ref.collection} (ID: {ref.itemId})
                          </p>
                          <p className="text-xs text-gray-500">
                            Field: {ref.field}
                          </p>
                        </div>
                        <Link className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {showReferences.references.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> To delete this media file, you must first remove it from all content items that reference it, or use the replace function to update all references automatically.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Media Assets"
        message={`Are you sure you want to delete ${deleteConfirm.assets.length} asset(s)? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, assets: [] })}
      />
    </div>
  );
};

export default MediaManager;