// Authentication and user management types

export type UserRole = 'admin' | 'editor' | 'viewer';
export type Permission = 'read' | 'write' | 'delete' | 'export';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  permissions: Permission[];
  lastLogin?: Date;
  isActive: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  userRole: UserRole;
  hasPermission: (permission: Permission) => boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}