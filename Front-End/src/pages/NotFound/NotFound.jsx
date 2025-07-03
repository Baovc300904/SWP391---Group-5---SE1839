import React from 'react';
import dinosaurGif from '/images/Coffee Eating Sticker.gif'; // Thay đường dẫn đúng của bạn
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">Oops! Trang bạn tìm không tồn tại.</p>
      <a href="/" className="notfound-btn-home">Quay về Trang Chủ</a>

      <div className="dinosaur-animation">
        <img src={dinosaurGif} alt="Dinosaur running" className="dinosaur-gif" />
      </div>
    </div>
  );
}
