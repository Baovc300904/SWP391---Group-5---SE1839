import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './StaffNavbar.css';

export default function StaffNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const linkClass = ({ isActive }) => (isActive ? 'active' : '');

  return (
    <div className="staff-navbar">
      <h2 className="navbar-title">STAFF DASHBOARD</h2>
      <nav className="navbar-links">
        <NavLink to="/dashboard-staff" className={linkClass}>
          Trang chủ
        </NavLink>
        <NavLink to="/donor-registrations" className={linkClass}>
          Đăng ký hiến máu
        </NavLink>
        <NavLink to="/events" className={linkClass}>
          Lịch tổ chức
        </NavLink>
        <NavLink to="/statistics" className={linkClass}>
          Thống kê
        </NavLink>
        <NavLink to="/profile" className={linkClass}>
          Thông tin cá nhân
        </NavLink>
        <button className="logout-btn" onClick={handleLogout}>
          Đăng xuất
        </button>
      </nav>
    </div>
  );
}
