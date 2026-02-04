import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User, LoginCredentials, UserRole, Permission } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const checkExistingSession = () => {
      try {
        // Only check for user preferences in localStorage, not full user data
        const userPreferences = localStorage.getItem('dashboard_user_preferences');
        const rememberedUsername = userPreferences ? JSON.parse(userPreferences).username : null;
        
        // Session tokens are kept in memory only for security
        // In a real app, you might check for a secure httpOnly cookie here
        if (rememberedUsername) {
          // Auto-login would require re-authentication in a real app
          // For demo purposes, we'll just remember the username
        }
      } catch (error) {
        console.error('Error loading user preferences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      // Mock authentication - in real app, this would call an API
      const mockUsers = [
        {
          username: 'admin',
          password: 'admin123',
          role: 'admin' as UserRole,
          permissions: ['read', 'write', 'delete', 'export'] as Permission[]
        },
        {
          username: 'editor',
          password: 'editor123',
          role: 'editor' as UserRole,
          permissions: ['read', 'write'] as Permission[]
        },
        {
          username: 'viewer',
          password: 'viewer123',
          role: 'viewer' as UserRole,
          permissions: ['read'] as Permission[]
        }
      ];

      const matchedUser = mockUsers.find(
        u => u.username === credentials.username && u.password === credentials.password
      );

      if (matchedUser) {
        // Generate a mock session token (in memory only)
        const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setSessionToken(token);

        const authenticatedUser: User = {
          id: `user_${matchedUser.username}`,
          username: matchedUser.username,
          role: matchedUser.role,
          permissions: matchedUser.permissions,
          isActive: true,
          lastLogin: new Date(),
        };
        
        setUser(authenticatedUser);
        
        // Only store user preferences, not sensitive data
        localStorage.setItem('dashboard_user_preferences', JSON.stringify({
          username: authenticatedUser.username,
          theme: 'light' // Example preference
        }));
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setSessionToken(null);
    // Clear user preferences on logout
    localStorage.removeItem('dashboard_user_preferences');
  };

  const hasPermission = (permission: Permission): boolean => {
    return user?.permissions.includes(permission) ?? false;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    userRole: user?.role ?? 'viewer',
    hasPermission,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};