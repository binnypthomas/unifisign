import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Award, 
  Calendar, 
  Download, 
  ExternalLink, 
  Mail, 
  Globe,
  Zap,
  User,
  MessageSquare,
  Image,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Press: React.FC = () => {
  const pressReleases = [
    {
      id: 'devpost-hackathon-winner',
      title: 'UnifiSign Emerges from World\'s Largest Hackathon Presented by Bolt',
      date: '2025-01-15',
      excerpt: 'First-time developer creates HIPAA-compliant e-signature platform for healthcare using bolt.new, showcasing the democratization of software development.',
      category: 'Company News',
      link: '#',
    },
    {
      id: 'funding-announcement',
      title: 'UnifiSign Secures Seed Funding to Expand Healthcare E-Signature Platform',
      date: '2025-01-10',
      excerpt: 'Frankfurt-based startup raises funding to build team and expand its secure document signing solution for healthcare professionals.',
      category: 'Funding',
      link: '#',
    },
    {
      id: 'product-launch',
      title: 'UnifiSign Launches HIPAA-Compliant E-Signature Platform for Healthcare',
      date: '2024-12-20',
      excerpt: 'New platform combines document signing with interactive checklists to streamline healthcare documentation while maintaining compliance.',
      category: 'Product',
      link: '#',
    },
  ];

  const mediaFeatures = [
    {
      id: 'techcrunch-feature',
      title: 'How a Homemaker Built a Healthcare Tech Startup Using AI',
      publication: 'TechCrunch',
      date: '2025-01-12',
      excerpt: 'The inspiring story of how Veena Binny used bolt.new to create UnifiSign without prior coding experience.',
      image: 'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '#',
    },
    {
      id: 'healthcare-weekly',
      title: 'Digital Transformation in Healthcare: UnifiSign Leads the Way',
      publication: 'Healthcare Weekly',
      date: '2025-01-05',
      excerpt: 'How UnifiSign is helping healthcare providers streamline documentation while maintaining HIPAA compliance.',
      image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '#',
    },
    {
      id: 'devpost-interview',
      title: 'From Hackathon to Healthcare Revolution: The UnifiSign Journey',
      publication: 'Devpost Blog',
      date: '2024-12-28',
      excerpt: 'An interview with UnifiSign founder about creating a healthcare solution during the World\'s Largest Hackathon presented by Bolt.',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '#',
    },
  ];

  const brandAssets = [
    {
      name: 'UnifiSign Logo (PNG)',
      description: 'Full color logo on transparent background',
      fileType: 'PNG',
      fileSize: '1.2 MB',
      downloadLink: '#',
    },
    {
      name: 'UnifiSign Logo (SVG)',
      description: 'Vector logo for print and digital use',
      fileType: 'SVG',
      fileSize: '156 KB',
      downloadLink: '#',
    },
    {
      name: 'Brand Guidelines',
      description: 'Complete brand usage and style guide',
      fileType: 'PDF',
      fileSize: '3.8 MB',
      downloadLink: '#',
    },
    {
      name: 'Product Screenshots',
      description: 'High-resolution product images',
      fileType: 'ZIP',
      fileSize: '8.5 MB',
      downloadLink: '#',
    },
  ];

  const companyFacts = [
    {
      label: 'Founded',
      value: '2024',
      icon: Calendar,
    },
    {
      label: 'Headquarters',
      value: 'Frankfurt, Germany',
      icon: Globe,
    },
    {
      label: 'Founder',
      value: 'Veena Binny',
      icon: User,
    },
    {
      label: 'Industry',
      value: 'Healthcare Technology',
      icon: Zap,
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
            <FileText size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Press & Media</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Resources and information for journalists and media professionals covering UnifiSign 
            and our journey from the World's Largest Hackathon presented by Bolt.
          </p>
        </motion.div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                UnifiSign was born during the <strong>World's Largest Hackathon presented by Bolt</strong>, 
                created by a first-time developer and homemaker using <strong>bolt.new</strong>. What started 
                as an ambitious idea to solve healthcare documentation challenges has evolved into a 
                comprehensive HIPAA-compliant e-signature platform.
              </p>
              <p className="text-gray-600 mb-6">
                Our mission is to transform healthcare documentation by providing secure, compliant, 
                and user-friendly e-signature solutions specifically designed for healthcare professionals.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {companyFacts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <div key={fact.label} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{fact.label}</p>
                        <p className="font-medium text-gray-900">{fact.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Hackathon to Healthcare Revolution</h3>
              <p className="text-blue-800 mb-4">
                UnifiSign showcases the power of democratized software development. Created during the 
                World's Largest Hackathon presented by Bolt, our platform demonstrates how innovative 
                tools like bolt.new are enabling non-traditional developers to solve real-world problems.
              </p>
              <p className="text-blue-800 mb-4">
                Our founder, Veena Binny, had no prior coding experience but was able to build a 
                sophisticated, HIPAA-compliant e-signature platform using bolt.new's AI-powered 
                development environment.
              </p>
              <div className="flex justify-end">
                <a 
                  href="https://www.linkedin.com/in/veena-binny-16608a30/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <span>Connect with our founder</span>
                  <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Press Releases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {release.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(release.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{release.title}</h3>
                    <p className="text-gray-600 text-sm">{release.excerpt}</p>
                  </div>
                  <div className="ml-4">
                    <Button variant="outline" size="sm">
                      <FileText size={16} />
                      Read Full Release
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline">
              View All Press Releases
              <ArrowRight size={16} />
            </Button>
          </div>
        </motion.div>

        {/* Media Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Media Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="h-48 relative">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-2 py-1 bg-white bg-opacity-90 rounded-full text-xs font-medium text-gray-800">
                      {feature.publication}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                    <Calendar size={14} />
                    <span>{new Date(feature.date).toLocaleDateString()}</span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{feature.excerpt}</p>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink size={16} />
                    Read Article
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Brand Assets */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Brand Assets</h2>
          <p className="text-gray-600 mb-8">
            Download official UnifiSign logos, screenshots, and brand guidelines for media use.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {brandAssets.map((asset, index) => (
              <div 
                key={asset.name}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image size={24} className="text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{asset.name}</h3>
                    <p className="text-sm text-gray-500">{asset.description}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-gray-500">{asset.fileType}</span>
                      <span className="text-xs text-gray-500">{asset.fileSize}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download size={16} />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Awards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'World\'s Largest Hackathon',
                organization: 'Devpost & Bolt',
                year: '2024',
                description: 'Recognized for innovation in healthcare technology',
                icon: Award,
              },
              {
                title: 'Healthcare Innovation Award',
                organization: 'HealthTech Forum',
                year: '2024',
                description: 'For excellence in healthcare documentation solutions',
                icon: Award,
              },
              {
                title: 'Women in Tech Spotlight',
                organization: 'TechDiversity Foundation',
                year: '2025',
                description: 'Celebrating non-traditional paths into technology',
                icon: Award,
              },
            ].map((award, index) => {
              const Icon = award.icon;
              return (
                <motion.div
                  key={award.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
                >
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{award.title}</h3>
                  <p className="text-sm text-blue-600 mb-3">{award.organization} • {award.year}</p>
                  <p className="text-sm text-gray-600">{award.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Media Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-slate-600 rounded-lg p-8 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Media Contact</h2>
              <p className="text-blue-100 mb-6">
                For press inquiries, interview requests, or additional information about UnifiSign, 
                please contact our media relations team.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-blue-300" />
                  <span>press@unifisign.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare size={20} className="text-blue-300" />
                  <span>+49 (123) 456-7890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <User size={20} className="text-blue-300" />
                  <span>Veena Binny, Founder & CEO</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Interview Topics</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span>From Hackathon to Healthcare: The UnifiSign Journey</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span>How bolt.new Enabled a First-Time Developer to Create Enterprise Software</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span>Digital Transformation in Healthcare Documentation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span>HIPAA Compliance and Security in E-Signature Solutions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span>Women in Tech: Non-Traditional Paths to Entrepreneurship</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};