# Consulate Recruitment - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

## 📋 What's Available

### 🏠 Public Website
- **Homepage**: `http://localhost:5173/` - Complete homepage with recent jobs and blog previews
- **Blog Page**: `http://localhost:5173/blog` - List of all published blog posts
- **Individual Blog Posts**: `http://localhost:5173/blog/[slug]` - Read individual blog posts
- **Jobs Page**: `http://localhost:5173/jobs` - List of all published job openings
- **Job Details**: `http://localhost:5173/jobs/[id]` - Detailed job page with apply functionality

### 🔧 Admin Dashboard (CMS)
- **Dashboard Login**: `http://localhost:5173/dashboard/login`
- **Jobs Management**: `http://localhost:5173/dashboard/jobs`
- **Blog Management**: `http://localhost:5173/dashboard/blog`

#### Demo Login Credentials:
- **Admin**: `admin` / `admin123` (full access)
- **Editor**: `editor` / `editor123` (content editing)
- **Viewer**: `viewer` / `viewer123` (read-only)

## ✨ Key Features Implemented

### 📝 Blog System
- ✅ **Admin Blog Management**: Create, edit, delete blog posts with rich text editor
- ✅ **Public Blog Page**: Users can browse all published blog posts
- ✅ **Individual Blog Posts**: Click to read full blog posts
- ✅ **Recent Blog Preview**: Homepage shows 3 most recent blog posts
- ✅ **Search & Filter**: Search by title, content, categories, tags
- ✅ **SEO Optimization**: Auto-generated slugs, meta descriptions
- ✅ **Categories & Tags**: Organize content with categories and tags

### 💼 Jobs System
- ✅ **Admin Jobs Management**: Create, edit, delete job listings
- ✅ **Public Jobs Page**: Users can browse all published job openings
- ✅ **Detailed Job Pages**: Click "View Details" to see full job information
- ✅ **Apply Functionality**: "Apply Now" button shows application instructions
- ✅ **Recent Jobs Preview**: Homepage shows 3 most recent job postings
- ✅ **Advanced Filtering**: Filter by location, employment type, search terms
- ✅ **Employment Types**: Permanent, temporary, contract positions
- ✅ **Status Management**: Draft, published, archived states
- ✅ **Related Jobs**: Shows similar positions on job detail pages

### 🔐 Authentication & Security
- ✅ **Role-based Access Control**: Admin, editor, viewer roles
- ✅ **Secure Session Management**: Memory-only token storage
- ✅ **Protected Routes**: Dashboard requires authentication
- ✅ **Permission-based Features**: Different access levels per role

### 📊 Data Management
- ✅ **Local Storage**: All data stored in browser localStorage
- ✅ **CRUD Operations**: Complete create, read, update, delete functionality
- ✅ **Data Validation**: Form validation and error handling
- ✅ **Real-time Updates**: Changes reflect immediately

## 🎯 How to Use

### For Content Managers:

1. **Access the Dashboard**:
   - Go to `http://localhost:5173/dashboard/login`
   - Login with admin credentials: `admin` / `admin123`

2. **Manage Blog Posts**:
   - Navigate to "Blog Management" in the sidebar
   - Click "New Blog Post" to create content
   - Fill in title, content, categories, tags
   - Set status to "Published" to make it live
   - Published posts appear on the public blog page

3. **Manage Job Listings**:
   - Navigate to "Job Listings" in the sidebar
   - Click "Add Job Listing" to create new positions
   - Fill in job details, requirements, benefits
   - Set status to "Published" to make it live
   - Published jobs appear on the public jobs page

### For Website Visitors:

1. **Browse Content**:
   - Visit the homepage to see recent jobs and blog posts
   - Click "View All Blog Posts" to see the full blog
   - Click "View All Job Opportunities" to see all jobs
   - Click on individual items to read full details

## 🔧 Development Notes

### File Structure:
```
src/
├── components/           # Public website components
│   ├── BlogList.jsx     # Blog listing page
│   ├── BlogPost.jsx     # Individual blog post page
│   ├── JobsList.jsx     # Jobs listing page
│   ├── RecentBlogs.jsx  # Homepage blog preview
│   └── Jobs.jsx         # Homepage jobs section (updated)
├── dashboard/           # Admin CMS system
│   ├── components/      # Dashboard components
│   ├── contexts/        # Authentication context
│   ├── utils/          # Storage management
│   └── routes/         # Dashboard routing
└── pages/
    └── Home.jsx        # Homepage (updated with blog preview)
```

### Data Storage:
- All data is stored in browser localStorage
- Collections: `cms_blog`, `cms_jobs`, `cms_media`, etc.
- Data persists between browser sessions
- Clear localStorage to reset all data

### Routing:
- `/` - Homepage with recent content previews
- `/blog` - All published blog posts
- `/blog/[slug]` - Individual blog post
- `/jobs` - All published job listings
- `/jobs/[id]` - Detailed job page with apply functionality
- `/dashboard/*` - Admin CMS (requires login)

## 🚀 Ready to Use!

The system is fully functional with:
- ✅ Complete blog management and display
- ✅ Complete job management and display with detailed job pages
- ✅ "Apply Now" functionality with email instructions
- ✅ Homepage previews for both jobs and blogs
- ✅ Admin dashboard for content management
- ✅ User-friendly public pages
- ✅ Responsive design for all devices
- ✅ Fixed horizontal scroll issues
- ✅ Smooth animations that don't cause overflow

Start the development server and begin creating content!