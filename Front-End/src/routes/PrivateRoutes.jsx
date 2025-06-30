import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function PrivateRoutes({ allowedRoles, children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const normalizeRole = (role) => role?.toLowerCase().replace(/[_\s]/g, '');
  const userRole = normalizeRole(user.vaiTro);
  const allowedRolesNormalized = allowedRoles.map(normalizeRole);

  const hasPermission = allowedRolesNormalized.includes(userRole);

  if (!hasPermission) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location, error: 'Bạn không có quyền truy cập trang này!' }}
      />
    );
  }

  return children;
}
