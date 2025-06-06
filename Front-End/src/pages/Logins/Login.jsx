import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import PandaLoginForm from '../../components/PandaLoginForm/PandaLoginForm.jsx';
// import sampleUsers from '../../data/login.json';
import './Login.css';

import { AuthContext } from '../../contexts/AuthContext.jsx'; // import đúng đường dẫn của bạn

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy login từ AuthContext
  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (location.state && location.state.error) {
      setPopupMessage(location.state.error);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.get('https://6837f5ae2c55e01d184b5a85.mockapi.io/api/v1/users');
      const users = res.data;
  
      const user = users.find(u => u.email === email && u.password === password);
  
      if (user) {
        setErrorMessage('');
        login(user);
  
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
        setErrorMessage('Sai email hoặc mật khẩu!');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      setErrorMessage('Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.');
    }
  };

  const responseGoogleSuccess = (credentialResponse) => {
    console.log('Google login thành công:', credentialResponse);
    alert('Google login thành công!');
    // TODO: Xử lý login qua Google, gọi login() khi có dữ liệu user thực
  };

  const responseGoogleFailure = () => {
    alert('Google login thất bại!');
  };

  return (
    <div className="login-banner-container">
      {popupMessage && (
        <div className="popup">
          <p>{popupMessage}</p>
          <button onClick={() => setPopupMessage('')}>Đóng</button>
        </div>
      )}

      <div className="login-banner-left">
        <img src="/Banner-log.jpg" alt="Login Banner" className="login-banner-image" />
        <div className="login-banner-text">
          <h1>Welcome Back!</h1>
          <p>Đăng nhập để tiếp tục trải nghiệm hệ thống</p>
        </div>
      </div>

      <div className="login-banner-right">
        <PandaLoginForm
          email={email}
          password={password}
          onEmailChange={e => setEmail(e.target.value)}
          onPasswordChange={e => setPassword(e.target.value)}
          onSubmit={handleSubmit}
          errorMessage={errorMessage}
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

        <div className="backHome-button">
          <Link to="/" className="backHome-link">
            <button className="backHome-btn">Quay về trang chủ</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
