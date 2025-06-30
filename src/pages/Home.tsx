import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileSignature, Shield, Zap, Users, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';

const FeatureCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}> = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
  >
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      <Icon size={24} className="text-blue-600" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const TestimonialCard: React.FC<{
  name: string;
  role: string;
  content: string;
  delay: number;
}> = ({ name, role, content, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
  >
    <div className="flex items-center mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className="text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-600 mb-4 italic">"{content}"</p>
    <div>
      <p className="font-semibold text-gray-900">{name}</p>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </motion.div>
);

export const Home: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your documents are protected with enterprise-grade encryption and secure authentication.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Send, sign, and manage documents in minutes, not days. Streamline your workflow.',
    },
    {
      icon: Users,
      title: 'Multi-Role Support',
      description: 'Flexible role-based access for teams, with granular permissions and controls.',
    },
    {
      icon: CheckCircle,
      title: 'Healthcare Compliant',
      description: 'Built specifically for healthcare with HIPAA compliance and medical form templates.',
    },
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      content: 'UnifiSign has transformed how we handle patient consent forms. The process is now seamless and secure.',
    },
    {
      name: 'Michael Chen',
      role: 'Practice Manager',
      content: 'The role-based access and healthcare templates save us hours every week. Highly recommended!',
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Compliance Officer',
      content: 'Security and compliance are our top priorities. UnifiSign delivers on both fronts exceptionally.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Secure E-Signatures for
                <span className="text-blue-600"> Healthcare</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Streamline your document workflows with UnifiSign's secure, compliant, and 
                user-friendly e-signature platform designed specifically for healthcare professionals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/pricing">
                  <Button size="lg" className="group">
                    Get Started Free
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-16"
            >
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
                  <div className="flex items-center justify-center mb-6">
                    <FileSignature size={48} className="text-blue-600" />
                  </div>
                  <div className="grid grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
                      <div className="text-gray-600">Documents Signed</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
                      <div className="text-gray-600">Healthcare Providers</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
                      <div className="text-gray-600">Uptime Guarantee</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose UnifiSign?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built with healthcare professionals in mind, delivering security, compliance, and efficiency.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Simple 3-Step Process
              </h2>
              <p className="text-xl text-gray-600">
                Get your documents signed in minutes, not days
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Upload Document',
                description: 'Upload your consent form, checklist, or any PDF document to our secure platform.',
              },
              {
                step: '2',
                title: 'Send for Signature',
                description: 'Generate a secure signing link and send it to your patients or clients.',
              },
              {
                step: '3',
                title: 'Track & Store',
                description: 'Monitor signing status and securely store completed documents in your dashboard.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.2, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trusted by Healthcare Professionals
              </h2>
              <p className="text-xl text-gray-600">
                See what our customers have to say about UnifiSign
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                {...testimonial}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Document Workflow?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of healthcare professionals who trust UnifiSign for their e-signature needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing">
                <Button size="lg" variant="secondary">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};