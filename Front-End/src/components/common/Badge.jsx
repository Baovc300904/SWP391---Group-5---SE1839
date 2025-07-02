// src/components/common/Badge.jsx
import React from 'react';

export function Badge({ children, color = 'blue', className = '' }) {
  const colorClass = {
    blue: 'bg-blue-500 text-white',
    red: 'bg-red-500 text-white',
    green: 'bg-green-500 text-white',
    yellow: 'bg-yellow-400 text-black',
    gray: 'bg-gray-300 text-gray-800',
  }[color] || 'bg-blue-500 text-white';

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colorClass} ${className}`}
    >
      {children}
    </span>
  );
}
