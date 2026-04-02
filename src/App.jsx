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
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
