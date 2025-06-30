import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  Briefcase, 
  Heart, 
  Zap, 
  Globe,
  Coffee,
  Laptop,
  Award,
  TrendingUp,
  ExternalLink,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Careers: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = [
    { id: 'all', name: 'All Positions' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'product', name: 'Product' },
    { id: 'design', name: 'Design' },
    { id: 'business', name: 'Business' },
  ];

  const openPositions = [
    {
      id: 'senior-fullstack-developer',
      title: 'Senior Full-Stack Developer',
      department: 'engineering',
      location: 'Frankfurt, Germany',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Join our founding team to build the next generation of healthcare e-signature solutions. Work with modern technologies and help shape our technical architecture.',
      requirements: [
        'Strong experience with React, Node.js, and TypeScript',
        'Experience with healthcare or regulated industries',
        'Knowledge of security best practices and HIPAA compliance',
        'Passion for creating user-friendly applications',
        'Excellent communication skills in English and German'
      ],
      benefits: [
        'Competitive salary with equity package',
        'Flexible working hours and remote options',
        'Health insurance and wellness benefits',
        'Professional development budget',
        'Opportunity to shape the future of healthcare technology'
      ]
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      department: 'product',
      location: 'Frankfurt, Germany',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Lead product strategy and development for our healthcare e-signature platform. Work closely with customers to understand their needs and translate them into product features.',
      requirements: [
        'Experience in product management, preferably in healthcare or B2B SaaS',
        'Strong analytical and problem-solving skills',
        'Understanding of healthcare workflows and compliance requirements',
        'Excellent stakeholder management and communication skills',
        'Data-driven approach to product decisions'
      ],
      benefits: [
        'Competitive salary with performance bonuses',
        'Equity participation in company growth',
        'Flexible work arrangements',
        'Conference and training opportunities',
        'Direct impact on product direction and strategy'
      ]
    },
    {
      id: 'ux-designer',
      title: 'UX/UI Designer',
      department: 'design',
      location: 'Frankfurt, Germany',
      type: 'Full-time',
      experience: '2-3 years',
      description: 'Design intuitive and accessible user experiences for healthcare professionals. Create beautiful, functional interfaces that make complex workflows simple.',
      requirements: [
        'Strong portfolio demonstrating UX/UI design skills',
        'Experience with design tools (Figma, Sketch, Adobe Creative Suite)',
        'Understanding of accessibility and inclusive design principles',
        'Experience designing for healthcare or complex enterprise applications',
        'Ability to conduct user research and usability testing'
      ],
      benefits: [
        'Competitive salary and equity package',
        'Latest design tools and equipment',
        'Flexible working environment',
        'Design conference attendance',
        'Opportunity to define the visual identity of a growing company'
      ]
    }
  ];

  const companyValues = [
    {
      icon: Heart,
      title: 'Healthcare First',
      description: 'We\'re passionate about improving healthcare through technology. Every decision we make considers the impact on patient care and healthcare professionals.'
    },
    {
      icon: Zap,
      title: 'Innovation & Speed',
      description: 'Born from a hackathon, we maintain our startup agility while building enterprise-grade solutions. We move fast and iterate based on user feedback.'
    },
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'We believe the best solutions come from diverse perspectives. Our team works together across disciplines to solve complex healthcare challenges.'
    },
    {
      icon: Award,
      title: 'Excellence & Quality',
      description: 'We set high standards for ourselves and our products. Quality isn\'t just about code - it\'s about user experience, security, and reliability.'
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: 'Remote-First Culture',
      description: 'Work from anywhere with flexible hours that fit your lifestyle'
    },
    {
      icon: TrendingUp,
      title: 'Equity & Growth',
      description: 'Share in our success with meaningful equity and career development'
    },
    {
      icon: Coffee,
      title: 'Work-Life Balance',
      description: 'Unlimited PTO, mental health support, and wellness programs'
    },
    {
      icon: Laptop,
      title: 'Top-Tier Equipment',
      description: 'Latest MacBook Pro, monitors, and any tools you need to excel'
    }
  ];

  const filteredPositions = selectedDepartment === 'all' 
    ? openPositions 
    : openPositions.filter(position => position.department === selectedDepartment);

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
            <Users size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Join Our Mission</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            We're building a team of 3 passionate individuals based on funding in Frankfurt, Germany. 
            Help us transform healthcare documentation and make a real impact on patient care worldwide.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Our Story</h3>
            <p className="text-blue-800 leading-relaxed">
              UnifiSign was born during the <strong>World's Largest Hackathon presented by Bolt</strong>, 
              created by a first-time developer and homemaker using <strong>bolt.new</strong>. What started 
              as an ambitious idea to solve healthcare documentation challenges has evolved into a 
              comprehensive HIPAA-compliant e-signature platform. Now we're looking for founding team 
              members to join us in Frankfurt, Germany as we scale our impact.
            </p>
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Work With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={20} className="text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-gray-600 mb-6">
              Join our founding team in Frankfurt, Germany and help shape the future of healthcare technology.
            </p>
            
            {/* Department Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedDepartment === dept.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredPositions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{position.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Briefcase size={14} />
                            <span className="capitalize">{position.department}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin size={14} />
                            <span>{position.location}</span>
                          </div>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {position.type}
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            {position.experience}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{position.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                        <ul className="space-y-2">
                          {position.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-600">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">What We Offer</h4>
                        <ul className="space-y-2">
                          {position.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-600">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Ready to Apply?</h4>
                      <p className="text-sm text-gray-600 mb-6">
                        Send us your resume and a brief note about why you're excited to join our mission.
                      </p>
                      <div className="space-y-3">
                        <Button className="w-full">
                          <Mail size={16} />
                          Apply Now
                        </Button>
                        <Button variant="outline" className="w-full">
                          <ExternalLink size={16} />
                          Learn More
                        </Button>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          We're an equal opportunity employer committed to diversity and inclusion.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPositions.length === 0 && (
            <div className="text-center py-12">
              <Briefcase size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No positions found</h3>
              <p className="text-gray-600">
                Try selecting a different department or check back soon for new opportunities.
              </p>
            </div>
          )}
        </motion.div>

        {/* Frankfurt Office */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Frankfurt?</h2>
              <p className="text-gray-600 mb-6">
                Frankfurt is Europe's financial capital and a thriving tech hub. We chose Frankfurt 
                as our base to be at the heart of European healthcare innovation while maintaining 
                easy access to global markets.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Global Connectivity</h3>
                    <p className="text-sm text-gray-600">Major international airport and business hub</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Heart size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Quality of Life</h3>
                    <p className="text-sm text-gray-600">Excellent healthcare, education, and cultural scene</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Tech Ecosystem</h3>
                    <p className="text-sm text-gray-600">Growing startup scene and established tech companies</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/161901/frankfurt-am-main-skyscraper-city-161901.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Frankfurt skyline"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-slate-600 rounded-lg p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Don't See the Perfect Role?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            We're always looking for exceptional talent to join our mission. If you're passionate 
            about healthcare technology and want to make a real impact, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <Mail size={20} />
              Send Us Your Resume
            </Button>
            <a 
              href="https://www.linkedin.com/in/veena-binny-16608a30/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <ExternalLink size={20} />
                Connect on LinkedIn
              </Button>
            </a>
          </div>
          <div className="mt-6 text-blue-100 text-sm">
            <p>
              Follow our journey: <a href="https://www.linkedin.com/in/veena-binny-16608a30/" className="underline hover:text-white">
                LinkedIn
              </a> | Email: careers@unifisign.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};