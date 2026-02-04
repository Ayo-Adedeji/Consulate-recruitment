import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, Menu, Home } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Left side - Mobile menu button, logo, and welcome message */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          {/* Logo/Home link */}
          <Link
            to="/"
            className="flex items-center space-x-2 px-2 sm:px-3 py-2 rounded-md text-azure hover:text-azureSoft hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Go to Homepage"
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline text-sm font-medium">Homepage</span>
          </Link>
          
          {/* Welcome message */}
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-semibold text-primary font-heading truncate">
              Welcome back, {user?.username}
            </h2>
            <p className="text-xs sm:text-sm text-footerText capitalize">
              Role: {user?.role}
            </p>
          </div>
        </div>
        
        {/* Right side - User info and logout */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* User info */}
          <div className="hidden sm:flex items-center space-x-2 text-sm text-footerText">
            <User className="h-4 w-4" />
            <span className="truncate max-w-32">{user?.username}</span>
          </div>
          
          {/* Logout button */}
          <button
            onClick={logout}
            className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-sm text-footerText hover:text-primary hover:bg-gray-100 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
      
      {/* Breadcrumbs */}
      <div className="px-4 sm:px-6 lg:px-8 pb-3 sm:pb-4">
        <Breadcrumbs />
      </div>
    </header>
  );
};

export default Header;