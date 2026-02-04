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

// Overview dashboard component (placeholder)
const OverviewDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Total Services</h3>
        <p className="text-3xl font-bold text-blue-600">12</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Active Jobs</h3>
        <p className="text-3xl font-bold text-green-600">8</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Team Members</h3>
        <p className="text-3xl font-bold text-purple-600">15</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Testimonials</h3>
        <p className="text-3xl font-bold text-orange-600">24</p>
      </div>
    </div>
  </div>
);

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
