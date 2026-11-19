import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import PublicLayout from './components/PublicLayout';

import Home from './pages/Home';
import About from './pages/About';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfTrade from './pages/TermsOfTrade';
import NotFound from './pages/NotFound';

import { AuthProvider } from './context/AuthContext';
import { MessagesProvider } from './context/MessagesContext';
import { ToastProvider } from './context/ToastContext';

import ProtectedRoute from './admin/ProtectedRoute';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminMessages from './admin/AdminMessages';
import AdminData from './admin/AdminData';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <MessagesProvider>
            <ScrollToTop />
            <Routes>
              {/* Public site */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-trade" element={<TermsOfTrade />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Admin */}
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
                <Route path="messages" element={<AdminMessages />} />
                <Route path="data" element={<AdminData />} />
              </Route>
            </Routes>
          </MessagesProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
