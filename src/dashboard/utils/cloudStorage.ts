// Cloud Storage Manager implementation using Supabase
import { 
  StorageManager, 
  BaseContent, 
  FilterOptions, 
  ExportPackage, 
  ImportResult, 
  MediaAsset,
  CollectionMetadata 
} from '../types';
import { cloudConfig } from '../config/cloud';
import { generateId, getCurrentTimestamp, validateJsonStructure } from './storage';

/**
 * Cloud Storage Manager that implements the StorageManager interface
 * Provides global synchronization using Supabase as the backend
 */
export class CloudStorageManager implements StorageManager {
  private initialized = false;
  private readonly SUPPORTED_COLLECTIONS = ['jobs', 'blog']; // MVP: jobs and blogs only

  constructor() {
    // Auto-initialize if cloud is enabled
    if (cloudConfig.isCloudEnabled()) {
      this.initialize().catch(error => {
        console.error('Failed to auto-initialize cloud storage:', error);
      });
    }
  }

  /**
   * Initialize cloud storage connection
   */
  public async initialize(): Promise<void> {
    try {
      if (!cloudConfig.isCloudEnabled()) {
        throw new Error('Cloud storage is not enabled. Check environment variables.');
      }

      await cloudConfig.initialize();
      this.initialized = true;
      console.log('✅ CloudStorageManager initialized successfully');
    } catch (error) {
      console.error('❌ CloudStorageManager initialization failed:', error);
      throw error;
    }
  }

  /**
   * Ensure cloud storage is initialized
   */
  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  /**
   * Validate collection is supported in MVP
   */
  private validateCollection(collection: string): void {
    if (!this.SUPPORTED_COLLECTIONS.includes(collection)) {
      throw new Error(`Collection '${collection}' not supported in MVP. Supported: ${this.SUPPORTED_COLLECTIONS.join(', ')}`);
    }
  }

  /**
   * Create a new item in the specified collection
   */
  async create<T extends BaseContent>(
    collection: string, 
    item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<T> {
    try {
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

      // Validate the item structure
      if (!validateJsonStructure(newItem)) {
        throw new Error('Invalid item structure for JSON serialization');
      }

      // Insert into Supabase
      const { data, error } = await supabase
        .from('cms_collections')
        .insert({
          collection_name: collection,
          item_id: itemId,
          data: newItem,
          created_at: now.toISOString(),
          updated_at: now.toISOString(),
          status: newItem.status || 'published'
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Supabase insert failed: ${error.message}`);
      }

      // Update collection metadata
      await this.updateCollectionMetadata(collection);

      console.log(`✅ Created ${collection} item:`, itemId);
      return newItem;
    } catch (error) {
      console.error(`❌ Failed to create ${collection} item:`, error);
      throw new Error(`Failed to create item in collection '${collection}': ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Read an item by ID from the specified collection
   */
  async read<T extends BaseContent>(collection: string, id: string): Promise<T | null> {
    try {
      await this.ensureInitialized();
      this.validateCollection(collection);

      if (!id || typeof id !== 'string') {
        throw new Error('ID must be a non-empty string');
      }

      const supabase = cloudConfig.getClient();

      const { data, error } = await supabase
        .from('cms_collections')
        .select('data')
        .eq('collection_name', collection)
        .eq('item_id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        throw new Error(`Supabase read failed: ${error.message}`);
      }

      return data?.data as T || null;
    } catch (error) {
      console.error(`❌ Failed to read ${collection} item ${id}:`, error);
      throw new Error(`Failed to read item '${id}' from collection '${collection}': ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Update an existing item in the specified collection
   */
  async update<T extends BaseContent>(
    collection: string, 
    id: string, 
    updates: Partial<T>
  ): Promise<T> {
    try {
      await this.ensureInitialized();
      this.validateCollection(collection);

      if (!id || typeof id !== 'string') {
        throw new Error('ID must be a non-empty string');
      }

      const supabase = cloudConfig.getClient();

      // First, get the existing item
      const existingItem = await this.read<T>(collection, id);
      if (!existingItem) {
        throw new Error(`Item with ID '${id}' not found in collection '${collection}'`);
      }

      // Merge updates
      const updatedItem: T = {
        ...existingItem,
        ...updates,
        id, // Ensure ID cannot be changed
        updatedAt: getCurrentTimestamp(),
      };

      // Validate the updated item
      if (!validateJsonStructure(updatedItem)) {
        throw new Error('Invalid updated item structure for JSON serialization');
      }

      // Update in Supabase
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
        throw new Error(`Supabase update failed: ${error.message}`);
      }

      // Update collection metadata
      await this.updateCollectionMetadata(collection);

      console.log(`✅ Updated ${collection} item:`, id);
      return updatedItem;
    } catch (error) {
      console.error(`❌ Failed to update ${collection} item ${id}:`, error);
      throw new Error(`Failed to update item '${id}' in collection '${collection}': ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Delete an item from the specified collection
   */
  async delete(collection: string, id: string): Promise<boolean> {
    try {
      await this.ensureInitialized();
      this.validateCollection(collection);

      if (!id || typeof id !== 'string') {
        throw new Error('ID must be a non-empty string');
      }

      const supabase = cloudConfig.getClient();

      const { error } = await supabase
        .from('cms_collections')
        .delete()
        .eq('collection_name', collection)
        .eq('item_id', id);

      if (error) {
        throw new Error(`Supabase delete failed: ${error.message}`);
      }

      // Update collection metadata
      await this.updateCollectionMetadata(collection);

      console.log(`✅ Deleted ${collection} item:`, id);
      return true;
    } catch (error) {
      console.error(`❌ Failed to delete ${collection} item ${id}:`, error);
      throw new Error(`Failed to delete item '${id}' from collection '${collection}': ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * List items from the specified collection with optional filtering
   */
  async list<T extends BaseContent>(collection: string, filters?: FilterOptions): Promise<T[]> {
    try {
      await this.ensureInitialized();
      this.validateCollection(collection);

      const supabase = cloudConfig.getClient();

      let query = supabase
        .from('cms_collections')
        .select('data')
        .eq('collection_name', collection)
        .order('created_at', { ascending: false });

      // Apply status filter
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Supabase list failed: ${error.message}`);
      }

      let items: T[] = (data || []).map(row => row.data as T);

      // Apply client-side filters
      if (filters) {
        items = this.applyClientFilters(items, filters);
      }

      return items;
    } catch (error) {
      console.error(`❌ Failed to list ${collection} items:`, error);
      throw new Error(`Failed to list items from collection '${collection}': ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Export all data as a complete package (MVP: jobs and blogs only)
   */
  async export(): Promise<ExportPackage> {
    try {
      await this.ensureInitialized();

      const exportData: ExportPackage = {
        version: '1.0.0',
        exportedAt: getCurrentTimestamp(),
        data: {
          services: [], // Not supported in MVP
          testimonials: [], // Not supported in MVP
          jobs: await this.list('jobs'),
          team: [], // Not supported in MVP
          stats: { clientCount: 0, placementsMade: 0, successRate: 0, yearsInBusiness: 0, lastUpdated: new Date() },
          company: { vision: '', mission: '', approach: '', contactDetails: { address: '', phone: '', email: '', businessHours: {} }, processSteps: [], lastUpdated: new Date() },
          media: [], // Not supported in MVP
          blog: await this.list('blog'),
          config: await this.getSystemConfig()
        }
      };

      console.log('✅ Export completed');
      return exportData;
    } catch (error) {
      console.error('❌ Export failed:', error);
      throw new Error(`Failed to export data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Import data from an export package (MVP: jobs and blogs only)
   */
  async import(data: ExportPackage): Promise<ImportResult> {
    try {
      await this.ensureInitialized();

      if (!data || typeof data !== 'object' || !data.data) {
        throw new Error('Invalid export package format');
      }

      let imported = 0;
      let skipped = 0;
      const errors: string[] = [];

      // Import jobs
      if (Array.isArray(data.data.jobs)) {
        try {
          await this.importCollection('jobs', data.data.jobs);
          imported += data.data.jobs.length;
        } catch (error) {
          errors.push(`Failed to import jobs: ${error instanceof Error ? error.message : 'Unknown error'}`);
          skipped += data.data.jobs.length;
        }
      }

      // Import blogs
      if (Array.isArray(data.data.blog)) {
        try {
          await this.importCollection('blog', data.data.blog);
          imported += data.data.blog.length;
        } catch (error) {
          errors.push(`Failed to import blog: ${error instanceof Error ? error.message : 'Unknown error'}`);
          skipped += data.data.blog.length;
        }
      }

      const result = {
        success: errors.length === 0,
        imported,
        skipped,
        errors
      };

      console.log('✅ Import completed:', result);
      return result;
    } catch (error) {
      console.error('❌ Import failed:', error);
      throw new Error(`Failed to import data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Upload media file (not supported in MVP)
   */
  async uploadMedia(file: File): Promise<MediaAsset> {
    throw new Error('Media upload not supported in MVP. Use localStorage StorageManager for media operations.');
  }

  /**
   * Delete media file (not supported in MVP)
   */
  async deleteMedia(id: string): Promise<boolean> {
    throw new Error('Media deletion not supported in MVP. Use localStorage StorageManager for media operations.');
  }

  // Private helper methods

  /**
   * Apply client-side filters to items
   */
  private applyClientFilters<T extends BaseContent>(items: T[], filters: FilterOptions): T[] {
    let filtered = [...items];

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(item => 
        'category' in item && (item as any).category === filters.category
      );
    }

    // Date range filter
    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= start && itemDate <= end;
      });
    }

    // Search term filter
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

  /**
   * Update collection metadata
   */
  private async updateCollectionMetadata(collection: string): Promise<void> {
    try {
      const supabase = cloudConfig.getClient();
      
      // Get collection count
      const { count, error } = await supabase
        .from('cms_collections')
        .select('*', { count: 'exact', head: true })
        .eq('collection_name', collection);

      if (error) {
        console.warn(`Failed to update metadata for ${collection}:`, error);
        return;
      }

      const metadata: CollectionMetadata = {
        name: collection,
        count: count || 0,
        lastModified: getCurrentTimestamp(),
        size: 0 // Size calculation not implemented in MVP
      };

      // Upsert metadata
      await supabase
        .from('cms_metadata')
        .upsert({
          collection_name: collection,
          count: metadata.count,
          last_modified: metadata.lastModified.toISOString(),
          size_bytes: metadata.size
        });
    } catch (error) {
      console.warn(`Failed to update metadata for ${collection}:`, error);
    }
  }

  /**
   * Import a collection of items
   */
  private async importCollection(collection: string, items: BaseContent[]): Promise<void> {
    const supabase = cloudConfig.getClient();

    // Prepare batch insert data
    const insertData = items.map(item => ({
      collection_name: collection,
      item_id: item.id,
      data: item,
      created_at: item.createdAt,
      updated_at: item.updatedAt,
      status: item.status || 'published'
    }));

    // Batch insert
    const { error } = await supabase
      .from('cms_collections')
      .upsert(insertData);

    if (error) {
      throw new Error(`Failed to import ${collection}: ${error.message}`);
    }

    // Update metadata
    await this.updateCollectionMetadata(collection);
  }

  /**
   * Get system configuration
   */
  private async getSystemConfig(): Promise<any> {
    try {
      const supabase = cloudConfig.getClient();
      
      const { data, error } = await supabase
        .from('cms_config')
        .select('*');

      if (error) {
        console.warn('Failed to get system config:', error);
        return {};
      }

      // Convert array of key-value pairs to object
      const config: any = {};
      (data || []).forEach(row => {
        config[row.key] = row.value;
      });

      return config;
    } catch (error) {
      console.warn('Failed to get system config:', error);
      return {};
    }
  }
}

// Export singleton instance
export const cloudStorageManager = new CloudStorageManager();