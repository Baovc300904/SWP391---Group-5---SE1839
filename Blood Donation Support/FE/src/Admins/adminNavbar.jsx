import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AdminNavbar.css'; // Đảm bảo bạn đã tạo file CSS này để định dạng navbar

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');  // Xóa thông tin user khi đăng xuất
    navigate('/login');                // Chuyển về trang đăng nhập
  };

  return (
    <nav className="navbar">
      <div className="logo">Admin Panel</div>
      <ul className="nav-list">
        <li>
          <NavLink
            to="/adminDashboard"
            className={({ isActive }) => isActive ? 'link active-link' : 'link'}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/adminPosts"
            className={({ isActive }) => isActive ? 'link active-link' : 'link'}
          >
            Quản lý bài viết
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/adminUsers"
            className={({ isActive }) => isActive ? 'link active-link' : 'link'}
          >
            Quản lý người dùng
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            Đăng xuất
          </button>
        </li>
      </ul>
    </nav>
  );
}
