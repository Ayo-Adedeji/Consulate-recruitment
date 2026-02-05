import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import AboutPage from "./components/AboutPage";
import ConsultationsPage from "./components/ConsultationsPage";

function App() {
  return (
    <Router>
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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/consultations" element={<ConsultationsPage />} />
        
        {/* Dashboard routes */}
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
}

export default App
