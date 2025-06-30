import React, { Suspense, memo } from 'react';
import AppRoutes from './routes/AppRoutes';
import AuthProvider from './contexts/AuthContext';
import { ThemeProvider } from "./contexts/ThemeContext";
import LoadingSpinner from './components/ui/LoadingSpinner/LoadingSpinner';

// Import styles
import './style/index.css';
import './style/App.css';
import './style/components.css';
import './style/accessibility.css';
import './style/deprecation-fixes.css';

/**
 * Root React component that sets up authentication, theming, and routing within a suspense boundary.
 * 
 * Wraps the application in `AuthProvider` and `ThemeProvider` context providers, and uses React's `Suspense` to display a loading spinner while lazy-loaded components are being fetched.
 */
function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AuthProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </Suspense>
  );
}

// Performance optimization: Prevent unnecessary re-renders
export default memo(App);
