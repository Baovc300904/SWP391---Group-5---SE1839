import React from 'react';
import { Route, Routes } from 'react-router';    
import { Navigate } from 'react-router-dom';

export default function PrivateRoutes({ userRole, allowedRoles, children }){
    
    if (!allowedRoles.includes(userRole)) {
    alert('Bạn không có quyền truy cập trang này!');
    return <Navigate to="/login" replace />;
    }
    return children;
}   