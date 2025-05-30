import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../components/Home/Home.jsx';
import Contact from '../components/Contacts/Contact';
import About from '../components/Abouts/About';
import DashBoard from '../Staffs/DashBoard';
import DashBoardHome from '../Staffs/DashBoardHome';
import DashBoardSettings from '../Staffs/DashBoardSettings';
import NotFound from '../pages/NotFound';
import Login from '../components/Logins/Login.jsx';
import Signup from '../components/Registers/Signup';
import Services from '../components/Service/Services';
import News from '../components/News/News';
import QA from '../components/QA/QA';

import PrivateRoutes from './PrivateRoutes.jsx';
import AdminDashboard from "../Admins/adminDashboard.jsx"; // Nếu bạn có file này
// import DashboardStaff from '../pages/DashboardStaff/DashboardStaff.jsx'; // Nếu bạn có file này

export default function AppRoutes() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user ? user.role : null;

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
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

      {/* <Route
        path="/dashboardStaff"
        element={
          <PrivateRoutes userRole={userRole} allowedRoles={['staff']}>
            <DashboardStaff />
          </PrivateRoutes>
        }
      /> */}

      <Route
        path="/home"
        element={
          <PrivateRoutes userRole={userRole} allowedRoles={['admin', 'staff', 'user']}>
            <Home />
          </PrivateRoutes>
        }
      />

      {/* Nested Dashboard routes (Nếu bạn dùng) */}
      <Route path="/dashboard" element={<DashBoard />}>
        <Route index element={<DashBoardHome />} />
        <Route path="settings" element={<DashBoardSettings />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
