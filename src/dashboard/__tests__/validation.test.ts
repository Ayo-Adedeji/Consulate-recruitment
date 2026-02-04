import { describe, it, expect } from 'vitest';
import {
  sanitizeString,
  sanitizeHtml,
  sanitizeStringArray,
  validateRequired,
  validateStringLength,
  validateEmail,
  validatePhone,
  validateRating,
  validatePercentage,
  validatePositiveNumber,
  validateUrl,
  validateFileSize,
  validateFileType,
  validateEmploymentType,
  validateServiceCategory,
  validateContentStatus,
  validateService,
  validateTestimonial,
  validateJobListing,
  validateTeamMember,
  validateBlogPost,
  validateStatistics,
  validateContentByType,
  runValidation
} from '../utils/validation';

describe('Validation Utilities', () => {
  describe('Sanitization Functions', () => {
    describe('sanitizeString', () => {
      it('should trim whitespace', () => {
        expect(sanitizeString('  hello world  ')).toBe('hello world');
      });

      it('should remove basic XSS characters', () => {
        expect(sanitizeString('hello<script>alert("xss")</script>world')).toBe('helloscriptalert("xss")/scriptworld');
        expect(sanitizeString('test<>test')).toBe('testtest');
      });

      it('should handle non-string input', () => {
        expect(sanitizeString(null as any)).toBe('');
        expect(sanitizeString(undefined as any)).toBe('');
        expect(sanitizeString(123 as any)).toBe('');
      });
    });

    describe('sanitizeHtml', () => {
      it('should remove script tags', () => {
        const input = 'Hello <script>alert("xss")</script> world';
        const result = sanitizeHtml(input);
        expect(result).toBe('Hello  world');
      });

      it('should remove iframe tags', () => {
        const input = 'Content <iframe src="evil.com"></iframe> more content';
        const result = sanitizeHtml(input);
        expect(result).toBe('Content  more content');
      });

      it('should remove javascript: protocols', () => {
        const input = '<a href="javascript:alert(1)">Click me</a>';
        const result = sanitizeHtml(input);
        expect(result).not.toContain('javascript:');
      });

      it('should remove event handlers', () => {
        const input = '<div onclick="alert(1)">Click me</div>';
        const result = sanitizeHtml(input);
        expect(result).not.toContain('onclick');
      });
    });

    describe('sanitizeStringArray', () => {
      it('should sanitize array of strings', () => {
        const input = ['  hello  ', '<script>alert(1)</script>', '  world  '];
        const result = sanitizeStringArray(input);
        expect(result).toEqual(['hello', 'scriptalert(1)/script', 'world']);
      });

      it('should filter out empty strings', () => {
        const input = ['hello', '', '  ', 'world'];
        const result = sanitizeStringArray(input);
        expect(result).toEqual(['hello', 'world']);
      });

      it('should handle non-array input', () => {
        expect(sanitizeStringArray(null as any)).toEqual([]);
        expect(sanitizeStringArray('not an array' as any)).toEqual([]);
      });
    });
  });

  describe('Basic Validation Functions', () => {
    describe('validateRequired', () => {
      it('should pass for valid values', () => {
        expect(validateRequired('hello', 'Field')).toBeNull();
        expect(validateRequired(123, 'Field')).toBeNull();
        expect(validateRequired(false, 'Field')).toBeNull();
      });

      it('should fail for empty values', () => {
        expect(validateRequired('', 'Field')).toBe('Field is required');
        expect(validateRequired(null, 'Field')).toBe('Field is required');
        expect(validateRequired(undefined, 'Field')).toBe('Field is required');
        expect(validateRequired('   ', 'Field')).toBe('Field cannot be empty');
      });
    });

    describe('validateStringLength', () => {
      it('should validate string length correctly', () => {
        expect(validateStringLength('hello', 'Field', 1, 10)).toBeNull();
        expect(validateStringLength('hello', 'Field', 6, 10)).toBe('Field must be at least 6 characters long');
        expect(validateStringLength('hello world', 'Field', 1, 5)).toBe('Field must be no more than 5 characters long');
      });

      it('should handle non-string input', () => {
        expect(validateStringLength(123 as any, 'Field')).toBe('Field must be a string');
      });
    });

    describe('validateEmail', () => {
      it('should validate correct email addresses', () => {
        expect(validateEmail('test@example.com')).toBeNull();
        expect(validateEmail('user.name+tag@domain.co.uk')).toBeNull();
      });

      it('should reject invalid email addresses', () => {
        expect(validateEmail('invalid-email')).toBe('Please enter a valid email address');
        expect(validateEmail('test@')).toBe('Please enter a valid email address');
        expect(validateEmail('@domain.com')).toBe('Please enter a valid email address');
      });

      it('should require email', () => {
        expect(validateEmail('')).toBe('Email is required');
      });
    });

    describe('validateRating', () => {
      it('should validate correct ratings', () => {
        expect(validateRating(1)).toBeNull();
        expect(validateRating(3)).toBeNull();
        expect(validateRating(5)).toBeNull();
      });

      it('should reject invalid ratings', () => {
        expect(validateRating(0)).toBe('Rating must be between 1 and 5');
        expect(validateRating(6)).toBe('Rating must be between 1 and 5');
        expect(validateRating(3.5)).toBe('Rating must be a whole number');
        expect(validateRating(NaN)).toBe('Rating must be a valid number');
        expect(validateRating('3' as any)).toBe('Rating must be a valid number');
      });
    });

    describe('validatePercentage', () => {
      it('should validate correct percentages', () => {
        expect(validatePercentage(0)).toBeNull();
        expect(validatePercentage(50)).toBeNull();
        expect(validatePercentage(100)).toBeNull();
        expect(validatePercentage(75.5)).toBeNull();
      });

      it('should reject invalid percentages', () => {
        expect(validatePercentage(-1)).toBe('Percentage must be between 0 and 100');
        expect(validatePercentage(101)).toBe('Percentage must be between 0 and 100');
        expect(validatePercentage(NaN)).toBe('Percentage must be a valid number');
      });
    });

    describe('validatePositiveNumber', () => {
      it('should validate positive numbers', () => {
        expect(validatePositiveNumber(1, 'Field')).toBeNull();
        expect(validatePositiveNumber(100, 'Field')).toBeNull();
        expect(validatePositiveNumber(0, 'Field')).toBeNull();
      });

      it('should reject negative numbers', () => {
        expect(validatePositiveNumber(-1, 'Field')).toBe('Field must be a positive number');
        expect(validatePositiveNumber(NaN, 'Field')).toBe('Field must be a valid number');
      });
    });

    describe('validateUrl', () => {
      it('should validate correct URLs', () => {
        expect(validateUrl('https://example.com')).toBeNull();
        expect(validateUrl('http://test.org/path')).toBeNull();
        expect(validateUrl('')).toBeNull(); // URLs are often optional
      });

      it('should reject invalid URLs', () => {
        expect(validateUrl('not-a-url')).toBe('URL must be a valid URL');
        expect(validateUrl('ftp://invalid')).toBe('URL must be a valid URL');
      });
    });

    describe('validateFileSize', () => {
      it('should validate file size', () => {
        const smallFile = new File(['content'], 'test.txt', { type: 'text/plain' });
        expect(validateFileSize(smallFile, 1024 * 1024)).toBeNull();
      });

      it('should reject large files', () => {
        const largeFile = new File(['x'.repeat(2 * 1024 * 1024)], 'large.txt', { type: 'text/plain' });
        const result = validateFileSize(largeFile, 1024 * 1024);
        expect(result).toContain('File size must be less than');
      });
    });

    describe('validateFileType', () => {
      it('should validate allowed file types', () => {
        const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
        expect(validateFileType(file, ['image/jpeg', 'image/png'])).toBeNull();
      });

      it('should reject disallowed file types', () => {
        const file = new File(['content'], 'test.exe', { type: 'application/x-executable' });
        const result = validateFileType(file, ['image/jpeg', 'image/png']);
        expect(result).toContain('File type application/x-executable is not supported');
      });
    });
  });

  describe('Enum Validation Functions', () => {
    describe('validateEmploymentType', () => {
      it('should validate correct employment types', () => {
        expect(validateEmploymentType('temporary')).toBeNull();
        expect(validateEmploymentType('permanent')).toBeNull();
        expect(validateEmploymentType('contract')).toBeNull();
      });

      it('should reject invalid employment types', () => {
        expect(validateEmploymentType('invalid')).toContain('Employment type must be one of');
      });
    });

    describe('validateServiceCategory', () => {
      it('should validate correct service categories', () => {
        expect(validateServiceCategory('recruitment')).toBeNull();
        expect(validateServiceCategory('cleaning')).toBeNull();
        expect(validateServiceCategory('consultation')).toBeNull();
      });

      it('should reject invalid service categories', () => {
        expect(validateServiceCategory('invalid')).toContain('Service category must be one of');
      });
    });

    describe('validateContentStatus', () => {
      it('should validate correct content statuses', () => {
        expect(validateContentStatus('draft')).toBeNull();
        expect(validateContentStatus('published')).toBeNull();
        expect(validateContentStatus('archived')).toBeNull();
      });

      it('should reject invalid content statuses', () => {
        expect(validateContentStatus('invalid')).toContain('Status must be one of');
      });
    });
  });

  describe('Content Type Validation', () => {
    describe('validateService', () => {
      const validService = {
        title: 'Test Service',
        description: 'This is a test service description that is long enough.',
        category: 'recruitment',
        features: ['feature1', 'feature2'],
        pricing: '$100/hour'
      };

      it('should validate correct service data', () => {
        const result = validateService(validService);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should reject service with missing required fields', () => {
        const invalidService = { ...validService, title: '' };
        const result = validateService(invalidService);
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.includes('Title'))).toBe(true);
      });

      it('should reject service with invalid category', () => {
        const invalidService = { ...validService, category: 'invalid' };
        const result = validateService(invalidService);
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.includes('Service category'))).toBe(true);
      });

      it('should warn about missing features', () => {
        const serviceWithoutFeatures = { ...validService, features: [] };
        const result = validateService(serviceWithoutFeatures);
        expect(result.warnings.some(w => w.includes('feature'))).toBe(true);
      });
    });

    describe('validateTestimonial', () => {
      const validTestimonial = {
        clientName: 'John Doe',
        clientRole: 'Manager',
        rating: 5,
        reviewText: 'This is a great service with excellent quality.',
        companyName: 'Test Company'
      };

      it('should validate correct testimonial data', () => {
        const result = validateTestimonial(validTestimonial);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should reject testimonial with invalid rating', () => {
        const invalidTestimonial = { ...validTestimonial, rating: 6 };
        const result = validateTestimonial(invalidTestimonial);
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.includes('Rating'))).toBe(true);
      });

      it('should reject testimonial with short review text', () => {
        const invalidTestimonial = { ...validTestimonial, reviewText: 'Short' };
        const result = validateTestimonial(invalidTestimonial);
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.includes('Review Text'))).toBe(true);
      });
    });

    describe('validateJobListing', () => {
      const validJob = {
        title: 'Software Developer',
        description: 'We are looking for a skilled software developer to join our team.',
        location: 'New York, NY',
        employmentType: 'permanent',
        requirements: ['Bachelor degree', '3+ years experience'],
        benefits: ['Health insurance', 'Paid vacation'],
        salaryRange: '$70,000 - $90,000'
      };

      it('should validate correct job listing data', () => {
        const result = validateJobListing(validJob);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should reject job with invalid employment type', () => {
        const invalidJob = { ...validJob, employmentType: 'invalid' };
        const result = validateJobListing(invalidJob);
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.includes('Employment type'))).toBe(true);
      });

      it('should warn about missing requirements or benefits', () => {
        const jobWithoutRequirements = { ...validJob, requirements: [] };
        const result = validateJobListing(jobWithoutRequirements);
        expect(result.warnings.some(w => w.includes('requirement'))).toBe(true);
      });
    });

    describe('validateTeamMember', () => {
      const validMember = {
        name: 'Jane Smith',
        role: 'Senior Consultant',
        bio: 'Jane has over 10 years of experience in recruitment.',
        email: 'jane@example.com',
        phone: '+1-555-123-4567',
        department: 'Recruitment',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/janesmith',
          twitter: 'https://twitter.com/janesmith'
        }
      };

      it('should validate correct team member data', () => {
        const result = validateTeamMember(validMember);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should reject member with invalid email', () => {
        const invalidMember = { ...validMember, email: 'invalid-email' };
        const result = validateTeamMember(invalidMember);
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.includes('email'))).toBe(true);
      });

      it('should reject member with invalid social links', () => {
        const invalidMember = {
          ...validMember,
          socialLinks: { linkedin: 'not-a-url' }
        };
        const result = validateTeamMember(invalidMember);
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.includes('LinkedIn URL'))).toBe(true);
      });
    });

    describe('validateBlogPost', () => {
      const validPost = {
        title: 'How to Find the Right Job',
        content: 'This is a comprehensive guide on finding the right job in today\'s market. It covers various strategies and tips.',
        excerpt: 'A comprehensive guide on finding the right job in today\'s competitive market.',
        slug: 'how-to-find-the-right-job',
        categories: ['Career Advice'],
        tags: ['jobs', 'career', 'tips'],
        seoTitle: 'How to Find the Right Job - Career Guide',
        seoDescription: 'Learn effective strategies for finding the right job in today\'s competitive market.'
      };

      it('should validate correct blog post data', () => {
        const result = validateBlogPost(validPost);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should reject post with invalid slug format', () => {
        const invalidPost = { ...validPost, slug: 'Invalid Slug!' };
        const result = validateBlogPost(invalidPost);
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.includes('Slug'))).toBe(true);
      });

      it('should warn about missing categories or tags', () => {
        const postWithoutCategories = { ...validPost, categories: [] };
        const result = validateBlogPost(postWithoutCategories);
        expect(result.warnings.some(w => w.includes('category'))).toBe(true);
      });
    });

    describe('validateStatistics', () => {
      const validStats = {
        clientCount: 150,
        placementsMade: 500,
        successRate: 85.5,
        yearsInBusiness: 10
      };

      it('should validate correct statistics data', () => {
        const result = validateStatistics(validStats);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should reject negative numbers', () => {
        const invalidStats = { ...validStats, clientCount: -5 };
        const result = validateStatistics(invalidStats);
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.includes('Client Count'))).toBe(true);
      });

      it('should reject invalid success rate', () => {
        const invalidStats = { ...validStats, successRate: 150 };
        const result = validateStatistics(invalidStats);
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.includes('Percentage'))).toBe(true);
      });
    });
  });

  describe('validateContentByType', () => {
    it('should validate content based on collection type', () => {
      const serviceData = {
        title: 'Test Service',
        description: 'This is a test service description.',
        category: 'recruitment',
        features: ['feature1']
      };

      const result = validateContentByType('services', serviceData);
      expect(result.isValid).toBe(true);
    });

    it('should reject unknown content types', () => {
      const result = validateContentByType('unknown', {});
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Unknown content type'))).toBe(true);
    });
  });

  describe('runValidation', () => {
    it('should run multiple validators', () => {
      const data = { value: 'test' };
      const validators = [
        (d: any) => d.value ? null : 'Value is required',
        (d: any) => d.value.length > 2 ? null : 'Value too short'
      ];

      const result = runValidation(data, validators);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should collect all validation errors', () => {
      const data = { value: '' };
      const validators = [
        (d: any) => d.value ? null : 'Value is required',
        (d: any) => d.value.length > 2 ? null : 'Value too short'
      ];

      const result = runValidation(data, validators);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(2);
    });
  });
});