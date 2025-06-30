import axios from "axios";

// Fallback URL if environment variable is not set
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Shorter timeout for development to fail fast
  timeout: 5000,
  // Enable credentials for CORS
  withCredentials: true,
});

// Request interceptor - add token to headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Don't log errors for health check endpoint
    if (error.config?.url?.includes('/api/health')) {
      return Promise.reject(error);
    }
    
    // Handle CORS errors
    if (error.code === "ERR_NETWORK" || error.message.includes("CORS")) {
      console.error("❌ CORS Error: Backend server is not running or CORS not configured");
      console.error("🔧 Please ensure the backend server is running on:", BASE_URL);
      console.error("📋 Check if CORS is properly configured in your backend");
    }
    
    // Handle timeout errors
    if (error.code === "ECONNABORTED") {
      console.error("⏰ Request timeout: Backend server might be slow or not responding");
    }
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.error("🔐 Unauthorized: Token might be expired or invalid");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login if needed
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    
    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error("🔍 API endpoint not found:", error.config?.url);
    }
    
    // Handle 500 Server Error
    if (error.response?.status === 500) {
      console.error("💥 Server error: Backend server encountered an error");
    }
    
    return Promise.reject(error);
  }
);

export default instance;
