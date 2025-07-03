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
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser.role !== 'admin') {
      user.role = storedUser.role; // không cho user khác admin chỉnh role
    }
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/profile');
  };

  const editableRoles = ['admin'];

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

        <div className="form-group">
          <label>Vai trò:</label>
          {editableRoles.includes(user.role) ? (
            <select name="role" value={user.role} onChange={handleChange} required>
              <option value="admin">Admin</option>
              <option value="staff">Nhân viên</option>
              <option value="member">Người dùng</option>
            </select>
          ) : (
            <input type="text" value={user.role} disabled />
          )}
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
