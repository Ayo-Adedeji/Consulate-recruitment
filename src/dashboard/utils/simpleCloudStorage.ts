// Simple Cloud Storage Manager - NO localStorage, NO hybrid nonsense
import { 
  StorageManager, 
  BaseContent, 
  FilterOptions, 
  ExportPackage, 
  ImportResult, 
  MediaAsset 
} from '../types';
import { cloudConfig } from '../config/cloud';
import { generateId, getCurrentTimestamp, validateJsonStructure } from './storage';

/**
 * Simple Cloud Storage Manager - ONLY uses Supabase, no localStorage
 */
export class SimpleCloudStorageManager implements StorageManager {
  private initialized = false;
  private readonly SUPPORTED_COLLECTIONS = ['jobs', 'blog'];

  constructor() {
    this.initialize().catch(error => {
      console.error('Failed to initialize cloud storage:', error);
    });
  }

  async initialize(): Promise<void> {
    try {
      if (!cloudConfig.isCloudEnabled()) {
        throw new Error('Cloud storage is not enabled');
      }

      await cloudConfig.initialize();
      this.initialized = true;
      console.log('✅ Simple Cloud Storage initialized');
    } catch (error) {
      console.error('❌ Cloud storage initialization failed:', error);
      throw error;
    }
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  private validateCollection(collection: string): void {
    if (!this.SUPPORTED_COLLECTIONS.includes(collection)) {
      throw new Error(`Collection '${collection}' not supported. Supported: ${this.SUPPORTED_COLLECTIONS.join(', ')}`);
    }
  }

  async create<T extends BaseContent>(
    collection: string, 
    item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<T> {
    await this.ensureInitialized();
    this.validateCollection(collection);

    const supabase = cloudConfig.getClient();
    const now = getCurrentTimestamp();
    const itemId = generateId();

    const newItem: T = {
      ...item,
      id: itemId,
      createdAt: now,
      updatedAt: now,
    } as T;

    if (!validateJsonStructure(newItem)) {
      throw new Error('Invalid item structure');
    }

    const { error } = await supabase
      .from('cms_collections')
      .insert({
        collection_name: collection,
        item_id: itemId,
        data: newItem,
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
        status: newItem.status || 'published'
      });

    if (error) {
      throw new Error(`Create failed: ${error.message}`);
    }

    console.log(`✅ Created ${collection}:`, itemId);
    return newItem;
  }

  async read<T extends BaseContent>(collection: string, id: string): Promise<T | null> {
    await this.ensureInitialized();
    this.validateCollection(collection);

    const supabase = cloudConfig.getClient();

    const { data, error } = await supabase
      .from('cms_collections')
      .select('data')
      .eq('collection_name', collection)
      .eq('item_id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Read failed: ${error.message}`);
    }

    return data?.data as T || null;
  }

  async update<T extends BaseContent>(
    collection: string, 
    id: string, 
    updates: Partial<T>
  ): Promise<T> {
    await this.ensureInitialized();
    this.validateCollection(collection);

    const existingItem = await this.read<T>(collection, id);
    if (!existingItem) {
      throw new Error(`Item ${id} not found`);
    }

    const updatedItem: T = {
      ...existingItem,
      ...updates,
      id,
      updatedAt: getCurrentTimestamp(),
    };

    const supabase = cloudConfig.getClient();

    const { error } = await supabase
      .from('cms_collections')
      .update({
        data: updatedItem,
        updated_at: updatedItem.updatedAt.toISOString(),
        status: updatedItem.status || 'published'
      })
      .eq('collection_name', collection)
      .eq('item_id', id);

    if (error) {
      throw new Error(`Update failed: ${error.message}`);
    }

    console.log(`✅ Updated ${collection}:`, id);
    return updatedItem;
  }

  async delete(collection: string, id: string): Promise<boolean> {
    await this.ensureInitialized();
    this.validateCollection(collection);

    const supabase = cloudConfig.getClient();

    const { error } = await supabase
      .from('cms_collections')
      .delete()
      .eq('collection_name', collection)
      .eq('item_id', id);

    if (error) {
      throw new Error(`Delete failed: ${error.message}`);
    }

    console.log(`✅ Deleted ${collection}:`, id);
    return true;
  }

  async list<T extends BaseContent>(collection: string, filters?: FilterOptions): Promise<T[]> {
    await this.ensureInitialized();
    this.validateCollection(collection);

    const supabase = cloudConfig.getClient();

    let query = supabase
      .from('cms_collections')
      .select('data')
      .eq('collection_name', collection)
      .order('created_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`List failed: ${error.message}`);
    }

    let items: T[] = (data || []).map(row => row.data as T);

    // Apply client-side filters
    if (filters) {
      items = this.applyClientFilters(items, filters);
    }

    return items;
  }

  private applyClientFilters<T extends BaseContent>(items: T[], filters: FilterOptions): T[] {
    let filtered = [...items];

    if (filters.category) {
      filtered = filtered.filter(item => 
        'category' in item && (item as any).category === filters.category
      );
    }

    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= start && itemDate <= end;
      });
    }

    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(item => {
        const searchableFields = ['title', 'name', 'description', 'content'];
        return searchableFields.some(field => {
          const value = (item as any)[field];
          return typeof value === 'string' && value.toLowerCase().includes(searchTerm);
        });
      });
    }

    return filtered;
  }

  async export(): Promise<ExportPackage> {
    await this.ensureInitialized();

    return {
      version: '1.0.0',
      exportedAt: getCurrentTimestamp(),
      data: {
        services: [],
        testimonials: [],
        jobs: await this.list('jobs'),
        team: [],
        stats: { clientCount: 0, placementsMade: 0, successRate: 0, yearsInBusiness: 0, lastUpdated: new Date() },
        company: { vision: '', mission: '', approach: '', contactDetails: { address: '', phone: '', email: '', businessHours: {} }, processSteps: [], lastUpdated: new Date() },
        media: [],
        blog: await this.list('blog'),
        config: {
          site: { name: '', description: '', url: '' },
          features: { blog: true, jobs: true },
          limits: { maxFileSize: 10485760, allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf'] }
        }
      }
    };
  }

  async import(data: ExportPackage): Promise<ImportResult> {
    await this.ensureInitialized();

    let imported = 0;
    let skipped = 0;
    const errors: string[] = [];

    // Import jobs
    if (Array.isArray(data.data.jobs)) {
      for (const job of data.data.jobs) {
        try {
          await this.create('jobs', job);
          imported++;
        } catch (error) {
          errors.push(`Job import failed: ${error}`);
          skipped++;
        }
      }
    }

    // Import blogs
    if (Array.isArray(data.data.blog)) {
      for (const blog of data.data.blog) {
        try {
          await this.create('blog', blog);
          imported++;
        } catch (error) {
          errors.push(`Blog import failed: ${error}`);
          skipped++;
        }
      }
    }

    return {
      success: errors.length === 0,
      imported,
      skipped,
      errors
    };
  }

  async uploadMedia(_file: File): Promise<MediaAsset> {
    throw new Error('Media upload not supported in MVP');
  }

  async deleteMedia(_id: string): Promise<boolean> {
    throw new Error('Media deletion not supported in MVP');
  }
}

// Export singleton instance
export const simpleCloudStorageManager = new SimpleCloudStorageManager();