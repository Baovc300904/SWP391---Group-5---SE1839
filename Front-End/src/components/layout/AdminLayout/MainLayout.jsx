import { Layout, Menu } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  ProjectOutlined,
  LogoutOutlined,
  TeamOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const { Header, Sider, Content } = Layout;

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const displayName = user?.ten || user?.tenDangNhap || "Admin";
  const email = user?.email || "";

  // Xác định menu đang được chọn
  const getSelectedKey = () => {
    if (location.pathname === "/") return "dashboard";
    if (location.pathname.startsWith("/donors")) return "donors";
    if (location.pathname.startsWith("/bloods-manager"))
      return "bloods-manager";
    if (location.pathname.startsWith("/users-manager")) return "users-manager";
    if (location.pathname.startsWith("/blogs-manager")) return "blogs-manager";
    if (location.pathname.startsWith("/blog-categories-manager")) return "blog-categories-manager";
    if (location.pathname.startsWith("/campaigns-manager"))
      return "campaigns-manager";
    return "";
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            color: "#fff",
            padding: 20,
            fontWeight: "bold",
            fontSize: 16,
            background: "linear-gradient(135deg, #FF5722 60%, #E91E63 100%)",
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
          items={[
            {
              key: "dashboard",
              icon: <HomeOutlined />,
              label: <NavLink to="/admin" style={({ isActive }) => ({ color: isActive ? '#F44336' : undefined, fontWeight: isActive ? 'bold' : undefined })}>Dashboard</NavLink>,
            },
            {
              key: "donors",
              icon: <TeamOutlined />,
              label: <NavLink to="/admin/donors" style={({ isActive }) => ({ color: isActive ? '#F44336' : undefined, fontWeight: isActive ? 'bold' : undefined })}>Donors</NavLink>,
            },
            {
              key: "bloods-manager",
              icon: <ProjectOutlined />,
              label: <NavLink to="/admin/bloods-manager" style={({ isActive }) => ({ color: isActive ? '#F44336' : undefined, fontWeight: isActive ? 'bold' : undefined })}>Bloods</NavLink>,
            },
            {
              key: "users-manager",
              icon: <UserOutlined />,
              label: <NavLink to="/admin/users-manager" style={({ isActive }) => ({ color: isActive ? '#F44336' : undefined, fontWeight: isActive ? 'bold' : undefined })}>Users</NavLink>,
            },
            {
              key: "blogs-manager",
              icon: <BookOutlined />,
              label: <NavLink to="/admin/blogs-manager" style={({ isActive }) => ({ color: isActive ? '#F44336' : undefined, fontWeight: isActive ? 'bold' : undefined })}>Blogs</NavLink>,
            },
            {
              key: "blog-categories-manager",
              icon: <BookOutlined />,
              label: <NavLink to="/admin/blog-categories-manager" style={({ isActive }) => ({ color: isActive ? '#F44336' : undefined, fontWeight: isActive ? 'bold' : undefined })}>Blog Categories</NavLink>,
            },
            {
              key: "campaigns-manager",
              icon: <ProjectOutlined />,
              label: <NavLink to="/admin/campaigns-manager" style={({ isActive }) => ({ color: isActive ? '#F44336' : undefined, fontWeight: isActive ? 'bold' : undefined })}>Campaigns</NavLink>,
            },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: (
                <span
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </span>
              ),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#F44336",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18,
            paddingLeft: 24,
          }}
        >
          SIMPLE BLOOD DONORS MANAGEMENT SYSTEM
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
