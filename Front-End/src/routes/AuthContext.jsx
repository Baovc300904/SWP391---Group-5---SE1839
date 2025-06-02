import React, { createContext, useState, useEffect } from 'react';

// Tạo Context
export const AuthContext = createContext(null);

// Provider component bọc ngoài toàn bộ app
export function AuthProvider({ children }) {
  // Lấy user từ localStorage lúc khởi tạo, nếu có
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Hàm login
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    console.log('Trước khi đăng xuất người dùng:', user.name);
    setUser(null);
    localStorage.removeItem('user');
    console.log('Đã đăng xuất, người dùng đã đăng xuất:', user.name);
  };
  

  // Có thể thêm effect nếu muốn sync user thay đổi ra ngoài localStorage,
  // nhưng hiện tại setUser và localStorage được cập nhật đồng thời rồi nên không cần

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
