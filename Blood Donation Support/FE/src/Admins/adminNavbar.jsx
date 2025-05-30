import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');  // Xóa thông tin user khi đăng xuất
    navigate('/login');                // Chuyển về trang đăng nhập
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>Admin Panel</div>
      <ul style={styles.navList}>
        <li>
          <NavLink to="/adminDashboard" style={styles.link} activeStyle={styles.activeLink}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/adminPosts" style={styles.link} activeStyle={styles.activeLink}>
            Quản lý bài viết
          </NavLink>
        </li>
        <li>
          <NavLink to="/adminUsers" style={styles.link} activeStyle={styles.activeLink}>
            Quản lý người dùng
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogout} style={styles.logoutButton}>Đăng xuất</button>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: '10px 20px',
    color: 'white',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
  },
  activeLink: {
    color: '#4caf50',
    borderBottom: '2px solid #4caf50',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    border: 'none',
    color: 'white',
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '4px',
  },
};
