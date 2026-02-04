// Basic setup test to verify the dashboard structure is working
import { describe, it, expect } from 'vitest';
import { generateId, formatDate, isValidEmail } from '../utils/helpers';
import { STORAGE_KEYS, COLLECTIONS, USER_ROLES } from '../utils/constants';

describe('Dashboard Setup', () => {
  it('should generate unique IDs', () => {
    const id1 = generateId();
    const id2 = generateId();
    
    expect(id1).toBeDefined();
    expect(id2).toBeDefined();
    expect(id1).not.toBe(id2);
    expect(typeof id1).toBe('string');
    expect(id1.length).toBeGreaterThan(0);
  });

  it('should format dates correctly', () => {
    const date = new Date('2024-01-15');
    const formatted = formatDate(date);
    
    expect(formatted).toBe('Jan 15, 2024');
  });

  it('should validate email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });

  it('should have correct constants defined', () => {
    expect(STORAGE_KEYS.AUTH_TOKEN).toBe('dashboard_auth_token');
    expect(COLLECTIONS.SERVICES).toBe('services');
    expect(USER_ROLES.ADMIN).toBe('admin');
  });
});