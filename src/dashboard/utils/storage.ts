// Storage utilities and StorageManager implementation
import { 
  StorageManager, 
  StorageConfig, 
  BaseContent, 
  FilterOptions, 
  ExportPackage, 
  ImportResult, 
  MediaAsset,
  CollectionMetadata 
} from '../types';

/**
 * Generate a unique ID using timestamp and random string
 */
export const generateId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
};

/**
 * Generate current timestamp
 */
export const getCurrentTimestamp = (): Date => {
  return new Date();
};

/**
 * Validate JSON data structure
 */
export const validateJsonStructure = (data: any): boolean => {
  try {
    JSON.stringify(data);
    return true;
  } catch {
    return false;
  }
};

/**
 * Basic storage utilities for localStorage operations
 */
export const storageUtils = {
  saveToLocalStorage: (key: string, data: any): void => {
    try {
      if (!validateJsonStructure(data)) {
        throw new Error('Invalid data structure for JSON serialization');
      }
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Failed to save to localStorage (${key}):`, error);
      throw new Error(`Storage operation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  
  loadFromLocalStorage: (key: string): any => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Failed to load from localStorage (${key}):`, error);
      return null;
    }
  },
  
  removeFromLocalStorage: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove from localStorage (${key}):`, error);
      throw new Error(`Storage removal failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  getAllKeys: (): string[] => {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('Failed to get localStorage keys:', error);
      return [];
    }
  },

  getStorageSize: (): number => {
    try {
      let total = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      return total;
    } catch (error) {
      console.error('Failed to calculate storage size:', error);
      return 0;
    }
  }
};

/**
 * StorageManager implementation with CRUD operations, validation, and error handling
 */
export class StorageManagerImpl implements StorageManager {
  private config: StorageConfig;
  private readonly COLLECTION_PREFIX = 'cms_collection_';
  private readonly METADATA_PREFIX = 'cms_metadata_';
  private readonly CONFIG_KEY = 'cms_config';

  constructor(config: Partial<StorageConfig> = {}) {
    this.config = {
      useLocalStorage: true,
      useJsonFiles: false,
      maxStorageSize: 5 * 1024 * 1024, // 5MB default
      compressionEnabled: false,
      ...config
    };
  }

  /**
   * Create a new item in the specified collection
   */
  async create<T extends BaseContent>(
    collection: string, 
    item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<T> {
    try {
      this.validateCollectionName(collection);
      
      const now = getCurrentTimestamp();
      const newItem: T = {
        ...item,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      } as T;

      // Validate the item structure
      this.validateItem(newItem);

      // Get existing collection data
      const collectionData = await this.getCollectionData<T>(collection);
      
      // Add new item
      collectionData.push(newItem);
      
      // Save updated collection
      await this.saveCollectionData(collection, collectionData);
      
      // Update metadata
      await this.updateCollectionMetadata(collection, collectionData);

      return newItem;
    } catch (error) {
      throw new Error(`Failed to create item in collection '${collection}': ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Read an item by ID from the specified collection
   */
  async read<T extends BaseContent>(collection: string, id: string): Promise<T | null> {
    try {
      this.validateCollectionName(collection);
      this.validateId(id);

      const collectionData = await this.getCollectionData<T>(collection);
      const item = collectionData.find(item => item.id === id);
      
      return item || null;
    } catch (error) {
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
      this.validateCollectionName(collection);
      this.validateId(id);

      const collectionData = await this.getCollectionData<T>(collection);
      const itemIndex = collectionData.findIndex(item => item.id === id);
      
      if (itemIndex === -1) {
        throw new Error(`Item with ID '${id}' not found in collection '${collection}'`);
      }

      // Update the item
      const updatedItem: T = {
        ...collectionData[itemIndex],
        ...updates,
        id, // Ensure ID cannot be changed
        updatedAt: getCurrentTimestamp(),
      };

      // Validate the updated item
      this.validateItem(updatedItem);

      // Replace the item in the collection
      collectionData[itemIndex] = updatedItem;
      
      // Save updated collection
      await this.saveCollectionData(collection, collectionData);
      
      // Update metadata
      await this.updateCollectionMetadata(collection, collectionData);

      return updatedItem;
    } catch (error) {
      throw new Error(`Failed to update item '${id}' in collection '${collection}': ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Delete an item from the specified collection
   */
  async delete(collection: string, id: string): Promise<boolean> {
    try {
      this.validateCollectionName(collection);
      this.validateId(id);

      const collectionData = await this.getCollectionData(collection);
      const itemIndex = collectionData.findIndex(item => item.id === id);
      
      if (itemIndex === -1) {
        return false; // Item not found
      }

      // Remove the item
      collectionData.splice(itemIndex, 1);
      
      // Save updated collection
      await this.saveCollectionData(collection, collectionData);
      
      // Update metadata
      await this.updateCollectionMetadata(collection, collectionData);

      return true;
    } catch (error) {
      throw new Error(`Failed to delete item '${id}' from collection '${collection}': ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * List items from the specified collection with optional filtering
   */
  async list<T extends BaseContent>(collection: string, filters?: FilterOptions): Promise<T[]> {
    try {
      this.validateCollectionName(collection);

      let collectionData = await this.getCollectionData<T>(collection);
      
      // Apply filters if provided
      if (filters) {
        collectionData = this.applyFilters(collectionData, filters);
      }

      return collectionData;
    } catch (error) {
      throw new Error(`Failed to list items from collection '${collection}': ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Export all data as a complete package
   */
  async export(): Promise<ExportPackage> {
    try {
      const exportData: ExportPackage = {
        version: '1.0.0',
        exportedAt: getCurrentTimestamp(),
        data: {
          services: await this.list('services'),
          testimonials: await this.list('testimonials'),
          jobs: await this.list('jobs'),
          team: await this.list('team'),
          stats: storageUtils.loadFromLocalStorage('cms_stats') || { clientCount: 0, placementsMade: 0, successRate: 0, yearsInBusiness: 0, lastUpdated: new Date() },
          company: storageUtils.loadFromLocalStorage('cms_company') || { vision: '', mission: '', approach: '', contactDetails: { address: '', phone: '', email: '', businessHours: {} }, processSteps: [], lastUpdated: new Date() },
          media: await this.list('media'),
          blog: await this.list('blog'),
          config: storageUtils.loadFromLocalStorage(this.CONFIG_KEY) || this.getDefaultConfig()
        }
      };

      return exportData;
    } catch (error) {
      throw new Error(`Failed to export data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Import data from an export package
   */
  async import(data: ExportPackage): Promise<ImportResult> {
    try {
      this.validateExportPackage(data);

      let imported = 0;
      let skipped = 0;
      const errors: string[] = [];

      // Import each collection
      const collections = ['services', 'testimonials', 'jobs', 'team', 'media', 'blog'];
      
      for (const collection of collections) {
        try {
          const items = data.data[collection as keyof typeof data.data] as BaseContent[];
          if (Array.isArray(items)) {
            await this.saveCollectionData(collection, items);
            imported += items.length;
          }
        } catch (error) {
          errors.push(`Failed to import ${collection}: ${error instanceof Error ? error.message : 'Unknown error'}`);
          skipped++;
        }
      }

      // Import non-collection data
      try {
        storageUtils.saveToLocalStorage('cms_stats', data.data.stats);
        storageUtils.saveToLocalStorage('cms_company', data.data.company);
        storageUtils.saveToLocalStorage(this.CONFIG_KEY, data.data.config);
      } catch (error) {
        errors.push(`Failed to import system data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      return {
        success: errors.length === 0,
        imported,
        skipped,
        errors
      };
    } catch (error) {
      throw new Error(`Failed to import data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Upload media file with enhanced metadata and reference tracking
   */
  async uploadMedia(file: File): Promise<MediaAsset> {
    try {
      // Validate file
      this.validateMediaFile(file);

      // Generate thumbnail for images
      let thumbnail: string | undefined;
      if (file.type.startsWith('image/')) {
        thumbnail = await this.generateThumbnail(file);
      }

      // Create media asset record
      const mediaAssetData = {
        filename: `${generateId()}_${file.name}`,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        url: URL.createObjectURL(file), // Temporary URL for client-side
        thumbnail,
        tags: [],
        uploadedAt: getCurrentTimestamp(),
        uploadedBy: 'current-user', // TODO: Get from auth context
        createdBy: 'current-user', // Required by BaseContent
        status: 'published' as const // Required by BaseContent
      };

      // Store media asset record
      const mediaAsset = await this.create<MediaAsset>('media', mediaAssetData);

      return mediaAsset;
    } catch (error) {
      throw new Error(`Failed to upload media: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Delete media file with reference checking
   */
  async deleteMedia(id: string): Promise<boolean> {
    try {
      // Check for references before deletion
      const references = await this.findMediaReferences(id);
      if (references.length > 0) {
        throw new Error(`Cannot delete media: it is referenced by ${references.length} content item(s)`);
      }

      return await this.delete('media', id);
    } catch (error) {
      throw new Error(`Failed to delete media '${id}': ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Replace media file and update all references
   */
  async replaceMedia(oldId: string, newFile: File): Promise<MediaAsset> {
    try {
      // Find all references to the old media
      const references = await this.findMediaReferences(oldId);
      
      // Upload new media
      const newMedia = await this.uploadMedia(newFile);
      
      // Update all references
      await this.updateMediaReferences(oldId, newMedia.id);
      
      // Delete old media (skip reference check since we've updated them)
      await this.delete('media', oldId);
      
      return newMedia;
    } catch (error) {
      throw new Error(`Failed to replace media '${oldId}': ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Find all content items that reference a specific media asset
   */
  async findMediaReferences(mediaId: string): Promise<Array<{ collection: string; itemId: string; field: string }>> {
    const references: Array<{ collection: string; itemId: string; field: string }> = [];
    
    try {
      // Collections that might contain media references
      const collectionsToCheck = ['services', 'testimonials', 'jobs', 'team', 'blog'];
      
      for (const collection of collectionsToCheck) {
        const items = await this.getCollectionData(collection);
        
        items.forEach(item => {
          // Check common media fields
          const mediaFields = ['clientImage', 'photo', 'featuredImage', 'image', 'thumbnail'];
          
          mediaFields.forEach(field => {
            if (item[field] === mediaId || item[field]?.includes?.(mediaId)) {
              references.push({
                collection,
                itemId: item.id,
                field
              });
            }
          });
          
          // Check for media references in rich text content
          const textFields = ['description', 'content', 'reviewText', 'bio'];
          textFields.forEach(field => {
            if (typeof item[field] === 'string' && item[field].includes(mediaId)) {
              references.push({
                collection,
                itemId: item.id,
                field
              });
            }
          });
        });
      }
      
      return references;
    } catch (error) {
      console.error('Failed to find media references:', error);
      return [];
    }
  }

  /**
   * Update all references from old media ID to new media ID
   */
  async updateMediaReferences(oldMediaId: string, newMediaId: string): Promise<void> {
    try {
      const references = await this.findMediaReferences(oldMediaId);
      
      for (const ref of references) {
        const item = await this.read(ref.collection, ref.itemId);
        if (!item) continue;
        
        const updates: any = {};
        
        // Handle direct field references
        if (item[ref.field] === oldMediaId) {
          updates[ref.field] = newMediaId;
        }
        // Handle array references
        else if (Array.isArray(item[ref.field]) && item[ref.field].includes(oldMediaId)) {
          updates[ref.field] = item[ref.field].map((id: string) => 
            id === oldMediaId ? newMediaId : id
          );
        }
        // Handle text content references
        else if (typeof item[ref.field] === 'string' && item[ref.field].includes(oldMediaId)) {
          updates[ref.field] = item[ref.field].replace(
            new RegExp(oldMediaId, 'g'),
            newMediaId
          );
        }
        
        if (Object.keys(updates).length > 0) {
          await this.update(ref.collection, ref.itemId, updates);
        }
      }
    } catch (error) {
      throw new Error(`Failed to update media references: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get media metadata including usage statistics
   */
  async getMediaMetadata(mediaId: string): Promise<{
    asset: MediaAsset | null;
    references: Array<{ collection: string; itemId: string; field: string }>;
    usageCount: number;
  }> {
    try {
      const asset = await this.read<MediaAsset>('media', mediaId);
      const references = await this.findMediaReferences(mediaId);
      
      return {
        asset,
        references,
        usageCount: references.length
      };
    } catch (error) {
      throw new Error(`Failed to get media metadata for '${mediaId}': ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate thumbnail for image files
   */
  private async generateThumbnail(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        resolve('');
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Set thumbnail dimensions (max 200x200, maintain aspect ratio)
        const maxSize = 200;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to data URL with compression
        const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(thumbnailUrl);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to generate thumbnail'));
      };
      
      img.src = URL.createObjectURL(file);
    });
  }

  // Private helper methods

  private validateCollectionName(collection: string): void {
    if (!collection || typeof collection !== 'string' || collection.trim().length === 0) {
      throw new Error('Collection name must be a non-empty string');
    }
  }

  private validateId(id: string): void {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      throw new Error('ID must be a non-empty string');
    }
  }

  private validateItem(item: any): void {
    if (!item || typeof item !== 'object') {
      throw new Error('Item must be a valid object');
    }
    
    if (!item.id || !item.createdAt || !item.updatedAt) {
      throw new Error('Item must have id, createdAt, and updatedAt fields');
    }
  }

  private validateMediaFile(file: File): void {
    if (!file || !(file instanceof File)) {
      throw new Error('Invalid file object');
    }

    if (file.size > this.config.maxStorageSize) {
      throw new Error(`File size (${file.size} bytes) exceeds maximum allowed size (${this.config.maxStorageSize} bytes)`);
    }
  }

  private validateExportPackage(data: ExportPackage): void {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid export package format');
    }

    if (!data.version || !data.exportedAt || !data.data) {
      throw new Error('Export package missing required fields');
    }
  }

  private async getCollectionData<T extends BaseContent>(collection: string): Promise<T[]> {
    const key = this.COLLECTION_PREFIX + collection;
    const data = storageUtils.loadFromLocalStorage(key);
    return Array.isArray(data) ? data : [];
  }

  private async saveCollectionData<T extends BaseContent>(collection: string, data: T[]): Promise<void> {
    const key = this.COLLECTION_PREFIX + collection;
    
    // Check storage size before saving
    const dataSize = JSON.stringify(data).length;
    if (dataSize > this.config.maxStorageSize) {
      throw new Error(`Collection data size (${dataSize} bytes) exceeds maximum storage limit (${this.config.maxStorageSize} bytes)`);
    }

    storageUtils.saveToLocalStorage(key, data);
  }

  private async updateCollectionMetadata(collection: string, data: BaseContent[]): Promise<void> {
    const metadata: CollectionMetadata = {
      name: collection,
      count: data.length,
      lastModified: getCurrentTimestamp(),
      size: JSON.stringify(data).length
    };

    const key = this.METADATA_PREFIX + collection;
    storageUtils.saveToLocalStorage(key, metadata);
  }

  private applyFilters<T extends BaseContent>(data: T[], filters: FilterOptions): T[] {
    let filtered = [...data];

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    // Category filter (for items that have category)
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
        // Search in common text fields
        const searchableFields = ['title', 'name', 'description', 'clientName', 'reviewText'];
        return searchableFields.some(field => {
          const value = (item as any)[field];
          return typeof value === 'string' && value.toLowerCase().includes(searchTerm);
        });
      });
    }

    return filtered;
  }

  private getDefaultConfig() {
    return {
      site: {
        title: 'Consulate Recruitment Dashboard',
        logo: '/assets/logo.png',
        theme: 'light' as const
      },
      features: {
        mediaUpload: true,
        blogModule: true,
        analytics: true
      },
      limits: {
        maxFileSize: 5 * 1024 * 1024, // 5MB
        maxFilesPerUpload: 10,
        supportedFormats: ['jpg', 'jpeg', 'png', 'webp', 'svg', 'pdf']
      }
    };
  }
}

// Create and export a default instance
export const storageManager = new StorageManagerImpl();