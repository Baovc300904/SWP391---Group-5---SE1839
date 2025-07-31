import {
  BellOutlined,
  BookOutlined,
  GiftOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./MainLayout.css";

const { Header, Sider, Content, Footer } = Layout;

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const displayName = user?.ten || user?.tenDangNhap || "Quản trị viên";
  const email = user?.email || "";
  const vaiTro = user?.vaiTro || "";

  // Route prefix theo role
  const prefix = vaiTro === "admin" ? "/admin" : "/employee";

  // Hàm xác định key menu đang được chọn
  const getSelectedKey = () => {
    if (location.pathname === `${prefix}`) return "dashboard";
    if (location.pathname.startsWith(`${prefix}/users-manager`))
      return "users-manager";
    if (location.pathname.startsWith(`${prefix}/campaigns-manager`))
      return "campaigns-manager";
    if (location.pathname.startsWith(`${prefix}/bloods-manager`))
      return "bloods-manager";
    if (location.pathname.startsWith(`${prefix}/blood-donation-request`))
      return "blood-donation-request";
    if (location.pathname.startsWith(`${prefix}/blood-unit-warehouses`))
      return "blood-unit-warehouses";
    if (location.pathname.startsWith(`${prefix}/receive-blood-manager`))
      return "receive-blood-manager";
    if (location.pathname.startsWith(`${prefix}/blogs-manager`))
      return "blogs-manager";
    if (location.pathname.startsWith(`${prefix}/support-ticket`))
      return "support-ticket";
    if (location.pathname.startsWith(`${prefix}/notification`))
      return "notification";
    return "";
  };

  // Menu cho admin
  const menuAdmin = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: <Link to="/admin">Tổng quan</Link>,
    },
    {
      key: "users-manager",
      icon: <UserOutlined />,
      label: <Link to="/admin/users-manager">Người dùng / Nhân viên</Link>,
    },
    {
      key: "campaigns-manager",
      icon: <ProjectOutlined />,
      label: <Link to="/admin/campaigns-manager">Chiến dịch</Link>,
    },
    {
      key: "support-ticket",
      icon: <GiftOutlined />,
      label: <Link to="/admin/support-ticket">Hỗ trợ</Link>,
    },
    {
      key: "notification",
      icon: <BellOutlined />,
      label: <Link to="/admin/notification">Thông báo</Link>,
    },

    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: (
        <span
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Đăng xuất
        </span>
      ),
    },
  ];

  // Menu cho nhân viên quản lý
  const menuNhanVien = [
    {
      key: "bloods-manager",
      icon: <ProjectOutlined />,
      label: <Link to="/employee/bloods-manager">Nhóm máu</Link>,
    },
    {
      key: "blood-donation-request",
      icon: <ProjectOutlined />,
      label: (
        <Link to="/employee/blood-donation-request">Yêu cầu hiến máu</Link>
      ),
    },
    {
      key: "blood-unit-warehouses",
      icon: <ProjectOutlined />,
      label: <Link to="/employee/blood-unit-warehouses">Kho đơn vị máu</Link>,
    },
    {
      key: "receive-blood-manager",
      icon: <ProjectOutlined />,
      label: <Link to="/employee/receive-blood-manager">Yêu cầu nhận máu</Link>,
    },
    {
      key: "blogs-manager",
      icon: <BookOutlined />,
      label: <Link to="/employee/blogs-manager">Bài viết</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: (
        <span
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Đăng xuất
        </span>
      ),
    },
  ];

  const menuItems = vaiTro === "admin" ? menuAdmin : menuNhanVien;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={240} breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            color: "#fff",
            padding: 20,
            fontWeight: "bold",
            fontSize: 16,
            background: "linear-gradient(135deg, #1976d2 60%, #2196f3 100%)",
            marginBottom: 8,
            borderRadius: 8,
            margin: 8,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 22, marginBottom: 8 }}>
            <UserOutlined />
          </div>
          {displayName} <br />
          <span style={{ fontSize: 12 }}>{email}</span>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18,
            paddingLeft: 24,
          }}
        >
          QUẢN LÝ HỆ THỐNG HIẾN MÁU
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#1976d2",
            color: "#fff",
            padding: "16px 0",
          }}
        >
          © 2025 Quản lý hệ thống hiến máu.
        </Footer>
      </Layout>
    </Layout>
  );
}
