import { Card, Col, Row, Typography } from 'antd';
import { SafetyOutlined, MobileOutlined, GlobalOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const FeaturesSection = () => {
  return (
    <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <Title level={2} style={{ color: '#2c3e50', fontSize: '36px', marginBottom: '20px' }}>
          Tại sao chọn hệ thống của chúng tôi?
        </Title>
        <Paragraph style={{ fontSize: '18px', color: '#7f8c8d', maxWidth: '600px', margin: '0 auto' }}>
          Chúng tôi cung cấp nền tảng hiến máu toàn diện, an toàn và hiệu quả nhất tại Việt Nam
        </Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} sm={12} lg={8}>
          <Card 
            style={{ 
              height: '100%',
              borderRadius: '20px',
              border: 'none',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
            styles={{ body: { padding: '40px 30px', textAlign: 'center' }}}
          >
            <div style={{
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
            }}>
              <SafetyOutlined style={{ fontSize: '40px', color: 'white' }} />
            </div>
            <Title level={4} style={{ color: '#2c3e50', marginBottom: '15px' }}>An toàn tuyệt đối</Title>
            <Paragraph style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              Quy trình hiến máu tuân theo tiêu chuẩn WHO. Được giám sát bởi Bộ Y tế và các chuyên gia hàng đầu.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card 
            style={{ 
              height: '100%',
              borderRadius: '20px',
              border: 'none',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
            styles={{ body: { padding: '40px 30px', textAlign: 'center' }}}
          >
            <div style={{
              background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)'
            }}>
              <MobileOutlined style={{ fontSize: '40px', color: 'white' }} />
            </div>
            <Title level={4} style={{ color: '#2c3e50', marginBottom: '15px' }}>Ứng dụng thông minh</Title>
            <Paragraph style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              Đăng ký, theo dõi lịch sử hiến máu, nhận thông báo khẩn cấp mọi lúc mọi nơi với giao diện thân thiện.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card 
            style={{ 
              height: '100%',
              borderRadius: '20px',
              border: 'none',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
            styles={{ body: { padding: '40px 30px', textAlign: 'center' }}}
          >
            <div style={{
              background: 'linear-gradient(45deg, #2ed573, #7bed9f)',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              boxShadow: '0 8px 25px rgba(46, 213, 115, 0.3)'
            }}>
              <GlobalOutlined style={{ fontSize: '40px', color: 'white' }} />
            </div>
            <Title level={4} style={{ color: '#2c3e50', marginBottom: '15px' }}>Mạng lưới toàn quốc</Title>
            <Paragraph style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              Hệ thống kết nối 63 tỉnh thành, hơn 500 bệnh viện và trung tâm y tế trên toàn quốc.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FeaturesSection;
