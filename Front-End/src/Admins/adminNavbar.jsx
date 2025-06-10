import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner/LoadingSpinner.jsx';
 // import component loading spinner
import './AdminNavbar.css';

export default function AdminNavbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // state loading
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    console.log('Logging out user...');
    setIsLoading(true);

    // Giả lập async logout nếu cần (ví dụ gọi API logout)
    setTimeout(() => {
      logout();
      console.log('Người dùng đã đăng xuất, chuyển hướng đến trang đăng nhập');
      setIsLoading(false);
      navigate('/login');
    }, 1000); // giả lập 1 giây delay, nếu logout sync thì có thể bỏ setTimeout
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <nav className="admin-navbar">
        <div className="logo">
          <img src="/logo2.png" alt="Logo" />
          <div className="admin-title">Admin Panel</div>
        </div>
        <ul className="nav-list">
          <li>
            <NavLink
              to="/adminDashboard"
              className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
            >
              🏠 Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/adminManagePost"
              className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
            >
              Quản lý bài viết
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/adminUsers"
              className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
            >
              Quản lý người dùng
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout} className="admin-logout-button" disabled={isLoading}>
              Đăng xuất
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
