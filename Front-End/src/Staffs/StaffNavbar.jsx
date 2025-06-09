import React, { useContext, useState } from 'react'; // thêm useState
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner/LoadingSpinner.jsx'; // import loading spinner
import './StaffNavbar.css';

export default function StaffNavbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      logout();
      setIsLoading(false);
      navigate('/login');
    }, 1000); // giả lập 1 giây delay
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
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
            <button
              onClick={handleLogout}
              className="staff-logout-button"
              disabled={isLoading} // disable khi loading
            >
              Đăng xuất
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
