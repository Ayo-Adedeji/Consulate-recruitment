import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Remove 'dashboard' from the beginning if present
  const breadcrumbPaths = pathnames.filter(path => path !== 'dashboard');

  const formatBreadcrumbLabel = (path: string): string => {
    return path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto">
      <Link
        to="/dashboard"
        className="flex items-center hover:text-gray-900 transition-colors duration-200 flex-shrink-0 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Dashboard home"
      >
        <Home className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="ml-1 sm:hidden">Home</span>
      </Link>
      
      {breadcrumbPaths.map((path, index) => {
        const routeTo = `/dashboard/${breadcrumbPaths.slice(0, index + 1).join('/')}`;
        const isLast = index === breadcrumbPaths.length - 1;
        const label = formatBreadcrumbLabel(path);
        
        return (
          <React.Fragment key={path}>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
            {isLast ? (
              <span className="text-gray-900 font-medium truncate">
                {label}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-gray-900 transition-colors duration-200 truncate p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                title={label}
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;