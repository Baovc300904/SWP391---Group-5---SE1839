import {
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./MainLayout.css"; // Import file CSS tùy chỉnh

const { Header, Sider, Content, Footer } = Layout;

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const displayName = user?.ten || user?.tenDangNhap || "Quản trị viên";
  const email = user?.email || "";

  // Xác định menu đang được chọn
  const getSelectedKey = () => {
    if (location.pathname === "/admin") return "dashboard";
    if (location.pathname.startsWith("/admin/donors")) return "donors";
    if (location.pathname.startsWith("/admin/bloods-manager"))
      return "bloods-manager";
    if (location.pathname.startsWith("/admin/users-manager"))
      return "users-manager";
    if (location.pathname.startsWith("/admin/blogs-manager"))
      return "blogs-manager";
    if (location.pathname.startsWith("/admin/campaigns-manager"))
      return "campaigns-manager";
    if (location.pathname.startsWith("/admin/blood-donation-request"))
      return "blood-donation-request"; // Mới thêm trường hợp cho Yêu cầu hiến máu
    if (location.pathname.startsWith("/admin/blood-unit-warehouses"))
      return "blood-unit-warehouses"; // Thêm trường hợp cho Quản lý kho đơn vị máu
    if (location.pathname.startsWith("/admin/receive-blood-manager"))
      return "receive-blood-manager"; // Thêm trường hợp cho Quản lý yêu cầu nhận máu
    return "";
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={240} breakpoint="lg" collapsedWidth="0">
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
          selectedKeys={[getSelectedKey()]} // Làm sáng menu đang được chọn
          items={[
            {
              key: "dashboard",
              icon: <HomeOutlined />,
              label: <Link to="/admin">Tổng quan</Link>,
            },

            {
              key: "bloods-manager",
              icon: <ProjectOutlined />,
              label: <Link to="/admin/bloods-manager">Nhóm máu</Link>,
            },
            {
              key: "blood-donation-request", // Thêm mục menu cho Yêu cầu hiến máu
              icon: <ProjectOutlined />,
              label: (
                <Link to="/admin/blood-donation-request">Yêu cầu hiến máu</Link>
              ),
            },
            {
              key: "blood-unit-warehouses", // Thêm mục menu cho Quản lý kho đơn vị máu
              icon: <ProjectOutlined />,
              label: (
                <Link to="/admin/blood-unit-warehouses">Kho đơn vị máu</Link>
              ),
            },
            {
              key: "receive-blood-manager", // Mới thêm mục menu cho Yêu cầu nhận máu
              icon: <ProjectOutlined />,
              label: (
                <Link to="/admin/receive-blood-manager">Yêu cầu nhận máu</Link>
              ),
            },
            {
              key: "users-manager",
              icon: <UserOutlined />,
              label: <Link to="/admin/users-manager">Người dùng</Link>,
            },
            {
              key: "blogs-manager",
              icon: <BookOutlined />,
              label: <Link to="/admin/blogs-manager">Bài viết</Link>,
            },
            {
              key: "campaigns-manager",
              icon: <ProjectOutlined />,
              label: <Link to="/admin/campaigns-manager">Chiến dịch</Link>,
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
          QUẢN LÝ HỆ THỐNG HIẾN MÁU
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <Outlet />
        </Content>

        {/* Footer */}
        <Footer
          style={{
            textAlign: "center",
            background: "#F44336",
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
