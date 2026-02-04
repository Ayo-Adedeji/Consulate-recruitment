// Common types used across the dashboard

export interface BaseContent {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  status: 'draft' | 'published' | 'archived';
}

export interface FilterOptions {
  status?: string;
  category?: string;
  dateRange?: { start: Date; end: Date };
  searchTerm?: string;
}

export interface ExportPackage {
  version: string;
  exportedAt: Date;
  data: {
    services: Service[];
    testimonials: Testimonial[];
    jobs: JobListing[];
    team: TeamMember[];
    stats: Statistics;
    company: CompanyInfo;
    media: MediaAsset[];
    blog: BlogPost[];
    config: SystemConfig;
  };
}

export interface ImportResult {
  success: boolean;
  imported: number;
  skipped: number;
  errors: string[];
}

export interface SystemConfig {
  site: {
    title: string;
    logo: string;
    theme: 'light' | 'dark';
  };
  features: {
    mediaUpload: boolean;
    blogModule: boolean;
    analytics: boolean;
  };
  limits: {
    maxFileSize: number;
    maxFilesPerUpload: number;
    supportedFormats: string[];
  };
}

// Re-export content types for convenience
export type { Service, Testimonial, JobListing, TeamMember, Statistics, CompanyInfo, MediaAsset, BlogPost } from './content';