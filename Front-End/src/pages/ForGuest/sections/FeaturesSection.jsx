import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { HeartOutlined, MedicineBoxOutlined, UserAddOutlined } from '@ant-design/icons';
import './style/FeaturesSection.css';

const { Title, Paragraph } = Typography;

const FeaturesSection = () => {
  const features = [
    {
      icon: <HeartOutlined />,
      title: "Hiến máu",
      description: "Đăng ký và quản lý lịch hiến máu. Quy trình an toàn theo tiêu chuẩn Y tế, được giám sát chặt chẽ.",
      iconColor: "#f87171",
      bgColor: "linear-gradient(135deg, #f87171, #ef4444)"
    },
    {
      icon: <MedicineBoxOutlined />,
      title: "Yêu cầu máu",
      description: "Tìm kiếm nguồn máu khẩn cấp cho bệnh nhân. Hệ thống tự động tìm người hiến phù hợp gần nhất.",
      iconColor: "#f59e0b",
      bgColor: "linear-gradient(135deg, #f59e0b, #d97706)"
    },
    {
      icon: <UserAddOutlined />,
      title: "Cộng đồng",
      description: "Tham gia cộng đồng hiến máu tích cực. Theo dõi chiến dịch và sự kiện hiến máu gần bạn.",
      iconColor: "#10b981",
      bgColor: "linear-gradient(135deg, #10b981, #059669)"
    }
  ];

  return (
    <div className="features-section">
      <div className="features-container">
        <div className="features-header">
          <Title level={2} className="features-title">
            Chúng tôi có thể giúp gì?
          </Title>
          <Paragraph className="features-description">
            Hiến Máu Cộng Đồng Việt cung cấp nền tảng toàn diện để kết nối người hiến máu và người cần máu
          </Paragraph>
        </div>

        <Row gutter={[32, 32]} justify="center">
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card className="feature-card" hoverable>
                <div className="feature-content">
                  <div 
                    className="feature-icon"
                    style={{ background: feature.bgColor }}
                  >
                    {feature.icon}
                  </div>
                  <Title level={4} className="feature-title">
                    {feature.title}
                  </Title>
                  <Paragraph className="feature-description">
                    {feature.description}
                  </Paragraph>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default FeaturesSection;
