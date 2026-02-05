// Hybrid Storage Manager that switches between localStorage and cloud storage
import { 
  StorageManager, 
  BaseContent, 
  FilterOptions, 
  ExportPackage, 
  ImportResult, 
  MediaAsset 
} from '../types';
import { CloudStorageManager } from './cloudStorage';
import { cloudConfig } from '../config/cloud';

/**
 * Hybrid Storage Manager that automatically switches between localStorage and cloud storage
 * based on configuration and availability
 */
export class HybridStorageManager implements StorageManager {
  private localStorageManager: StorageManager | null = null;
  private cloudStorageManager: CloudStorageManager;
  private useCloud: boolean = false;

  constructor() {
    this.cloudStorageManager = new CloudStorageManager();
    
    // Determine which storage to use
    this.initializeStorageMode();
  }

  /**
   * Initialize localStorage manager lazily
   */
  private async initializeLocalStorage(): Promise<void> {
    if (!this.localStorageManager) {
      // Dynamic import to avoid circular dependency
      const { StorageManagerImpl } = await import('./storage');
      this.localStorageManager = new StorageManagerImpl();
    }
  }

  /**
   * Initialize storage mode based on configuration
   */
  private async initializeStorageMode(): Promise<void> {
    try {
      // Check if cloud storage is enabled and configured FIRST
      if (cloudConfig.isCloudEnabled()) {
        console.log('🌐 Cloud storage enabled, initializing...');
        await this.cloudStorageManager.initialize();
        this.useCloud = true;
        console.log('🌐 Using cloud storage mode - NO MIGRATION');
        
        // DISABLE MIGRATION - it's causing conflicts
        // await this.checkAndMigrate();
      } else {
        console.log('💾 Cloud storage disabled, using localStorage mode');
        // Ensure localStorage manager is ready
        await this.initializeLocalStorage();
        this.useCloud = false;
      }
    } catch (error) {
      console.warn('⚠️ Cloud storage initialization failed, falling back to localStorage:', error);
      await this.initializeLocalStorage();
      this.useCloud = false;
    }
  }

  /**
   * Check if migration from localStorage to cloud is needed
   */
  private async checkAndMigrate(): Promise<void> {
    try {
      // Ensure localStorage manager is ready
      if (!this.localStorageManager) {
        await this.initializeLocalStorage();
      }
      
      // Check if there's data in localStorage that needs migration
      const localJobs = await this.localStorageManager!.list('jobs');
      const localBlogs = await this.localStorageManager!.list('blog');
      
      // Check if cloud already has data
      const cloudJobs = await this.cloudStorageManager.list('jobs');
      const cloudBlogs = await this.cloudStorageManager.list('blog');
      
      // Only migrate if localStorage has data AND cloud is empty
      const shouldMigrate = (localJobs.length > 0 || localBlogs.length > 0) && 
                           (cloudJobs.length === 0 && cloudBlogs.length === 0);
      
      if (shouldMigrate) {
        console.log('🔄 Migrating localStorage data to cloud...');
        
        // Export from localStorage
        const localData = await this.localStorageManager!.export();
        
        // Import to cloud (only jobs and blogs in MVP)
        const migrationData: ExportPackage = {
          ...localData,
          data: {
            ...localData.data,
            jobs: localJobs,
            blog: localBlogs,
            // Clear other collections for MVP
            services: [],
            testimonials: [],
            team: [],
            media: []
          }
        };
        
        await this.cloudStorageManager.import(migrationData);
        console.log('✅ Migration completed successfully');
        
        // Clear localStorage after successful migration to prevent re-migration
        await this.clearLocalStorage();
        console.log('🗑️ Cleared localStorage after migration');
      } else if (cloudJobs.length > 0 || cloudBlogs.length > 0) {
        console.log('☁️ Cloud already has data, skipping migration');
        // Clear localStorage to prevent conflicts
        await this.clearLocalStorage();
      } else {
        console.log('📭 No data to migrate');
      }
    } catch (error) {
      console.error('❌ Migration failed:', error);
      // Don't throw - continue with current storage mode
    }
  }

  /**
   * Get the active storage manager
   */
  private async getActiveManager(): Promise<StorageManager> {
    await this.initializeLocalStorage();
    return this.useCloud ? this.cloudStorageManager : this.localStorageManager!;
  }

  /**
   * Check if cloud mode is active
   */
  public isCloudMode(): boolean {
    return this.useCloud;
  }

  /**
   * Switch to cloud mode (if available)
   */
  public async switchToCloudMode(): Promise<boolean> {
    try {
      if (!cloudConfig.isCloudEnabled()) {
        throw new Error('Cloud storage not configured');
      }
      
      await this.cloudStorageManager.initialize();
      this.useCloud = true;
      console.log('🌐 Switched to cloud storage mode');
      
      await this.checkAndMigrate();
      return true;
    } catch (error) {
      console.error('❌ Failed to switch to cloud mode:', error);
      return false;
    }
  }

  /**
   * Switch to localStorage mode
   */
  public switchToLocalMode(): void {
    this.useCloud = false;
    console.log('💾 Switched to localStorage mode');
  }

  // StorageManager interface implementation - delegate to active manager

  async create<T extends BaseContent>(
    collection: string, 
    item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<T> {
    const manager = await this.getActiveManager();
    return manager.create(collection, item);
  }

  async read<T extends BaseContent>(collection: string, id: string): Promise<T | null> {
    const manager = await this.getActiveManager();
    return manager.read(collection, id);
  }

  async update<T extends BaseContent>(
    collection: string, 
    id: string, 
    updates: Partial<T>
  ): Promise<T> {
    const manager = await this.getActiveManager();
    return manager.update(collection, id, updates);
  }

  async delete(collection: string, id: string): Promise<boolean> {
    const manager = await this.getActiveManager();
    return manager.delete(collection, id);
  }

  async list<T extends BaseContent>(collection: string, filters?: FilterOptions): Promise<T[]> {
    const manager = await this.getActiveManager();
    return manager.list(collection, filters);
  }

  async export(): Promise<ExportPackage> {
    const manager = await this.getActiveManager();
    return manager.export();
  }

  async import(data: ExportPackage): Promise<ImportResult> {
    const manager = await this.getActiveManager();
    return manager.import(data);
  }

  async uploadMedia(file: File): Promise<MediaAsset> {
    // Media operations always use localStorage in MVP
    await this.initializeLocalStorage();
    return this.localStorageManager!.uploadMedia(file);
  }

  async deleteMedia(id: string): Promise<boolean> {
    // Media operations always use localStorage in MVP
    await this.initializeLocalStorage();
    return this.localStorageManager!.deleteMedia(id);
  }

  // Additional methods for media management (delegate to localStorage)
  async replaceMedia(oldId: string, newFile: File): Promise<MediaAsset> {
    await this.initializeLocalStorage();
    if ('replaceMedia' in this.localStorageManager!) {
      return (this.localStorageManager as any).replaceMedia(oldId, newFile);
    }
    throw new Error('replaceMedia not supported');
  }

  async findMediaReferences(mediaId: string): Promise<Array<{ collection: string; itemId: string; field: string }>> {
    await this.initializeLocalStorage();
    if ('findMediaReferences' in this.localStorageManager!) {
      return (this.localStorageManager as any).findMediaReferences(mediaId);
    }
    return [];
  }

  async updateMediaReferences(oldMediaId: string, newMediaId: string): Promise<void> {
    await this.initializeLocalStorage();
    if ('updateMediaReferences' in this.localStorageManager!) {
      return (this.localStorageManager as any).updateMediaReferences(oldMediaId, newMediaId);
    }
  }

  async getMediaMetadata(mediaId: string): Promise<{
    asset: MediaAsset | null;
    references: Array<{ collection: string; itemId: string; field: string }>;
    usageCount: number;
  }> {
    await this.initializeLocalStorage();
    if ('getMediaMetadata' in this.localStorageManager!) {
      return (this.localStorageManager as any).getMediaMetadata(mediaId);
    }
    throw new Error('getMediaMetadata not supported');
  }

  /**
   * Clear localStorage data (use with caution)
   */
  private async clearLocalStorage(): Promise<void> {
    try {
      // Clear ALL CMS keys from localStorage
      const keys = Object.keys(localStorage);
      const cmsKeys = keys.filter(key => 
        key.startsWith('cms_collection_') || 
        key.startsWith('cms_metadata_') || 
        key === 'cms_config' ||
        key === 'cms_stats' ||
        key === 'cms_company'
      );
      
      cmsKeys.forEach(key => {
        console.log('🗑️ Clearing localStorage key:', key);
        localStorage.removeItem(key);
      });
      console.log('🗑️ Cleared localStorage CMS data');
    } catch (error) {
      console.error('❌ Failed to clear localStorage:', error);
    }
  }

  /**
   * PUBLIC: Force clear all localStorage data (for debugging)
   */
  public async forceCleanLocalStorage(): Promise<void> {
    await this.clearLocalStorage();
  }
}

// Export singleton instance
export const hybridStorageManager = new HybridStorageManager();