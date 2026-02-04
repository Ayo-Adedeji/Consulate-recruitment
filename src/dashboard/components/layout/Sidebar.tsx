import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { dashboardRoutes } from '../../routes/routeConfig';

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onToggle }) => {
  const { hasPermission } = useAuth();

  const filteredRoutes = dashboardRoutes.filter(route => {
    if (!route.permission) return true;
    return hasPermission(route.permission as any);
  });

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h1 className="text-xl font-bold text-primary font-heading">Dashboard</h1>
            <p className="text-sm text-footerText">Content Management</p>
          </div>
          
          {/* Mobile close button */}
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {filteredRoutes.map((route) => {
              const Icon = route.icon;
              return (
                <li key={route.key}>
                  <NavLink
                    to={route.path}
                    onClick={() => {
                      // Close mobile sidebar when navigating
                      if (window.innerWidth < 1024 && onToggle) {
                        onToggle();
                      }
                    }}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-azure/10 text-azure border-r-2 border-azure shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                      }`
                    }
                  >
                    {Icon && <Icon className="mr-3 h-5 w-5 flex-shrink-0" />}
                    <span className="truncate">{route.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="text-xs text-footerText text-center">
            <p>Consulate Recruitment</p>
            <p>Dashboard v1.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;