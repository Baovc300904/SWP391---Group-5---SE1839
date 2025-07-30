import { Button, Card, Col, Row, Typography, Space } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, ClockCircleOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ServicesSection = () => {
  return (
    <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12}>
          <div style={{ padding: '40px' }}>
            <Title level={3} style={{ color: '#2c3e50', marginBottom: '25px' }}>
              Dịch vụ toàn diện
            </Title>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '20px'
                }}>
                  <CalendarOutlined style={{ fontSize: '24px', color: 'white' }} />
                </div>
                <div>
                  <Title level={5} style={{ margin: 0, color: '#2c3e50' }}>Đặt lịch tham gia các chiến dịch hiến máu</Title>
                  <Paragraph style={{ margin: 0, color: '#7f8c8d' }}>Đặt lịch tham gia các chiến dịch hiến máu trực tuyến tiện lợi</Paragraph>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '20px'
                }}>
                  <EnvironmentOutlined style={{ fontSize: '24px', color: 'white' }} />
                </div>
                <div>
                  <Title level={5} style={{ margin: 0, color: '#2c3e50' }}>Tìm điểm hiến máu</Title>
                  <Paragraph style={{ margin: 0, color: '#7f8c8d' }}>Tìm điểm hiến máu gần nhất với vị trí của bạn</Paragraph>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  background: 'linear-gradient(45deg, #2ed573, #7bed9f)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '20px'
                }}>
                  <ClockCircleOutlined style={{ fontSize: '24px', color: 'white' }} />
                </div>
                <div>
                  <Title level={5} style={{ margin: 0, color: '#2c3e50' }}>Theo dõi lịch sử</Title>
                  <Paragraph style={{ margin: 0, color: '#7f8c8d' }}>Xem lại toàn bộ lịch sử hiến máu của bạn</Paragraph>
                </div>
              </div>
            </Space>
          </div>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            style={{ 
              height: '100%',
              borderRadius: '20px',
              border: 'none',
              boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
            styles={{ body: { padding: '50px 40px', textAlign: 'center' }}}
          >
            <StarOutlined style={{ fontSize: '60px', marginBottom: '20px', color: '#ffd700' }} />
            <Title level={3} style={{ color: 'white', marginBottom: '20px' }}>
              Tham gia cộng đồng
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
              Kết nối với hàng ngàn người hiến máu tình nguyện trên toàn quốc. Chia sẻ kinh nghiệm, 
              nhận thông báo khẩn cấp và cùng nhau xây dựng cộng đồng yêu thương.
            </Paragraph>
            <Button 
              size="large" 
              style={{ 
                background: 'rgba(255,255,255,0.2)',
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                fontWeight: 'bold',
                height: '50px',
                borderRadius: '25px',
                padding: '0 30px',
                backdropFilter: 'blur(10px)'
              }}
              icon={<TeamOutlined />}
            >
              Tham gia ngay
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ServicesSection;
