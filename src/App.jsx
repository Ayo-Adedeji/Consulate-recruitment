import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, createContext, useContext, useRef } from 'react';
import Home from "./pages/Home";
import DashboardRoutes from "./dashboard/routes/DashboardRoutes";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import JobsList from "./components/JobsList";
import JobDetail from "./components/JobDetail";
import TermsConditions from "./components/TermsConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Timesheet from "./components/Timesheet";
import Contact from "./components/Contact";
import Candidates from "./components/Candidates";
import ClientsPage from "./components/ClientsPage";
import ClientSupportPage from "./components/ClientSupportPage";
import PermanentRecruitmentPage from "./components/PermanentRecruitmentPage";
import TemporaryRecruitmentPage from "./components/TemporaryRecruitmentPage";
import CleaningServicesPage from "./components/CleaningServicesPage";
import AboutPage from "./components/AboutPage";
import ConsultationsPage from "./components/ConsultationsPage";
import BooksPage from "./components/BooksPage";
import PageLoader from "./components/PageLoader";

// Create a context for loading state
const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    return { setLoading: () => {} };
  }
  return context;
};

function AppContent() {
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const loadingTimeoutRef = useRef(null);
  const location = useLocation();

  // Skip loader on initial app load
  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    // Don't show loader on initial load
    if (isInitialLoad) return;
    
    // Only hide loader if it's currently showing
    if (loading) {
      // Clear any existing timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      
      // Keep loader visible for minimum duration
      loadingTimeoutRef.current = setTimeout(() => {
        setLoading(false);
        loadingTimeoutRef.current = null;
      }, 600);
    }

    // Scroll to top on route change
    window.scrollTo(0, 0);

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [location.pathname, isInitialLoad, loading]);

  // Intercept all link clicks to show loader immediately
  useEffect(() => {
    const handleClick = (e) => {
      // Skip if initial load
      if (isInitialLoad) return;
      
      const link = e.target.closest('a');
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        const targetPath = new URL(link.href).pathname;
        if (targetPath !== location.pathname && !loading) {
          setLoading(true);
        }
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [location.pathname, isInitialLoad, loading]);

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {loading && <PageLoader />}
      <Routes>
        {/* Main website routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/jobs" element={<JobsList />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/timesheets" element={<Timesheet />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/client-support" element={<ClientSupportPage />} />
        <Route path="/permanent-recruitment" element={<PermanentRecruitmentPage />} />
        <Route path="/temporary-recruitment" element={<TemporaryRecruitmentPage />} />
        <Route path="/cleaning-services" element={<CleaningServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/consultations" element={<ConsultationsPage />} />
        <Route path="/books" element={<BooksPage />} />
        
        {/* Dashboard routes */}
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    </LoadingContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
