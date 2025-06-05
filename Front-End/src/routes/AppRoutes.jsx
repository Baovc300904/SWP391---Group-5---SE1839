import React from 'react';
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
import BloodDonation from '../components/BloodDonations/BloodDonation.jsx';

import PrivateRoutes from './PrivateRoutes.jsx';
import AdminDashboard from '../Admins/adminDashboard.jsx';
import AdminManagePost from '../Admins/adminManagePost.jsx';
import DashboardStaff from '../Staffs/dashboardStaff.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/blood-donation" element={<BloodDonation />} />
      <Route path="/new" element={<News />} />
      <Route path="/qa" element={<QA />} />

      {/* Protected routes */}
      <Route
        path="/adminDashboard"
        element={
          <PrivateRoutes allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRoutes>
        }
      />
      <Route
        path="/adminManagePost"
        element={
          <PrivateRoutes allowedRoles={['admin']}>
            <AdminManagePost />
          </PrivateRoutes>
        }
      />
      <Route
        path="/dashboardStaff"
        element={
          <PrivateRoutes allowedRoles={['staff']}>
            <DashboardStaff />
          </PrivateRoutes>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoutes allowedRoles={['admin', 'staff', 'user']}>
            <Home />
          </PrivateRoutes>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
