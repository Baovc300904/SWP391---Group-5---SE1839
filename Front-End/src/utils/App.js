import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const App = () => {
  const responseGoogleSuccess = async (response) => {
    const token = response.credential;  // Lấy token từ Google Login

    try {
      const res = await fetch('http://localhost:8080/api/auth/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (data.success) {
        console.log('User info:', data.user);  // In thông tin người dùng từ backend
      }
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const responseGoogleFailure = () => {
    console.error('Google login failed');
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin
        onSuccess={responseGoogleSuccess}
        onError={responseGoogleFailure}
      />
    </div>
  );
};

export default App;
