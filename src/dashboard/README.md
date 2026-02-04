# Dashboard CMS

## Overview

This is the Dashboard Content Management System for the Consulate Recruitment website. It provides a comprehensive interface for managing all dynamic content including services, testimonials, job listings, team profiles, and more.

## Project Structure

```
src/dashboard/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── content/        # Content management components
│   ├── layout/         # Layout components (sidebar, header, etc.)
│   └── ui/             # Reusable UI components
├── contexts/           # React contexts (auth, theme, etc.)
├── hooks/              # Custom React hooks
├── routes/             # Routing configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── __tests__/          # Test files
```

## Features

- **Authentication System**: Role-based access control with admin, editor, and viewer roles
- **Content Management**: CRUD operations for all content types
- **Media Management**: Upload and organize images, videos, and documents
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Data Export/Import**: Backup and restore functionality
- **Analytics Dashboard**: Content statistics and usage reports

## Getting Started

1. Navigate to `/dashboard/login` to access the login page
2. Use demo credentials: `admin` / `admin123`
3. Explore the different content management sections

## Technology Stack

- **React 19** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **date-fns** for date handling
- **fast-check** for property-based testing

## Development Status

This is Task 1 implementation - basic project structure and core dependencies are set up. Individual content management features will be implemented in subsequent tasks.

## Testing

The project uses a dual testing approach:
- **Unit Tests**: Specific examples and edge cases
- **Property-Based Tests**: Universal properties across all inputs

Run tests with: `npm test` (to be configured)

## Authentication

The current implementation uses a mock authentication system for development. In production, this would be replaced with a proper authentication service.

Default credentials:
- Username: `admin`
- Password: `admin123`
- Role: `admin` (full permissions)