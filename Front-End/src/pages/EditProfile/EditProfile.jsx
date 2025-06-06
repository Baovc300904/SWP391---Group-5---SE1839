import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

export default function EditProfile() {
  const [user, setUser] = useState({ name: '', email: '', role: '', avatar: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/profile');
  };

  return (
    <div className="edit-profile-wrapper">
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <h2>Chỉnh sửa thông tin cá nhân</h2>

        <div className="avatar-preview">
          <img
            src={user.avatar || '/default-avatar.png'}
            alt="Avatar Preview"
            onError={(e) => (e.target.src = '/default-avatar.png')}
          />
        </div>

        <div className="form-group">
          <label>Họ tên:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Nhập họ tên"
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={user.email}
            disabled
          />
        </div>

        <div className="form-group">
          <label>URL Avatar:</label>
          <input
            type="text"
            name="avatar"
            value={user.avatar}
            onChange={handleChange}
            placeholder="https://link-to-image.jpg"
          />
        </div>

        <div className="edit-profile-buttons">
          <button type="submit" className="btn-save">💾 Lưu thay đổi</button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate('/profile')}
          >
            ↩️ Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
