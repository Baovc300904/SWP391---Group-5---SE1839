import React, { useEffect } from 'react';
import './PandaLoginForm.css';

export default function PandaLoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  errorMessage,
  onSubmit,
}) {
  useEffect(() => {
    const form = document.querySelector("form");
    const passwordInput = document.querySelector("#password");
    const eyeBalls = document.querySelectorAll(".eye-ball");

    passwordInput?.addEventListener("focus", () => form?.classList.add("up"));
    passwordInput?.addEventListener("blur", () => form?.classList.remove("up"));

    const handleMouseMove = (e) => {
      const dw = window.innerWidth / 15;
      const dh = window.innerHeight / 15;
      const x = e.pageX / dw;
      const y = e.pageY / dh;
      eyeBalls.forEach((eye) => {
        eye.style.width = `${x}px`;
        eye.style.height = `${y}px`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="panda-container">
      <div className="panda">
        <div className="ear"></div>
        <div className="face">
          <div className="eye-shade"></div>
          <div className="eye-white">
            <div className="eye-ball"></div>
          </div>
          <div className="eye-shade rgt"></div>
          <div className="eye-white rgt">
            <div className="eye-ball"></div>
          </div>
          <div className="nose"></div>
          <div className="mouth"></div>
        </div>
        <div className="body"></div>
        <div className="foot">
          <div className="finger"></div>
        </div>
        <div className="foot rgt">
          <div className="finger"></div>
        </div>
      </div>

      <form className="panda-login-form" onSubmit={onSubmit}>
        <div className="hand"></div>
        <div className="hand rgt"></div>
        <h1>Đăng Nhập</h1>

        <div className="form-group">
          <input
            id="email"
            type="email"
            value={email}
            onChange={onEmailChange}
            required
            className="form-control"
          />
          <label className="form-label">Email</label>
        </div>

        <div className="form-group">
          <input
            id="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            required
            className="form-control"
          />
          <label className="form-label">Mật Khẩu</label>
        </div>
        {errorMessage && (
        <div className="error-message" style={{ color: 'red', marginTop: '5px' }}>
          {errorMessage}
        </div>
        )}
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}
