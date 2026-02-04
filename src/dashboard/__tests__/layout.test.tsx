import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import DashboardLayout from '../components/layout/DashboardLayout';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { AuthProvider } from '../contexts/AuthContext';

// Mock the auth context
const mockAuthContext = {
  user: { id: '1', username: 'testuser', role: 'admin' as const, permissions: ['read', 'write'] as const },
  login: vi.fn(),
  logout: vi.fn(),
  isAuthenticated: true,
  userRole: 'admin' as const,
  hasPermission: vi.fn(() => true),
};

vi.mock('../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: () => mockAuthContext,
}));

// Mock route config
vi.mock('../routes/routeConfig', () => ({
  dashboardRoutes: [
    {
      key: 'overview',
      label: 'Overview',
      path: '/dashboard',
      icon: () => <div>Icon</div>,
    },
    {
      key: 'services',
      label: 'Services',
      path: '/dashboard/services',
      icon: () => <div>Icon</div>,
      permission: 'write',
    },
  ],
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Dashboard Layout Components', () => {
  describe('DashboardLayout', () => {
    it('renders main layout structure', () => {
      renderWithRouter(
        <DashboardLayout>
          <div data-testid="test-content">Test Content</div>
        </DashboardLayout>
      );

      expect(screen.getByTestId('test-content')).toBeInTheDocument();
    });

    it('handles sidebar toggle on mobile', () => {
      renderWithRouter(
        <DashboardLayout>
          <div>Test Content</div>
        </DashboardLayout>
      );

      // Should have mobile menu button
      const menuButton = screen.getByLabelText('Toggle sidebar');
      expect(menuButton).toBeInTheDocument();
      
      // Click should not throw error
      fireEvent.click(menuButton);
    });
  });

  describe('Sidebar', () => {
    it('renders navigation items', () => {
      renderWithRouter(<Sidebar isOpen={true} />);

      expect(screen.getByText('Overview')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
    });

    it('handles mobile close button', () => {
      const onToggle = vi.fn();
      renderWithRouter(<Sidebar isOpen={true} onToggle={onToggle} />);

      const closeButton = screen.getByRole('button');
      fireEvent.click(closeButton);
      
      expect(onToggle).toHaveBeenCalled();
    });

    it('applies responsive classes correctly', () => {
      const { container } = renderWithRouter(<Sidebar isOpen={true} />);
      
      const sidebar = container.querySelector('.fixed.lg\\:static');
      expect(sidebar).toBeInTheDocument();
    });
  });

  describe('Header', () => {
    it('displays user information', () => {
      renderWithRouter(<Header />);

      expect(screen.getByText('Welcome back, testuser')).toBeInTheDocument();
      expect(screen.getByText('Role: admin')).toBeInTheDocument();
    });

    it('handles logout button click', () => {
      renderWithRouter(<Header />);

      const logoutButton = screen.getByLabelText('Logout');
      fireEvent.click(logoutButton);
      
      expect(mockAuthContext.logout).toHaveBeenCalled();
    });

    it('handles mobile menu toggle', () => {
      const onMenuToggle = vi.fn();
      renderWithRouter(<Header onMenuToggle={onMenuToggle} />);

      const menuButton = screen.getByLabelText('Toggle sidebar');
      fireEvent.click(menuButton);
      
      expect(onMenuToggle).toHaveBeenCalled();
    });
  });

  describe('Breadcrumbs', () => {
    it('renders home breadcrumb', () => {
      renderWithRouter(<Breadcrumbs />);

      const homeLink = screen.getByLabelText('Dashboard home');
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/dashboard');
    });

    it('applies responsive classes', () => {
      const { container } = renderWithRouter(<Breadcrumbs />);
      
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('overflow-x-auto');
    });
  });
});

describe('Responsive Design Tests', () => {
  it('applies mobile-first responsive classes', () => {
    const { container } = renderWithRouter(
      <DashboardLayout>
        <div>Test</div>
      </DashboardLayout>
    );

    // Check for responsive classes
    const mainContent = container.querySelector('.p-4.sm\\:p-6.lg\\:p-8');
    expect(mainContent).toBeInTheDocument();
  });

  it('handles touch interactions', () => {
    renderWithRouter(<Sidebar isOpen={true} />);

    const navLink = screen.getByText('Overview').closest('a');
    expect(navLink).toHaveClass('transition-all');
  });
});