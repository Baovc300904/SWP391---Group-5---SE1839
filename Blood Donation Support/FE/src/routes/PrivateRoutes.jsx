import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function PrivateRoutes({ allowedRoles, children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    console.log('Bạn không có quyền đăng nhập, redirect về trang login');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Đăng nhập rồi nhưng không có quyền => redirect và truyền lỗi về login
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
