// redeploy trigger

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, ProtectedRoute } from '../components/auth';
import { DashboardLayout } from '../components/layout';
import {
  ServicesManager,
  TestimonialsManager,
  JobsManager,
  TeamManager,
  StatsManager,
  CompanyManager,
  MediaManager,
  BlogManager,
  AnalyticsManager,
  ExportImportManager,
} from '../components/content';

// Overview dashboard component with real data
const OverviewDashboard = () => {
  const [stats, setStats] = React.useState({
    services: 0,
    jobs: 0,
    team: 0,
    testimonials: 0,
    blogs: 0
  });

  React.useEffect(() => {
    const loadStats = () => {
      try {
        // Load data from localStorage
        const services = JSON.parse(localStorage.getItem('cms_collection_services') || '[]');
        const jobs = JSON.parse(localStorage.getItem('cms_collection_jobs') || '[]');
        const team = JSON.parse(localStorage.getItem('cms_collection_team') || '[]');
        const testimonials = JSON.parse(localStorage.getItem('cms_collection_testimonials') || '[]');
        const blogs = JSON.parse(localStorage.getItem('cms_collection_blog') || '[]');

        // Count active items (published status)
        const activeJobs = jobs.filter((job: any) => job.status === 'published').length;
        const activeServices = services.filter((service: any) => service.status === 'published').length;
        const activeTestimonials = testimonials.filter((testimonial: any) => testimonial.status === 'published').length;
        const activeTeam = team.filter((member: any) => member.status === 'published').length;
        const activeBlogs = blogs.filter((blog: any) => blog.status === 'published').length;

        setStats({
          services: activeServices,
          jobs: activeJobs,
          team: activeTeam,
          testimonials: activeTestimonials,
          blogs: activeBlogs
        });
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      }
    };

    loadStats();
    
    // Listen for storage changes to update stats in real-time
    const handleStorageChange = () => {
      loadStats();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events when data is updated within the same tab
    window.addEventListener('cms-data-updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cms-data-updated', handleStorageChange);
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Active Services</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.services}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Active Jobs</h3>
          <p className="text-3xl font-bold text-green-600">{stats.jobs}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Team Members</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.team}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Testimonials</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.testimonials}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Blog Posts</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.blogs}</p>
        </div>
      </div>
    </div>
  );
};

export const DashboardRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected dashboard routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Routes>
                <Route index element={<OverviewDashboard />} />
                <Route path="services" element={<ServicesManager />} />
                <Route path="testimonials" element={<TestimonialsManager />} />
                <Route path="jobs" element={<JobsManager />} />
                <Route path="team" element={<TeamManager />} />
                <Route path="stats" element={<StatsManager />} />
                <Route path="company" element={<CompanyManager />} />
                <Route path="media" element={<MediaManager />} />
                <Route path="blog" element={<BlogManager />} />
                <Route path="analytics" element={<AnalyticsManager />} />
                <Route path="export-import" element={<ExportImportManager />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default DashboardRoutes;
