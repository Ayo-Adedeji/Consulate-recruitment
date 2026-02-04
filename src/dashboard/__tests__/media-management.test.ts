import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StorageManagerImpl } from '../utils/storage';
import { MediaAsset } from '../types/content';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock URL.createObjectURL
Object.defineProperty(URL, 'createObjectURL', {
  value: vi.fn(() => 'mock-url'),
});

describe('Media Management System', () => {
  let storageManager: StorageManagerImpl;
  
  beforeEach(() => {
    vi.clearAllMocks();
    storageManager = new StorageManagerImpl();
    
    // Mock localStorage to return empty arrays
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));
  });

  describe('Media Upload', () => {
    it('should upload a media file successfully', async () => {
      const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
      
      const result = await storageManager.uploadMedia(mockFile);
      
      expect(result).toBeDefined();
      expect(result.originalName).toBe('test.jpg');
      expect(result.mimeType).toBe('image/jpeg');
      expect(result.size).toBe(mockFile.size);
      expect(result.status).toBe('published');
    });

    it('should validate file size limits', async () => {
      const largeFile = new File(['x'.repeat(10 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
      
      await expect(storageManager.uploadMedia(largeFile)).rejects.toThrow('File size');
    });

    it('should generate unique filenames', async () => {
      const file1 = new File(['content1'], 'test.jpg', { type: 'image/jpeg' });
      const file2 = new File(['content2'], 'test.jpg', { type: 'image/jpeg' });
      
      const result1 = await storageManager.uploadMedia(file1);
      const result2 = await storageManager.uploadMedia(file2);
      
      expect(result1.filename).not.toBe(result2.filename);
      expect(result1.filename).toContain('test.jpg');
      expect(result2.filename).toContain('test.jpg');
    });
  });

  describe('Media Reference Management', () => {
    it('should find media references in content', async () => {
      const mediaId = 'test-media-id';
      
      // Mock content with media references
      const mockContent = [
        {
          id: 'content-1',
          clientImage: mediaId,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'user',
          status: 'published'
        }
      ];
      
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'cms_collection_testimonials') {
          return JSON.stringify(mockContent);
        }
        return JSON.stringify([]);
      });
      
      const references = await storageManager.findMediaReferences(mediaId);
      
      expect(references).toHaveLength(1);
      expect(references[0]).toEqual({
        collection: 'testimonials',
        itemId: 'content-1',
        field: 'clientImage'
      });
    });

    it('should update media references when replacing media', async () => {
      const oldMediaId = 'old-media-id';
      const newMediaId = 'new-media-id';
      
      const mockContent = [
        {
          id: 'content-1',
          clientImage: oldMediaId,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'user',
          status: 'published'
        }
      ];
      
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'cms_collection_testimonials') {
          return JSON.stringify(mockContent);
        }
        return JSON.stringify([]);
      });
      
      await storageManager.updateMediaReferences(oldMediaId, newMediaId);
      
      // Verify that setItem was called to update the content
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('should prevent deletion of referenced media', async () => {
      const mediaId = 'referenced-media-id';
      
      // Mock content with media references
      const mockContent = [
        {
          id: 'content-1',
          clientImage: mediaId,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'user',
          status: 'published'
        }
      ];
      
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'cms_collection_testimonials') {
          return JSON.stringify(mockContent);
        }
        return JSON.stringify([]);
      });
      
      await expect(storageManager.deleteMedia(mediaId)).rejects.toThrow('Cannot delete media: it is referenced');
    });
  });

  describe('Media Metadata', () => {
    it('should get media metadata with usage statistics', async () => {
      const mediaId = 'test-media-id';
      
      // Mock media asset
      const mockMedia = [{
        id: mediaId,
        filename: 'test.jpg',
        originalName: 'test.jpg',
        mimeType: 'image/jpeg',
        size: 1024,
        url: 'mock-url',
        tags: ['test'],
        uploadedAt: new Date(),
        uploadedBy: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user',
        status: 'published' as const
      }];
      
      // Mock content with references
      const mockContent = [
        {
          id: 'content-1',
          clientImage: mediaId,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'user',
          status: 'published'
        }
      ];
      
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'cms_collection_media') {
          return JSON.stringify(mockMedia);
        }
        if (key === 'cms_collection_testimonials') {
          return JSON.stringify(mockContent);
        }
        return JSON.stringify([]);
      });
      
      const metadata = await storageManager.getMediaMetadata(mediaId);
      
      expect(metadata).toBeDefined();
      expect(metadata.asset).toBeDefined();
      expect(metadata.asset?.id).toBe(mediaId);
      expect(metadata.references).toHaveLength(1);
      expect(metadata.usageCount).toBe(1);
    });
  });

  describe('Media Replacement', () => {
    it('should replace media and update all references', async () => {
      const oldMediaId = 'old-media-id';
      const newFile = new File(['new content'], 'new-test.jpg', { type: 'image/jpeg' });
      
      // Mock existing media
      const mockMedia = [{
        id: oldMediaId,
        filename: 'old-test.jpg',
        originalName: 'old-test.jpg',
        mimeType: 'image/jpeg',
        size: 1024,
        url: 'old-mock-url',
        tags: ['old'],
        uploadedAt: new Date(),
        uploadedBy: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user',
        status: 'published' as const
      }];
      
      // Mock content with references
      const mockContent = [
        {
          id: 'content-1',
          clientImage: oldMediaId,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'user',
          status: 'published'
        }
      ];
      
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'cms_collection_media') {
          return JSON.stringify(mockMedia);
        }
        if (key === 'cms_collection_testimonials') {
          return JSON.stringify(mockContent);
        }
        return JSON.stringify([]);
      });
      
      const newMedia = await storageManager.replaceMedia(oldMediaId, newFile);
      
      expect(newMedia).toBeDefined();
      expect(newMedia.originalName).toBe('new-test.jpg');
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });
});