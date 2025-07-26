import React from 'react';
import { Typography, Row, Col, Card, Statistic, Timeline, Image, Space, Button } from 'antd';
import { 
  HeartOutlined, 
  TeamOutlined, 
  TrophyOutlined, 
  SafetyOutlined,
  GlobalOutlined,
  RocketOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const About = () => {
  const stats = [
    { title: 'Người hiến máu', value: '50,000+', icon: <HeartOutlined /> },
    { title: 'Đơn vị máu thu được', value: '150,000+', icon: <SafetyOutlined /> },
    { title: 'Bệnh viện đối tác', value: '200+', icon: <GlobalOutlined /> },
    { title: 'Tỉnh thành phủ sóng', value: '63', icon: <TeamOutlined /> },
  ];

  const timeline = [
    {
      children: (
        <div>
          <Title level={4}>2020 - Khởi đầu</Title>
          <Paragraph>Thành lập hệ thống quản lý hiến máu đầu tiên tại Việt Nam</Paragraph>
        </div>
      ),
    },
    {
      children: (
        <div>
          <Title level={4}>2021 - Mở rộng</Title>
          <Paragraph>Kết nối với 50+ bệnh viện và trung tâm y tế</Paragraph>
        </div>
      ),
    },
    {
      children: (
        <div>
          <Title level={4}>2022 - Đột phá</Title>
          <Paragraph>Đạt mốc 100,000 đơn vị máu được hiến tặng</Paragraph>
        </div>
      ),
    },
    {
      children: (
        <div>
          <Title level={4}>2023 - Phát triển</Title>
          <Paragraph>Ứng dụng công nghệ AI trong việc dự đoán nhu cầu máu</Paragraph>
        </div>
      ),
    },
    {
      children: (
        <div>
          <Title level={4}>2024 - Hiện tại</Title>
          <Paragraph>Trở thành hệ thống hiến máu hàng đầu Việt Nam</Paragraph>
        </div>
      ),
    },
  ];

  return (
    <div style={{ 
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={1} style={{ 
            color: '#fff', 
            fontSize: '3.5rem',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Về Chúng Tôi
          </Title>
          <Paragraph style={{ 
            fontSize: '1.2rem', 
            color: '#fff',
            maxWidth: '800px',
            margin: '0 auto',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}>
            Chúng tôi là hệ thống quản lý hiến máu hàng đầu Việt Nam, kết nối những trái tim nhân ái 
            với những người cần được giúp đỡ. Sứ mệnh của chúng tôi là tạo ra một cộng đồng hiến máu 
            bền vững và hiệu quả.
          </Paragraph>
        </div>

        {/* Stats Section */}
        <Row gutter={[24, 24]} style={{ marginBottom: '60px' }}>
          {stats.map((stat, index) => (
            <Col xs={12} sm={12} md={6} key={index}>
              <Card 
                style={{ 
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '15px'
                }}
                bodyStyle={{ padding: '30px 20px' }}
              >
                <div style={{ 
                  fontSize: '3rem', 
                  color: '#fff',
                  marginBottom: '15px'
                }}>
                  {stat.icon}
                </div>
                <Statistic 
                  title={<span style={{ color: '#fff', opacity: 0.8 }}>{stat.title}</span>}
                  value={stat.value}
                  valueStyle={{ 
                    color: '#fff',
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Mission & Vision */}
        <Row gutter={[40, 40]} style={{ marginBottom: '60px' }}>
          <Col xs={24} md={12}>
            <Card style={{ 
              height: '100%',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center' }}>
                  <RocketOutlined style={{ fontSize: '3rem', color: '#1890ff' }} />
                  <Title level={2} style={{ marginTop: '15px' }}>Sứ Mệnh</Title>
                </div>
                <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  Xây dựng hệ thống hiến máu thông minh, kết nối hiệu quả giữa người hiến và người nhận máu. 
                  Chúng tôi cam kết tạo ra một nền tảng tin cậy, minh bạch và dễ sử dụng, góp phần cứu sống 
                  hàng triệu người Việt Nam.
                </Paragraph>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card style={{ 
              height: '100%',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center' }}>
                  <TrophyOutlined style={{ fontSize: '3rem', color: '#52c41a' }} />
                  <Title level={2} style={{ marginTop: '15px' }}>Tầm Nhìn</Title>
                </div>
                <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  Trở thành hệ thống quản lý hiến máu hàng đầu Đông Nam Á vào năm 2030. 
                  Chúng tôi hướng tới một tương lai mà việc hiến máu trở nên dễ dàng, 
                  an toàn và được nhiều người tham gia, tạo nên một cộng đồng sẻ chia mạnh mẽ.
                </Paragraph>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Timeline */}
        <Card style={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          marginBottom: '60px'
        }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
            Hành Trình Phát Triển
          </Title>
          <Timeline items={timeline} mode="left" />
        </Card>

        {/* Values */}
        <Card style={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
            Giá Trị Cốt Lõi
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={8}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <HeartOutlined style={{ fontSize: '2.5rem', color: '#f5222d', marginBottom: '15px' }} />
                <Title level={4}>Nhân Ái</Title>
                <Paragraph>
                  Đặt tình người lên hàng đầu, lan tỏa tinh thần chia sẻ và yêu thương trong cộng đồng.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <SafetyOutlined style={{ fontSize: '2.5rem', color: '#1890ff', marginBottom: '15px' }} />
                <Title level={4}>Tin Cậy</Title>
                <Paragraph>
                  Đảm bảo tính minh bạch, an toàn và bảo mật trong mọi quy trình hoạt động.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <RocketOutlined style={{ fontSize: '2.5rem', color: '#52c41a', marginBottom: '15px' }} />
                <Title level={4}>Đổi Mới</Title>
                <Paragraph>
                  Không ngừng cải tiến công nghệ để mang đến trải nghiệm tốt nhất cho người dùng.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default About;
