import React, { useEffect, useState, useCallback, useContext } from "react";
import { throttle } from "lodash";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import {
  HomeOutlined,
  ProfileOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  LockOutlined,
  FileTextOutlined,
  MessageOutlined,
  HeartOutlined,
  FormOutlined,
  BookOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Outlet, Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Footer from "../Footers/Footer";
import "./MainLayoutUser.css";

const { Header, Content } = Layout;

// ✅ useThrottledScroll hook
function useThrottledScroll(throttleDelay = 100) {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(
    throttle(() => {
      setIsScrolled(window.scrollY > 100);
    }, throttleDelay),
    [throttleDelay]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);

  return isScrolled;
}

// ✅ useThrottledResize hook
function useThrottledResize(throttleDelay = 100) {
  const isClient = typeof window === "object";
  const getIsMobile = () => (isClient ? window.innerWidth < 768 : false);
  const [isMobile, setIsMobile] = useState(getIsMobile);

  const handleResize = useCallback(
    throttle(() => setIsMobile(getIsMobile()), throttleDelay),
    [throttleDelay]
  );

  useEffect(() => {
    if (!isClient) return;
    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, [handleResize, isClient]);

  return isMobile;
}

/**
 * Renders the main user layout with header, navigation bar, content area, and footer for authenticated users.
 *
 * Displays a responsive header with logo and user menu, a navigation bar with links and dropdowns, and a content area for nested routes. The layout adapts to mobile and desktop views and highlights the active navigation item based on the current route.
 */
export default function MainLayoutUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);
  const isScrolled = useThrottledScroll();
  const isMobile = useThrottledResize();

  const getSelectedKey = () => {
    if (location.pathname === "/user/home") return "home";
    if (location.pathname === "/user/dashboard") return "dashboard";
    if (location.pathname === "/user/blogs") return "news";
    if (location.pathname === "/user/news") return "news";
    if (location.pathname === "/user/contact") return "contact";
    if (location.pathname === "/user/blood-donation") return "blood-donation";
    if (location.pathname === "/user/blood-request") return "blood-request";
    return "";
  };

  const newsMenuItems = [
    {
      key: "news",
      icon: <FileTextOutlined />,
      label: "Tin tức",
      onClick: () => navigate("/user/news"),
    },
    {
      key: "blogs",
      icon: <BookOutlined />,
      label: "Blog",
      onClick: () => navigate("/user/blogs"),
    },
  ];

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
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
        logout();
        navigate("/login");
      },
    },
  ];

  return (
    <Layout className={`app-layout ${isMobile ? "mobile" : ""}`}>
      {/* Header với logo */}
      <Header className={`main-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          <div className="header-left">
            <Link to="/user/home" className="logo-link">
              <img 
                src="/icon-tab.png" 
                alt="Logo" 
                className="logo-image"
                width={isMobile ? 40 : 50} 
                height={isMobile ? 40 : 50}
              />
              <span className="site-name">Hiến Máu Cộng Đồng Việt</span>
            </Link>
          </div>

          <div className="header-right">
            <Dropdown 
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <div className="user-info">
                <Avatar
                  size={32}
                  src={user?.avatar || "/src/assets/images/avatars/user.png"}
                  icon={<UserOutlined />}
                  className="user-avatar"
                />
                <span className="user-name">
                  {user?.ten || user?.tenDangNhap || "User"}
                </span>
                <DownOutlined className="dropdown-icon" />
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>

      {/* Navigation bar */}
      <nav className={`navbar ${isScrolled ? 'sticky' : 'below-header'} ${isMobile ? 'mobile' : ''}`}>
        <div className="nav-container">
          <div className="nav-center">
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink
                  to="/user/home"
                  className={`nav-link ${getSelectedKey() === "home" ? 'active' : ''}`}
                >
                  <HomeOutlined />
                  <span>Trang chủ</span>
                </NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink
                  to="/user/dashboard"
                  className={`nav-link ${getSelectedKey() === "dashboard" ? 'active' : ''}`}
                >
                  <ProfileOutlined />
                  <span>Lịch sử</span>
                </NavLink>
              </li>
              
              <li className="nav-item">
                <Dropdown 
                  menu={{ items: newsMenuItems }}
                  placement="bottom"
                  trigger={['hover']}
                >
                  <div className={`nav-link ${getSelectedKey() === "news" ? 'active' : ''}`}>
                    <FileTextOutlined />
                    <span>Tin tức</span>
                    <DownOutlined className="dropdown-icon" />
                  </div>
                </Dropdown>
              </li>
              
              <li className="nav-item">
                <NavLink
                  to="/user/blood-donation"
                  className={`nav-link ${getSelectedKey() === "blood-donation" ? 'active' : ''}`}
                >
                  <HeartOutlined />
                  <span>Hiến máu</span>
                </NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink
                  to="/user/blood-request"
                  className={`nav-link ${getSelectedKey() === "blood-request" ? 'active' : ''}`}
                >
                  <FormOutlined />
                  <span>Yêu cầu</span>
                </NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink
                  to="/user/contact"
                  className={`nav-link ${getSelectedKey() === "contact" ? 'active' : ''}`}
                >
                  <MessageOutlined />
                  <span>Liên hệ</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <Content className="main-content">
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
}
