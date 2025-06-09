const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);  // Thay CLIENT_ID bằng Client ID từ Google Cloud Console

app.post('/api/auth/google-login', async (req, res) => {
  const { token } = req.body;  // Lấy token từ frontend (React)

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "470822925716-q0pa55e4bopv6e2te3roubrk46ro721c.apps.googleusercontent.com",  // Thay CLIENT_ID bằng Client ID từ Google Cloud Console
    });

    const payload = ticket.getPayload();
    const user = {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      role: "user",  // Gán vai trò hoặc lấy từ database nếu cần
    };

    res.json({ success: true, user });  // Trả về thông tin người dùng
  } catch (error) {
    console.error('❌ Lỗi khi xác thực Google token:', error);
    res.status(400).json({ success: false, message: 'Lỗi xác thực Google' });
  }
});
