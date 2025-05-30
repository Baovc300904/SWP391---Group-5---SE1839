// src/components/ui/input.jsx

import React from "react";

const Input = React.forwardRef(({ type = "text", placeholder = "", value, onChange, className = "", disabled = false, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
