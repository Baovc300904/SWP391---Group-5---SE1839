import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Đảm bảo App.js là file chính của ứng dụng
import { GoogleOAuthProvider } from '@react-oauth/google';  // Thêm GoogleOAuthProvider

// Đảm bảo Client ID chính xác từ Google Cloud Console
ReactDOM.render(
  <GoogleOAuthProvider clientId= "470822925716-vj47kisia65vpt0k4pfp0f50v75igbn8.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
  document.getElementById('root')  // Đảm bảo có một phần tử với id 'root' trong index.html
);
