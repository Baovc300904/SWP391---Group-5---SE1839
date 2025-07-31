import React from 'react';
import { Typography, Row, Col, Card, Space, Button } from 'antd';
import { 
  HeartOutlined, 
  TeamOutlined, 
  TrophyOutlined, 
  SafetyOutlined,
  GlobalOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  StarOutlined
} from '@ant-design/icons';
import './style/About.css';

const { Title, Paragraph } = Typography;

const About = () => {
  const values = [
    {
      icon: <HeartOutlined />,
      title: 'Nhân Ái',
      description: 'Đặt tình người lên hàng đầu, lan tỏa tinh thần chia sẻ và yêu thương trong cộng đồng.',
                      color: '#2196f3'
    },
    {
      icon: <SafetyOutlined />,
      title: 'Tin Cậy',
      description: 'Đảm bảo tính minh bạch, an toàn và bảo mật trong mọi quy trình hoạt động.',
      color: '#ef4444'
    },
    {
      icon: <RocketOutlined />,
      title: 'Đổi Mới',
      description: 'Không ngừng cải tiến công nghệ để mang đến trải nghiệm tốt nhất cho người dùng.',
      color: '#f87171'
    }
  ];

  return (
    <div className="about-section">
      {/* Background Elements */}
      <div className="about-background">
        <div className="floating-heart heart-1">♥</div>
        <div className="floating-heart heart-2">♥</div>
        <div className="floating-heart heart-3">♥</div>
        <div className="floating-heart heart-4">♥</div>
      </div>

      <div className="about-container">
        {/* Hero Section */}
        <div className="about-header">
          <div className="about-badge">
            <HeartOutlined />
            <span>Về Chúng Tôi</span>
          </div>
          <Title level={1} className="about-title">
            Kết nối <span>sự sống</span> qua từng giọt máu
          </Title>
          <Paragraph className="about-description">
            Chúng tôi là hệ thống quản lý hiến máu hàng đầu Việt Nam, kết nối những trái tim nhân ái 
            với những người cần được giúp đỡ thông qua mạng lưới cơ sở y tế rộng khắp. Sứ mệnh của chúng tôi là tạo ra một cộng đồng hiến máu 
            bền vững và hiệu quả.
          </Paragraph>
        </div>

        {/* Mission & Vision */}
        <Row gutter={[40, 40]} className="mission-vision">
          <Col xs={24} md={12}>
            <Card className="mission-card">
              <div className="card-content">
                <div className="card-icon">
                  <RocketOutlined />
                </div>
                <Title level={2} className="card-title">Sứ Mệnh</Title>
                <Paragraph className="card-description">
                  Xây dựng hệ thống hiến máu thông minh, kết nối hiệu quả giữa người hiến và cơ sở y tế. 
                  Chúng tôi cam kết tạo ra một nền tảng tin cậy, minh bạch và dễ sử dụng, góp phần cứu sống 
                  hàng triệu người Việt Nam thông qua mạng lưới cơ sở y tế đối tác.
                </Paragraph>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card className="vision-card">
              <div className="card-content">
                <div className="card-icon">
                  <TrophyOutlined />
                </div>
                <Title level={2} className="card-title">Tầm Nhìn</Title>
                <Paragraph className="card-description">
                  Trở thành hệ thống quản lý hiến máu hàng đầu Đông Nam Á. 
                  Chúng tôi hướng tới một tương lai mà việc hiến máu trở nên dễ dàng, 
                  an toàn và được nhiều người tham gia, tạo nên một mạng lưới cơ sở y tế sẻ chia mạnh mẽ.
                </Paragraph>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Values */}
        <Card className="values-card">
          <Title level={2} className="section-title">
            Giá Trị <span>Cốt Lõi</span>
          </Title>
          <Row gutter={[24, 24]}>
            {values.map((value, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <div className="value-item">
                  <div className="value-icon" style={{ color: value.color }}>
                    {value.icon}
                  </div>
                  <Title level={4} className="value-title">{value.title}</Title>
                  <Paragraph className="value-description">
                    {value.description}
                  </Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* CTA Section */}
        <Card className="cta-card">
          <div className="cta-content">
            <Title level={2} className="cta-title">
              Sẵn sàng <span>hiến máu</span> ngay hôm nay?
            </Title>
            <Paragraph className="cta-description">
              Mỗi giọt máu của bạn có thể cứu sống một mạng người. Hãy tham gia cùng chúng tôi!
            </Paragraph>
            <div className="cta-buttons">
              <Button type="primary" size="large" className="cta-primary-btn">
                Đăng Ký Hiến Máu
              </Button>
              <Button size="large" className="cta-secondary-btn">
                Tìm Hiểu Thêm
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
