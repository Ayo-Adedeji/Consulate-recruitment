// Content type definitions
import { BaseContent } from './common';

export interface Service extends BaseContent {
  title: string;
  description: string;
  category: 'recruitment' | 'cleaning' | 'consultation';
  features: string[];
  pricing?: string;
}

export interface Testimonial extends BaseContent {
  clientName: string;
  clientRole: string;
  rating: number; // 1-5
  reviewText: string;
  clientImage?: string;
  companyName?: string;
}

export interface JobListing extends BaseContent {
  title: string;
  description: string;
  location: string;
  employmentType: 'temporary' | 'permanent' | 'contract';
  requirements: string[];
  benefits: string[];
  salaryRange?: string;
}

export interface TeamMember extends BaseContent {
  name: string;
  role: string;
  bio: string;
  email: string;
  phone?: string;
  photo?: string;
  department: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface Statistics {
  clientCount: number;
  placementsMade: number;
  successRate: number; // 0-100
  yearsInBusiness: number;
  lastUpdated: Date;
}

export interface CompanyInfo {
  vision: string;
  mission: string;
  approach: string;
  contactDetails: {
    address: string;
    phone: string;
    email: string;
    businessHours: {
      [key: string]: { open: string; close: string; closed?: boolean };
    };
  };
  processSteps: Array<{
    title: string;
    description: string;
    order: number;
  }>;
  lastUpdated: Date;
}

export interface MediaAsset extends BaseContent {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnail?: string;
  tags: string[];
  uploadedAt: Date;
  uploadedBy: string;
}

export interface BlogPost extends BaseContent {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  categories: string[];
  tags: string[];
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: Date;
  scheduledFor?: Date;
}