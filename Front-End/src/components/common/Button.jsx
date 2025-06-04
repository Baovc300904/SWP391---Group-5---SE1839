// src/components/ui/Button.jsx
import React from "react";

const Button = ({ children, onClick, type = "button", className = "", variant }) => {
  const baseClass = "px-4 py-2 rounded font-semibold";
  const variantClass =
    variant === "outline"
      ? "border border-blue-600 text-blue-600 hover:bg-blue-50"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
