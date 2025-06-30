import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, Settings, LogOut, Home, FileText, DollarSign, Mail, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginModal } from '../auth/LoginModal';
import { VerifyEmailModal } from '../auth/VerifyEmailModal';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isVerifyEmailModalOpen, setIsVerifyEmailModalOpen] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState<string>('');

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: FileText, requireAuth: true },
    { name: 'Pricing', href: '/pricing', icon: DollarSign },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const getRoleDisplayName = (role: number) => {
    const roleNames = { 1: 'Super Admin', 2: 'Admin', 3: 'User', 4: 'Guest' };
    return roleNames[role as keyof typeof roleNames] || 'Unknown';
  };

  const handleShowVerification = (email: string) => {
    setVerificationEmail(email);
    setIsLoginModalOpen(false);
    setIsVerifyEmailModalOpen(true);
  };

  const handleVerificationSuccess = () => {
    setIsVerifyEmailModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-slate-700 rounded-lg flex items-center justify-center shadow-lg">
                <img 
                  src="/UnifiSign_Logo.png" 
                  alt="UnifiSign" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-700 to-blue-600 bg-clip-text text-transparent">
                UnifiSign
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                if (item.requireAuth && !user) return null;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-1 text-slate-600 hover:text-blue-600 transition-colors font-medium"
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Menu / Login Button */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-slate-600 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{user.name}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                      <p className="text-xs text-blue-600 mt-1">{getRoleDisplayName(user.role)}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center px-3 py-2 text-sm text-slate-700 hover:bg-gray-100"
                      >
                        <FileText size={16} className="mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-3 py-2 text-sm text-slate-700 hover:bg-gray-100"
                      >
                        <Settings size={16} className="mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-slate-600 text-white rounded-lg hover:from-blue-700 hover:to-slate-700 transition-all duration-200 font-medium shadow-sm"
                >
                  Login
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 py-2 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              if (item.requireAuth && !user) return null;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-2 p-2 rounded-lg text-slate-600 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onShowVerification={handleShowVerification}
      />

      <VerifyEmailModal
        isOpen={isVerifyEmailModalOpen}
        onClose={() => setIsVerifyEmailModalOpen(false)}
        email={verificationEmail}
        selectedPlan="free"
        onSuccess={handleVerificationSuccess}
      />
    </>
  );
};