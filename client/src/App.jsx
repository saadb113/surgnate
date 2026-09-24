import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import PublicLayout from './components/PublicLayout';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfTrade from './pages/TermsOfTrade';
import NotFound from './pages/NotFound';

import { AuthProvider } from './context/AuthContext';
import { ProductsProvider } from './context/ProductsContext';
import { MessagesProvider } from './context/MessagesContext';
import { ToastProvider } from './context/ToastContext';

import ProtectedRoute from './admin/ProtectedRoute';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminProductForm from './admin/AdminProductForm';
import AdminMessages from './admin/AdminMessages';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <ProductsProvider>
            <MessagesProvider>
              <ScrollToTop />
              <Routes>
                {/* Public site */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:slug" element={<ProductDetail />} />
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
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="products/new" element={<AdminProductForm />} />
                  <Route path="products/:id/edit" element={<AdminProductForm />} />
                  <Route path="messages" element={<AdminMessages />} />
                </Route>
              </Routes>
            </MessagesProvider>
          </ProductsProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
