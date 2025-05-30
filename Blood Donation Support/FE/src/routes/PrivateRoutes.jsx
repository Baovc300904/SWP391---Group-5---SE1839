import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoutes({ userRole, allowedRoles, children }) {
  const location = useLocation();

  if (!allowedRoles.includes(userRole)) {
    alert('Bạn không có quyền truy cập trang này!');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
