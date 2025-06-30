import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PenTool, 
  Calendar, 
  User, 
  ArrowRight, 
  Tag,
  Search,
  ExternalLink,
  Heart,
  Zap,
  Trophy,
  Lightbulb,
  Mail
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'company', name: 'Company News' },
    { id: 'product', name: 'Product Updates' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'technology', name: 'Technology' },
    { id: 'success', name: 'Success Stories' },
  ];

  const featuredPost = {
    id: 'devpost-hackathon-story',
    title: 'From Hackathon to Healthcare Revolution: The UnifiSign Story',
    excerpt: 'How a first-time developer and homemaker created a HIPAA-compliant e-signature platform during the World\'s Largest Hackathon presented by Bolt, using bolt.new to transform healthcare documentation.',
    content: `
      The story of UnifiSign begins not in a corporate boardroom or a Silicon Valley garage, but in the home of a first-time developer during the World's Largest Hackathon presented by Bolt. What started as an ambitious idea to solve real healthcare problems has evolved into a comprehensive e-signature platform that's changing how healthcare professionals handle documentation.

      ## The Inspiration

      As a homemaker with no prior development experience, I witnessed firsthand the frustrations healthcare professionals face with traditional paper-based documentation. Endless forms, lost signatures, compliance headaches, and the constant struggle to maintain HIPAA compliance while serving patients efficiently. The healthcare industry was crying out for a digital solution that understood its unique challenges.

      ## The Hackathon Experience

      When the World's Largest Hackathon presented by Bolt was announced, I saw an opportunity to turn this vision into reality. Despite having no formal coding background, I was determined to create something meaningful. The hackathon provided the perfect environment - a community of innovators, access to cutting-edge tools, and the motivation to build something impactful in a short timeframe.

      ## Discovering bolt.new

      The game-changer was discovering bolt.new, Bolt's revolutionary development platform. As a first-time developer, I was initially overwhelmed by the complexity of modern web development. But bolt.new changed everything. Its AI-powered development environment allowed me to:

      - Build complex applications without deep technical expertise
      - Focus on solving problems rather than wrestling with code
      - Iterate quickly and see results in real-time
      - Access professional-grade development tools instantly

      ## Building UnifiSign

      Using bolt.new, I was able to create UnifiSign from the ground up during the hackathon. The platform's intelligent assistance helped me navigate complex challenges like:

      - HIPAA compliance requirements
      - Secure document handling
      - User authentication and authorization
      - Real-time collaboration features
      - Mobile-responsive design

      What would have taken months with traditional development approaches was accomplished in days, thanks to bolt.new's powerful capabilities.

      ## The Healthcare Focus

      UnifiSign was designed specifically for healthcare from day one. Every feature was built with healthcare professionals in mind:

      - **HIPAA Compliance**: Built-in security measures and audit trails
      - **Template System**: Reusable forms for common healthcare workflows
      - **Digital Signatures**: Legally binding e-signatures with full audit trails
      - **Patient Privacy**: Advanced encryption and access controls
      - **Integration Ready**: API-first design for EMR integration

      ## From Hackathon to Reality

      What started as a hackathon project has grown into a full-featured platform serving healthcare organizations. The success at the World's Largest Hackathon presented by Bolt validated the concept and provided the momentum to continue development.

      ## The Power of No-Code/Low-Code

      UnifiSign's story demonstrates the democratizing power of modern development tools. bolt.new enabled someone with no traditional coding background to create a sophisticated, enterprise-grade application. This represents a fundamental shift in who can build technology solutions.

      ## Looking Forward

      Today, UnifiSign continues to evolve, serving healthcare professionals worldwide. We're building a team of 3 based on funding opportunities in Frankfurt, Germany, and expanding our capabilities to serve even more healthcare use cases.

      The journey from homemaker to healthcare tech entrepreneur, powered by bolt.new and the World's Largest Hackathon presented by Bolt, proves that great ideas can come from anywhere and anyone can build the future.

      ## Join Our Mission

      We're always looking for passionate individuals to join our mission of transforming healthcare documentation. Whether you're a developer, healthcare professional, or someone who believes in the power of technology to improve lives, there's a place for you in the UnifiSign story.

      Connect with us on [LinkedIn](https://www.linkedin.com/in/veena-binny-16608a30/) to learn more about our journey and opportunities to get involved.
    `,
    author: 'Veena Binny',
    date: '2025-01-15',
    category: 'company',
    tags: ['Hackathon', 'bolt.new', 'Healthcare', 'Innovation'],
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
  };

  const blogPosts = [
    {
      id: 'hipaa-compliance-guide',
      title: 'Complete Guide to HIPAA Compliance in Digital Healthcare',
      excerpt: 'Everything healthcare organizations need to know about maintaining HIPAA compliance when implementing digital signature solutions.',
      author: 'UnifiSign Team',
      date: '2025-01-10',
      category: 'healthcare',
      tags: ['HIPAA', 'Compliance', 'Security'],
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 'digital-transformation-healthcare',
      title: 'Digital Transformation in Healthcare: Beyond the Buzzwords',
      excerpt: 'How healthcare organizations can successfully implement digital solutions while maintaining patient care quality and regulatory compliance.',
      author: 'Dr. Sarah Johnson',
      date: '2025-01-08',
      category: 'healthcare',
      tags: ['Digital Transformation', 'Healthcare Technology'],
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 'api-integration-best-practices',
      title: 'API Integration Best Practices for Healthcare Applications',
      excerpt: 'Technical guide for developers integrating UnifiSign with existing healthcare systems and EMR platforms.',
      author: 'Tech Team',
      date: '2025-01-05',
      category: 'technology',
      tags: ['API', 'Integration', 'Development'],
      readTime: '15 min read',
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 'patient-experience-digital-forms',
      title: 'Improving Patient Experience with Digital Forms',
      excerpt: 'How digital forms and e-signatures can reduce wait times and improve patient satisfaction in healthcare settings.',
      author: 'Patient Experience Team',
      date: '2025-01-03',
      category: 'healthcare',
      tags: ['Patient Experience', 'Digital Forms', 'UX'],
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 'template-design-principles',
      title: 'Design Principles for Effective Healthcare Templates',
      excerpt: 'Learn how to create user-friendly, compliant, and efficient document templates for healthcare workflows.',
      author: 'Design Team',
      date: '2024-12-28',
      category: 'product',
      tags: ['Templates', 'Design', 'UX'],
      readTime: '9 min read',
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 'success-story-clinic',
      title: 'Case Study: How Metro Health Clinic Reduced Paperwork by 80%',
      excerpt: 'Real-world success story of a healthcare clinic that transformed their documentation process with UnifiSign.',
      author: 'Success Team',
      date: '2024-12-25',
      category: 'success',
      tags: ['Case Study', 'Success Story', 'ROI'],
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'company': return <Heart size={16} className="text-red-500" />;
      case 'product': return <Zap size={16} className="text-blue-500" />;
      case 'healthcare': return <User size={16} className="text-green-500" />;
      case 'technology': return <Lightbulb size={16} className="text-purple-500" />;
      case 'success': return <Trophy size={16} className="text-yellow-500" />;
      default: return <PenTool size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-6">
            <PenTool size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">UnifiSign Blog</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Insights, stories, and updates from our journey to transform healthcare documentation. 
            From hackathon beginnings to healthcare innovation.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="w-full lg:w-96">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-slate-600 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 text-white">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                    Featured Story
                  </span>
                  <div className="flex items-center space-x-1">
                    {getCategoryIcon(featuredPost.category)}
                    <span className="text-sm capitalize">{featuredPost.category}</span>
                  </div>
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                
                <p className="text-blue-100 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-blue-100">
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                    </div>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  
                  <Button variant="secondary" size="sm">
                    Read Story
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="flex items-center space-x-1 bg-white bg-opacity-90 rounded-full px-2 py-1">
                    {getCategoryIcon(post.category)}
                    <span className="text-xs font-medium capitalize">{post.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  {post.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User size={12} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <PenTool size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or browse by category.
            </p>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-slate-600 rounded-lg p-8 text-white text-center mt-16"
        >
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get the latest insights on healthcare technology, product updates, and success stories 
            delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-gray-900"
            />
            <Button variant="secondary">
              Subscribe
            </Button>
          </div>
          <p className="text-blue-100 text-sm mt-4">
            Join 1,000+ healthcare professionals already subscribed
          </p>
        </motion.div>

        {/* About the Author */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-12"
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-slate-600 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">About the Founder</h3>
              <p className="text-gray-600 mb-4">
                Veena Binny is the founder of UnifiSign, a first-time developer and homemaker who created 
                this HIPAA-compliant e-signature platform during the World's Largest Hackathon presented by Bolt. 
                Using bolt.new, she transformed her vision of improving healthcare documentation into reality.
              </p>
              <div className="flex justify-center md:justify-start">
                <a 
                  href="https://www.linkedin.com/in/veena-binny-16608a30/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm">
                    <ExternalLink size={16} />
                    Connect on LinkedIn
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};