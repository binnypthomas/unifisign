import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileSignature, Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Templates', href: '/templates' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Data Protection', href: '/data-protection' },
      { name: 'Terms & Conditions', href: '/terms-conditions' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Help Center', href: '/help' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api-docs' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press Kit', href: '/press' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/veena-binny-16608a30/', icon: Linkedin },
    { name: 'Facebook', href: '#', icon: Facebook },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/" className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-slate-600 rounded-lg flex items-center justify-center shadow-lg">
                  <FileSignature size={24} className="text-white" />
                </div>
                <span className="text-xl font-bold">UnifiSign</span>
              </Link>
              
              <p className="text-slate-300 mb-6 max-w-md">
                Secure, compliant, and user-friendly e-signature platform designed 
                specifically for healthcare professionals. Streamline your document 
                workflows with confidence.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>support@unifisign.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>+49 151 701 33 555</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>UnifiSign, Frankfurt, Germany</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-slate-400 text-sm">
              <p>© {currentYear} UnifiSign. All rights reserved.</p>
              <p className="mt-1">
                HIPAA Compliant • SOC 2 Type II Certified • ISO 27001 Certified
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-slate-400 hover:text-white transition-colors"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};