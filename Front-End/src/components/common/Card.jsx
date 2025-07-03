// src/components/ui/card.jsx
import React from "react";

export function Card({ children, className, dark }) {
  return (
    <div className={`rounded-2xl shadow p-4 ${
      dark ? "bg-gray-800 text-white" : "bg-white text-black"
    } ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}

