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
        // Check for stored session
        const storedSession = localStorage.getItem('dashboard_session');
        if (storedSession) {
          const sessionData = JSON.parse(storedSession);
          
          // Check if session is still valid (not expired)
          const sessionAge = Date.now() - sessionData.timestamp;
          const maxAge = 24 * 60 * 60 * 1000; // 24 hours
          
          if (sessionAge < maxAge) {
            setUser(sessionData.user);
            setSessionToken(sessionData.token);
          } else {
            // Session expired, clear it
            localStorage.removeItem('dashboard_session');
          }
        }
      } catch (error) {
        console.error('Error loading session:', error);
        localStorage.removeItem('dashboard_session');
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
        // Generate a mock session token
        const token = `token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
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
        
        // Store session data for persistence across page refreshes
        const sessionData = {
          user: authenticatedUser,
          token: token,
          timestamp: Date.now()
        };
        localStorage.setItem('dashboard_session', JSON.stringify(sessionData));
        
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
    // Clear session data on logout
    localStorage.removeItem('dashboard_session');
    localStorage.removeItem('dashboard_user_preferences');
    
    // Redirect to login page
    window.location.href = '/dashboard';
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