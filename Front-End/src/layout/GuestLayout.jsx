import { Button, Layout, Space } from 'antd';
import { HeartOutlined, LoginOutlined, UserAddOutlined, InfoCircleOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './GuestLayout.css';

const { Header, Content, Footer } = Layout;

export default function GuestLayout() {
  const navigate = useNavigate();

  return (
    <Layout className="guest-layout">
      <Header className="modern-navbar">
        <div className="navbar-container">
          {/* Logo Section */}
          <div className="navbar-brand" onClick={() => navigate('/')}>
            <div className="brand-container">
              <div className="brand-icon">
                <HeartOutlined />
              </div>
              <div className="brand-text">
                <div className="brand-name">Hiến Máu Cộng Đồng Việt</div>
                <div className="brand-tagline">Kết nối sự sống</div>
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="navbar-nav">
            <Link to="/" className="nav-link">
              <HomeOutlined className="nav-icon" />
              <span className="nav-text">Trang chủ</span>
              <div className="nav-indicator"></div>
            </Link>
            <Link to="/about" className="nav-link">
              <InfoCircleOutlined className="nav-icon" />
              <span className="nav-text">Giới thiệu</span>
              <div className="nav-indicator"></div>
            </Link>
            <Link to="/contact" className="nav-link">
              <PhoneOutlined className="nav-icon" />
              <span className="nav-text">Liên hệ</span>
              <div className="nav-indicator"></div>
            </Link>
          </nav>
          
          {/* Action Buttons */}
          <div className="navbar-actions">
            <Button 
              type="text" 
              icon={<LoginOutlined />}
              onClick={() => navigate('/login')}
              className="action-btn login-action"
            >
              Đăng nhập
            </Button>
            <Button 
              type="primary" 
              icon={<UserAddOutlined />}
              onClick={() => navigate('/register')}
              className="action-btn register-action"
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </Header>
      
      <Content className="guest-content">
        <Outlet />
      </Content>
      
      <Footer className="guest-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Hiến Máu Cộng Đồng Việt</h4>
            <p>Kết nối sự sống - Chia sẻ hy vọng</p>
            <p>Hệ thống quản lý hiến máu hiện đại nhất Việt Nam, kết nối người hiến máu với những người cần máu một cách nhanh chóng và hiệu quả.</p>
          </div>
          
          <div className="footer-section">
            <h4>Liên kết nhanh</h4>
            <ul>
              <li><Link to="/">🏠 Trang chủ</Link></li>
              <li><Link to="/about">ℹ️ Giới thiệu</Link></li>
              <li><Link to="/contact">📞 Liên hệ</Link></li>
              <li><Link to="/login">🔐 Đăng nhập</Link></li>
              <li><Link to="/register">📝 Đăng ký</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Dịch vụ</h4>
            <ul>
              <li>🩸 Hiến máu tình nguyện</li>
              <li>🏥 Tìm kiếm máu</li>
              <li>📅 Lịch hiến máu</li>
              <li>🏆 Chương trình khuyến khích</li>
              <li>📚 Hướng dẫn hiến máu</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Liên hệ & Hỗ trợ</h4>
            <ul>
              <li>📞 Hotline: 1900 1234</li>
              <li>📧 Email: support@hienmau.vn</li>
              <li>🏢 Địa chỉ: FPT University, Hồ Chí Minh</li>
              <li>⏰ Giờ làm việc: 8:00 - 18:00</li>
              <li>🚑 Cấp cứu: 115</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 Hiến Máu Cộng Đồng Việt. Tất cả quyền được bảo lưu.</p>
            <div className="footer-links">
              <a href="/privacy">Chính sách bảo mật</a>
              <span className="separator">|</span>
              <a href="/terms">Điều khoản sử dụng</a>
              <span className="separator">|</span>
              <a href="/sitemap">Sơ đồ trang web</a>
            </div>
          </div>
        </div>
      </Footer>
    </Layout>
  );
}
