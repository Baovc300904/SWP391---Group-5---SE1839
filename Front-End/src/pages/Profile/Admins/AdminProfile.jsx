import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogsData from '@/data/initialNews'; // Đường dẫn đúng của bạn
import './AdminProfile.css';

export default function AdminProfile() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Lỗi phân tích user từ localStorage:', error);
      }
    }
    setBlogs(blogsData);
  }, []);

  if (!user) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-loading-spinner"></div>
        <p>Đang tải thông tin người dùng...</p>
      </div>
    );
  }

  return (
    <div className="admin-profile-wrapper">
      <aside className="admin-sidebar">
        <img
          src={user.avatar || '/default-avatar.png'}
          alt="Avatar"
          className="admin-avatar"
        />
        <h2 className="admin-username">{user.name || 'Tên không có'}</h2>
        <p className="admin-info"><strong>Email:</strong> {user.email}</p>
        <p className="admin-info"><strong>Vai trò:</strong> {user.role || 'Admin'}</p>

        <button
          onClick={() => navigate('/quan-tri-vien/edit-profile')}
          className="admin-btn admin-btn-edit"
        >
          ✏️ Chỉnh sửa hồ sơ
        </button>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="admin-btn admin-btn-dashboard"
        >
          🏠 Bảng điều khiển
        </button>

        <nav className="admin-nav-menu">
          <h3>⚙️ Chức năng quản trị</h3>
          <ul>
            <li onClick={() => navigate('/admin/manage-users')}>👥 Quản lý người dùng</li>
            <li onClick={() => navigate('/admin/manage-blogs')}>📝 Quản lý bài viết</li>
            <li onClick={() => navigate('/admin/settings')}>⚙️ Cài đặt hệ thống</li>
          </ul>
        </nav>
      </aside>

      <main className="admin-main-content">
        <section className="admin-section">
          <h3>📚 Bài blog đã đăng</h3>
          {blogs.length > 0 ? (
            <ul className="admin-blog-list">
              {blogs.map((blog) => (
                <li key={blog.id} onClick={() => alert(`Xem blog: ${blog.title}`)} className="admin-blog-item">
                  <span className="blog-title">{blog.title}</span>
                  <span className="blog-date">{blog.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Chưa có bài blog nào.</p>
          )}
        </section>

        <section className="admin-section">
          <h3>💬 Tin nhắn gần đây</h3>
          <p className="admin-message-placeholder">(Tính năng đang phát triển...)</p>
        </section>
      </main>
    </div>
  );
}
