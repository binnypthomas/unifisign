import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingLogin } from './components/layout/FloatingLogin';
import { CookieBanner } from './components/layout/CookieBanner';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { DataProtection } from './pages/DataProtection';
import { TermsConditions } from './pages/TermsConditions';
import { SignLink } from './pages/SignLink';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';
import { CookiePolicy } from './pages/CookiePolicy';
import { ApiDocs } from './pages/ApiDocs';
import { Templates } from './pages/Templates';
import { Help } from './pages/Help';
import { Docs } from './pages/Docs';
import { Blog } from './pages/Blog';
import { Careers } from './pages/Careers';
import { Press } from './pages/Press';
import { About } from './pages/About';
import { useCSRFToken } from './hooks/useCSRFToken';

function App() {
  const csrfReady = useCSRFToken();
  if (!csrfReady) return null; // or loading spinner
  
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/data-protection" element={<DataProtection />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/signlink/:token" element={<SignLink />} />
              <Route path="/subscribe/checkout/:packageId" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/help" element={<Help />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/press" element={<Press />} />
              <Route path="/about" element={<About />} />
              {/* Catch-all route for 404 pages */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <FloatingLogin />
          <CookieBanner />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#374151',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              },
            }}
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;