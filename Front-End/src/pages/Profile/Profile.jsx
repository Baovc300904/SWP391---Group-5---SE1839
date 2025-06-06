import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setBlogs([
      { id: 1, title: 'Lợi ích của hiến máu', date: '2025-06-01' },
      { id: 2, title: 'Những điều cần biết trước khi hiến máu', date: '2025-05-20' },
    ]);
  }, []);

  if (!user)
    return <div className="profile-loading">Đang tải thông tin người dùng...</div>;

  return (
    <div class="neon-profile-body">
      <div className="profile-container">
        <div className="profile-left">
          <img
            src={user.avatar || '/default-avatar.png'}
            alt="Avatar"
            className="profile-avatar"
          />
          <h2>{user.name || 'Tên không có'}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Vai trò:</strong> {user.role}</p>

          <button
            onClick={() => navigate('/profile/edit-profile')}
            className="btn btn-edit pulse"
          >
            ✏️ Chỉnh sửa
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn btn-home"
          >
            🏠 Trang chủ
          </button>

          <div className="profile-menu">
            <h3>⚙️ Chức năng</h3>
            <ul>
              <li onClick={() => navigate('/profile/donation-request')}>🩸 Yêu cầu hiến máu</li>
              <li onClick={() => navigate('/profile/messages')}>💬 Tin nhắn</li>
              <li onClick={() => navigate('/profile/settings')}>⚙️ Cài đặt</li>
            </ul>
          </div>
        </div>

        <div className="profile-right">
          <div className="profile-section">
            <h3>📚 Blog đã đăng</h3>
            {blogs.length > 0 ? (
              <ul className="blog-list">
                {blogs.map((blog) => (
                  <li key={blog.id} onClick={() => alert(`Xem blog: ${blog.title}`)}>
                    <span>{blog.title}</span>
                    <span>{blog.date}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Chưa có bài blog nào.</p>
            )}
          </div>

          <div className="profile-section">
            <h3>💬 Tin nhắn gần đây</h3>
            <p>(Tính năng đang phát triển...)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
