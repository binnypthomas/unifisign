import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { authAPI } from '../services/authAPI';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const userData = await authAPI.me();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(email, password);
      if (response.success && response.user) {
        // Convert the API response to our User type
        const userData: User = {
          id: response.user.id.toString(),
          email: email,
          name: response.user.displayName,
          role: response.user.role,
          createdAt: new Date().toISOString(),
          subscription: {
            plan: response.user.subscription as 'free' | 'pro' | 'enterprise',
            status: 'active',
          },
        };
        setUser(userData);
        
        // Redirect to dashboard on successful login
        navigate('/dashboard');
        
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Login error:', error);
      // Re-throw the error so the LoginModal can handle it
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string, requested_package_id?: number): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authAPI.register({ email, password, requested_package_id });
      return response.success;
    } catch (error: any) {
      console.error('Registration error:', error);
      // Re-throw the error so the RegisterModal can handle it
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      navigate('/');
    } catch (error) {
      // Even if logout fails, clear local state
      setUser(null);
      navigate('/');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};