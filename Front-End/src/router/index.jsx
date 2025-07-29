import { useEffect } from "react";
import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";
import BlogCategoryDetail from "../components/Blog/BlogCategoryDetail";
import BlogDetail from "../components/Blog/BlogDetail";
import BloodDetail from "../components/Blood/BloodDetail";
import BloodRequestDetail from "../components/BloodDonationRequest/BloodDonationRequestDetail";
import CampaignDetail from "../components/Campaign/CampaignDetail";
import ProtectedRoute from "../components/ProtectedRoute";
import BloodReceiveRequestDetail from "../components/ReceiveBloodAdmin/ReceiveBloodAdminDetail";
import UserDetail from "../components/User/UserDetail";
import MainLayout from "../layout/MainLayout";
import MainLayoutUser from "../layout/MainLayoutUser";
import GuestLayout from "../layout/GuestLayout";
import BlogManager from "../pages/BlogManager";
import BloodDonationManager from "../pages/BloodDonationRequestManager";
import BloodManager from "../pages/BloodManager";
import BloodReceiveRequestManager from "../pages/BloodReceiveRequestManager";
import BloodUnitWarehouseList from "../pages/BloodUnitManager";
import BloodWarehouse from "../pages/BloodWarehouse";
import Campaigns from "../pages/CampaignManager";
import Dashboard from "../pages/Dashboard";
import Donors from "../pages/Donors";
import BlogDetailUser from "../pages/ForUser/BlogDetailUser";
import BlogTabUser from "../pages/ForUser/BlogPage";
import DetailCampaign from "../pages/ForUser/CampaignDetail";
import ChangePassword from "../pages/ForUser/ChangePassword";
import DashboardUser from "../pages/ForUser/Dashboard";
import BloodDonationRequests from "../pages/ForUser/ListRequest";
import UserNearMe from "../pages/ForUser/NearMe";
import ProfileDetail from "../pages/ForUser/ProfileDetail";
import ProfileEdit from "../pages/ForUser/ProfileEdit";
import BloodRequestPage from "../pages/ForUser/ReceiveBlood";
import Home from "../pages/ForGuest/Home";
import About from "../pages/ForGuest/pages/About";
import Contact from "../pages/ForGuest/pages/Contact";
import Login from "../pages/Login";
import NotificationManager from "../pages/NotificationManager";
import Register from "../pages/Register";
import SupportTicketManager from "../pages/SupportManager";
import UserManager from "../pages/UserManager";

// =================== Protected Home Redirect ===================
const ProtectedHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    // Chỉ redirect nếu có cả token VÀ user hợp lệ
    if (token && user && user.vaiTro) {
      const role = user.vaiTro;
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "nguoidung") {
        navigate("/user");
      } else if (role === "nhanvien") {
        navigate("/employee");
      }
    } else {
      // Clear invalid tokens
      if (token && !user) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    // Nếu không có token hoặc user hợp lệ, hiển thị trang Home cho guest
  }, [navigate]);

  return <Home />;
};

// =================== ROUTER CONFIG ===================
const router = createBrowserRouter([
  // HOME WITH GUEST LAYOUT
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { index: true, element: <ProtectedHome /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> }
    ],
  },

  // STANDALONE PAGES (NO LAYOUT)
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  // ADMIN ROUTES
  {
    path: "/admin/",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "donors", element: <Donors /> },
      { path: "users-manager", element: <UserManager /> },
      { path: "users-manager/detail/:id", element: <UserDetail /> },
      { path: "campaigns-manager", element: <Campaigns /> },
      { path: "campaigns-manager/detail/:id", element: <CampaignDetail /> },
      { path: "support-ticket", element: <SupportTicketManager /> },
      { path: "notification", element: <NotificationManager /> },
    ],
  },

  // USER ROUTES
  {
    path: "/user/",
    element: (
      <ProtectedRoute allowedRoles={["nguoidung"]}>
        <MainLayoutUser />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardUser /> },
      { path: "profile", element: <ProfileDetail /> },
      { path: "edit-profile", element: <ProfileEdit /> },
      { path: "change-password", element: <ChangePassword /> },
      { path: "campaigns-detail/:id", element: <DetailCampaign /> },
      { path: "list-request", element: <BloodDonationRequests /> },
      { path: "receive-blood", element: <BloodRequestPage /> },
      { path: "blog", element: <BlogTabUser /> },
      { path: "blogs/:id", element: <BlogDetailUser /> },
      { path: "near-me", element: <UserNearMe /> },
    ],
  },

  // EMPLOYEE ROUTES
  {
    path: "/employee/",
    element: (
      <ProtectedRoute allowedRoles={["nhanvien"]}>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "bloods-manager", element: <BloodManager /> },
      { path: "bloods-manager/:id", element: <BloodDetail /> },
      { path: "blogs-manager", element: <BlogManager /> },
      {
        path: "blogs-manager/category-detail/:id",
        element: <BlogCategoryDetail />,
      },
      { path: "blogs-manager/blog-detail/:id", element: <BlogDetail /> },
      { path: "campaigns-manager", element: <Campaigns /> },
      { path: "campaigns-manager/detail/:id", element: <CampaignDetail /> },
      { path: "blood-warehouse", element: <BloodWarehouse /> },
      { path: "blood-donation-request", element: <BloodDonationManager /> },
      { path: "blood-donation-request/:id", element: <BloodRequestDetail /> },
      { path: "blood-unit-warehouses", element: <BloodUnitWarehouseList /> },
      {
        path: "receive-blood-manager",
        element: <BloodReceiveRequestManager />,
      },
      {
        path: "receive-blood-manager/:id",
        element: <BloodReceiveRequestDetail />,
      },
      // ... thêm các route nhân viên quản lý được (không có user manager)
    ],
  },

  // NOT FOUND - REDIRECT TO HOME
  { path: "*", element: <Navigate to="/" /> },
]);

export default router;
