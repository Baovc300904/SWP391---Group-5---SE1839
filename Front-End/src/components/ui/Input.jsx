import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ 
  label,
  error,
  success,
  icon,
  iconPosition = 'left',
  size = 'md',
  className = '',
  fullWidth = true,
  ...props 
}) => {
  const baseClasses = 'form-input transition-all duration-200 focus:ring-2 focus:ring-offset-0';
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  const stateClasses = {
    error: 'border-red-500 focus:border-red-500 focus:ring-red-200',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-200',
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const stateClass = error ? 'error' : success ? 'success' : 'default';

  const inputClasses = [
    baseClasses,
    sizeClasses[size],
    stateClasses[stateClass],
    widthClass,
    icon && iconPosition === 'left' ? 'pl-10' : '',
    icon && iconPosition === 'right' ? 'pr-10' : '',
    className
  ].filter(Boolean).join(' ');

  const renderIcon = () => {
    if (!icon) return null;
    
    const iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18;
    const iconElement = React.cloneElement(icon, {
      size: iconSize,
      className: `shrink-0 ${error ? 'text-red-500' : success ? 'text-green-500' : 'text-gray-400'}`
    });

    return (
      <div className={`absolute top-1/2 transform -translate-y-1/2 ${
        iconPosition === 'left' ? 'left-3' : 'right-3'
      }`}>
        {iconElement}
      </div>
    );
  };

  return (
    <div className={`form-group ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="form-label text-sm font-medium text-gray-700 mb-2 block">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && renderIcon()}
        <input className={inputClasses} {...props} />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {success && (
        <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.string,
  icon: PropTypes.element,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  fullWidth: PropTypes.bool
};

export default Input;
