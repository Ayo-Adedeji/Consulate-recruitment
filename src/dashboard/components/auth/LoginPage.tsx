import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { validateRequired } from '../../utils/validation';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import consulateLogo from '../../../assets/consulateLogo.png';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side - Logo and Branding */}
          <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 lg:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-20 translate-y-20"></div>
            </div>
            
            <div className="relative z-10 text-center">
              {/* Logo */}
              <div className="mb-8">
                <img 
                  src={consulateLogo} 
                  alt="Consulate Recruitment" 
                  className="h-24 w-auto mx-auto mb-6"
                />
              </div>
              
              {/* Welcome Text */}
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-heading">
                Welcome Back
              </h1>
              <p className="text-xl lg:text-2xl mb-6 opacity-90">
                Dashboard Login
              </p>
              <p className="text-lg opacity-80 max-w-md">
                Access your content management system to manage jobs, blogs, and more.
              </p>
              
              {/* Decorative Elements */}
              <div className="mt-12 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600">
                  Enter your credentials to access the dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        fieldErrors.username ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
                      placeholder="Enter your username"
                      value={credentials.username}
                      onChange={(e) => {
                        setCredentials({ ...credentials, username: e.target.value });
                        if (fieldErrors.username) {
                          setFieldErrors({ ...fieldErrors, username: undefined });
                        }
                      }}
                    />
                  </div>
                  {fieldErrors.username && (
                    <p className="mt-2 text-sm text-red-600">{fieldErrors.username}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className={`block w-full pl-10 pr-12 py-3 border ${
                        fieldErrors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => {
                        setCredentials({ ...credentials, password: e.target.value });
                        if (fieldErrors.password) {
                          setFieldErrors({ ...fieldErrors, password: undefined });
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="mt-2 text-sm text-red-600">{fieldErrors.password}</p>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;