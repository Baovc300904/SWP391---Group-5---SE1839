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

      await axios.post('http://localhost:8080/api/auth/register', userPayload);

      alert('Đăng ký thành công!');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Đăng ký thất bại: ' + (error.response?.data || 'Lỗi không xác định'));
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
    <div className="register-container my-5">
      <div className="row shadow rounded overflow-hidden">
      <div className="col-md-6 p-0 d-none d-md-block position-relative">
        <img
          src="/Banner-signup.jpg"
          alt="Signup Banner"
          className="img-fluid h-100 w-100 object-fit-cover"
        />
        <div className="register-banner">
          <h1>Tạo tài khoản</h1>
          <p>Bắt đầu hành trình cùng hệ thống!</p>
        </div>
      </div>

        <div className="col-md-6 p-4 bg-white">
          <form onSubmit={handleSubmit}>
            <h2 className="mb-4 text-center">Đăng Ký</h2>

            <div className="mb-3">
              <input type="text" className="form-control" name="username" placeholder="Tên người dùng" required value={formData.username} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <input type="email" className="form-control" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <input type="password" className="form-control" name="password" placeholder="Mật khẩu" required value={formData.password} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <input type="password" className="form-control" name="confirmPassword" placeholder="Nhập lại mật khẩu" required value={formData.confirmPassword} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <input type="text" className="form-control" name="fullName" placeholder="Họ và tên" value={formData.fullName} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <input type="text" className="form-control" name="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <input type="date" className="form-control" name="birthDate" value={formData.birthDate} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="Nam">Nam</option>
                <option value="Nu">Nữ</option>
                <option value="Khac">Khác</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">Đăng Ký</button>
          </form>

          <div className="text-center mt-4">
            <div className="d-flex align-items-center mb-3">
              <hr className="flex-grow-1" />
              <span className="px-2 text-muted">hoặc</span>
              <hr className="flex-grow-1" />
            </div>

            <GoogleLogin onSuccess={responseGoogleSuccess} onError={responseGoogleFailure} />

            <p className="mt-3">
              Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
