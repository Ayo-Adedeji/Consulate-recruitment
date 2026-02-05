// Tests for SimpleCloudStorageManager
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SimpleCloudStorageManager } from '../utils/simpleCloudStorage';
import { cloudConfig } from '../config/cloud';

// Mock Supabase client
const mockSupabaseClient = {
  from: vi.fn(() => ({
    insert: vi.fn(() => Promise.resolve({ error: null })),
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: { data: { id: 'test', title: 'Test' } }, error: null }))
        })),
        order: vi.fn(() => Promise.resolve({ data: [{ data: { id: 'test', title: 'Test' } }], error: null }))
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
    }))
  }))
};

// Mock cloud config
vi.mock('../config/cloud', () => ({
  cloudConfig: {
    isCloudEnabled: vi.fn(() => true),
    initialize: vi.fn(() => Promise.resolve()),
    getClient: vi.fn(() => mockSupabaseClient)
  }
}));

describe('SimpleCloudStorageManager', () => {
  let simpleStorage: SimpleCloudStorageManager;

  beforeEach(() => {
    vi.clearAllMocks();
    simpleStorage = new SimpleCloudStorageManager();
  });

  describe('initialization', () => {
    it('should initialize successfully when cloud is enabled', async () => {
      vi.mocked(cloudConfig.isCloudEnabled).mockReturnValue(true);
      vi.mocked(cloudConfig.initialize).mockResolvedValue();
      
      await expect(simpleStorage.initialize()).resolves.not.toThrow();
    });

    it('should throw error when cloud is disabled', async () => {
      vi.mocked(cloudConfig.isCloudEnabled).mockReturnValue(false);
      
      await expect(simpleStorage.initialize()).rejects.toThrow('Cloud storage is not enabled');
    });
  });

  describe('collection validation', () => {
    beforeEach(async () => {
      vi.mocked(cloudConfig.isCloudEnabled).mockReturnValue(true);
      vi.mocked(cloudConfig.initialize).mockResolvedValue();
      await simpleStorage.initialize();
    });

    it('should accept supported collections (jobs, blog)', async () => {
      const testItem = { title: 'Test Job', description: 'Test Description', createdBy: 'test', status: 'published' as const };
      
      await expect(simpleStorage.create('jobs', testItem)).resolves.toBeDefined();
      await expect(simpleStorage.create('blog', testItem)).resolves.toBeDefined();
    });

    it('should reject unsupported collections', async () => {
      const testItem = { title: 'Test Service', description: 'Test Description', createdBy: 'test', status: 'published' as const };
      
      await expect(simpleStorage.create('services', testItem)).rejects.toThrow('Collection \'services\' not supported');
    });
  });

  describe('CRUD operations', () => {
    beforeEach(async () => {
      vi.mocked(cloudConfig.isCloudEnabled).mockReturnValue(true);
      vi.mocked(cloudConfig.initialize).mockResolvedValue();
      await simpleStorage.initialize();
    });

    it('should create items successfully', async () => {
      const testItem = { 
        title: 'Test Job', 
        description: 'Test Description', 
        createdBy: 'test', 
        status: 'published' as const 
      };
      
      const result = await simpleStorage.create('jobs', testItem);
      
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
      const result = await simpleStorage.read('jobs', 'test-id');
      
      expect(result).toEqual({ id: 'test', title: 'Test' });
    });

    it('should list items successfully', async () => {
      const result = await simpleStorage.list('jobs');
      
      expect(result).toEqual([{ id: 'test', title: 'Test' }]);
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

      const result = await simpleStorage.read('jobs', 'non-existent');
      expect(result).toBeNull();
    });
  });

  describe('media operations', () => {
    beforeEach(async () => {
      vi.mocked(cloudConfig.isCloudEnabled).mockReturnValue(true);
      vi.mocked(cloudConfig.initialize).mockResolvedValue();
      await simpleStorage.initialize();
    });

    it('should reject media operations in MVP', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      
      await expect(simpleStorage.uploadMedia(mockFile)).rejects.toThrow('Media upload not supported in MVP');
      await expect(simpleStorage.deleteMedia('test-id')).rejects.toThrow('Media deletion not supported in MVP');
    });
  });

  describe('export functionality', () => {
    beforeEach(async () => {
      vi.mocked(cloudConfig.isCloudEnabled).mockReturnValue(true);
      vi.mocked(cloudConfig.initialize).mockResolvedValue();
      await simpleStorage.initialize();
    });

    it('should export data with correct structure', async () => {
      const result = await simpleStorage.export();
      
      expect(result).toMatchObject({
        version: '1.0.0',
        data: {
          jobs: expect.any(Array),
          blog: expect.any(Array),
          services: [],
          testimonials: [],
          team: [],
          media: [],
          config: {
            site: expect.any(Object),
            features: expect.any(Object),
            limits: expect.any(Object)
          }
        }
      });
      expect(result.exportedAt).toBeDefined();
    });
  });
});