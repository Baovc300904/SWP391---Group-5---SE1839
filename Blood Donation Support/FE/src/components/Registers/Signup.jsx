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
      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: 'member',
      };

      const response = await axios.post('https://6837f5ae2c55e01d184b5a85.mockapi.io/api/v1/users', newUser);

      localStorage.setItem('user', JSON.stringify(response.data));
      alert('Đăng ký thành công!');
      navigate('/home');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Đăng ký thất bại. Vui lòng thử lại!');
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
      {/* Banner trái */}
      <div className="login-banner-left">
        <img src="/signup-banner.avif" alt="Signup Banner" className="login-banner-image" />
        <div className="login-banner-text">
          <h1>Tạo tài khoản</h1>
          <p>Bắt đầu hành trình cùng hệ thống!</p>
        </div>
      </div>

      {/* Form đăng ký bên phải */}
      <div className="login-banner-right">
        <form className="signupUnique-form" onSubmit={handleSubmit}>
          <h2 className="signupUnique-title">Đăng Ký</h2>

          <input
            type="text"
            name="username"
            placeholder="Tên người dùng"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="signupUnique-submit">Đăng Ký</button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px', width: '100%' }}>
          <div className="divider">
            <span></span>
            <p>hoặc</p>
            <span></span>
          </div>

          <GoogleLogin
            onSuccess={responseGoogleSuccess}
            onError={responseGoogleFailure}
          />

          <p style={{ marginTop: '10px' }}>
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
