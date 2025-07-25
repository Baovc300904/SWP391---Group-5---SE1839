import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn token vào mọi request nếu có
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Xử lý lỗi phản hồi (response interceptor)
instance.interceptors.response.use(
  (response) => response, // Trả về response nếu thành công
  (error) => {
    console.log("error.response", error.response); // Kiểm tra log lỗi

    // Kiểm tra xem có response không
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        // Chỉ redirect về login nếu đang ở route cần authentication
        const currentPath = window.location.pathname;
        const publicRoutes = ['/', '/login', '/register', '/about', '/contact'];
        const isPublicRoute = publicRoutes.some(route => currentPath === route || currentPath.startsWith('/guest'));
        
        if (!isPublicRoute) {
          // Nếu nhận được lỗi 401 hoặc 403 ở protected routes, điều hướng về trang Login
          localStorage.removeItem("token"); // Xóa token nếu có lỗi 401/403
          localStorage.removeItem("user"); // Xóa thông tin người dùng nếu cần
          window.location.href = "/login"; // Chuyển hướng đến trang Login
        }
      }
    } else {
      console.error("Lỗi mạng hoặc không có phản hồi từ server.");
    }

    return Promise.reject(error);
  }
);

export default instance;
