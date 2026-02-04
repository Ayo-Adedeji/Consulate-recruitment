import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Image, File, AlertCircle, Check } from 'lucide-react';
import { useToast } from './Toast';

interface MediaFile {
  file: File;
  id: string;
  preview?: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface MediaUploaderProps {
  onUpload: (files: File[]) => Promise<void>;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  acceptedTypes?: string[];
  multiple?: boolean;
  className?: string;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  onUpload,
  maxFiles = 10,
  maxFileSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf'],
  multiple = true,
  className = '',
}) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  // Generate unique ID for files
  const generateId = () => Math.random().toString(36).substring(2, 15);

  // Create preview URL for images
  const createPreview = (file: File): string | undefined => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return undefined;
  };

  // Validate file
  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported`;
    }
    if (file.size > maxFileSize) {
      return `File size exceeds ${Math.round(maxFileSize / 1024 / 1024)}MB limit`;
    }
    return null;
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle file selection
  const handleFiles = useCallback((selectedFiles: FileList | File[]) => {
    const fileArray = Array.from(selectedFiles);
    
    // Check total file count
    if (files.length + fileArray.length > maxFiles) {
      showToast({
        type: 'error',
        title: 'Too many files',
        message: `Maximum ${maxFiles} files allowed`,
      });
      return;
    }

    const newFiles: MediaFile[] = [];
    
    fileArray.forEach(file => {
      const error = validateFile(file);
      const mediaFile: MediaFile = {
        file,
        id: generateId(),
        preview: createPreview(file),
        progress: 0,
        status: error ? 'error' : 'pending',
        error,
      };
      newFiles.push(mediaFile);
    });

    setFiles(prev => [...prev, ...newFiles]);
  }, [files.length, maxFiles, showToast]);

  // Handle drag events
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  }, [handleFiles]);

  // Handle file input change
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(selectedFiles);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleFiles]);

  // Remove file
  const removeFile = useCallback((id: string) => {
    setFiles(prev => {
      const updated = prev.filter(f => f.id !== id);
      // Clean up preview URLs
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return updated;
    });
  }, []);

  // Upload files
  const handleUpload = useCallback(async () => {
    const validFiles = files.filter(f => f.status === 'pending');
    if (validFiles.length === 0) return;

    setIsUploading(true);
    
    try {
      // Update status to uploading
      setFiles(prev => prev.map(f => 
        f.status === 'pending' ? { ...f, status: 'uploading' as const } : f
      ));

      // Simulate upload progress (in real implementation, this would be handled by the upload function)
      const progressInterval = setInterval(() => {
        setFiles(prev => prev.map(f => 
          f.status === 'uploading' 
            ? { ...f, progress: Math.min(f.progress + 10, 90) }
            : f
        ));
      }, 200);

      // Call the upload function
      await onUpload(validFiles.map(f => f.file));

      // Clear progress interval
      clearInterval(progressInterval);

      // Update status to success
      setFiles(prev => prev.map(f => 
        f.status === 'uploading' 
          ? { ...f, status: 'success' as const, progress: 100 }
          : f
      ));

      showToast({
        type: 'success',
        title: 'Upload successful',
        message: `${validFiles.length} file(s) uploaded successfully`,
      });

      // Clear files after successful upload
      setTimeout(() => {
        setFiles([]);
      }, 2000);

    } catch (error) {
      // Update status to error
      setFiles(prev => prev.map(f => 
        f.status === 'uploading' 
          ? { 
              ...f, 
              status: 'error' as const, 
              error: error instanceof Error ? error.message : 'Upload failed'
            }
          : f
      ));

      showToast({
        type: 'error',
        title: 'Upload failed',
        message: error instanceof Error ? error.message : 'Failed to upload files',
      });
    } finally {
      setIsUploading(false);
    }
  }, [files, onUpload, showToast]);

  // Clear all files
  const clearFiles = useCallback(() => {
    files.forEach(f => {
      if (f.preview) {
        URL.revokeObjectURL(f.preview);
      }
    });
    setFiles([]);
  }, [files]);

  // Get file icon
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-8 w-8 text-blue-500" />;
    }
    return <File className="h-8 w-8 text-gray-500" />;
  };

  // Get status icon
  const getStatusIcon = (status: MediaFile['status']) => {
    switch (status) {
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const hasValidFiles = files.some(f => f.status === 'pending');
  const hasFiles = files.length > 0;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
          isDragOver
            ? 'border-azure bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedTypes.join(',')}
          onChange={handleFileInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-2">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div>
            <p className="text-lg font-medium text-gray-900">
              Drop files here or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports: {acceptedTypes.map(type => type.split('/')[1]).join(', ')}
            </p>
            <p className="text-xs text-gray-400">
              Max {maxFiles} files, {Math.round(maxFileSize / 1024 / 1024)}MB each
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {hasFiles && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">
              Selected Files ({files.length})
            </h4>
            <button
              onClick={clearFiles}
              className="text-sm text-gray-500 hover:text-gray-700"
              disabled={isUploading}
            >
              Clear all
            </button>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {files.map((mediaFile) => (
              <div
                key={mediaFile.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                {/* File Preview/Icon */}
                <div className="flex-shrink-0">
                  {mediaFile.preview ? (
                    <img
                      src={mediaFile.preview}
                      alt={mediaFile.file.name}
                      className="h-10 w-10 object-cover rounded"
                    />
                  ) : (
                    getFileIcon(mediaFile.file)
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {mediaFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(mediaFile.file.size)}
                  </p>
                  {mediaFile.error && (
                    <p className="text-xs text-red-600">{mediaFile.error}</p>
                  )}
                </div>

                {/* Progress/Status */}
                <div className="flex-shrink-0 flex items-center space-x-2">
                  {mediaFile.status === 'uploading' && (
                    <div className="w-16">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-azure h-2 rounded-full transition-all duration-300"
                          style={{ width: `${mediaFile.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {getStatusIcon(mediaFile.status)}
                  
                  <button
                    onClick={() => removeFile(mediaFile.id)}
                    className="text-gray-400 hover:text-gray-600"
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      {hasValidFiles && (
        <div className="flex justify-end">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="inline-flex items-center px-4 py-2 bg-azure text-white text-sm font-medium rounded-lg hover:bg-azureSoft focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azure transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;