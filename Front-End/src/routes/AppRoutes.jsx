import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Routes, Route } from 'react-router-dom';

import Home from '../components/Home/Home.jsx';
import Contact from '../components/Contacts/Contact.jsx';
import About from '../components/Abouts/About.jsx';
import NotFound from '../pages/NotFound.jsx';
import Login from '../components/Logins/Login.jsx';
import Signup from '../components/Registers/Signup.jsx';
import Services from '../components/Service/Services.jsx';
import News from '../components/News/News.jsx';
import QA from '../components/QA/QA.jsx';

import PrivateRoutes from './PrivateRoutes.jsx';
import AdminDashboard from '../Admins/adminDashboard.jsx';
import AdminManagePost from '../Admins/adminManagePost.jsx';
import DashboardStaff from '../Staffs/dashboardStaff.jsx';

export default function AppRoutes() {
  // Lấy user từ context
  const { user } = useContext(AuthContext);
  const userRole = user?.role;

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/new" element={<News />} />
      <Route path="/qa" element={<QA />} />

      {/* Protected routes */}
      <Route
        path="/adminDashboard"
        element={
          <PrivateRoutes userRole={userRole} allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRoutes>
        }
      />
      <Route
        path="/adminManagePost"
        element={
          <PrivateRoutes userRole={userRole} allowedRoles={['admin']}>
            <AdminManagePost />
          </PrivateRoutes>
        }
      />
      <Route
        path="/dashboardStaff"
        element={
          <PrivateRoutes userRole={userRole} allowedRoles={['staff']}>
            <DashboardStaff />
          </PrivateRoutes>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoutes userRole={userRole} allowedRoles={['admin', 'staff', 'user']}>
            <Home />
          </PrivateRoutes>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
