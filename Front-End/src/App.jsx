import React from 'react';
import AppRoutes from './routes/AppRoutes';
import AuthProvider from './contexts/AuthContext';
import { ThemeProvider } from "./contexts/ThemeContext"; // Đảm bảo bạn đã tạo file này

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
