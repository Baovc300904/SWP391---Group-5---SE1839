import { Button, Card, Col, Row, Typography, Space } from 'antd';
import {
  HeartOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  ArrowRightOutlined,
  SafetyOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '40px 20px' }}>
      {/* Hero Section */}
      <div style={{
        background: '#f44336',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center',
        borderRadius: '8px',
        marginBottom: '40px'
      }}>
        <Title level={1} style={{ color: 'white', marginBottom: '20px' }}>
          HỆ THỐNG HIẾN MÁU TÌNH NGUYỆN
        </Title>
        <Paragraph style={{ 
          color: 'white', 
          fontSize: '18px', 
          marginBottom: '30px'
        }}>
          Một giọt máu cho đi - Một cuộc đời ở lại
        </Paragraph>
        <Space size="large">
          <Button 
            type="primary" 
            size="large" 
            style={{ 
              backgroundColor: 'white', 
              borderColor: 'white', 
              color: '#f44336',
              fontWeight: 'bold'
            }}
            onClick={() => navigate('/register')}
          >
            Đăng ký hiến máu
            <ArrowRightOutlined />
          </Button>
          <Button 
            size="large" 
            style={{ 
              backgroundColor: 'transparent', 
              borderColor: 'white', 
              color: 'white'
            }}
            onClick={() => navigate('/login')}
          >
            Đăng nhập
          </Button>
        </Space>
      </div>

      {/* Statistics */}
      <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
        <Col xs={24} sm={8}>
          <Card style={{ textAlign: 'center' }}>
            <UserOutlined style={{ fontSize: '40px', color: '#f44336', marginBottom: '10px' }} />
            <Title level={3} style={{ margin: 0 }}>12,580</Title>
            <Paragraph>Người hiến máu</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ textAlign: 'center' }}>
            <MedicineBoxOutlined style={{ fontSize: '40px', color: '#f44336', marginBottom: '10px' }} />
            <Title level={3} style={{ margin: 0 }}>25,640</Title>
            <Paragraph>Đơn vị máu</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ textAlign: 'center' }}>
            <HeartOutlined style={{ fontSize: '40px', color: '#f44336', marginBottom: '10px' }} />
            <Title level={3} style={{ margin: 0 }}>156</Title>
            <Paragraph>Chiến dịch</Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Features */}
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
        Tại sao chọn chúng tôi?
      </Title>
      <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
        <Col xs={24} md={8}>
          <Card style={{ textAlign: 'center', height: '100%' }}>
            <HeartOutlined style={{ fontSize: '40px', color: '#f44336', marginBottom: '15px' }} />
            <Title level={4}>Hiến máu cứu người</Title>
            <Paragraph>
              Tham gia hiến máu tình nguyện để cứu sống những người cần máu khẩn cấp
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card style={{ textAlign: 'center', height: '100%' }}>
            <SafetyOutlined style={{ fontSize: '40px', color: '#f44336', marginBottom: '15px' }} />
            <Title level={4}>An toàn tuyệt đối</Title>
            <Paragraph>
              Quy trình hiến máu đảm bảo an toàn theo tiêu chuẩn y tế quốc tế
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card style={{ textAlign: 'center', height: '100%' }}>
            <TeamOutlined style={{ fontSize: '40px', color: '#f44336', marginBottom: '15px' }} />
            <Title level={4}>Cộng đồng yêu thương</Title>
            <Paragraph>
              Kết nối với cộng đồng những người có tấm lòng thiện nguyện
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Call to Action */}
      <div style={{
        background: '#f44336',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center',
        borderRadius: '8px'
      }}>
        <Title level={2} style={{ color: 'white', marginBottom: '15px' }}>
          Bạn đã sẵn sàng cứu sống một sinh mệnh?
        </Title>
        <Paragraph style={{ color: 'white', marginBottom: '25px' }}>
          Hãy tham gia cùng chúng tôi trong hành trình lan tỏa yêu thương
        </Paragraph>
        <Button 
          type="primary" 
          size="large" 
          style={{ 
            backgroundColor: 'white', 
            borderColor: 'white', 
            color: '#f44336',
            fontWeight: 'bold'
          }}
          onClick={() => navigate('/register')}
        >
          Tham gia ngay
          <ArrowRightOutlined />
        </Button>
      </div>
    </div>
  );
}
