import { Button, Col, Row, Typography, Space } from 'antd';
import { HeartOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

// Add keyframes styles
const keyframes = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(2deg); }
    66% { transform: translateY(-10px) rotate(-1deg); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = keyframes;
  document.head.appendChild(styleSheet);
}

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.1) 100%)',
      color: '#ffffff',
      padding: '100px 20px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      backdropFilter: 'blur(30px)',
      borderRadius: '0 0 50px 50px',
      margin: '0 30px 60px 30px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      border: '1px solid rgba(255,255,255,0.2)'
    }}>
      {/* Animated background particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 70%, rgba(240, 147, 251, 0.1) 0%, transparent 50%)
        `,
        animation: 'float 6s ease-in-out infinite'
      }} />
      
      {/* Floating elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 107, 107, 0.1))',
        borderRadius: '50%',
        animation: 'float 4s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(102, 126, 234, 0.1))',
        borderRadius: '50%',
        animation: 'float 5s ease-in-out infinite reverse'
      }} />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
            borderRadius: '50%',
            padding: '30px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(255, 107, 107, 0.4)',
            animation: 'pulse 2s infinite',
            border: '3px solid rgba(255, 255, 255, 0.3)'
          }}>
            <HeartOutlined style={{ fontSize: '64px', color: 'white', filter: 'drop-shadow(0 0 20px rgba(255, 107, 107, 0.8))' }} />
          </div>
        </div>
        <Title level={1} style={{ 
          background: 'linear-gradient(45deg, #ffffff, #f8f9fa, #ffffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '30px', 
          fontSize: '64px',
          fontWeight: '900',
          textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          letterSpacing: '-2px'
        }}>
          🩸 BloodConnect - Kết nối sự sống
        </Title>
        <Paragraph style={{ 
          fontSize: '24px', 
          marginBottom: '40px', 
          color: '#ffffff',
          maxWidth: '1000px',
          margin: '0 auto 40px auto',
          lineHeight: '1.9',
          fontWeight: '400',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          opacity: '0.95'
        }}>
          Nền tảng hiến máu thông minh nhất Việt Nam 🇻🇳 - Nơi mỗi giọt máu trở thành món quà của sự sống, 
          kết nối những trái tim nhân ái với những người cần được cứu giúp.
        </Paragraph>
        
        {/* Key Features */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '40px', 
          marginBottom: '50px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>⚡</span>
            <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '16px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Đăng ký nhanh chóng</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>🛡️</span>
            <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '16px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>An toàn tuyệt đối</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>🌍</span>
            <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '16px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Toàn quốc</span>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <Row gutter={[24, 24]} style={{ marginBottom: '50px' }}>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '25px',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}>
                <Title level={2} style={{ color: '#ffffff', margin: 0, fontSize: '32px', fontWeight: '800', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>52,580+</Title>
                <p style={{ color: '#ffffff', margin: 0, fontSize: '14px', opacity: 0.9 }}>Người hiến máu</p>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: '15px',
                padding: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}>
                <Title level={2} style={{ color: '#667eea', margin: 0, fontSize: '28px' }}>125,640+</Title>
                <p style={{ color: '#5a6c7d', margin: 0 }}>Đơn vị máu</p>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: '15px',
                padding: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}>
                <Title level={2} style={{ color: '#667eea', margin: 0, fontSize: '28px' }}>356+</Title>
                <p style={{ color: '#5a6c7d', margin: 0 }}>Chiến dịch</p>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: '15px',
                padding: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}>
                <Title level={2} style={{ color: '#667eea', margin: 0, fontSize: '28px' }}>63+</Title>
                <p style={{ color: '#5a6c7d', margin: 0 }}>Tỉnh thành</p>
              </div>
            </div>
          </Col>
        </Row>

        <Space size="large">
          <Button 
            type="primary" 
            size="large" 
            style={{ 
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              borderColor: 'transparent',
              height: '55px',
              fontSize: '18px',
              fontWeight: 'bold',
              borderRadius: '28px',
              padding: '0 40px',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onClick={() => navigate('/register')}
            icon={<HeartOutlined />}
          >
            Đăng ký hiến máu
          </Button>
          <Button 
            size="large" 
            style={{ 
              background: 'rgba(102, 126, 234, 0.1)',
              borderColor: 'rgba(102, 126, 234, 0.3)',
              color: '#667eea',
              fontWeight: 'bold',
              height: '55px',
              fontSize: '18px',
              borderRadius: '28px',
              padding: '0 40px',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
            onClick={() => navigate('/login')}
            icon={<ArrowRightOutlined />}
          >
            Đăng nhập
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default HeroSection;
