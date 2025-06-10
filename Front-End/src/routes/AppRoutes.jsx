import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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
import BloodRequest from '../pages/BloodRequest/UserRequestList.jsx';

import AdminDashboard from '../Admins/adminDashboard.jsx';
import AdminManagePost from '../Admins/adminManagePost.jsx';
import DashboardStaff from '../Staffs/dashboardStaff.jsx';
import AdminProfile from '../pages/Profile/Admins/AdminProfile.jsx';
import StaffProfile from '../pages/Profile/Staffs/StaffProfile.jsx';
import DonorProfile from '../pages/Profile/Donors/DonorProfile.jsx';
import EditProfile from '../pages/EditProfile/EditProfile.jsx';

import PrivateRoutes from './PrivateRoutes.jsx';
import BlogPages from '../pages/Blogs/BlogPages.jsx';

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
      <Route path="/services/blood-donation/:id" element={<BloodDonation />} />
      <Route path="/services/donation-request" element={<BloodRequest />} />

      <Route path="/new" element={<News />} />
      <Route path='/new/blogs' element={<BlogPages />} />
      <Route path="/new/:id" element={<NewsDetails />} />
      <Route path="/qa" element={<QA />} />

      <Route
        path="/profile"
        element={
          (() => {
            const storedUser = localStorage.getItem('user');

            // Kiểm tra storedUser hợp lệ
            if (
              !storedUser ||
              storedUser === 'undefined' ||
              storedUser === 'null' ||
              storedUser.trim() === ''
            ) {
              return <Navigate to="/login" replace />;
            }

            try {
              const user = JSON.parse(storedUser);
              if (!user?.role) {
                return <Navigate to="/login" replace />;
              }
              return <Navigate to={`/${user.role}/profile`} replace />;
            } catch (error) {
              console.error('Error parsing storedUser:', error);
              return <Navigate to="/login" replace />;
            }
          })()
        }
      />
      {/* Routes bảo vệ riêng theo role */}
      <Route
        path="/Quan_Tri_Vien/profile"
        element={
          <PrivateRoutes allowedRoles={['Quan_Tri_Vien']}>
            <AdminProfile />
          </PrivateRoutes>
        }
      />
      <Route
        path="/Quan_Tri_Vien/edit-profile"
        element={
          <PrivateRoutes allowedRoles={['Quan_Tri_Vien']}>
            <EditProfile />
          </PrivateRoutes>
        }
      />
      <Route
        path="/adminDashboard"
        element={
          <PrivateRoutes allowedRoles={['Quan_Tri_Vien']}>
            <AdminDashboard />
          </PrivateRoutes>
        }
      />
      <Route
        path="/Quan_Tri_Vien/ManagePost"
        element={
          <PrivateRoutes allowedRoles={['Quan_Tri_Vien']}>
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
        path="/Thanh_Vien/profile"
        element={
          <PrivateRoutes allowedRoles={['Thanh_Vien']}>
            <DonorProfile />
          </PrivateRoutes>
        }
      />
      <Route
        path="/nguoi-hien-mau/edit-profile"
        element={
          <PrivateRoutes allowedRoles={['Thanh_Vien']}>
            <EditProfile />
          </PrivateRoutes>
        }
      />

      <Route
        path="/home"
        element={
          <PrivateRoutes allowedRoles={['Quan_Tri_Vien', 'staff', 'Thanh_Vien']}>
            <Home />
          </PrivateRoutes>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
