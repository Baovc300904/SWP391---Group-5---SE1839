import { Button, Layout, Space } from 'antd';
import { HeartOutlined, LoginOutlined, UserAddOutlined, InfoCircleOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './GuestLayout.css';

const { Header, Content, Footer } = Layout;

export default function GuestLayout() {
  const navigate = useNavigate();

  return (
    <Layout className="guest-layout">
      <Header className="guest-header">
        <div className="guest-header-content">
          <div className="logo" onClick={() => navigate('/')}>
            <HeartOutlined className="logo-icon" />
            <span className="logo-text">Hiến Máu Cộng Đồng Việt</span>
          </div>
          
          {/* Navigation Menu */}
          <div className="guest-menu-custom">
            <Link to="/" className="menu-item">
              <HomeOutlined />
              <span>Trang chủ</span>
            </Link>
            <Link to="/about" className="menu-item">
              <InfoCircleOutlined />
              <span>Giới thiệu</span>
            </Link>
            <Link to="/contact" className="menu-item">
              <PhoneOutlined />
              <span>Liên hệ</span>
            </Link>
          </div>
          
          <Space className="header-actions">
            <Button 
              type="text" 
              icon={<LoginOutlined />}
              onClick={() => navigate('/login')}
              className="login-btn"
            >
              Đăng nhập
            </Button>
            <Button 
              type="primary" 
              icon={<UserAddOutlined />}
              onClick={() => navigate('/register')}
              className="register-btn"
            >
              Đăng ký
            </Button>
          </Space>
        </div>
      </Header>
      
      <Content className="guest-content">
        <Outlet />
      </Content>
      
      <Footer className="guest-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>BloodConnect</h4>
            <p>Kết nối sự sống - Chia sẻ hy vọng</p>
            <p>Hệ thống quản lý hiến máu hiện đại nhất Việt Nam</p>
          </div>
          
          <div className="footer-section">
            <h4>Liên kết nhanh</h4>
            <ul>
              <li><Link to="/">Trang chủ</Link></li>
              <li><Link to="/about">Giới thiệu</Link></li>
              <li><Link to="/contact">Liên hệ</Link></li>
              <li><Link to="/login">Đăng nhập</Link></li>
              <li><Link to="/register">Đăng ký</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Hỗ trợ</h4>
            <ul>
              <li>Hotline: 1900 1234</li>
              <li>Email: support@hienmau.vn</li>
              <li>Địa chỉ: FPT University, Hà Nội</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 BloodConnect. Tất cả quyền được bảo lưu.</p>
        </div>
      </Footer>
    </Layout>
  );
}
