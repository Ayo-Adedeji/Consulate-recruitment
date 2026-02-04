import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StorageManagerImpl, generateId, getCurrentTimestamp, validateJsonStructure, storageUtils } from '../utils/storage';
import { BaseContent, Service, Testimonial, JobListing, TeamMember } from '../types';

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      
      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(id1.length).toBeGreaterThan(0);
    });

    it('should generate IDs with expected format', () => {
      const id = generateId();
      expect(id).toMatch(/^[a-z0-9]+-[a-z0-9]+$/);
    });
  });

  describe('getCurrentTimestamp', () => {
    it('should return a valid Date object', () => {
      const timestamp = getCurrentTimestamp();
      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).toBeCloseTo(Date.now(), -2); // Within 100ms
    });
  });

  describe('validateJsonStructure', () => {
    it('should validate valid JSON structures', () => {
      expect(validateJsonStructure({ key: 'value' })).toBe(true);
      expect(validateJsonStructure([])).toBe(true);
      expect(validateJsonStructure('string')).toBe(true);
      expect(validateJsonStructure(123)).toBe(true);
      expect(validateJsonStructure(null)).toBe(true);
    });

    it('should reject circular references', () => {
      const circular: any = { a: 1 };
      circular.self = circular;
      expect(validateJsonStructure(circular)).toBe(false);
    });
  });

  describe('storageUtils', () => {
    it('should save and load data from localStorage', () => {
      const testData = { name: 'test', value: 123 };
      
      storageUtils.saveToLocalStorage('test-key', testData);
      const loaded = storageUtils.loadFromLocalStorage('test-key');
      
      expect(loaded).toEqual(testData);
    });

    it('should return null for non-existent keys', () => {
      const result = storageUtils.loadFromLocalStorage('non-existent');
      expect(result).toBeNull();
    });

    it('should handle invalid JSON gracefully', () => {
      localStorage.setItem('invalid-json', 'invalid json string');
      const result = storageUtils.loadFromLocalStorage('invalid-json');
      expect(result).toBeNull();
    });

    it('should remove items from localStorage', () => {
      storageUtils.saveToLocalStorage('test-key', { data: 'test' });
      expect(storageUtils.loadFromLocalStorage('test-key')).not.toBeNull();
      
      storageUtils.removeFromLocalStorage('test-key');
      expect(storageUtils.loadFromLocalStorage('test-key')).toBeNull();
    });

    it('should get all localStorage keys', () => {
      storageUtils.saveToLocalStorage('key1', 'value1');
      storageUtils.saveToLocalStorage('key2', 'value2');
      
      const keys = storageUtils.getAllKeys();
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
    });

    it('should calculate storage size', () => {
      storageUtils.saveToLocalStorage('test', 'data');
      const size = storageUtils.getStorageSize();
      expect(size).toBeGreaterThan(0);
    });
  });
});

describe('StorageManager', () => {
  let storageManager: StorageManagerImpl;

  beforeEach(() => {
    localStorage.clear();
    storageManager = new StorageManagerImpl();
  });

  describe('CRUD Operations', () => {
    const mockService: Omit<Service, 'id' | 'createdAt' | 'updatedAt'> = {
      title: 'Test Service',
      description: 'Test Description',
      category: 'recruitment',
      features: ['feature1', 'feature2'],
      status: 'draft',
      createdBy: 'test-user'
    };

    it('should create a new item', async () => {
      const created = await storageManager.create<Service>('services', mockService);
      
      expect(created.id).toBeDefined();
      expect(created.title).toBe(mockService.title);
      expect(created.createdAt).toBeInstanceOf(Date);
      expect(created.updatedAt).toBeInstanceOf(Date);
      expect(created.createdBy).toBe(mockService.createdBy);
    });

    it('should read an existing item', async () => {
      const created = await storageManager.create<Service>('services', mockService);
      const read = await storageManager.read<Service>('services', created.id);
      
      expect(read).toEqual(created);
    });

    it('should return null for non-existent item', async () => {
      const result = await storageManager.read('services', 'non-existent-id');
      expect(result).toBeNull();
    });

    it('should update an existing item', async () => {
      const created = await storageManager.create<Service>('services', mockService);
      const updates = { title: 'Updated Title', description: 'Updated Description' };
      
      const updated = await storageManager.update<Service>('services', created.id, updates);
      
      expect(updated.title).toBe(updates.title);
      expect(updated.description).toBe(updates.description);
      expect(updated.id).toBe(created.id);
      expect(updated.updatedAt.getTime()).toBeGreaterThan(created.updatedAt.getTime());
    });

    it('should throw error when updating non-existent item', async () => {
      await expect(
        storageManager.update('services', 'non-existent-id', { title: 'New Title' })
      ).rejects.toThrow('Item with ID \'non-existent-id\' not found');
    });

    it('should delete an existing item', async () => {
      const created = await storageManager.create<Service>('services', mockService);
      
      const deleted = await storageManager.delete('services', created.id);
      expect(deleted).toBe(true);
      
      const read = await storageManager.read('services', created.id);
      expect(read).toBeNull();
    });

    it('should return false when deleting non-existent item', async () => {
      const result = await storageManager.delete('services', 'non-existent-id');
      expect(result).toBe(false);
    });

    it('should list all items in a collection', async () => {
      const service1 = await storageManager.create<Service>('services', mockService);
      const service2 = await storageManager.create<Service>('services', {
        ...mockService,
        title: 'Second Service'
      });
      
      const list = await storageManager.list<Service>('services');
      
      expect(list).toHaveLength(2);
      expect(list.find(s => s.id === service1.id)).toBeDefined();
      expect(list.find(s => s.id === service2.id)).toBeDefined();
    });
  });

  describe('Filtering', () => {
    beforeEach(async () => {
      // Create test data
      await storageManager.create<Service>('services', {
        title: 'Recruitment Service',
        description: 'Recruitment description',
        category: 'recruitment',
        features: ['feature1'],
        status: 'published',
        createdBy: 'user1'
      });

      await storageManager.create<Service>('services', {
        title: 'Cleaning Service',
        description: 'Cleaning description',
        category: 'cleaning',
        features: ['feature2'],
        status: 'draft',
        createdBy: 'user2'
      });
    });

    it('should filter by status', async () => {
      const published = await storageManager.list<Service>('services', { status: 'published' });
      const draft = await storageManager.list<Service>('services', { status: 'draft' });
      
      expect(published).toHaveLength(1);
      expect(published[0].status).toBe('published');
      expect(draft).toHaveLength(1);
      expect(draft[0].status).toBe('draft');
    });

    it('should filter by category', async () => {
      const recruitment = await storageManager.list<Service>('services', { category: 'recruitment' });
      const cleaning = await storageManager.list<Service>('services', { category: 'cleaning' });
      
      expect(recruitment).toHaveLength(1);
      expect(recruitment[0].category).toBe('recruitment');
      expect(cleaning).toHaveLength(1);
      expect(cleaning[0].category).toBe('cleaning');
    });

    it('should filter by search term', async () => {
      const recruitmentResults = await storageManager.list<Service>('services', { searchTerm: 'recruitment' });
      const cleaningResults = await storageManager.list<Service>('services', { searchTerm: 'cleaning' });
      
      expect(recruitmentResults).toHaveLength(1);
      expect(recruitmentResults[0].title).toContain('Recruitment');
      expect(cleaningResults).toHaveLength(1);
      expect(cleaningResults[0].title).toContain('Cleaning');
    });

    it('should filter by date range', async () => {
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      
      const results = await storageManager.list<Service>('services', {
        dateRange: { start: yesterday, end: tomorrow }
      });
      
      expect(results).toHaveLength(2); // Both items should be within range
    });
  });

  describe('Validation', () => {
    it('should validate collection names', async () => {
      await expect(
        storageManager.create('', { title: 'test', status: 'draft', createdBy: 'user' })
      ).rejects.toThrow('Collection name must be a non-empty string');

      await expect(
        storageManager.create('   ', { title: 'test', status: 'draft', createdBy: 'user' })
      ).rejects.toThrow('Collection name must be a non-empty string');
    });

    it('should validate IDs', async () => {
      await expect(
        storageManager.read('services', '')
      ).rejects.toThrow('ID must be a non-empty string');

      await expect(
        storageManager.update('services', '   ', { title: 'test' })
      ).rejects.toThrow('ID must be a non-empty string');
    });

    it('should validate item structure', async () => {
      await expect(
        storageManager.create('services', null as any)
      ).rejects.toThrow();

      await expect(
        storageManager.create('services', 'invalid' as any)
      ).rejects.toThrow();
    });
  });

  describe('Export and Import', () => {
    beforeEach(async () => {
      // Create test data
      await storageManager.create<Service>('services', {
        title: 'Test Service',
        description: 'Test Description',
        category: 'recruitment',
        features: ['feature1'],
        status: 'published',
        createdBy: 'user1'
      });
    });

    it('should export all data', async () => {
      const exportData = await storageManager.export();
      
      expect(exportData.version).toBeDefined();
      expect(exportData.exportedAt).toBeInstanceOf(Date);
      expect(exportData.data).toBeDefined();
      expect(exportData.data.services).toHaveLength(1);
      expect(exportData.data.services[0].title).toBe('Test Service');
    });

    it('should import data successfully', async () => {
      const exportData = await storageManager.export();
      
      // Clear storage
      localStorage.clear();
      
      // Import data
      const importResult = await storageManager.import(exportData);
      
      expect(importResult.success).toBe(true);
      expect(importResult.imported).toBeGreaterThan(0);
      expect(importResult.errors).toHaveLength(0);
      
      // Verify data was imported
      const services = await storageManager.list<Service>('services');
      expect(services).toHaveLength(1);
      expect(services[0].title).toBe('Test Service');
    });

    it('should handle invalid export data', async () => {
      await expect(
        storageManager.import(null as any)
      ).rejects.toThrow('Invalid export package format');

      await expect(
        storageManager.import({ version: '1.0.0' } as any)
      ).rejects.toThrow('Export package missing required fields');
    });
  });

  describe('Media Operations', () => {
    it('should upload media file', async () => {
      const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
      
      const mediaAsset = await storageManager.uploadMedia(mockFile);
      
      expect(mediaAsset.id).toBeDefined();
      expect(mediaAsset.originalName).toBe('test.jpg');
      expect(mediaAsset.mimeType).toBe('image/jpeg');
      expect(mediaAsset.size).toBe(mockFile.size);
      expect(mediaAsset.uploadedAt).toBeInstanceOf(Date);
    });

    it('should validate media file size', async () => {
      const largeFile = new File(['x'.repeat(10 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
      
      await expect(
        storageManager.uploadMedia(largeFile)
      ).rejects.toThrow('File size');
    });

    it('should delete media file', async () => {
      const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
      const mediaAsset = await storageManager.uploadMedia(mockFile);
      
      const deleted = await storageManager.deleteMedia(mediaAsset.id);
      expect(deleted).toBe(true);
      
      const media = await storageManager.read('media', mediaAsset.id);
      expect(media).toBeNull();
    });
  });

  describe('Error Handling', () => {
    it('should handle storage errors gracefully', async () => {
      // Mock localStorage to throw an error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = vi.fn(() => {
        throw new Error('Storage quota exceeded');
      });
      
      await expect(
        storageManager.create('services', {
          title: 'Test',
          description: 'Test',
          category: 'recruitment',
          features: [],
          status: 'draft',
          createdBy: 'user'
        })
      ).rejects.toThrow('Failed to create item');
      
      // Restore original method
      localStorage.setItem = originalSetItem;
    });

    it('should handle large data gracefully', async () => {
      const largeData = 'x'.repeat(10 * 1024 * 1024); // 10MB string
      
      await expect(
        storageManager.create('services', {
          title: 'Test',
          description: largeData,
          category: 'recruitment',
          features: [],
          status: 'draft',
          createdBy: 'user'
        })
      ).rejects.toThrow('exceeds maximum storage limit');
    });
  });
});