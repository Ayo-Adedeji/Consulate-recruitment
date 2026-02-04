// Dashboard constants

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'dashboard_auth_token',
  USER_PREFERENCES: 'dashboard_user_preferences',
  THEME: 'dashboard_theme',
} as const;

export const COLLECTIONS = {
  SERVICES: 'services',
  TESTIMONIALS: 'testimonials',
  JOBS: 'jobs',
  TEAM: 'team',
  STATS: 'stats',
  COMPANY: 'company',
  MEDIA: 'media',
  BLOG: 'blog',
  USERS: 'users',
} as const;

export const CONTENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const;

export const PERMISSIONS = {
  READ: 'read',
  WRITE: 'write',
  DELETE: 'delete',
  EXPORT: 'export',
} as const;

export const EMPLOYMENT_TYPES = {
  TEMPORARY: 'temporary',
  PERMANENT: 'permanent',
  CONTRACT: 'contract',
} as const;

export const SERVICE_CATEGORIES = {
  RECRUITMENT: 'recruitment',
  CLEANING: 'cleaning',
  CONSULTATION: 'consultation',
} as const;

export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  DOCUMENT: 'document',
} as const;

export const SUPPORTED_IMAGE_FORMATS = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/svg+xml',
] as const;

export const SUPPORTED_DOCUMENT_FORMATS = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_FILES_PER_UPLOAD = 10;

export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;