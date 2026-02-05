// Tests for CloudStorageManager
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CloudStorageManager } from '../utils/cloudStorage';
import { cloudConfig } from '../config/cloud';

// Mock Supabase client
const mockSupabaseClient = {
  from: vi.fn(() => ({
    insert: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn(() => Promise.resolve({ data: {}, error: null }))
      }))
    })),
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: { data: { id: 'test', title: 'Test' } }, error: null }))
        }))
      }))
    })),
    update: vi.fn(() => ({
      eq: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null }))
      }))
    })),
    delete: vi.fn(() => ({
      eq: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null }))
      }))
    })),
    upsert: vi.fn(() => Promise.resolve({ error: null }))
  }))
};

// Mock cloud config
vi.mock('../config/cloud', () => ({
  cloudConfig: {
    isCloudEnabled: vi.fn(() => false), // Start with cloud disabled
    initialize: vi.fn(() => Promise.resolve()),
    getClient: vi.fn(() => mockSupabaseClient)
  }
}));

describe('CloudStorageManager', () => {
  let cloudStorage: CloudStorageManager;

  beforeEach(() => {
    vi.clearAllMocks();
    cloudStorage = new CloudStorageManager();
  });

  describe('initialization', () => {
    it('should handle cloud disabled gracefully', async () => {
      vi.mocked(cloudConfig.isCloudEnabled).mockReturnValue(false);
      
      await expect(cloudStorage.initialize()).rejects.toThrow('Cloud storage is not enabled');
    });

    it('should initialize successfully when cloud is enabled', async () => {
      vi.mocked(cloudConfig.isCloudEnabled).mockReturnValue(true);
      vi.mocked(cloudConfig.initialize).mockResolvedValue();
      
      await expect(cloudStorage.initialize()).resolves.not.toThrow();
    });
  });

  describe('collection validation', () => {
    beforeEach(async () => {
      vi.mocked(cloudConfig.isCloudEnabled).mockReturnValue(true);
      vi.mocked(cloudConfig.initialize).mockResolvedValue();
      await cloudStorage.initialize();
    });

    it('should accept supported collections', async () => {
      const testItem = { title: 'Test Job', description: 'Test Description', createdBy: 'test', status: 'published' as const };
      
      await expect(cloudStorage.create('jobs', testItem)).resolves.toBeDefined();
    });

    it('should reject unsupported collections', async () => {
      const testItem = { title: 'Test Service', description: 'Test Description', createdBy: 'test', status: 'published' as const };
      
      await expect(cloudStorage.create('services', testItem)).rejects.toThrow('Collection \'services\' not supported in MVP');
    });
  });

  describe('CRUD operations', () => {
    beforeEach(async () => {
      vi.mocked(cloudConfig.isCloudEnabled).mockReturnValue(true);
      vi.mocked(cloudConfig.initialize).mockResolvedValue();
      await cloudStorage.initialize();
    });

    it('should create items successfully', async () => {
      const testItem = { 
        title: 'Test Job', 
        description: 'Test Description', 
        createdBy: 'test', 
        status: 'published' as const 
      };
      
      const result = await cloudStorage.create('jobs', testItem);
      
      expect(result).toMatchObject({
        title: 'Test Job',
        description: 'Test Description',
        createdBy: 'test',
        status: 'published'
      });
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });

    it('should read items successfully', async () => {
      const result = await cloudStorage.read('jobs', 'test-id');
      
      expect(result).toEqual({ id: 'test', title: 'Test' });
    });

    it('should handle read of non-existent items', async () => {
      // Mock no rows returned
      vi.mocked(mockSupabaseClient.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn(() => Promise.resolve({ data: null, error: { code: 'PGRST116' } }))
            }))
          }))
        }))
      } as any);

      const result = await cloudStorage.read('jobs', 'non-existent');
      expect(result).toBeNull();
    });

    it('should validate required parameters', async () => {
      await expect(cloudStorage.read('jobs', '')).rejects.toThrow('ID must be a non-empty string');
      await expect(cloudStorage.update('jobs', '', {})).rejects.toThrow('ID must be a non-empty string');
      await expect(cloudStorage.delete('jobs', '')).rejects.toThrow('ID must be a non-empty string');
    });
  });

  describe('media operations', () => {
    beforeEach(async () => {
      vi.mocked(cloudConfig.isCloudEnabled).mockReturnValue(true);
      vi.mocked(cloudConfig.initialize).mockResolvedValue();
      await cloudStorage.initialize();
    });

    it('should reject media operations in MVP', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      
      await expect(cloudStorage.uploadMedia(mockFile)).rejects.toThrow('Media upload not supported in MVP');
      await expect(cloudStorage.deleteMedia('test-id')).rejects.toThrow('Media deletion not supported in MVP');
    });
  });

  describe('export/import', () => {
    beforeEach(async () => {
      vi.mocked(cloudConfig.isCloudEnabled).mockReturnValue(true);
      vi.mocked(cloudConfig.initialize).mockResolvedValue();
      await cloudStorage.initialize();
    });

    it('should export data successfully', async () => {
      // Mock list responses
      vi.mocked(mockSupabaseClient.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(() => Promise.resolve({ 
              data: [
                { data: { id: '1', title: 'Job 1' } },
                { data: { id: '2', title: 'Blog 1' } }
              ], 
              error: null 
            }))
          }))
        }))
      } as any);

      const result = await cloudStorage.export();
      
      expect(result).toMatchObject({
        version: '1.0.0',
        data: {
          jobs: expect.any(Array),
          blog: expect.any(Array),
          services: [],
          testimonials: [],
          team: [],
          media: []
        }
      });
      expect(result.exportedAt).toBeDefined();
    });

    it('should import data successfully', async () => {
      const testData = {
        version: '1.0.0',
        exportedAt: new Date(),
        data: {
          jobs: [{ id: '1', title: 'Test Job', createdAt: new Date(), updatedAt: new Date(), createdBy: 'test', status: 'published' as const }],
          blog: [{ id: '2', title: 'Test Blog', createdAt: new Date(), updatedAt: new Date(), createdBy: 'test', status: 'published' as const }],
          services: [],
          testimonials: [],
          team: [],
          media: [],
          stats: { clientCount: 0, placementsMade: 0, successRate: 0, yearsInBusiness: 0, lastUpdated: new Date() },
          company: { vision: '', mission: '', approach: '', contactDetails: { address: '', phone: '', email: '', businessHours: {} }, processSteps: [], lastUpdated: new Date() },
          config: {}
        }
      };

      const result = await cloudStorage.import(testData);
      
      expect(result).toMatchObject({
        success: true,
        imported: 2,
        skipped: 0,
        errors: []
      });
    });
  });
});