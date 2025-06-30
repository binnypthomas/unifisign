import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  icon?: React.ElementType;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', icon: Icon, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          )}
          <input
            ref={ref}
            className={`
              w-full px-3 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              disabled:bg-gray-50 disabled:text-gray-500
              ${Icon ? 'pl-10' : ''}
              ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';