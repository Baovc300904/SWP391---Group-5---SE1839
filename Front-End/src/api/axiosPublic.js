import axios from "axios";

// Axios instance cho public API (không cần authentication)
const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor cho public API (không redirect về login)
publicInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Public API error.response", error.response);
    // Chỉ log lỗi, không redirect
    return Promise.reject(error);
  }
);

export default publicInstance;
