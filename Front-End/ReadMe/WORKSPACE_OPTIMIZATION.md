# 🚀 Workspace Optimization Guide

## 📋 Tổng quan
Hướng dẫn tối ưu hóa workspace để cải thiện hiệu suất phát triển và trải nghiệm người dùng.

## 🛠️ Cấu hình Development

### **1. Vite Configuration** (`vite.config.js`)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          antd: ['antd'],
          router: ['react-router-dom']
        }
      }
    }
  }
})
```

### **2. ESLint Configuration** (`.eslintrc.js`)
```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'jsx-a11y'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'warn',
    'prefer-const': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
```

### **3. Prettier Configuration** (`.prettierrc`)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid"
}
```

## 📁 Cấu trúc thư mục tối ưu

```
Front-End/
├── public/                 # Static assets
│   ├── images/            # Public images
│   ├── icons/             # Favicon, icons
│   └── index.html         # HTML template
├── src/
│   ├── components/        # Reusable components
│   │   ├── common/        # Generic components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # UI components
│   ├── pages/             # Page components
│   │   ├── ForAdmin/      # Admin pages
│   │   ├── ForUser/       # User pages
│   │   └── ForStaff/      # Staff pages
│   ├── features/          # Feature modules
│   │   ├── auth/          # Authentication
│   │   ├── admin/         # Admin features
│   │   └── blooddonor/    # Blood donation
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── style/             # Global styles
│   └── assets/            # Static assets
├── docs/                  # Documentation
├── scripts/               # Build scripts
└── config/                # Configuration files
```

## 🔧 Scripts tối ưu

### **package.json Scripts**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write src/**/*.{js,jsx,ts,tsx,css,md}",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "prepare": "husky install"
  }
}
```

## 🎯 Performance Optimizations

### **1. Code Splitting**
```javascript
// Lazy loading components
const HomePage = lazy(() => import('./pages/ForUser/Home'));
const AdminDashboard = lazy(() => import('./pages/ForAdmin/Dashboard'));

// Route-based splitting
const routes = [
  {
    path: '/user',
    element: <MainLayoutUser />,
    children: [
      {
        path: 'home',
        element: <Suspense fallback={<LoadingSpinner />}><HomePage /></Suspense>
      }
    ]
  }
];
```

### **2. Image Optimization**
```javascript
// WebP format support
const optimizedImage = (src, format = 'webp') => {
  return src.replace(/\.(jpg|jpeg|png)$/, `.${format}`);
};

// Lazy loading images
<img 
  src={image} 
  loading="lazy"
  alt={alt}
  onError={(e) => {
    e.target.src = '/fallback-image.jpg';
  }}
/>
```

### **3. Bundle Analysis**
```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'dist/stats.html'
    })
  ]
});
```

## 🔒 Security Enhancements

### **1. Environment Variables**
```bash
# .env.local
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Blood Donation System
VITE_GOOGLE_MAPS_API_KEY=your_api_key

# .env.production
VITE_API_URL=https://api.production.com
```

### **2. Content Security Policy**
```html
<!-- public/index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 'unsafe-eval'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               font-src 'self' data:;">
```

### **3. Security Headers**
```javascript
// vite.config.js
export default defineConfig({
  server: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  }
});
```

## 📊 Monitoring & Analytics

### **1. Error Tracking**
```javascript
// utils/errorBoundary.js
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

### **2. Performance Monitoring**
```javascript
// utils/performance.js
export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

// Usage
const expensiveOperation = () => {
  return measurePerformance('Data Processing', () => {
    // Expensive operation
  });
};
```

## 🧪 Testing Setup

### **1. Unit Testing**
```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    globals: true
  }
});
```

### **2. Component Testing**
```javascript
// src/components/__tests__/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 🚀 Deployment Optimization

### **1. Build Optimization**
```javascript
// vite.config.js
export default defineConfig({
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          antd: ['antd'],
          router: ['react-router-dom']
        }
      }
    }
  }
});
```

### **2. Caching Strategy**
```javascript
// service-worker.js
const CACHE_NAME = 'blood-donation-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

## 📈 Performance Metrics

### **Target Metrics**
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.8s

### **Monitoring Tools**
- Lighthouse CI
- Web Vitals
- Bundle Analyzer
- Performance Monitor

## 🔄 CI/CD Pipeline

### **GitHub Actions**
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - name: Deploy to production
        # Add deployment steps
```

## 📚 Best Practices

### **Code Quality**
1. Use TypeScript for type safety
2. Follow ESLint rules strictly
3. Write unit tests for components
4. Use meaningful commit messages
5. Review code before merging

### **Performance**
1. Lazy load components and routes
2. Optimize images and assets
3. Use code splitting
4. Minimize bundle size
5. Monitor performance metrics

### **Security**
1. Validate all inputs
2. Use HTTPS in production
3. Implement proper authentication
4. Regular security audits
5. Keep dependencies updated

## 🎯 Next Steps

### **Immediate Actions**
- [ ] Set up monitoring tools
- [ ] Implement error tracking
- [ ] Add performance tests
- [ ] Configure CI/CD pipeline
- [ ] Set up staging environment

### **Future Improvements**
- [ ] Implement PWA features
- [ ] Add offline support
- [ ] Optimize for Core Web Vitals
- [ ] Implement advanced caching
- [ ] Add A/B testing framework 