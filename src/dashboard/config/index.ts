// Dashboard configuration
import { cloudConfig } from './cloud';

export const dashboardConfig = {
  app: {
    name: 'Consulate Recruitment Dashboard',
    version: '1.0.0',
    description: 'Content Management System for Consulate Recruitment',
  },
  
  auth: {
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    rememberMeDuration: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  
  storage: {
    useLocalStorage: true,
    useCloudStorage: false, // Will be enabled after cloud setup
    useJsonFiles: false, // For future implementation
    maxStorageSize: 50 * 1024 * 1024, // 50MB
    compressionEnabled: true,
  },
  
  media: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFilesPerUpload: 10,
    supportedImageFormats: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'],
    supportedDocumentFormats: ['application/pdf', 'application/msword'],
    thumbnailSize: { width: 200, height: 200 },
  },
  
  ui: {
    theme: 'light',
    sidebarCollapsed: false,
    pageSize: 10,
    toastDuration: 5000,
  },
  
  features: {
    mediaUpload: true,
    blogModule: true,
    analytics: true,
    exportImport: true,
    propertyBasedTesting: true,
  },
  
  api: {
    baseUrl: process.env.VITE_API_BASE_URL || '/api',
    timeout: 30000,
  },
} as const;

export type DashboardConfig = typeof dashboardConfig;

// Export cloud configuration
export { cloudConfig, CloudConfigService } from './cloud';
export type { CloudConfig, CloudConnectionStatus } from './cloud';