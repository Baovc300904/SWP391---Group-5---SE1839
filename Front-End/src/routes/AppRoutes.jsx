import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';

import Home from '../components/Home/Home.jsx';
import Contact from '../components/Contacts/Contact.jsx';
import About from '../components/Abouts/About.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import Login from '../pages/Logins/Login.jsx';
import Signup from '../pages/Registers/Signup.jsx';
import Services from '../components/Service/Services.jsx';
import News from '../components/News/News.jsx';
import NewsDetails from '../components/News/NewDetails.jsx';
import QA from '../components/QA/QA.jsx';
import BloodDonation from '../components/BloodDonations/BloodDonation.jsx';

import AdminDashboard from '../Admins/adminDashboard.jsx';
import AdminManagePost from '../Admins/adminManagePost.jsx';
import DashboardStaff from '../Staffs/dashboardStaff.jsx';
import AdminProfile from '../pages/Profile/Admins/AdminProfile.jsx';
import StaffProfile from '../pages/Profile/Staffs/StaffProfile.jsx';
import DonorProfile from '../pages/Profile/Donors/DonorProfile.jsx';
import EditProfile from '../pages/EditProfile/EditProfile.jsx';

import PrivateRoutes from './PrivateRoutes.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Các trang tĩnh */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/blood-donation" element={<BloodDonation />} />
      <Route path="/new" element={<News />} />
      <Route path="/new/:id" element={<NewsDetails />} />
      <Route path="/qa" element={<QA />} />

      <Route
        path="/profile"
        element={
          (() => {
            const storedUser = localStorage.getItem('user');
            if (!storedUser) return <Navigate to="/login" replace />;
            const user = JSON.parse(storedUser);
            return <Navigate to={`/${user.role}/profile`} replace />;
          })()
        }
      />
      {/* Routes bảo vệ riêng theo role */}
      <Route
        path="/admin/profile"
        element={
          <PrivateRoutes allowedRoles={['admin']}>
            <AdminProfile />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/edit-profile"
        element={
          <PrivateRoutes allowedRoles={['admin']}>
            <EditProfile />
          </PrivateRoutes>
        }
      />
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
        path="/staff/profile"
        element={
          <PrivateRoutes allowedRoles={['staff']}>
            <StaffProfile />
          </PrivateRoutes>
        }
      />
      <Route
        path="/staff/edit-profile"
        element={
          <PrivateRoutes allowedRoles={['staff']}>
            <EditProfile />
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
        path="/member/profile"
        element={
          <PrivateRoutes allowedRoles={['member']}>
            <DonorProfile />
          </PrivateRoutes>
        }
      />
      <Route
        path="/member/edit-profile"
        element={
          <PrivateRoutes allowedRoles={['member']}>
            <EditProfile />
          </PrivateRoutes>
        }
      />

      <Route
        path="/home"
        element={
          <PrivateRoutes allowedRoles={['admin', 'staff', 'member']}>
            <Home />
          </PrivateRoutes>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
