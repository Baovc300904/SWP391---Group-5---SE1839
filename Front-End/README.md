# 🩸 Hiến Máu Cộng Đồng Việt - Blood Donation Management System

A modern, comprehensive blood donation management system built with React and Ant Design, designed to connect blood donors with those in need across Vietnam.

## 🌟 Features

### For Guests (Public Users)
- **Homepage**: Beautiful landing page with blood donation information
- **About Page**: Information about the blood donation system
- **Contact Page**: Contact information and support details
- **Registration/Login**: User account creation and authentication

### For Registered Users
- **Dashboard**: Personal dashboard with donation history and upcoming campaigns
- **Campaign Management**: View and register for blood donation campaigns
- **Profile Management**: Update personal information and preferences
- **Blood Request**: Request blood when needed
- **Near Me**: Find nearby blood donation centers
- **Blog System**: Read and interact with blood donation articles

### For Administrators & Staff
- **User Management**: Manage user accounts and permissions
- **Campaign Management**: Create and manage blood donation campaigns
- **Blood Inventory**: Track blood units and inventory levels
- **Blood Donation Requests**: Process and manage donation requests
- **Blood Receive Requests**: Handle blood reception requests
- **Blog Management**: Create and manage blog content
- **Notification System**: Send notifications to users
- **Support Management**: Handle user support requests

## 🚀 Technology Stack

- **Frontend**: React 18 + Vite
- **UI Framework**: Ant Design 5.x
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: CSS3 with modern animations
- **Icons**: Ant Design Icons
- **State Management**: React Hooks
- **Form Handling**: Ant Design Forms

## 📁 Project Structure

```
Front-End/
├── public/                 # Static assets
├── src/
│   ├── api/               # API configuration
│   │   ├── axiosConfig.js
│   │   └── axiosPublic.js
│   ├── components/        # Reusable components
│   │   ├── Blog/         # Blog-related components
│   │   ├── Blood/        # Blood management components
│   │   ├── Campaign/     # Campaign components
│   │   ├── Login/        # Authentication components
│   │   ├── User/         # User profile components
│   │   └── VietnamMap/   # Interactive map components
│   ├── layout/           # Layout components
│   │   ├── GuestLayout.jsx
│   │   ├── MainLayout.jsx
│   │   └── MainLayoutUser.jsx
│   ├── pages/            # Page components
│   │   ├── ForGuest/     # Public pages
│   │   ├── ForUser/      # User dashboard pages
│   │   └── Admin/        # Admin management pages
│   ├── router/           # Routing configuration
│   ├── services/         # API services
│   ├── styles/           # Global styles
│   └── variables/        # Configuration variables
├── package.json
└── vite.config.js
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Front-End
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_BASE_URL=http://localhost:8080
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🎨 Key Features

### Modern UI/UX Design
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Blood Donation Theme**: Red color scheme with heart icons and blood drop animations
- **Smooth Animations**: CSS animations and transitions for better user experience
- **Accessibility**: WCAG compliant design with proper contrast ratios

### User Experience
- **Intuitive Navigation**: Clear menu structure and breadcrumbs
- **Real-time Updates**: Live notifications and status updates
- **Interactive Maps**: Vietnam map integration for location-based services
- **Rich Text Editor**: Blog content management with Slate.js

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Role-based access control
- **Input Validation**: Form validation and sanitization
- **Error Handling**: Comprehensive error handling and user feedback

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured interface with sidebar navigation
- **Tablet**: Adaptive layout with collapsible menus
- **Mobile**: Touch-friendly interface with bottom navigation

## 🔧 Configuration

### API Configuration
The system supports both real API and mock data:
- **Production**: Connect to backend API
- **Development**: Use mock data for testing and development

### Theme Customization
- **Color Scheme**: Blood donation theme with red gradients
- **Typography**: Modern, readable fonts
- **Icons**: Consistent iconography throughout the application

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ant Design**: For the excellent UI component library
- **React Community**: For the amazing React ecosystem
- **Blood Donation Organizations**: For inspiration and real-world use cases

## 📞 Support

For support and questions:
- **Email**: support@hienmau.vn
- **Hotline**: 1900 1234
- **Website**: https://hienmau.vn

---

**Made with ❤️ for the Vietnamese blood donation community**
