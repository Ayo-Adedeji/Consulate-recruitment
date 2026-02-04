// Route configuration for dashboard pages
import { NavigationItem } from '../types';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  FileText, 
  MessageSquare, 
  Briefcase, 
  BarChart3, 
  Building, 
  Image, 
  BookOpen, 
  Download 
} from 'lucide-react';

export const dashboardRoutes: NavigationItem[] = [
  {
    key: 'overview',
    label: 'Overview',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    key: 'services',
    label: 'Services',
    icon: Settings,
    path: '/dashboard/services',
    permission: 'write',
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    icon: MessageSquare,
    path: '/dashboard/testimonials',
    permission: 'write',
  },
  {
    key: 'jobs',
    label: 'Job Listings',
    icon: Briefcase,
    path: '/dashboard/jobs',
    permission: 'write',
  },
  {
    key: 'team',
    label: 'Team',
    icon: Users,
    path: '/dashboard/team',
    permission: 'write',
  },
  {
    key: 'stats',
    label: 'Statistics',
    icon: BarChart3,
    path: '/dashboard/stats',
    permission: 'write',
  },
  {
    key: 'company',
    label: 'Company Info',
    icon: Building,
    path: '/dashboard/company',
    permission: 'write',
  },
  {
    key: 'media',
    label: 'Media Library',
    icon: Image,
    path: '/dashboard/media',
    permission: 'write',
  },
  {
    key: 'blog',
    label: 'Blog',
    icon: BookOpen,
    path: '/dashboard/blog',
    permission: 'write',
  },
  {
    key: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    path: '/dashboard/analytics',
  },
  {
    key: 'export-import',
    label: 'Export/Import',
    icon: Download,
    path: '/dashboard/export-import',
    permission: 'export',
  },
];

export const publicRoutes = [
  '/dashboard/login',
];

export const protectedRoutes = [
  '/dashboard',
  '/dashboard/*',
];