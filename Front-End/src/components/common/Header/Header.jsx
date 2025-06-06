import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaHandsHelping, FaQuestionCircle, FaCog, FaSignOutAlt, FaMoon, FaSun  } from 'react-icons/fa';
import adminAvatar from "../../../assets/images/avatars/admins.jpg";
import './Header.css';

export default function Header() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light'); // light hoặc dark

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Khi theme thay đổi, gán class tương ứng cho body
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light');
    }
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Hàm toggle theme
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="header-nav">
      <div className="logo-title-container">
        <div className="logo">
          <Link to="/">
            <img src="/logo2.png" alt="Logo" />
          </Link>
        </div>
        <div className="title">
          <img src="/title2.png" alt="title" />
        </div>
      </div>

      <div className="auth-container">
        {user ? (
          <div className="user-profile" onClick={toggleDropdown}>
            <img
              src={user.avatar || adminAvatar}
              alt="User Avatar"
              className="avatar"
            />
            <span className="username">{user.name || user.email}</span>

            <div className={`dropdown ${showDropdown ? 'open' : 'closed'}`}>
              <button onClick={() => navigate('/profile')}>
                <FaUser style={{ marginRight: 8 }} /> Hồ sơ cá nhân
              </button>
              <button onClick={() => navigate('/profile/donation-request')}>
                <FaHandsHelping style={{ marginRight: 8 }} /> Yêu cầu hiến máu
              </button>
              <button onClick={() => navigate('/help')}>
                <FaQuestionCircle style={{ marginRight: 8 }} /> Trợ giúp
              </button>
              <button onClick={() => navigate('/settings')}>
                <FaCog style={{ marginRight: 8 }} /> Cài đặt
              </button>
              <button onClick={toggleTheme}>
                {theme === 'dark' ? (
                  <FaMoon style={{ marginRight: 8 }} />
                ) : (
                  <FaSun  style={{ marginRight: 8 }} />
                )}
                Đổi Theme
              </button>
              <div className="divide"></div>
              <button onClick={handleLogout}>
                <FaSignOutAlt style={{ marginRight: 8 }} /> Đăng xuất
              </button>
            </div>

          </div>
        ) : (
          <>
            <div className="login-button">
              <Link to="/login">
                <i className="fa fa-user icon-user"></i> Đăng Nhập
              </Link>
            </div>
            <div className="signup-button">
              <Link to="/signup">
                <i className="fa fa-user icon-user"></i> Đăng ký
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
