import React, { useState } from 'react';
import axios from 'axios';
import '../style/Login.css';
import sampleLogin from '../data/login.json';

export default function Login() {
  // Khởi tạo state với dữ liệu từ sampleLogin JSON
  const [email, setEmail] = useState(sampleLogin.email || '');
  const [password, setPassword] = useState(sampleLogin.password || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      });

      alert('Login thành công: ' + response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        alert('Sai email hoặc mật khẩu');
      } else {
        alert('Lỗi kết nối đến server');
        console.error(error);
      }
    }
  };

  return (
    <div className="loginUnique-wrapper">
      <form className="loginUnique-form" onSubmit={handleSubmit}>
        <h2 className="loginUnique-title">Login</h2>

        <label htmlFor="email" className="loginUnique-label">Email</label>
        <input
          type="email"
          id="email"
          className="loginUnique-input"
          placeholder="your.email@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="loginUnique-label">Password</label>
        <input
          type="password"
          id="password"
          className="loginUnique-input"
          placeholder="********"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="loginUnique-submit">Login</button>
      </form>
    </div>
  );
}
