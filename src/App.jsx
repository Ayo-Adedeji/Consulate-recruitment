import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import DashboardRoutes from "./dashboard/routes/DashboardRoutes";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import JobsList from "./components/JobsList";
import JobDetail from "./components/JobDetail";

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
        
        {/* Dashboard routes */}
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
}

export default App
