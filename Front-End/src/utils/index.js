import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Đảm bảo App.js là file chính của ứng dụng
import { GoogleOAuthProvider } from '@react-oauth/google';  // Thêm GoogleOAuthProvider

// Đảm bảo Client ID chính xác từ Google Cloud Console
ReactDOM.render(
  <GoogleOAuthProvider clientId= "961269511690-iof1fhh0t1p3a303jtma7o66ibla739c.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
  document.getElementById('root')  // Đảm bảo có một phần tử với id 'root' trong index.html
);
