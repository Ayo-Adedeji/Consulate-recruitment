import React, { useState, useCallback } from 'react';
import { FormBuilderProps, FormField } from '../../types/ui';
import LoadingSpinner from './LoadingSpinner';

const FormBuilder: React.FC<FormBuilderProps> = ({
  fields,
  initialValues = {},
  onSubmit,
  onCancel,
  loading = false,
  submitText = 'Save',
  cancelText = 'Cancel',
}) => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((field: FormField, value: any): string | null => {
    // Required field validation
    if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${field.label} is required`;
    }

    // Type-specific validation
    if (value && field.validation) {
      const { min, max, pattern, custom } = field.validation;

      // Min/max validation for numbers and strings
      if (min !== undefined) {
        if (field.type === 'number' && Number(value) < min) {
          return `${field.label} must be at least ${min}`;
        }
        if (typeof value === 'string' && value.length < min) {
          return `${field.label} must be at least ${min} characters`;
        }
      }

      if (max !== undefined) {
        if (field.type === 'number' && Number(value) > max) {
          return `${field.label} must be at most ${max}`;
        }
        if (typeof value === 'string' && value.length > max) {
          return `${field.label} must be at most ${max} characters`;
        }
      }

      // Pattern validation
      if (pattern && typeof value === 'string') {
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
          return `${field.label} format is invalid`;
        }
      }

      // Custom validation
      if (custom) {
        const customError = custom(value);
        if (customError) return customError;
      }
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    // URL validation
    if (field.type === 'url' && value) {
      try {
        new URL(value);
      } catch {
        return 'Please enter a valid URL';
      }
    }

    return null;
  }, []);

  const handleChange = (field: FormField, value: any) => {
    setValues(prev => ({ ...prev, [field.name]: value }));
    
    // Clear error when user starts typing
    if (errors[field.name]) {
      setErrors(prev => ({ ...prev, [field.name]: '' }));
    }
  };

  const handleBlur = (field: FormField) => {
    setTouched(prev => ({ ...prev, [field.name]: true }));
    
    const error = validateField(field, values[field.name]);
    setErrors(prev => ({ ...prev, [field.name]: error || '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    fields.forEach(field => {
      const error = validateField(field, values[field.name]);
      if (error) {
        newErrors[field.name] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setTouched(fields.reduce((acc, field) => ({ ...acc, [field.name]: true }), {}));

    if (!hasErrors) {
      onSubmit(values);
    }
  };

  const renderField = (field: FormField) => {
    const value = values[field.name] || '';
    const error = touched[field.name] ? errors[field.name] : '';
    const hasError = !!error;

    const baseInputClasses = `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
      hasError 
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
        : 'border-gray-300 focus:border-blue-500'
    }`;

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.name}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            onBlur={() => handleBlur(field)}
            placeholder={field.placeholder}
            rows={4}
            className={`${baseInputClasses} resize-vertical`}
            disabled={loading}
          />
        );

      case 'select':
        return (
          <select
            id={field.name}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            onBlur={() => handleBlur(field)}
            className={baseInputClasses}
            disabled={loading}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'file':
        return (
          <input
            type="file"
            id={field.name}
            onChange={(e) => handleChange(field, e.target.files?.[0] || null)}
            onBlur={() => handleBlur(field)}
            className={`${baseInputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
            disabled={loading}
          />
        );

      case 'rich-text':
        return (
          <div className="border border-gray-300 rounded-md">
            <textarea
              id={field.name}
              value={value}
              onChange={(e) => handleChange(field, e.target.value)}
              onBlur={() => handleBlur(field)}
              placeholder={field.placeholder}
              rows={6}
              className={`w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical`}
              disabled={loading}
            />
            <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 rounded-b-md">
              Rich text editor (basic implementation)
            </div>
          </div>
        );

      default:
        return (
          <input
            type={field.type}
            id={field.name}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            onBlur={() => handleBlur(field)}
            placeholder={field.placeholder}
            className={baseInputClasses}
            disabled={loading}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {renderField(field)}
          
          {touched[field.name] && errors[field.name] && (
            <p className="text-sm text-red-600">{errors[field.name]}</p>
          )}
        </div>
      ))}

      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 sm:flex-none sm:order-2 inline-flex justify-center items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading && <LoadingSpinner size="sm" className="mr-2" />}
          {submitText}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 sm:flex-none sm:order-1 inline-flex justify-center items-center px-6 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {cancelText}
          </button>
        )}
      </div>
    </form>
  );
};

export default FormBuilder;