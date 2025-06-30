import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import toast from 'react-hot-toast';

interface ContactForm {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    // Simulate form submission
    try {
      console.log('Contact form data:', data);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'support@unifisign.com',
      description: 'Send us an email anytime',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+49 151 701 33 555',
      description: 'Mon-Fri from 8am to 5pm',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Healthcare Blvd\nSan Francisco, CA 94105',
      description: 'Come say hello at our HQ',
    },
    {
      icon: Clock,
      title: 'Support Hours',
      content: '24/7 Online Support',
      description: 'We\'re here when you need us',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about UnifiSign? We're here to help. Reach out to our team 
              and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  {...register('name', { required: 'Name is required' })}
                  label="Full Name"
                  placeholder="Musterman"
                  error={errors.name?.message}
                />
                <Input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  label="Email Address"
                  placeholder="info@unifisign.com"
                  error={errors.email?.message}
                />
              </div>

              <Input
                {...register('company')}
                label="Company (Optional)"
                placeholder="Healthcare Associates"
              />

              <Input
                {...register('subject', { required: 'Subject is required' })}
                label="Subject"
                placeholder="How can we help you?"
                error={errors.subject?.message}
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us more about your needs..."
                />
                {errors.message && (
                  <p className="text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                <Send size={20} />
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                We're committed to providing exceptional support to all our users. 
                Whether you have questions about our platform, need technical assistance, 
                or want to discuss custom solutions, we're here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                    className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon size={24} className="text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                    <p className="text-gray-900 font-medium mb-1 whitespace-pre-line">
                      {info.content}
                    </p>
                    <p className="text-sm text-gray-600">{info.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Support Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="bg-blue-50 rounded-lg p-6 border border-blue-200"
            >
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Need Immediate Help?
              </h3>
              <p className="text-blue-700 mb-4">
                Check out our comprehensive documentation and knowledge base for instant answers 
                to common questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm">
                  View Documentation
                </Button>
                <Button variant="outline" size="sm">
                  Browse FAQ
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};