import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import LoginPage from '../components/auth/LoginPage';

// Mock component to test auth context
const TestAuthComponent: React.FC = () => {
  const { user, login, logout, isAuthenticated, userRole, hasPermission } = useAuth();
  
  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'authenticated' : 'not-authenticated'}
      </div>
      <div data-testid="user-role">{userRole}</div>
      <div data-testid="user-name">{user?.username || 'no-user'}</div>
      <div data-testid="has-write-permission">
        {hasPermission('write') ? 'can-write' : 'cannot-write'}
      </div>
      <button 
        data-testid="login-admin" 
        onClick={() => login({ username: 'admin', password: 'admin123' })}
      >
        Login Admin
      </button>
      <button 
        data-testid="login-editor" 
        onClick={() => login({ username: 'editor', password: 'editor123' })}
      >
        Login Editor
      </button>
      <button 
        data-testid="login-viewer" 
        onClick={() => login({ username: 'viewer', password: 'viewer123' })}
      >
        Login Viewer
      </button>
      <button 
        data-testid="login-invalid" 
        onClick={() => login({ username: 'invalid', password: 'invalid' })}
      >
        Login Invalid
      </button>
      <button data-testid="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

const renderWithAuth = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Authentication System', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('AuthContext', () => {
    it('should start with unauthenticated state', () => {
      renderWithAuth(<TestAuthComponent />);
      
      expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
      expect(screen.getByTestId('user-role')).toHaveTextContent('viewer');
      expect(screen.getByTestId('user-name')).toHaveTextContent('no-user');
      expect(screen.getByTestId('has-write-permission')).toHaveTextContent('cannot-write');
    });

    it('should authenticate admin user with full permissions', async () => {
      renderWithAuth(<TestAuthComponent />);
      
      fireEvent.click(screen.getByTestId('login-admin'));
      
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
        expect(screen.getByTestId('user-role')).toHaveTextContent('admin');
        expect(screen.getByTestId('user-name')).toHaveTextContent('admin');
        expect(screen.getByTestId('has-write-permission')).toHaveTextContent('can-write');
      });
    });

    it('should authenticate editor user with write permissions', async () => {
      renderWithAuth(<TestAuthComponent />);
      
      fireEvent.click(screen.getByTestId('login-editor'));
      
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
        expect(screen.getByTestId('user-role')).toHaveTextContent('editor');
        expect(screen.getByTestId('user-name')).toHaveTextContent('editor');
        expect(screen.getByTestId('has-write-permission')).toHaveTextContent('can-write');
      });
    });

    it('should authenticate viewer user with read-only permissions', async () => {
      renderWithAuth(<TestAuthComponent />);
      
      fireEvent.click(screen.getByTestId('login-viewer'));
      
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
        expect(screen.getByTestId('user-role')).toHaveTextContent('viewer');
        expect(screen.getByTestId('user-name')).toHaveTextContent('viewer');
        expect(screen.getByTestId('has-write-permission')).toHaveTextContent('cannot-write');
      });
    });

    it('should reject invalid credentials', async () => {
      renderWithAuth(<TestAuthComponent />);
      
      fireEvent.click(screen.getByTestId('login-invalid'));
      
      // Should remain unauthenticated
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
        expect(screen.getByTestId('user-name')).toHaveTextContent('no-user');
      });
    });

    it('should logout and clear session', async () => {
      renderWithAuth(<TestAuthComponent />);
      
      // First login
      fireEvent.click(screen.getByTestId('login-admin'));
      
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
      });
      
      // Then logout
      fireEvent.click(screen.getByTestId('logout'));
      
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
        expect(screen.getByTestId('user-name')).toHaveTextContent('no-user');
        expect(screen.getByTestId('user-role')).toHaveTextContent('viewer');
      });
    });
  });

  describe('LoginPage', () => {
    it('should render login form', () => {
      renderWithAuth(<LoginPage />);
      
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('should show validation errors for empty fields', async () => {
      renderWithAuth(<LoginPage />);
      
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Username is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    it('should show error for invalid credentials', async () => {
      renderWithAuth(<LoginPage />);
      
      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      fireEvent.change(usernameInput, { target: { value: 'invalid' } });
      fireEvent.change(passwordInput, { target: { value: 'invalid' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
      });
    });

    it('should display demo credentials', () => {
      renderWithAuth(<LoginPage />);
      
      expect(screen.getByText(/admin \/ admin123/)).toBeInTheDocument();
      expect(screen.getByText(/editor \/ editor123/)).toBeInTheDocument();
      expect(screen.getByText(/viewer \/ viewer123/)).toBeInTheDocument();
    });
  });
});