import {
  BookOutlined,
  HomeOutlined,
  LockOutlined,
  LogoutOutlined,
  ProfileOutlined,
  PullRequestOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, Menu } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import SupportModalButton from "../components/SupportModalButton";
import NotificationBellUser from "../components/NotificationBellUser";

const { Header, Content, Footer } = Layout;

export default function MainLayoutUser() {
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedKey = () => {
    if (location.pathname === "/user") return "dashboard";
    if (location.pathname.startsWith("/user/list-request"))
      return "list-request";
    if (location.pathname.startsWith("/user/receive-blood"))
      return "receive-blood";
    if (location.pathname.startsWith("/user/blog")) return "blog";
    if (location.pathname.startsWith("/user/near-me")) return "near-me";

    return "";
  };

  const settingsMenu = {
    items: [
      {
        key: "profile",
        icon: <UserOutlined />,
        label: "Xem hồ sơ",
        onClick: () => navigate("/user/profile"),
        style: { color: "#333" },
      },
      {
        key: "change-password",
        icon: <LockOutlined />,
        label: "Đổi mật khẩu",
        onClick: () => navigate("/user/change-password"),
        style: { color: "#333" },
      },
    ],
    style: {
      backgroundColor: "#fff",
      borderRadius: 4,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      minWidth: 160,
    },
  };

  const menuItemStyle = {
    color: "#fff",
    display: "flex",
    alignItems: "center",
  };
  const linkStyle = { color: "#fff" };

  const menuItems = [
    {
      key: "near-me",
      icon: <UserOutlined style={menuItemStyle} />,
      label: (
        <Link to="/user/near-me" style={linkStyle}>
          Người dùng gần bạn
        </Link>
      ),
      style: {
        ...menuItemStyle,
        background: getSelectedKey() === "near-me" ? "#f89595" : "transparent",
      },
    },
    {
      key: "dashboard",
      icon: <HomeOutlined style={menuItemStyle} />,
      label: (
        <Link to="/user" style={linkStyle}>
          Hoạt động
        </Link>
      ),
      style: {
        ...menuItemStyle,
        background:
          getSelectedKey() === "dashboard" ? "#f89595" : "transparent",
      },
    },
    {
      key: "list-request",
      icon: <ProfileOutlined style={menuItemStyle} />,
      label: (
        <Link to="/user/list-request" style={linkStyle}>
          Lịch sử đăng ký
        </Link>
      ),
      style: {
        ...menuItemStyle,
        background:
          getSelectedKey() === "list-request" ? "#f89595" : "transparent",
      },
    },
    {
      key: "receive-blood",
      icon: <PullRequestOutlined style={menuItemStyle} />,
      label: (
        <Link to="/user/receive-blood" style={linkStyle}>
          Yêu cầu nhận máu
        </Link>
      ),
      style: {
        ...menuItemStyle,
        background:
          getSelectedKey() === "receive-blood" ? "#f89595" : "transparent",
      },
    },
    {
      key: "blog",
      icon: <BookOutlined style={menuItemStyle} />,
      label: (
        <Link to="/user/blog" style={linkStyle}>
          Bài viết
        </Link>
      ),
      style: {
        ...menuItemStyle,
        background: getSelectedKey() === "blog" ? "#f89595" : "transparent",
      },
    },
    {
      key: "settings",
      icon: <SettingOutlined style={menuItemStyle} />,
      label: (
        <Dropdown
          menu={settingsMenu}
          placement="bottomRight"
          trigger={["click"]}
        >
          <span style={linkStyle}>Cài đặt</span>
        </Dropdown>
      ),
      style: {
        ...menuItemStyle,
        background:
          getSelectedKey() === "settings" ? "#f89595" : "transparent",
      },
    },
    {
      key: "logout",
      icon: <LogoutOutlined style={menuItemStyle} />,
      label: <span style={linkStyle}>Đăng xuất</span>,
      style: {
        ...menuItemStyle,
        background: getSelectedKey() === "logout" ? "#f89595" : "transparent",
      },
      onClick: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#f44336",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18,
            lineHeight: "64px",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = "/user")}
        >
          HỆ THỐNG HIẾN MÁU TÌNH NGUYỆN
        </div>
        <NotificationBellUser />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          style={{
            background: "transparent",
            flex: 1,
            justifyContent: "flex-end",
            color: "#fff",
          }}
        />
      </Header>

      <Content style={{ background: "#f5f5f5" }}>
        <Outlet />
      </Content>

      {/* Footer Section */}
      <Footer
        style={{
          backgroundColor: "#f44336",
          color: "#fff",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        <div>© 2025 HỆ THỐNG HIẾN MÁU TÌNH NGUYỆN</div>
        <div style={{ marginTop: 10 }}>
          Liên hệ:{" "}
          <a href="mailto:support@example.com" style={{ color: "#fff" }}>
            support@example.com
          </a>{" "}
          | Hotline: 1800-1234
        </div>
        <div style={{ marginTop: 10 }}>
          <a href="/privacy-policy" style={{ color: "#fff", marginRight: 10 }}>
            Chính sách bảo mật
          </a>
          <a href="/terms-of-service" style={{ color: "#fff" }}>
            Điều khoản dịch vụ
          </a>
        </div>
      </Footer>
      <SupportModalButton />
    </Layout>
  );
}
