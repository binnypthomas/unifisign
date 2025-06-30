import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, CheckCircle, Clock, Link, UserPlus } from 'lucide-react';
import { DashboardSummary } from '../../services/userAPI';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  change?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, change }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {change && (
          <p className={`text-xs mt-1 ${
            change.startsWith('+') ? 'text-green-600' : 
            change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
          }`}>
            {change} from last month
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </motion.div>
);

interface DashboardStatsProps {
  summary: DashboardSummary;
  isLoading?: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ summary, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Documents',
      value: summary.totalDocuments.toString(),
      icon: FileText,
      color: 'bg-blue-500',
      change: summary.totalDocumentsChange,
    },
    {
      title: 'Active Signers',
      value: summary.activeSigners.toString(),
      icon: Users,
      color: 'bg-teal-500',
      change: summary.activeSignersChange,
    },
    {
      title: 'Completed',
      value: summary.completed.toString(),
      icon: CheckCircle,
      color: 'bg-green-500',
      change: summary.completedChange,
    },
    {
      title: 'Pending',
      value: summary.pending.toString(),
      icon: Clock,
      color: 'bg-orange-500',
      change: summary.pendingChange,
    },
    {
      title: 'Total Users',
      value: summary.totalUsers.toString(),
      icon: UserPlus,
      color: 'bg-purple-500',
      change: summary.totalUsersChange,
    },
    {
      title: 'Total Links',
      value: summary.totalLinks.toString(),
      icon: Link,
      color: 'bg-indigo-500',
      change: summary.totalLinksChange,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatsCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
};