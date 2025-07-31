import React from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { HeartOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './style/HeroSection.css';

const { Title, Paragraph } = Typography;

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      {/* Background Elements */}
      <div className="hero-background">
        <div className="blood-drop blood-drop-1"></div>
        <div className="blood-drop blood-drop-2"></div>
        <div className="blood-drop blood-drop-3"></div>
      </div>

      <div className="hero-content">
        <Row align="middle" justify="center">
          <Col xs={24} lg={16}>
            <div className="hero-text">
              <div className="hero-badge">
                <HeartOutlined /> Hệ Thống Hiến Máu Tình Nguyện
              </div>
              
              <Title level={1} className="hero-title">
              Hệ Thống Hiến Máu Tình Nguyện - <span>Kết nối sự sống</span>
              </Title>
              
              <Paragraph className="hero-description">
                Nền tảng kết nối người hiến máu và người cần máu, giúp cứu sống hàng nghìn sinh mạng mỗi ngày.
              </Paragraph>

              <div className="hero-buttons">
                <Button 
                  type="primary" 
                  size="large" 
                  className="primary-btn"
                  onClick={() => navigate('/register')}
                  icon={<HeartOutlined />}
                >
                  Đăng ký hiến máu
                </Button>
                
                <Button 
                  size="large" 
                  className="secondary-btn"
                  onClick={() => navigate('/campaigns')}
                  icon={<ArrowRightOutlined />}
                >
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HeroSection; 