import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { 
  SafetyOutlined, 
  SmileOutlined, 
  UserOutlined, 
  HeartOutlined
} from '@ant-design/icons';
import './style/BenefitsSection.css';

const { Title, Paragraph } = Typography;

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <SafetyOutlined />,
      title: "An toàn tuyệt đối",
      description: "Quy trình hiến máu tuân theo tiêu chuẩn quốc tế WHO. Được giám sát bởi các chuyên gia y tế hàng đầu.",
      color: "#f87171"
    },
    {
      icon: <SmileOutlined />,
      title: "Phản hồi nhanh",
      description: "Hệ thống thông báo và phản hồi tức thì. Liên kết nhanh chóng giữa người hiến và người cần máu.",
      color: "#f59e0b"
    },
    {
      icon: <UserOutlined />,
      title: "Cộng đồng tích cực",
      description: "Tham gia cộng đồng hiến máu tích cực với hàng nghìn thành viên nhiệt huyết trên cả nước.",
      color: "#10b981"
    },
    {
      icon: <HeartOutlined />,
      title: "Ý nghĩa nhân đạo",
      description: "Mỗi lần hiến máu có thể cứu sống tới 3 người. Góp phần xây dựng xã hội nhân ái và yêu thương.",
      color: "#ef4444"
    }
  ];

  return (
    <div className="benefits-section">
      <div className="benefits-background">
        <div className="floating-heart heart-1"></div>
        <div className="floating-heart heart-2"></div>
        <div className="floating-heart heart-3"></div>
        <div className="floating-heart heart-4"></div>
      </div>

      <div className="benefits-container">
        <div className="benefits-header">
          <Title level={2} className="benefits-title">
            Tại sao chọn Hiến Máu Cộng Đồng Việt?
          </Title>
          <Paragraph className="benefits-description">
            Chúng tôi cam kết mang đến dịch vụ tốt nhất để kết nối tình yêu thương và cứu sống con người
          </Paragraph>
        </div>

        <Row gutter={[32, 32]} justify="center">
          {benefits.map((benefit, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="benefit-card" hoverable>
                <div className="benefit-content">
                  <div 
                    className="benefit-icon"
                    style={{ color: benefit.color }}
                  >
                    {benefit.icon}
                  </div>
                  <Title level={4} className="benefit-title">
                    {benefit.title}
                  </Title>
                  <Paragraph className="benefit-description">
                    {benefit.description}
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

export default BenefitsSection;
