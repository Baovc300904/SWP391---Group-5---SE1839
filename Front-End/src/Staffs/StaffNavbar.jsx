import React, { useContext } from 'react'; // phải import useContext ở đây
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../routes/AuthContext'; // sửa đường dẫn nếu cần
import './StaffNavbar.css';

export default function StaffNavbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="staff-navbar">
      <div className="logo">
        <img src="/logo2.png" alt="Logo" />
        <div className="staff-title">Staff Panel</div>
      </div>
      <ul className="staff-nav-list">
        <li>
          <NavLink
            to="/dashboardStaff"
            className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/staff/orders"
            className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
          >
            Quản lý đơn hàng
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/staff/customers"
            className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
          >
            Quản lý khách hàng
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/staff/products"
            className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
          >
            Quản lý sản phẩm
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/staff/reports"
            className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
          >
            Báo cáo thống kê
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogout} className="staff-logout-button">
            Đăng xuất
          </button>
        </li>
      </ul>
    </nav>
  );
}
