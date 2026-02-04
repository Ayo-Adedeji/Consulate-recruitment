// Storage and data management types
import { BaseContent, FilterOptions, ExportPackage, ImportResult } from './common';
import { MediaAsset } from './content';

export interface StorageManager {
  // Generic CRUD operations
  create<T extends BaseContent>(collection: string, item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  read<T extends BaseContent>(collection: string, id: string): Promise<T | null>;
  update<T extends BaseContent>(collection: string, id: string, updates: Partial<T>): Promise<T>;
  delete(collection: string, id: string): Promise<boolean>;
  list<T extends BaseContent>(collection: string, filters?: FilterOptions): Promise<T[]>;
  
  // Bulk operations
  export(): Promise<ExportPackage>;
  import(data: ExportPackage): Promise<ImportResult>;
  
  // Media operations
  uploadMedia(file: File): Promise<MediaAsset>;
  deleteMedia(id: string): Promise<boolean>;
}

export interface StorageConfig {
  useLocalStorage: boolean;
  useJsonFiles: boolean;
  maxStorageSize: number;
  compressionEnabled: boolean;
}

export interface DataValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface CollectionMetadata {
  name: string;
  count: number;
  lastModified: Date;
  size: number;
}