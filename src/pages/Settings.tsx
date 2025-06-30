import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  CreditCard, 
  Shield, 
  Settings as SettingsIcon,
  Camera,
  Save,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Trash2,
  Download,
  ExternalLink,
  Crown,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { userAPI } from '../services/userAPI';
import { stripeService } from '../services/stripeService';
import { authAPI } from '../services/authAPI';
import toast from 'react-hot-toast';

interface ProfileForm {
  displayName: string;
  email: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  documentSigned: boolean;
  documentExpired: boolean;
  weeklyReports: boolean;
  marketingEmails: boolean;
}

export const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    setValue: setProfileValue,
    reset: resetProfile,
  } = useForm<ProfileForm>();

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
    watch: watchPassword,
  } = useForm<PasswordForm>();

  // Notification settings
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    documentSigned: true,
    documentExpired: true,
    weeklyReports: false,
    marketingEmails: false,
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      // Pre-fill profile form
      setProfileValue('displayName', user.name || '');
      setProfileValue('email', user.email);
      
      // Load subscription data
      loadSubscriptionData();
    }
  }, [user, setProfileValue]);

  const loadSubscriptionData = async () => {
    try {
      setIsLoadingSubscription(true);
      const subscription = await stripeService.getUserSubscription();
      setSubscriptionData(subscription);
    } catch (error) {
      console.error('Failed to load subscription:', error);
    } finally {
      setIsLoadingSubscription(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'account', name: 'Account', icon: SettingsIcon },
    { id: 'subscription', name: 'Subscription', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  const getRoleDisplayName = (role: number) => {
    const roleNames = { 1: 'Super Admin', 2: 'Admin', 3: 'User', 4: 'Guest' };
    return roleNames[role as keyof typeof roleNames] || 'Unknown';
  };

  const getSubscriptionStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const onSubmitProfile = async (data: ProfileForm) => {
    try {
      setIsLoading(true);
      const response = await userAPI.updateProfile({
        displayName: data.displayName,
        email: data.email,
      });

      if (response.success) {
        toast.success('Profile updated successfully!');
        // Update auth context if needed
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitPassword = async (data: PasswordForm) => {
    try {
      setIsLoading(true);
      // This would call your password change API
      // await authAPI.changePassword(data.currentPassword, data.newPassword);
      
      toast.success('Password updated successfully!');
      resetPassword();
      setShowPasswordForm(false);
    } catch (error: any) {
      console.error('Password update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveNotificationSettings = async () => {
    try {
      setIsLoading(true);
      // This would call your notification settings API
      // await userAPI.updateNotificationSettings(notifications);
      
      toast.success('Notification settings saved!');
    } catch (error: any) {
      console.error('Notification settings error:', error);
      toast.error('Failed to save notification settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setIsLoading(true);
      const response = await stripeService.cancelSubscription();
      
      if (response.success) {
        toast.success('Subscription cancelled successfully');
        await loadSubscriptionData();
      }
    } catch (error: any) {
      console.error('Cancel subscription error:', error);
      toast.error(error.message || 'Failed to cancel subscription');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      // This would call your account deletion API
      // await userAPI.deleteAccount();
      
      toast.success('Account deletion initiated. You will be logged out.');
      setTimeout(() => {
        logout();
      }, 2000);
    } catch (error: any) {
      console.error('Account deletion error:', error);
      toast.error('Failed to delete account');
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-slate-600 rounded-full flex items-center justify-center">
            {user?.profileImage ? (
              <img 
                src={user.profileImage} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <User size={32} className="text-white" />
            )}
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
            <Camera size={16} />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
          <p className="text-sm text-gray-600">Upload a new profile picture</p>
          <div className="mt-2 space-x-2">
            <Button variant="outline" size="sm">Upload New</Button>
            <Button variant="ghost" size="sm" className="text-red-600">Remove</Button>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            {...registerProfile('displayName', {
              required: 'Display name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
            label="Display Name"
            placeholder="Enter your display name"
            error={profileErrors.displayName?.message}
            icon={User}
          />

          <Input
            {...registerProfile('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            error={profileErrors.email?.message}
            icon={Mail}
          />
        </div>

        {/* Role and Account Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                {getRoleDisplayName(user?.role || 4)}
              </span>
              {user?.role === 1 && <Crown size={16} className="text-yellow-500" />}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" loading={isLoading}>
            <Save size={16} />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );

  const renderAccountTab = () => (
    <div className="space-y-6">
      {/* Account Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">User ID</p>
            <p className="font-medium text-gray-900">{user?.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Account Status</p>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
          </div>
        </div>
      </div>

      {/* Password Change */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Password</h3>
            <p className="text-sm text-gray-600">Update your password to keep your account secure</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            <Lock size={16} />
            Change Password
          </Button>
        </div>

        {showPasswordForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmitPassword(onSubmitPassword)}
            className="space-y-4 mt-4 pt-4 border-t border-gray-200"
          >
            <div className="relative">
              <Input
                {...registerPassword('currentPassword', {
                  required: 'Current password is required',
                })}
                type={showCurrentPassword ? 'text' : 'password'}
                label="Current Password"
                placeholder="Enter current password"
                error={passwordErrors.currentPassword?.message}
                icon={Lock}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <Input
                {...registerPassword('newPassword', {
                  required: 'New password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain uppercase, lowercase, and number',
                  },
                })}
                type={showNewPassword ? 'text' : 'password'}
                label="New Password"
                placeholder="Enter new password"
                error={passwordErrors.newPassword?.message}
                icon={Lock}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <Input
                {...registerPassword('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === watchPassword('newPassword') || 'Passwords do not match',
                })}
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirm New Password"
                placeholder="Confirm new password"
                error={passwordErrors.confirmPassword?.message}
                icon={Lock}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex space-x-3">
              <Button type="submit" loading={isLoading}>
                Update Password
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowPasswordForm(false)}
              >
                Cancel
              </Button>
            </div>
          </motion.form>
        )}
      </div>

      {/* Danger Zone */}
      <div className="border border-red-200 rounded-lg p-6 bg-red-50">
        <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-red-900">Delete Account</p>
              <p className="text-sm text-red-700">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="border-red-300 text-red-700 hover:bg-red-100"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 size={16} />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubscriptionTab = () => (
    <div className="space-y-6">
      {isLoadingSubscription ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscription details...</p>
        </div>
      ) : (
        <>
          {/* Current Plan */}
          <div className="bg-gradient-to-r from-blue-600 to-slate-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {subscriptionData?.plan || user?.subscription?.plan || 'Free Plan'}
                </h3>
                <p className="opacity-90">
                  {subscriptionData?.status ? (
                    <span className={`px-2 py-1 rounded-full text-xs ${getSubscriptionStatusColor(subscriptionData.status)}`}>
                      {subscriptionData.status.replace('_', ' ').toUpperCase()}
                    </span>
                  ) : (
                    'Active'
                  )}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {subscriptionData?.amount ? `$${subscriptionData.amount}` : 'Free'}
                </div>
                {subscriptionData?.amount && (
                  <div className="text-sm opacity-90">per month</div>
                )}
              </div>
            </div>
          </div>

          {/* Subscription Details */}
          {subscriptionData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Billing Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next billing date:</span>
                    <span className="font-medium">
                      {subscriptionData.renewal_date 
                        ? new Date(subscriptionData.renewal_date).toLocaleDateString()
                        : 'N/A'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Auto-renew:</span>
                    <span className="font-medium">
                      {subscriptionData.auto_renew ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Currency:</span>
                    <span className="font-medium">{subscriptionData.currency?.toUpperCase() || 'USD'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Usage & Limits</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Documents this month:</span>
                    <span className="font-medium">12 / Unlimited</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Team members:</span>
                    <span className="font-medium">3 / 10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage used:</span>
                    <span className="font-medium">2.4 GB / Unlimited</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" onClick={() => window.location.href = '/pricing'}>
              <ExternalLink size={16} />
              Upgrade Plan
            </Button>
            
            <Button variant="outline">
              <Download size={16} />
              Download Invoice
            </Button>

            {subscriptionData && subscriptionData.status === 'active' && (
              <Button 
                variant="outline" 
                className="border-red-300 text-red-700 hover:bg-red-50"
                onClick={handleCancelSubscription}
                loading={isLoading}
              >
                Cancel Subscription
              </Button>
            )}
          </div>

          {/* Billing History */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Recent Billing History</h4>
            <div className="space-y-3">
              {[
                { date: '2025-01-15', amount: '$29.00', status: 'Paid', invoice: 'INV-001' },
                { date: '2024-12-15', amount: '$29.00', status: 'Paid', invoice: 'INV-002' },
                { date: '2024-11-15', amount: '$29.00', status: 'Paid', invoice: 'INV-003' },
              ].map((bill, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <DollarSign size={16} className="text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">{bill.amount}</p>
                      <p className="text-sm text-gray-600">{bill.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {bill.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Download size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {[
            {
              key: 'emailNotifications' as keyof NotificationSettings,
              title: 'Email Notifications',
              description: 'Receive email notifications for important updates',
            },
            {
              key: 'documentSigned' as keyof NotificationSettings,
              title: 'Document Signed',
              description: 'Get notified when someone signs your documents',
            },
            {
              key: 'documentExpired' as keyof NotificationSettings,
              title: 'Document Expired',
              description: 'Get notified when documents expire without being signed',
            },
            {
              key: 'weeklyReports' as keyof NotificationSettings,
              title: 'Weekly Reports',
              description: 'Receive weekly summary of your account activity',
            },
            {
              key: 'marketingEmails' as keyof NotificationSettings,
              title: 'Marketing Emails',
              description: 'Receive updates about new features and promotions',
            },
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">{setting.title}</p>
                <p className="text-sm text-gray-600">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[setting.key]}
                  onChange={() => handleNotificationChange(setting.key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button onClick={saveNotificationSettings} loading={isLoading}>
            <Save size={16} />
            Save Notification Settings
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      {/* Two-Factor Authentication */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <Button variant="outline">
            Enable 2FA
          </Button>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle size={16} className="text-yellow-600 mt-0.5" />
            <div>
              <p className="text-yellow-800 text-sm font-medium">Two-factor authentication is not enabled</p>
              <p className="text-yellow-700 text-sm">
                Protect your account by enabling 2FA. You'll need to enter a code from your phone in addition to your password.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Sessions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
        <div className="space-y-4">
          {[
            {
              device: 'Chrome on Windows',
              location: 'San Francisco, CA',
              lastActive: '2 minutes ago',
              current: true,
            },
            {
              device: 'Safari on iPhone',
              location: 'San Francisco, CA',
              lastActive: '2 hours ago',
              current: false,
            },
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Shield size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {session.device}
                    {session.current && (
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Current
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600">{session.location} • {session.lastActive}</p>
                </div>
              </div>
              {!session.current && (
                <Button variant="ghost" size="sm" className="text-red-600">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Security Log */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Security Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Password changed', time: '2 days ago', status: 'success' },
            { action: 'Login from new device', time: '1 week ago', status: 'warning' },
            { action: 'Account created', time: '2 weeks ago', status: 'success' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 py-2">
              <div className={`w-2 h-2 rounded-full ${
                activity.status === 'success' ? 'bg-green-500' : 
                activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-600">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access your settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'account' && renderAccountTab()}
              {activeTab === 'subscription' && renderSubscriptionTab()}
              {activeTab === 'notifications' && renderNotificationsTab()}
              {activeTab === 'security' && renderSecurityTab()}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
        size="md"
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle size={24} className="text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Are you absolutely sure?</h3>
              <p className="text-sm text-gray-600">This action cannot be undone.</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">
              This will permanently delete your account and remove all associated data including:
            </p>
            <ul className="list-disc list-inside text-red-700 text-sm mt-2 space-y-1">
              <li>All documents and templates</li>
              <li>Signing links and history</li>
              <li>Account settings and preferences</li>
              <li>Subscription and billing information</li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={handleDeleteAccount}
              loading={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Delete My Account
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};