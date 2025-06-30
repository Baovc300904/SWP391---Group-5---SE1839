import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadingSpinner/LoadingSpinner.jsx';
import RedirectBasedOnRole from '../components/RedirectBasedOnRole.jsx';
import PrivateRoutes from './PrivateRoutes.jsx';

// ✅ Public pages
const Login = lazy(() => import('../features/auth/components/Login/index.jsx'));
const Register = lazy(() => import('../features/auth/components/Signup/Signup.jsx'));

// ✅ User layout and pages
const MainLayoutUser = lazy(() => import('../components/layout/AppLayout/MainLayoutUser.jsx'));
const Dashboard = lazy(() => import('../features/blooddonor/pages/ForUser/Dashboard.jsx'));
const ProfileDetail = lazy(() => import('../features/blooddonor/pages/ForUser/ProfileDetail.jsx'));
const ProfileEdit = lazy(() => import('../features/blooddonor/pages/ForUser/ProfileEdit.jsx'));
const ChangePassword = lazy(() => import('../features/blooddonor/pages/ForUser/ChangePassword.jsx'));
const HomePage = lazy(() => import('../pages/ForUser/Home/index.jsx'));
const BlogPages = lazy(() => import('../pages/ForUser/Blogs/BlogPages.jsx'));
const News = lazy(() => import('../pages/ForUser/News/News.jsx'));
const Contact = lazy(() => import('../pages/ForUser/Contacts/Contact.jsx'));
const BloodDonation = lazy(() => import('../pages/ForUser/BloodDonations/BloodDonation.jsx'));
const UserRequestList = lazy(() => import('../pages/ForUser/BloodRequest/UserRequestList/UserRequestList.jsx'));
const BloodRequestForm = lazy(() => import('../features/blooddonor/pages/BloodRequestForm/index.jsx'));

// ✅ Admin layout and pages
const MainLayout = lazy(() => import('../components/layout/AdminLayout/MainLayout.jsx'));
const Donors = lazy(() => import('../pages/ForAdmin/Donors.jsx'));
const BloodManager = lazy(() => import('../pages/ForAdmin/BloodManager.jsx'));
const BloodWarehouse = lazy(() => import('../pages/ForAdmin/BloodWarehouse.jsx'));
const BloodDetail = lazy(() => import('../features/admin/components/Blood/BloodDetail.jsx'));
const BlogManager = lazy(() => import('../pages/ForAdmin/BlogManager.jsx')); // ✅ Fix đúng file
const BlogCategoryManager = lazy(() => import('../pages/ForAdmin/BlogCategoryManager.jsx'));
const BlogDetail = lazy(() => import('../features/admin/components/Blog/BlogDetail.jsx'));
const BlogCategoryDetail = lazy(() => import('../features/admin/components/Blog/BlogCategoryDetail.jsx'));
const UserManager = lazy(() => import('../pages/ForAdmin/UserManager.jsx'));
const UserDetail = lazy(() => import('../features/admin/components/User/UserDetail.jsx'));
const CampaignManager = lazy(() => import('../pages/ForAdmin/CampaignManager.jsx'));
const CampaignDetail = lazy(() => import('../features/admin/components/Campaign/CampaignDetail.jsx'));

// ✅ Error page
const NotFound = lazy(() => import('../pages/NotFound/NotFound.jsx'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoutes allowedRoles={['admin']}>
              <MainLayout />
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="donors" element={<Donors />} />
          <Route path="bloods-manager" element={<BloodManager />} />
          <Route path="bloods-manager/:id" element={<BloodDetail />} />
          <Route path="blogs-manager" element={<BlogManager />} />
          <Route path="blog-categories-manager" element={<BlogCategoryManager />} />
          <Route path="blogs-manager/category-detail/:id" element={<BlogCategoryDetail />} />
          <Route path="blogs-manager/blog-detail/:id" element={<BlogDetail />} />
          <Route path="users-manager" element={<UserManager />} />
          <Route path="users-manager/detail/:id" element={<UserDetail />} />
          <Route path="campaigns-manager" element={<CampaignManager />} />
          <Route path="campaigns-manager/detail/:id" element={<CampaignDetail />} />
          <Route path="blood-warehouse" element={<BloodWarehouse />} />
          {/* Fallback for unknown admin routes */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* USER routes */}
        <Route
          path="/user"
          element={
            <PrivateRoutes allowedRoles={['nguoidung']}>
              <MainLayoutUser />
            </PrivateRoutes>
          }
        >
          <Route index element={<Navigate to="/user/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<ProfileDetail />} />
          <Route path="edit-profile" element={<ProfileEdit />} />
          <Route path="change-password" element={<ChangePassword />} />
          
          {/* Blog và News */}
          <Route path="blogs" element={<BlogPages />} />
          <Route path="news" element={<News />} />
          
          {/* Liên hệ */}
          <Route path="contact" element={<Contact />} />
          
          {/* Hiến máu */}
          <Route path="blood-donation" element={<BloodDonation />} />
          <Route path="blood-request" element={<UserRequestList />} />
          <Route path="blood-request-form" element={<BloodRequestForm />} />
          
          {/* Fallback for unknown user routes */}
          <Route path="*" element={<Navigate to="/user/home" replace />} />
        </Route>

        {/* Redirect from "/" */}
        <Route path="/" element={<RedirectBasedOnRole />} />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
