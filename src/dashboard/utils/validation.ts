// Validation utilities
import { DataValidationResult } from '../types';
import { isValidEmail, isValidPhone } from './helpers';

/**
 * Sanitize string input by trimming whitespace and removing potentially harmful characters
 */
export const sanitizeString = (value: string): string => {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/[<>]/g, ''); // Basic XSS prevention
};

/**
 * Sanitize HTML content (basic implementation)
 */
export const sanitizeHtml = (value: string): string => {
  if (typeof value !== 'string') return '';
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

/**
 * Sanitize array of strings
 */
export const sanitizeStringArray = (values: string[]): string[] => {
  if (!Array.isArray(values)) return [];
  return values.map(sanitizeString).filter(v => v.length > 0);
};

/**
 * Validate required fields
 */
export const validateRequired = (value: any, fieldName: string): string | null => {
  if (value === null || value === undefined || value === '') {
    return `${fieldName} is required`;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return `${fieldName} cannot be empty`;
  }
  return null;
};

/**
 * Validate string length
 */
export const validateStringLength = (
  value: string, 
  fieldName: string, 
  minLength: number = 0, 
  maxLength: number = Infinity
): string | null => {
  if (typeof value !== 'string') return `${fieldName} must be a string`;
  
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters long`;
  }
  
  if (value.length > maxLength) {
    return `${fieldName} must be no more than ${maxLength} characters long`;
  }
  
  return null;
};

/**
 * Validate email field
 */
export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  
  const sanitizedEmail = sanitizeString(email);
  if (!isValidEmail(sanitizedEmail)) return 'Please enter a valid email address';
  
  return null;
};

/**
 * Validate phone field
 */
export const validatePhone = (phone: string): string | null => {
  if (!phone) return null; // Phone is often optional
  
  const sanitizedPhone = sanitizeString(phone);
  if (!isValidPhone(sanitizedPhone)) return 'Please enter a valid phone number';
  
  return null;
};

/**
 * Validate rating (1-5)
 */
export const validateRating = (rating: number): string | null => {
  if (typeof rating !== 'number' || isNaN(rating)) {
    return 'Rating must be a valid number';
  }
  if (rating < 1 || rating > 5) {
    return 'Rating must be between 1 and 5';
  }
  if (!Number.isInteger(rating)) {
    return 'Rating must be a whole number';
  }
  return null;
};

/**
 * Validate percentage (0-100)
 */
export const validatePercentage = (percentage: number): string | null => {
  if (typeof percentage !== 'number' || isNaN(percentage)) {
    return 'Percentage must be a valid number';
  }
  if (percentage < 0 || percentage > 100) {
    return 'Percentage must be between 0 and 100';
  }
  return null;
};

/**
 * Validate positive number
 */
export const validatePositiveNumber = (value: number, fieldName: string): string | null => {
  if (typeof value !== 'number' || isNaN(value)) {
    return `${fieldName} must be a valid number`;
  }
  if (value < 0) {
    return `${fieldName} must be a positive number`;
  }
  return null;
};

/**
 * Validate URL
 */
export const validateUrl = (url: string, fieldName: string = 'URL'): string | null => {
  if (!url) return null; // URLs are often optional
  
  try {
    new URL(url);
    return null;
  } catch {
    return `${fieldName} must be a valid URL`;
  }
};

/**
 * Validate file size
 */
export const validateFileSize = (file: File, maxSize: number): string | null => {
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return `File size must be less than ${maxSizeMB}MB`;
  }
  return null;
};

/**
 * Validate file type
 */
export const validateFileType = (file: File, allowedTypes: string[]): string | null => {
  if (!allowedTypes.includes(file.type)) {
    return `File type ${file.type} is not supported. Allowed types: ${allowedTypes.join(', ')}`;
  }
  return null;
};

/**
 * Validate employment type
 */
export const validateEmploymentType = (type: string): string | null => {
  const validTypes = ['temporary', 'permanent', 'contract'];
  if (!validTypes.includes(type)) {
    return `Employment type must be one of: ${validTypes.join(', ')}`;
  }
  return null;
};

/**
 * Validate service category
 */
export const validateServiceCategory = (category: string): string | null => {
  const validCategories = ['recruitment', 'cleaning', 'consultation'];
  if (!validCategories.includes(category)) {
    return `Service category must be one of: ${validCategories.join(', ')}`;
  }
  return null;
};

/**
 * Validate content status
 */
export const validateContentStatus = (status: string): string | null => {
  const validStatuses = ['draft', 'published', 'archived'];
  if (!validStatuses.includes(status)) {
    return `Status must be one of: ${validStatuses.join(', ')}`;
  }
  return null;
};

/**
 * Validate service data with sanitization
 */
export const validateService = (service: any): DataValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Sanitize input data
  const sanitizedService = {
    ...service,
    title: sanitizeString(service.title || ''),
    description: sanitizeHtml(service.description || ''),
    category: sanitizeString(service.category || ''),
    features: sanitizeStringArray(service.features || []),
    pricing: service.pricing ? sanitizeString(service.pricing) : undefined
  };
  
  // Validate required fields
  const titleError = validateRequired(sanitizedService.title, 'Title');
  if (titleError) errors.push(titleError);
  
  const titleLengthError = validateStringLength(sanitizedService.title, 'Title', 1, 200);
  if (titleLengthError) errors.push(titleLengthError);
  
  const descriptionError = validateRequired(sanitizedService.description, 'Description');
  if (descriptionError) errors.push(descriptionError);
  
  const descriptionLengthError = validateStringLength(sanitizedService.description, 'Description', 10, 2000);
  if (descriptionLengthError) errors.push(descriptionLengthError);
  
  const categoryError = validateRequired(sanitizedService.category, 'Category');
  if (categoryError) errors.push(categoryError);
  
  const categoryValidError = validateServiceCategory(sanitizedService.category);
  if (categoryValidError) errors.push(categoryValidError);
  
  // Validate features array
  if (sanitizedService.features.length === 0) {
    warnings.push('Service should have at least one feature listed');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Validate testimonial data with sanitization
 */
export const validateTestimonial = (testimonial: any): DataValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Sanitize input data
  const sanitizedTestimonial = {
    ...testimonial,
    clientName: sanitizeString(testimonial.clientName || ''),
    clientRole: sanitizeString(testimonial.clientRole || ''),
    reviewText: sanitizeHtml(testimonial.reviewText || ''),
    companyName: testimonial.companyName ? sanitizeString(testimonial.companyName) : undefined
  };
  
  const nameError = validateRequired(sanitizedTestimonial.clientName, 'Client Name');
  if (nameError) errors.push(nameError);
  
  const nameLengthError = validateStringLength(sanitizedTestimonial.clientName, 'Client Name', 1, 100);
  if (nameLengthError) errors.push(nameLengthError);
  
  const roleError = validateRequired(sanitizedTestimonial.clientRole, 'Client Role');
  if (roleError) errors.push(roleError);
  
  const roleLengthError = validateStringLength(sanitizedTestimonial.clientRole, 'Client Role', 1, 100);
  if (roleLengthError) errors.push(roleLengthError);
  
  const reviewError = validateRequired(sanitizedTestimonial.reviewText, 'Review Text');
  if (reviewError) errors.push(reviewError);
  
  const reviewLengthError = validateStringLength(sanitizedTestimonial.reviewText, 'Review Text', 10, 1000);
  if (reviewLengthError) errors.push(reviewLengthError);
  
  const ratingError = validateRating(testimonial.rating);
  if (ratingError) errors.push(ratingError);
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Validate job listing data with sanitization
 */
export const validateJobListing = (job: any): DataValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Sanitize input data
  const sanitizedJob = {
    ...job,
    title: sanitizeString(job.title || ''),
    description: sanitizeHtml(job.description || ''),
    location: sanitizeString(job.location || ''),
    employmentType: sanitizeString(job.employmentType || ''),
    requirements: sanitizeStringArray(job.requirements || []),
    benefits: sanitizeStringArray(job.benefits || []),
    salaryRange: job.salaryRange ? sanitizeString(job.salaryRange) : undefined
  };
  
  const titleError = validateRequired(sanitizedJob.title, 'Title');
  if (titleError) errors.push(titleError);
  
  const titleLengthError = validateStringLength(sanitizedJob.title, 'Title', 1, 200);
  if (titleLengthError) errors.push(titleLengthError);
  
  const descriptionError = validateRequired(sanitizedJob.description, 'Description');
  if (descriptionError) errors.push(descriptionError);
  
  const descriptionLengthError = validateStringLength(sanitizedJob.description, 'Description', 10, 3000);
  if (descriptionLengthError) errors.push(descriptionLengthError);
  
  const locationError = validateRequired(sanitizedJob.location, 'Location');
  if (locationError) errors.push(locationError);
  
  const locationLengthError = validateStringLength(sanitizedJob.location, 'Location', 1, 100);
  if (locationLengthError) errors.push(locationLengthError);
  
  const typeError = validateRequired(sanitizedJob.employmentType, 'Employment Type');
  if (typeError) errors.push(typeError);
  
  const typeValidError = validateEmploymentType(sanitizedJob.employmentType);
  if (typeValidError) errors.push(typeValidError);
  
  // Validate requirements and benefits arrays
  if (sanitizedJob.requirements.length === 0) {
    warnings.push('Job should have at least one requirement listed');
  }
  
  if (sanitizedJob.benefits.length === 0) {
    warnings.push('Job should have at least one benefit listed');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Validate team member data with sanitization
 */
export const validateTeamMember = (member: any): DataValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Sanitize input data
  const sanitizedMember = {
    ...member,
    name: sanitizeString(member.name || ''),
    role: sanitizeString(member.role || ''),
    bio: sanitizeHtml(member.bio || ''),
    email: sanitizeString(member.email || ''),
    phone: member.phone ? sanitizeString(member.phone) : undefined,
    department: sanitizeString(member.department || '')
  };
  
  const nameError = validateRequired(sanitizedMember.name, 'Name');
  if (nameError) errors.push(nameError);
  
  const nameLengthError = validateStringLength(sanitizedMember.name, 'Name', 1, 100);
  if (nameLengthError) errors.push(nameLengthError);
  
  const roleError = validateRequired(sanitizedMember.role, 'Role');
  if (roleError) errors.push(roleError);
  
  const roleLengthError = validateStringLength(sanitizedMember.role, 'Role', 1, 100);
  if (roleLengthError) errors.push(roleLengthError);
  
  const bioError = validateRequired(sanitizedMember.bio, 'Bio');
  if (bioError) errors.push(bioError);
  
  const bioLengthError = validateStringLength(sanitizedMember.bio, 'Bio', 10, 1000);
  if (bioLengthError) errors.push(bioLengthError);
  
  const emailError = validateEmail(sanitizedMember.email);
  if (emailError) errors.push(emailError);
  
  const departmentError = validateRequired(sanitizedMember.department, 'Department');
  if (departmentError) errors.push(departmentError);
  
  if (sanitizedMember.phone) {
    const phoneError = validatePhone(sanitizedMember.phone);
    if (phoneError) errors.push(phoneError);
  }
  
  // Validate social links if provided
  if (member.socialLinks) {
    if (member.socialLinks.linkedin) {
      const linkedinError = validateUrl(member.socialLinks.linkedin, 'LinkedIn URL');
      if (linkedinError) errors.push(linkedinError);
    }
    if (member.socialLinks.twitter) {
      const twitterError = validateUrl(member.socialLinks.twitter, 'Twitter URL');
      if (twitterError) errors.push(twitterError);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Validate blog post data with sanitization
 */
export const validateBlogPost = (post: any): DataValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Sanitize input data
  const sanitizedPost = {
    ...post,
    title: sanitizeString(post.title || ''),
    content: sanitizeHtml(post.content || ''),
    excerpt: sanitizeString(post.excerpt || ''),
    slug: sanitizeString(post.slug || '').toLowerCase().replace(/[^a-z0-9-]/g, '-'),
    categories: sanitizeStringArray(post.categories || []),
    tags: sanitizeStringArray(post.tags || []),
    seoTitle: post.seoTitle ? sanitizeString(post.seoTitle) : undefined,
    seoDescription: post.seoDescription ? sanitizeString(post.seoDescription) : undefined
  };
  
  const titleError = validateRequired(sanitizedPost.title, 'Title');
  if (titleError) errors.push(titleError);
  
  const titleLengthError = validateStringLength(sanitizedPost.title, 'Title', 1, 200);
  if (titleLengthError) errors.push(titleLengthError);
  
  const contentError = validateRequired(sanitizedPost.content, 'Content');
  if (contentError) errors.push(contentError);
  
  const contentLengthError = validateStringLength(sanitizedPost.content, 'Content', 50, 50000);
  if (contentLengthError) errors.push(contentLengthError);
  
  const excerptError = validateRequired(sanitizedPost.excerpt, 'Excerpt');
  if (excerptError) errors.push(excerptError);
  
  const excerptLengthError = validateStringLength(sanitizedPost.excerpt, 'Excerpt', 10, 300);
  if (excerptLengthError) errors.push(excerptLengthError);
  
  const slugError = validateRequired(sanitizedPost.slug, 'Slug');
  if (slugError) errors.push(slugError);
  
  // Validate slug format
  if (!/^[a-z0-9-]+$/.test(sanitizedPost.slug)) {
    errors.push('Slug must contain only lowercase letters, numbers, and hyphens');
  }
  
  // Validate SEO fields if provided
  if (sanitizedPost.seoTitle) {
    const seoTitleLengthError = validateStringLength(sanitizedPost.seoTitle, 'SEO Title', 1, 60);
    if (seoTitleLengthError) errors.push(seoTitleLengthError);
  }
  
  if (sanitizedPost.seoDescription) {
    const seoDescLengthError = validateStringLength(sanitizedPost.seoDescription, 'SEO Description', 1, 160);
    if (seoDescLengthError) errors.push(seoDescLengthError);
  }
  
  // Warnings for best practices
  if (sanitizedPost.categories.length === 0) {
    warnings.push('Blog post should have at least one category');
  }
  
  if (sanitizedPost.tags.length === 0) {
    warnings.push('Blog post should have at least one tag for better discoverability');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Validate statistics data
 */
export const validateStatistics = (stats: any): DataValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  const clientCountError = validatePositiveNumber(stats.clientCount, 'Client Count');
  if (clientCountError) errors.push(clientCountError);
  
  const placementsError = validatePositiveNumber(stats.placementsMade, 'Placements Made');
  if (placementsError) errors.push(placementsError);
  
  const successRateError = validatePercentage(stats.successRate);
  if (successRateError) errors.push(successRateError);
  
  const yearsError = validatePositiveNumber(stats.yearsInBusiness, 'Years in Business');
  if (yearsError) errors.push(yearsError);
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Generic validation runner
 */
export const runValidation = (data: any, validators: Array<(data: any) => string | null>): DataValidationResult => {
  const errors: string[] = [];
  
  validators.forEach(validator => {
    const error = validator(data);
    if (error) errors.push(error);
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings: [],
  };
};

/**
 * Validate content type based on collection name
 */
export const validateContentByType = (collection: string, data: any): DataValidationResult => {
  switch (collection) {
    case 'services':
      return validateService(data);
    case 'testimonials':
      return validateTestimonial(data);
    case 'jobs':
      return validateJobListing(data);
    case 'team':
      return validateTeamMember(data);
    case 'blog':
      return validateBlogPost(data);
    default:
      return {
        isValid: false,
        errors: [`Unknown content type: ${collection}`],
        warnings: []
      };
  }
};