import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileSignature, 
  Users, 
  Shield, 
  Award, 
  Zap, 
  Heart, 
  Globe,
  ExternalLink,
  CheckCircle,
  Calendar,
  MapPin,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Veena Binny',
      role: 'Founder & CEO',
      bio: 'First-time developer who created UnifiSign during the World\'s Largest Hackathon presented by Bolt. Passionate about improving healthcare documentation through technology.',
      image: '/veena.jpeg',
      linkedin: 'https://www.linkedin.com/in/veena-binny-16608a30/',
    },
  ];

  const milestones = [
    {
      date: 'January 2024',
      title: 'Hackathon Participation',
      description: 'UnifiSign was born during the World\'s Largest Hackathon presented by Bolt',
    },
    {
      date: 'February 2024',
      title: 'First Prototype',
      description: 'Developed initial prototype using bolt.new as a first-time developer',
    },
    {
      date: 'March 2024',
      title: 'Beta Launch',
      description: 'Released beta version to select healthcare providers for testing',
    },
    {
      date: 'April 2024',
      title: 'Official Launch',
      description: 'Publicly launched UnifiSign with free and premium plans',
    },
    {
      date: 'May 2024',
      title: 'First Enterprise Client',
      description: 'Onboarded our first enterprise healthcare organization',
    },
    {
      date: 'June 2024',
      title: 'Funding Round',
      description: 'Secured initial funding to expand team and operations',
    },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize the security and privacy of healthcare data above all else, implementing bank-level encryption and HIPAA-compliant systems.',
    },
    {
      icon: Users,
      title: 'User-Centered Design',
      description: 'We design our platform with healthcare professionals in mind, focusing on intuitive interfaces and efficient workflows.',
    },
    {
      icon: Heart,
      title: 'Healthcare Impact',
      description: 'We\'re committed to improving healthcare delivery by reducing administrative burden and streamlining documentation.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously innovate to bring cutting-edge solutions to healthcare documentation challenges.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-6">
            <FileSignature size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">About UnifiSign</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Transforming healthcare documentation with secure, compliant, and user-friendly e-signature solutions.
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  UnifiSign was born during the <strong>World's Largest Hackathon presented by Bolt</strong>, created by a first-time developer and homemaker using <strong>bolt.new</strong>. What started as an ambitious idea to solve healthcare documentation challenges has evolved into a comprehensive HIPAA-compliant e-signature platform.
                </p>
                <p className="text-gray-600">
                  Our founder, with no prior coding experience, was able to build a sophisticated healthcare solution using bolt.new's AI-powered development environment, demonstrating how innovative tools are democratizing software development and enabling non-traditional developers to solve real-world problems.
                </p>
                <p className="text-gray-600">
                  Today, we're building a team of 3 based in Frankfurt, Germany, focused on transforming healthcare documentation by providing secure, compliant, and user-friendly e-signature solutions specifically designed for healthcare professionals.
                </p>
              </div>
              <div className="mt-6">
                <a 
                  href="https://www.linkedin.com/in/veena-binny-16608a30/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  <span>Connect with our founder</span>
                  <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="UnifiSign Team"
                className="w-full h-auto rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="bg-blue-600 bg-opacity-90 rounded-lg p-4">
                  <h3 className="font-bold text-lg">From Hackathon to Healthcare Revolution</h3>
                  <p className="text-sm text-blue-100">
                    Created with bolt.new by a first-time developer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <div className="bg-gradient-to-br from-blue-600 to-slate-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-blue-100 mb-6">
              To transform healthcare documentation by providing secure, compliant, and user-friendly e-signature solutions that reduce administrative burden and improve patient care.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} className="text-blue-300" />
                <span>Streamline healthcare workflows</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} className="text-blue-300" />
                <span>Ensure HIPAA compliance and data security</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} className="text-blue-300" />
                <span>Reduce paperwork and administrative overhead</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} className="text-blue-300" />
                <span>Improve patient experience and satisfaction</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-600 to-blue-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-teal-100 mb-6">
              To become the leading e-signature platform for healthcare, known for our security, compliance, and user-friendly design, while demonstrating that innovative technology can come from non-traditional developers.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} className="text-teal-300" />
                <span>Paperless healthcare documentation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} className="text-teal-300" />
                <span>Seamless integration with healthcare systems</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} className="text-teal-300" />
                <span>Global adoption across healthcare providers</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} className="text-teal-300" />
                <span>Democratized software development</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Our Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="h-64 relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <span>Connect on LinkedIn</span>
                    <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users size={24} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Join Our Team</h3>
              <p className="text-gray-600 mb-6">
                We're building a team of 3 passionate individuals in Frankfurt, Germany. 
                Help us transform healthcare documentation.
              </p>
              <Link to="/careers">
                <Button>
                  View Open Positions
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Globe size={24} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Global Impact</h3>
              <p className="text-gray-600 mb-6">
                Our mission extends beyond borders. We're committed to improving healthcare 
                documentation worldwide.
              </p>
              <Link to="/contact">
                <Button variant="outline">
                  Partner With Us
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Our Journey */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1, duration: 0.6 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{milestone.title}</h3>
                    <p className="text-blue-600 font-medium mb-2">{milestone.date}</p>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                  
                  {/* Circle */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center z-10">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  
                  {/* Empty space for the other side */}
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Location</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/161901/frankfurt-am-main-skyscraper-city-161901.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Frankfurt, Germany"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Frankfurt, Germany</h3>
              <p className="text-gray-600 mb-6">
                We're proud to be based in Frankfurt, one of Europe's most dynamic cities and a hub for 
                innovation, finance, and healthcare. Our location in the heart of Europe allows us to 
                serve clients across the continent while maintaining a global perspective.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">123 Healthcare Blvd</p>
                    <p className="text-sm text-gray-600">Frankfurt, Germany</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">contact@unifisign.com</p>
                    <p className="text-sm text-gray-600">Email us anytime</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Founded in 2024</p>
                    <p className="text-sm text-gray-600">During the World's Largest Hackathon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-slate-600 rounded-lg p-8 text-white text-center mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Recognition & Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} className="text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Hackathon Finalist</h3>
              <p className="text-blue-100">
                Recognized in the World's Largest Hackathon presented by Bolt
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">HIPAA Compliant</h3>
              <p className="text-blue-100">
                Certified secure and compliant for healthcare data
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={24} className="text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Innovation Award</h3>
              <p className="text-blue-100">
                Recognized for healthcare technology innovation
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a healthcare provider looking to streamline your documentation, 
            a developer interested in joining our team, or a potential partner, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg">
                Contact Us
              </Button>
            </Link>
            <Link to="/careers">
              <Button variant="outline" size="lg">
                Join Our Team
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};