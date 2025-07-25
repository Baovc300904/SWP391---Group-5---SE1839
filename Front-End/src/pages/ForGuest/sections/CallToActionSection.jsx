import { Button, Typography, Space } from 'antd';
import { HeartOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const CallToActionSection = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 50%, #ffa726 100%)',
      color: 'white',
      padding: '100px 20px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(255,255,255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255,255,255, 0.05) 0%, transparent 50%)
        `,
        animation: 'pulse 4s ease-in-out infinite'
      }} />
      
      {/* Floating hearts */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        fontSize: '24px',
        animation: 'float 6s ease-in-out infinite',
        opacity: 0.3
      }}>
        ❤️
      </div>
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        fontSize: '18px',
        animation: 'float 8s ease-in-out infinite reverse',
        opacity: 0.3
      }}>
        💉
      </div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '20%',
        fontSize: '20px',
        animation: 'float 7s ease-in-out infinite',
        opacity: 0.3
      }}>
        🩸
      </div>
      
      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Main CTA */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '30px',
          padding: '60px 40px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>
            🚀
          </div>
          
          <Title level={1} style={{ 
            color: 'white', 
            fontSize: '48px', 
            marginBottom: '25px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            fontWeight: 'bold',
            lineHeight: '1.2'
          }}>
            Sẵn sàng trở thành người hùng? 🦸‍♀️
          </Title>
          
          <Paragraph style={{ 
            fontSize: '22px', 
            marginBottom: '40px', 
            color: 'rgba(255,255,255,0.95)',
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto 40px auto'
          }}>
            Mỗi ngày có hàng ngàn người đang chờ đợi một giọt máu để tiếp tục sống. 
            <br />
            <strong>Bạn có thể là người mang lại phép màu cho họ! ✨</strong>
          </Paragraph>

          {/* Action buttons */}
          <Space size="large" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button 
              type="primary" 
              size="large" 
              style={{ 
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                borderColor: 'transparent',
                height: '60px',
                fontSize: '20px',
                fontWeight: 'bold',
                borderRadius: '30px',
                padding: '0 45px',
                boxShadow: '0 15px 35px rgba(102, 126, 234, 0.5)',
                transition: 'all 0.3s ease',
                transform: 'scale(1.05)'
              }}
              onClick={() => navigate('/register')}
              icon={<HeartOutlined />}
            >
              🎯 Đăng ký hiến máu ngay
            </Button>
            
            <Button 
              size="large" 
              style={{ 
                background: 'rgba(255,255,255,0.2)',
                borderColor: 'rgba(255,255,255,0.4)',
                color: 'white',
                fontWeight: 'bold',
                height: '60px',
                fontSize: '18px',
                borderRadius: '30px',
                padding: '0 35px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onClick={() => navigate('/login')}
              icon={<ArrowRightOutlined />}
            >
              📖 Tìm hiểu thêm
            </Button>
          </Space>

          {/* Urgency indicator */}
          <div style={{
            marginTop: '40px',
            padding: '20px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ 
              color: '#ffd700', 
              fontSize: '16px', 
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>
              ⚡ KHẨN CẤP: Hiện tại đang thiếu máu nghiêm trọng!
            </div>
            <div style={{ 
              color: 'rgba(255,255,255,0.9)', 
              fontSize: '14px'
            }}>
              🏥 Có <strong>247 bệnh nhân</strong> đang chờ máu hiến tặng tại các bệnh viện
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{
          marginTop: '50px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '20px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '5px' }}>
              3 người
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              được cứu sống từ 1 đơn vị máu
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '20px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '5px' }}>
              10 phút
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              hiến máu = cả đời ý nghĩa
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '20px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '5px' }}>
              100% miễn phí
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              khám sức khỏe + xét nghiệm
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
        `}
      </style>
    </div>
  );
};

export default CallToActionSection;
