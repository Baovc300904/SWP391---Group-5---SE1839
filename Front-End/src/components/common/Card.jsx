// src/components/ui/card.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'default',
  shadow = 'default',
  border = true,
  hover = true,
  ...props 
}) => {
  const baseClasses = 'card relative overflow-hidden transition-all duration-300';
  
  const variantClasses = {
    default: '',
    elevated: 'shadow-lg hover:shadow-xl',
    outlined: 'border-2 border-gray-200',
    filled: 'bg-gray-50',
    blood: 'border-l-4 border-l-red-600'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    default: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const borderClass = border ? 'border border-gray-200' : 'border-0';
  const hoverClass = hover ? 'hover:transform hover:-translate-y-1' : '';

  const classes = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    shadowClasses[shadow],
    borderClass,
    hoverClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'elevated', 'outlined', 'filled', 'blood']),
  padding: PropTypes.oneOf(['none', 'sm', 'default', 'lg', 'xl']),
  shadow: PropTypes.oneOf(['none', 'sm', 'default', 'lg', 'xl']),
  border: PropTypes.bool,
  hover: PropTypes.bool
};

// Card Header Component
const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-header ${className}`} {...props}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

// Card Body Component
const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-body ${className}`} {...props}>
      {children}
    </div>
  );
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

// Card Footer Component
const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-footer ${className}`} {...props}>
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

// Attach sub-components to Card
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;

