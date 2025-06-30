import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react';
import { DashboardActivity } from '../../services/userAPI';

const ActivityIcon: React.FC<{ action: string }> = ({ action }) => {
  if (action.includes('Signed')) {
    return <CheckCircle size={20} className="text-green-600" />;
  } else if (action.includes('Waiting') || action.includes('pending')) {
    return <Clock size={20} className="text-orange-600" />;
  } else if (action.includes('expired')) {
    return <AlertCircle size={20} className="text-red-600" />;
  } else if (action.includes('Created')) {
    return <Plus size={20} className="text-blue-600" />;
  }
  return <FileText size={20} className="text-blue-600" />;
};

interface RecentActivityProps {
  activities: DashboardActivity[];
  isLoading?: boolean;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg animate-pulse">
                <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0 mt-1"></div>
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={`${activity.title}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ActivityIcon action={activity.action} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.action}</p>
                {activity.email && (
                  <p className="text-xs text-gray-500 mt-1">{activity.email}</p>
                )}
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {activity.time}
              </span>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};