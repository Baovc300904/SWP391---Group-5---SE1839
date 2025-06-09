// Import thư viện cần thiết
const express = require('express');
const { OAuth2Client } = require('google-auth-library');  // Thư viện Google để xác thực token
const client = new OAuth2Client('470822925716-vj47kisia65vpt0k4pfp0f50v75igbn8.apps.googleusercontent.com');  // Thay thế CLIENT_ID bằng Client ID từ Google Cloud Console

const app = express();

// Middleware để xử lý dữ liệu JSON
app.use(express.json());

// Endpoint xử lý đăng nhập Google
app.post('/api/auth/google-login', async (req, res) => {
  const { token } = req.body;  // Lấy token từ frontend (React)

  try {
    // Xác minh token Google
    const ticket = await client.verifyIdToken({
      idToken: token,  // Lấy token từ frontend
      audience: '470822925716-vj47kisia65vpt0k4pfp0f50v75igbn8.apps.googleusercontent.com',  // Thay CLIENT_ID bằng Client ID từ Google Cloud Console
    });

    // Lấy payload từ token
    const payload = ticket.getPayload();

    // Tạo đối tượng người dùng từ thông tin Google
    const user = {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      role: 'user',  // Gán vai trò người dùng hoặc lấy từ database nếu cần
    };

    // Trả về thông tin người dùng
    res.json({ success: true, user });
  } catch (error) {
    console.error('❌ Lỗi khi xác thực Google token:', error);
    res.status(400).json({ success: false, message: 'Lỗi xác thực Google' });
  }
});

// Chạy server trên port 5000
app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
