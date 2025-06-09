import React from 'react';
import './LoadingSpinner.css';  // file css cho spinner

export default function LoadingSpinner() {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
}
