import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { validateRequired } from '../../utils/validation';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated with role-based navigation
  if (isAuthenticated) {
    // Role-based navigation after successful login
    const defaultRoutes = {
      admin: '/dashboard',
      editor: '/dashboard/content',
      viewer: '/dashboard/analytics'
    };
    return <Navigate to={defaultRoutes[userRole] || '/dashboard'} replace />;
  }

  const validateForm = (): boolean => {
    const errors: { username?: string; password?: string } = {};
    
    const usernameError = validateRequired(credentials.username, 'Username');
    if (usernameError) errors.username = usernameError;
    
    const passwordError = validateRequired(credentials.password, 'Password');
    if (passwordError) errors.password = passwordError;
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Validate form fields
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(credentials);
      if (success) {
        // Navigation will be handled by the redirect logic above
        // since isAuthenticated will become true after successful login
      } else {
        setError('Invalid username or password. Please check your credentials and try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Dashboard Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access the content management system
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  fieldErrors.username ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => {
                  setCredentials({ ...credentials, username: e.target.value });
                  // Clear field error when user starts typing
                  if (fieldErrors.username) {
                    setFieldErrors({ ...fieldErrors, username: undefined });
                  }
                }}
              />
              {fieldErrors.username && (
                <div className="text-red-600 text-xs mt-1">{fieldErrors.username}</div>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  fieldErrors.password ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value });
                  // Clear field error when user starts typing
                  if (fieldErrors.password) {
                    setFieldErrors({ ...fieldErrors, password: undefined });
                  }
                }}
              />
              {fieldErrors.password && (
                <div className="text-red-600 text-xs mt-1">{fieldErrors.password}</div>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-xs text-gray-500 text-center space-y-1">
            <div>Demo credentials:</div>
            <div>Admin: admin / admin123 (full access)</div>
            <div>Editor: editor / editor123 (content editing)</div>
            <div>Viewer: viewer / viewer123 (read-only)</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;