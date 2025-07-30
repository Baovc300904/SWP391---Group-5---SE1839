import {
  BookOutlined,
  HomeOutlined,
  LockOutlined,
  LogoutOutlined,
  ProfileOutlined,
  PullRequestOutlined,
  SettingOutlined,
  UserOutlined,
  HeartOutlined,
  BellOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, Menu, Button, Avatar, Badge, Drawer } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import SupportModalButton from "../components/SupportModalButton";
import NotificationBellUser from "../components/NotificationBellUser";
import "./MainLayoutUser.css";

const { Header, Content, Footer } = Layout;

export default function MainLayoutUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const getSelectedKey = () => {
    if (location.pathname === "/user") return "dashboard";
    if (location.pathname.startsWith("/user/list-request")) return "list-request";
    if (location.pathname.startsWith("/user/receive-blood")) return "receive-blood";
    if (location.pathname.startsWith("/user/blog")) return "blog";
    if (location.pathname.startsWith("/user/near-me")) return "near-me";

    return "";
  };

  const settingsMenu = {
    items: [
      {
        key: "profile",
        icon: <ProfileOutlined />,
        label: "Xem hồ sơ",
        onClick: () => navigate("/user/profile"),
      },
      {
        key: "change-password",
        icon: <LockOutlined />,
        label: "Đổi mật khẩu",
        onClick: () => navigate("/user/change-password"),
      },
      {
        type: "divider",
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Đăng xuất",
        onClick: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
        },
      },
    ],
    style: {
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      borderRadius: 16,
      boxShadow: "0 12px 40px rgba(139, 69, 19, 0.3)",
      minWidth: 220,
      padding: "12px 0",
      border: "2px solid rgba(139, 69, 19, 0.2)",
      backdropFilter: "blur(20px)",
    },
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: "Hoạt động",
      onClick: () => navigate("/user"),
    },
    {
      key: "near-me",
      icon: <UserOutlined />,
      label: "Người dùng gần bạn",
      onClick: () => navigate("/user/near-me"),
    },
    {
      key: "list-request",
      icon: <ProfileOutlined />,
      label: "Lịch sử đăng ký",
      onClick: () => navigate("/user/list-request"),
    },
    {
      key: "receive-blood",
      icon: <PullRequestOutlined />,
      label: "Yêu cầu nhận máu",
      onClick: () => navigate("/user/receive-blood"),
    },
    {
      key: "blog",
      icon: <BookOutlined />,
      label: "Bài viết",
      onClick: () => navigate("/user/blog"),
    },
  ];

  const handleMobileMenuClose = () => {
    setMobileMenuVisible(false);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Header */}
      <Header className="main-header">
        {/* Logo */}
        <div className="logo-container" onClick={() => navigate("/user")}>
          <div className="logo-icon">
            <HeartOutlined style={{ color: "#fff", fontSize: "20px" }} />
          </div>
          <div className="logo-text">
            HỆ THỐNG HIẾN MÁU TÌNH NGUYỆN
          </div>
        </div>

        {/* Desktop Menu */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ display: "flex" }}>
            <Menu
              mode="horizontal"
              selectedKeys={[getSelectedKey()]}
              items={menuItems}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "500",
              }}
              theme="dark"
              className="skin-tone-menu"
            />
          </div>

          {/* Notifications */}
          <NotificationBellUser />

          {/* User Menu */}
          <Dropdown
            menu={settingsMenu}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Button type="text" className="user-dropdown-button">
              <Avatar
                size="small"
                icon={<UserOutlined />}
              />
              <span>Tài khoản</span>
            </Button>
          </Dropdown>

          {/* Mobile Menu Button */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            style={{
              color: "#fcd8cd",
              display: "none",
              fontSize: "18px",
            }}
            onClick={() => setMobileMenuVisible(true)}
          />
        </div>
      </Header>

      {/* Mobile Menu Drawer */}
      <Drawer
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <HeartOutlined style={{ color: "#fcd8cd", fontSize: "20px" }} />
            <span style={{ fontWeight: "600" }}>Menu</span>
          </div>
        }
        placement="right"
        onClose={handleMobileMenuClose}
        open={mobileMenuVisible}
        width={280}
        className="mobile-menu-drawer"
        styles={{
          body: { padding: "0" },
          header: { borderBottom: "1px solid #f0f0f0" },
        }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          style={{
            border: "none",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={handleMobileMenuClose}
          className="skin-tone-menu"
        />
        <div style={{ padding: "16px", borderTop: "1px solid #f0f0f0" }}>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            style={{ width: "100%", textAlign: "left", height: "48px" }}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
              handleMobileMenuClose();
            }}
          >
            Đăng xuất
          </Button>
        </div>
      </Drawer>

      {/* Content */}
      <Content
        style={{
          padding: "24px",
          minHeight: "calc(100vh - 140px)",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            width: "100%", // User requested this change
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
          }}
        >
          <Outlet />
        </div>
      </Content>

      {/* Footer */}
      <Footer
        style={{
          background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
          color: "#fff",
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <HeartOutlined style={{ color: "#fcd8cd", fontSize: "24px" }} />
            <span
              style={{
                fontSize: "20px",
                fontWeight: "700",
                letterSpacing: "0.5px",
              }}
            >
              Hiến Máu Cộng Đồng Việt
            </span>
          </div>
          
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "32px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontWeight: "600", marginBottom: "8px" }}>
                Liên hệ
              </div>
              <div style={{ fontSize: "14px", color: "#d1d5db" }}>
                support@hienmau.vn
              </div>
            </div>
            <div>
              <div style={{ fontWeight: "600", marginBottom: "8px" }}>
                Hotline
              </div>
              <div style={{ fontSize: "14px", color: "#d1d5db" }}>
                1900 1234
              </div>
            </div>
            <div>
              <div style={{ fontWeight: "600", marginBottom: "8px" }}>
                Địa chỉ
              </div>
              <div style={{ fontSize: "14px", color: "#d1d5db" }}>
                FPT University, Hà Nội
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid #374151",
              paddingTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div style={{ fontSize: "14px", color: "#9ca3af" }}>
              © 2025 Hiến Máu Cộng Đồng Việt. Tất cả quyền được bảo lưu.
            </div>
            <div style={{ display: "flex", gap: "24px" }}>
              <a
                href="/privacy-policy"
                style={{ color: "#d1d5db", textDecoration: "none" }}
              >
                Chính sách bảo mật
              </a>
              <a
                href="/terms-of-service"
                style={{ color: "#d1d5db", textDecoration: "none" }}
              >
                Điều khoản dịch vụ
              </a>
            </div>
          </div>
        </div>
      </Footer>

      <SupportModalButton />

      {/* Custom CSS for skin tone menu styling */}
      <style jsx="true">{`
        .skin-tone-menu .ant-menu-item-selected {
          background-color: rgba(210, 180, 140, 0.8) !important;
          color: #fff !important;
        }
        
        .skin-tone-menu .ant-menu-item:hover {
          background-color: rgba(210, 180, 140, 0.6) !important;
          color: #fff !important;
        }
        
        .skin-tone-menu .ant-menu-item {
          color: #fff !important;
        }
        
        .skin-tone-menu .ant-menu-item-selected::after {
          border-right-color: #b8860b !important;
        }
      `}</style>
    </Layout>
  );
}
