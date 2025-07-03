import { useEffect } from "react";
import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";
import BlogCategoryDetail from "../components/Blog/BlogCategoryDetail";
import BlogDetail from "../components/Blog/BlogDetail";
import BloodDetail from "../components/Blood/BloodDetail";
import BloodRequestDetail from "../components/BloodDonationRequest/BloodDonationRequestDetail";
import CampaignDetail from "../components/Campaign/CampaignDetail";
import ProtectedRoute from "../components/ProtectedRoute";
import UserDetail from "../components/User/UserDetail";
import MainLayout from "../layout/MainLayout";
import MainLayoutUser from "../layout/MainLayoutUser";
import BlogManager from "../pages/BlogManager";
import BloodDonationManager from "../pages/BloodDonationRequestManager";
import BloodManager from "../pages/BloodManager";
import BloodReceiveRequestManager from "../pages/BloodReceiveRequestManager";
import BloodUnitWarehouseList from "../pages/BloodUnitManager";
import BloodWarehouse from "../pages/BloodWarehouse";
import Campaigns from "../pages/CampaignManager";
import Dashboard from "../pages/Dashboard";
import Donors from "../pages/Donors";
import DetailCampaign from "../pages/ForUser/CampaignDetail";
import ChangePassword from "../pages/ForUser/ChangePassword";
import DashboardUser from "../pages/ForUser/Dashboard";
import BloodDonationRequests from "../pages/ForUser/ListRequest";
import ProfileDetail from "../pages/ForUser/ProfileDetail";
import ProfileEdit from "../pages/ForUser/ProfileEdit";
import BloodRequestPage from "../pages/ForUser/ReceiveBlood";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserManager from "../pages/UserManager";
import BloodReceiveRequestDetail from "../components/ReceiveBloodAdmin/ReceiveBloodAdminDetail";

// =================== Protected Home Redirect ===================
const ProtectedHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      const role = user.vaiTro;
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "nguoidung") {
        navigate("/user");
      } else if (role === "nhanvien") {
        navigate("/employee");
      }
    }
  }, [navigate]);

  return <Login />;
};

// =================== ROUTER CONFIG ===================
const router = createBrowserRouter([
  { path: "/", element: <ProtectedHome /> },
  { path: "/login", element: <ProtectedHome /> },
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
      { path: "bloods-manager", element: <BloodManager /> },
      { path: "bloods-manager/:id", element: <BloodDetail /> },
      { path: "blogs-manager", element: <BlogManager /> },
      {
        path: "blogs-manager/category-detail/:id",
        element: <BlogCategoryDetail />,
      },
      { path: "blogs-manager/blog-detail/:id", element: <BlogDetail /> },
      { path: "users-manager", element: <UserManager /> },
      { path: "users-manager/detail/:id", element: <UserDetail /> },
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

  // NOT FOUND - REDIRECT HOME
  { path: "*", element: <Navigate to="/" /> },
]);

export default router;
