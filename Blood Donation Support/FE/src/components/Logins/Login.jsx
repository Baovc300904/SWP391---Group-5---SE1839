import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import PandaLoginForm from '../PandaLoginForm/PandaLoginForm.jsx';
import sampleUsers from '../../data/login.json';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [popupMessage, setPopupMessage] = useState(''); // Thêm popup
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Nếu có lỗi từ PrivateRoutes truyền sang
    if (location.state && location.state.error) {
      setPopupMessage(location.state.error);
      // Xóa state trong history sau khi lấy xong
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = sampleUsers.find(u => u.email === email && u.password === password);

    if (user) {
      setErrorMessage('');
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
      setErrorMessage('Sai email hoặc mật khẩu!');
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
      {/* Popup lỗi nếu có */}
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
