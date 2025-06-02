// components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your CSS file for styling

export default function Header() {
    
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

      {/* Login Button */}
      <div className="auth-container">
        <div className="login-button">
          <Link to="/Login">
            <i className="fa fa-user icon-user"></i> Đăng Nhập
          </Link>
        </div>
        <div className="signup-button">
          <Link to="/signup">
            <i className="fa fa-user icon-user"></i> Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
}
