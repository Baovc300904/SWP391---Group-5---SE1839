import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import PandaLoginForm from '../PandaLoginForm/PandaLoginForm.jsx';
import sampleUsers from '../../data/login.json';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = sampleUsers.find(u => u.email === email && u.password === password);

    if (user) {
      alert('Đăng nhập thành công!');
      localStorage.setItem('user', JSON.stringify(user));

      switch (user.role) {
        case 'admin':
          navigate('/adminDashboard');
          break;
        case 'staff':
          navigate('/dashboardStaff');
          break;
        default:
          navigate('/home');
      }
    } else {
      alert('Sai email hoặc mật khẩu!');
    }
  };

  const responseGoogleSuccess = (credentialResponse) => {
    console.log('Google login thành công:', credentialResponse);
    alert('Google login thành công!');
  };

  const responseGoogleFailure = () => {
    alert('Google login thất bại!');
  };

  return (
    <div className="login-banner-container">
      {/* Banner bên trái */}
      <div className="login-banner-left">
        <img src="/login-banner.avif" alt="Login Banner" className="login-banner-image" />
        <div className="login-banner-text">
          <h1>Welcome Back!</h1>
          <p>Đăng nhập để tiếp tục trải nghiệm hệ thống</p>
        </div>
      </div>

      {/* Form login + Google Login bên phải */}
      <div className="login-banner-right">
        <PandaLoginForm
          email={email}
          password={password}
          onEmailChange={e => setEmail(e.target.value)}
          onPasswordChange={e => setPassword(e.target.value)}
          onSubmit={handleSubmit}
        />

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
            Chưa có tài khoản? <Link to="/signup">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
