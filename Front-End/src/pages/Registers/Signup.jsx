import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    birthDate: '',
    gender: 'Khac',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const userPayload = { ...formData };
      delete userPayload.confirmPassword;

      const response = await axios.post('http://localhost:8080/api/auth/register', userPayload);

      alert('Đăng ký thành công!');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Đăng ký thất bại: ' + error.response?.data || 'Lỗi không xác định');
    }
  };

  const responseGoogleSuccess = (credentialResponse) => {
    console.log('Google đăng ký thành công:', credentialResponse);
    alert('Google đăng ký thành công!');
    navigate('/home');
  };

  const responseGoogleFailure = () => {
    alert('Google đăng ký thất bại!');
  };

  return (
    <div className="login-banner-container">
      <div className="login-banner-left">
        <img src="/Banner-signup.jpg" alt="Signup Banner" className="login-banner-image" />
        <div className="login-banner-text">
          <h1>Tạo tài khoản</h1>
          <p>Bắt đầu hành trình cùng hệ thống!</p>
        </div>
      </div>

      <div className="login-banner-right">
        <form className="signupUnique-form" onSubmit={handleSubmit}>
          <h2 className="signupUnique-title">Đăng Ký</h2>

          <input name="username" placeholder="Tên người dùng" required value={formData.username} onChange={handleChange} />
          <input name="email" placeholder="Email" type="email" required value={formData.email} onChange={handleChange} />
          <input name="password" placeholder="Mật khẩu" type="password" required value={formData.password} onChange={handleChange} />
          <input name="confirmPassword" placeholder="Nhập lại mật khẩu" type="password" required value={formData.confirmPassword} onChange={handleChange} />

          <input name="fullName" placeholder="Họ và tên" value={formData.fullName} onChange={handleChange} />
          <input name="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleChange} />
          <input name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />

          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Nam">Nam</option>
            <option value="Nu">Nữ</option>
            <option value="Khac">Khác</option>
          </select>
          <button type="submit" className="signupUnique-submit">Đăng Ký</button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px', width: '100%' }}>
          <div className="divider">
            <span></span>
            <p>hoặc</p>
            <span></span>
          </div>

          <GoogleLogin onSuccess={responseGoogleSuccess} onError={responseGoogleFailure} />

          <p style={{ marginTop: '10px' }}>
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
