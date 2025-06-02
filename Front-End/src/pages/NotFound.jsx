import React from 'react';
import '../style/NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Oops! Trang bạn tìm không tồn tại.</p>
      <a href="/" className="btn-home">Quay về Trang Chủ</a>
    </div>
  );
}
