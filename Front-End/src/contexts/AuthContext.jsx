import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    console.log('Đã đăng nhập user:', userData);
  };

  const logout = () => {
    if (user) {
      console.log('Trước khi đăng xuất người dùng:', user.name);
    } else {
      console.log('Không có người dùng đang đăng nhập');
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    if (user) {
      console.log('User hiện tại:', user);
    } else {
      console.log('Người dùng đã đăng xuất');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
