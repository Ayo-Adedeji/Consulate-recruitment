import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DataTable from '../components/ui/DataTable';
import FormBuilder from '../components/ui/FormBuilder';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { TableColumn, FormField } from '../types/ui';

describe('UI Components', () => {
  describe('DataTable', () => {
    const mockData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    ];

    const mockColumns: TableColumn[] = [
      { key: 'name', title: 'Name', sortable: true },
      { key: 'email', title: 'Email', sortable: true },
      { key: 'role', title: 'Role', filterable: true },
    ];

    it('renders data correctly', () => {
      render(<DataTable data={mockData} columns={mockColumns} />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });

    it('handles search functionality', async () => {
      render(<DataTable data={mockData} columns={mockColumns} />);

      const searchInput = screen.getByPlaceholderText('Search...');
      fireEvent.change(searchInput, { target: { value: 'John' } });

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
      });
    });

    it('handles sorting', () => {
      const onSort = vi.fn();
      render(<DataTable data={mockData} columns={mockColumns} onSort={onSort} />);

      const nameHeader = screen.getByText('Name').closest('th');
      fireEvent.click(nameHeader!);

      expect(onSort).toHaveBeenCalledWith('name', 'asc');
    });

    it('shows loading state', () => {
      render(<DataTable data={[]} columns={mockColumns} loading={true} />);

      expect(screen.getByRole('generic')).toHaveClass('animate-spin');
    });

    it('shows mobile card view on small screens', () => {
      // Mock window.innerWidth for mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      const { container } = render(<DataTable data={mockData} columns={mockColumns} />);
      
      // Mobile view should be visible
      const mobileView = container.querySelector('.md\\:hidden');
      expect(mobileView).toBeInTheDocument();
    });

    it('handles row clicks', () => {
      const onRowClick = vi.fn();
      render(<DataTable data={mockData} columns={mockColumns} onRowClick={onRowClick} />);

      const firstRow = screen.getByText('John Doe').closest('tr');
      fireEvent.click(firstRow!);

      expect(onRowClick).toHaveBeenCalledWith(mockData[0]);
    });
  });

  describe('FormBuilder', () => {
    const mockFields: FormField[] = [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your name',
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
      },
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' },
        ],
      },
    ];

    it('renders form fields correctly', () => {
      const onSubmit = vi.fn();
      render(<FormBuilder fields={mockFields} onSubmit={onSubmit} />);

      expect(screen.getByLabelText('Name *')).toBeInTheDocument();
      expect(screen.getByLabelText('Email *')).toBeInTheDocument();
      expect(screen.getByLabelText('Role')).toBeInTheDocument();
    });

    it('validates required fields', async () => {
      const onSubmit = vi.fn();
      render(<FormBuilder fields={mockFields} onSubmit={onSubmit} />);

      const submitButton = screen.getByText('Save');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('validates email format', async () => {
      const onSubmit = vi.fn();
      render(<FormBuilder fields={mockFields} onSubmit={onSubmit} />);

      const emailInput = screen.getByLabelText('Email *');
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    it('submits valid form data', async () => {
      const onSubmit = vi.fn();
      render(<FormBuilder fields={mockFields} onSubmit={onSubmit} />);

      fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'admin' } });

      const submitButton = screen.getByText('Save');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          role: 'admin',
        });
      });
    });

    it('handles loading state', () => {
      const onSubmit = vi.fn();
      render(<FormBuilder fields={mockFields} onSubmit={onSubmit} loading={true} />);

      const submitButton = screen.getByText('Save');
      expect(submitButton).toBeDisabled();
      
      const nameInput = screen.getByLabelText('Name *');
      expect(nameInput).toBeDisabled();
    });

    it('handles cancel button', () => {
      const onSubmit = vi.fn();
      const onCancel = vi.fn();
      render(<FormBuilder fields={mockFields} onSubmit={onSubmit} onCancel={onCancel} />);

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(onCancel).toHaveBeenCalled();
    });
  });

  describe('ConfirmDialog', () => {
    it('renders when open', () => {
      const onConfirm = vi.fn();
      const onCancel = vi.fn();
      
      render(
        <ConfirmDialog
          isOpen={true}
          title="Delete Item"
          message="Are you sure you want to delete this item?"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      );

      expect(screen.getByText('Delete Item')).toBeInTheDocument();
      expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      const onConfirm = vi.fn();
      const onCancel = vi.fn();
      
      render(
        <ConfirmDialog
          isOpen={false}
          title="Delete Item"
          message="Are you sure?"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      );

      expect(screen.queryByText('Delete Item')).not.toBeInTheDocument();
    });

    it('handles confirm button click', () => {
      const onConfirm = vi.fn();
      const onCancel = vi.fn();
      
      render(
        <ConfirmDialog
          isOpen={true}
          title="Delete Item"
          message="Are you sure?"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      );

      const confirmButton = screen.getByText('Confirm');
      fireEvent.click(confirmButton);

      expect(onConfirm).toHaveBeenCalled();
    });

    it('handles cancel button click', () => {
      const onConfirm = vi.fn();
      const onCancel = vi.fn();
      
      render(
        <ConfirmDialog
          isOpen={true}
          title="Delete Item"
          message="Are you sure?"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      );

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(onCancel).toHaveBeenCalled();
    });

    it('applies correct styling for danger type', () => {
      const onConfirm = vi.fn();
      const onCancel = vi.fn();
      
      render(
        <ConfirmDialog
          isOpen={true}
          title="Delete Item"
          message="Are you sure?"
          type="danger"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      );

      const confirmButton = screen.getByText('Confirm');
      expect(confirmButton).toHaveClass('bg-red-600');
    });
  });

  describe('LoadingSpinner', () => {
    it('renders with default size', () => {
      const { container } = render(<LoadingSpinner />);
      
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('h-8', 'w-8');
    });

    it('renders with custom size', () => {
      const { container } = render(<LoadingSpinner size="lg" />);
      
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('h-12', 'w-12');
    });

    it('applies custom className', () => {
      const { container } = render(<LoadingSpinner className="custom-class" />);
      
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('custom-class');
    });
  });
});

describe('Responsive UI Components', () => {
  it('DataTable adapts to mobile screens', () => {
    const mockData = [{ id: 1, name: 'Test', email: 'test@example.com' }];
    const mockColumns: TableColumn[] = [
      { key: 'name', title: 'Name' },
      { key: 'email', title: 'Email' },
    ];

    const { container } = render(<DataTable data={mockData} columns={mockColumns} />);
    
    // Should have both desktop and mobile views
    expect(container.querySelector('.hidden.md\\:block')).toBeInTheDocument();
    expect(container.querySelector('.md\\:hidden')).toBeInTheDocument();
  });

  it('FormBuilder uses responsive layout', () => {
    const mockFields: FormField[] = [
      { name: 'test', label: 'Test', type: 'text' },
    ];
    const onSubmit = vi.fn();

    const { container } = render(<FormBuilder fields={mockFields} onSubmit={onSubmit} />);
    
    // Button container should have responsive classes
    const buttonContainer = container.querySelector('.flex-col.sm\\:flex-row');
    expect(buttonContainer).toBeInTheDocument();
  });
});