import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import PandaLoginForm from '../../components/PandaLoginForm/PandaLoginForm.jsx';
import './Login.css';
import { AuthContext } from '../../contexts/AuthContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (location.state && location.state.error) {
      setPopupMessage(location.state.error);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      const data = response.data;
      console.log('✅ Login response:', data);

      const success =
        data.success === true || data.message?.toLowerCase().includes('thành công');

      if (success) {
        setErrorMessage('');
        console.log('🔐 Gọi login():', data.user);
        login(data); // Lưu user vào context/auth

        // Điều hướng theo vai trò
        const role = data.role;
        switch (role) {
          case 'Quan_Tri_Vien':
            console.log('🚀 Điều hướng tới: /adminDashboard');
            navigate('/adminDashboard');
            break;
          case 'staff':
            console.log('🚀 Điều hướng tới: /dashboardStaff');
            navigate('/dashboardStaff');
            break;
          default:
            console.log('🚀 Điều hướng tới: /home');
            navigate('/home');
        }
      } else {
        setErrorMessage(data.message || 'Email hoặc mật khẩu không đúng');
        console.warn('❌ Lỗi đăng nhập:', data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error('❌ Server response error:', error.response.data);
        setErrorMessage(error.response.data.message || 'Lỗi đăng nhập từ server');
      } else if (error.request) {
        console.error('❌ No server response:', error.request);
        setErrorMessage('Không nhận được phản hồi từ server');
      } else {
        console.error('❌ Unexpected error:', error.message);
        setErrorMessage('Lỗi kết nối tới server, vui lòng thử lại.');
      }
    }
  };

  const responseGoogleSuccess = async (credentialResponse) => {
    console.log('✅ Google login thành công:', credentialResponse);
  
    const token = credentialResponse.credential;  // Lấy token từ Google login
  
    try {
      const response = await axios.post('http://localhost:8080/api/auth/google-login', { token });
  
      const data = response.data;
      console.log('✅ Đăng nhập Google thành công:', data);
  
      if (data.success) {
        // Lưu thông tin người dùng vào AuthContext
        login(data.user);  // Giả sử bạn có hàm login trong AuthContext
  
        // Điều hướng người dùng dựa trên vai trò
        const role = data.user.role;
        switch (role) {
          case 'Quan_Tri_Vien':
            navigate('/adminDashboard');
            break;
          case 'staff':
            navigate('/dashboardStaff');
            break;
          default:
            navigate('/home');
        }
      } else {
        alert('Đăng nhập Google thất bại!');
      }
    } catch (error) {
      console.error('❌ Lỗi khi xử lý đăng nhập Google:', error);
      alert('Đăng nhập Google thất bại!');
    }
  };
  

  const responseGoogleFailure = (error) => {
    console.error('❌ Google login thất bại:', error);
    alert('Đăng nhập Google thất bại!');
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
          onSubmit={handleLogin}
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
