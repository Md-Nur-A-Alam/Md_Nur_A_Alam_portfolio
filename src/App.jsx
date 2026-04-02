import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import CustomCursor from './components/cursor/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import ProtectedRoute from './admin/ProtectedRoute';

import AdminDashboard from './admin/AdminDashboard';
import ManageProjects from './admin/sections/ManageProjects';
import ManageSkills from './admin/sections/ManageSkills';
import ManageSettings from './admin/sections/ManageSettings';
import ManageMessages from './admin/sections/ManageMessages';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <DataProvider>
          <BrowserRouter>
            <CustomCursor />
            <ScrollProgress />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-base)',
                  border: '1px solid var(--border)',
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 13,
                },
              }}
            />
            <Routes>
              <Route path="/" element={<><Navbar /><Home /></>} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="projects" element={<ManageProjects />} />
                <Route path="experience" element={<AdminDashboard />} />
                <Route path="skills" element={<ManageSkills />} />
                <Route path="publications" element={<AdminDashboard />} />
                <Route path="settings" element={<ManageSettings />} />
                <Route path="messages" element={<ManageMessages />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
