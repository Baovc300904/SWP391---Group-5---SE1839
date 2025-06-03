import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import adminAvatar from "../../assets/images/avatars/admins.jpg";
import './Header.css';

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="header-nav">
      {/* Logo + Title Section */}
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

      {/* Login / Signup or User Profile */}
      <div className="auth-container">
        {user ? (
          <div className="user-profile">
            <img
              src={user.avatar || adminAvatar}
              alt="User Avatar"
              className="avatar"
              onClick={() => navigate('/profile')}
              style={{ cursor: 'pointer' }}
            />
            <div className="user-info">
              <span className="username">{user.name || user.email}</span>
              <button className="logout-button" onClick={handleLogout}>
                Đăng xuất
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
