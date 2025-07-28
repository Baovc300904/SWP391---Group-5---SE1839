import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Typography, Spin } from 'antd';
import { HeartOutlined, DownloadOutlined, MobileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getPublicCampaigns } from '../../../services/publicService';
import './style/CallToActionSection.css';

const { Title, Paragraph } = Typography;

const CallToActionSection = () => {
  const navigate = useNavigate();
  const [upcomingCampaigns, setUpcomingCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingCampaigns = async () => {
      try {
        const response = await getPublicCampaigns();
        // Filter for active and upcoming campaigns
        const activeCampaigns = response.data?.filter(campaign => 
          campaign.status === 'active' || campaign.status === 'upcoming'
        ).slice(0, 3) || [];
        
        setUpcomingCampaigns(activeCampaigns);
        console.log('✅ Upcoming campaigns loaded:', activeCampaigns.length);
      } catch (error) {
        console.error('❌ Error loading campaigns:', error);
        // Fallback to empty array
        setUpcomingCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingCampaigns();
  }, []);

  return (
    <div className="cta-section">
      {/* Background Elements */}
      <div className="cta-background">
        <div className="floating-drop drop-1"></div>
        <div className="floating-drop drop-2"></div>
        <div className="floating-drop drop-3"></div>
      </div>

      <div className="cta-container">
        <Row align="middle" justify="center">
          <Col xs={24} lg={16}>
            <div className="cta-content">
              <div className="cta-icon">
                <HeartOutlined />
              </div>
              
              <Title level={2} className="cta-title">
                Sẵn sàng trở thành người hùng?
              </Title>
              
              <Paragraph className="cta-description">
                Hãy tham gia Hiến Máu Cộng Đồng Việt ngay hôm nay để kết nối với cộng đồng
                và cứu sống những người cần được giúp đỡ.
              </Paragraph>

              <div className="cta-buttons">
                <Button 
                  type="primary" 
                  size="large" 
                  className="cta-primary-btn"
                  onClick={() => navigate('/login')}
                  icon={<HeartOutlined />}
                >
                  Tôi muốn hiến máu
                </Button>
              </div>

              {/* Real Upcoming Campaigns */}
              {loading ? (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <Spin size="large" />
                </div>
              ) : upcomingCampaigns.length > 0 ? (
                <div className="upcoming-campaigns">
                  <Paragraph className="campaigns-title" style={{ color: '#6b7280', fontSize: '16px', fontWeight: '600' }}>
                    🗓️ Chiến dịch sắp diễn ra:
                  </Paragraph>
                  <div className="campaigns-list">
                    {upcomingCampaigns.map((campaign, index) => (
                      <div key={campaign.id} className="campaign-item">
                        <div className="campaign-icon">🩸</div>
                        <div className="campaign-text">
                          <div style={{ fontWeight: 'bold' }}>{campaign.title}</div>
                          <div style={{ fontSize: '14px', opacity: 0.9 }}>
                            📍 {campaign.location} • 📅 {new Date(campaign.startDate).toLocaleDateString('vi-VN')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="download-stats">
                  <div className="stat-item">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-text">4.9★</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">📱</div>
                    <div className="stat-text">Hệ thống tin cậy</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">❤️</div>
                    <div className="stat-text">Miễn phí 100%</div>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CallToActionSection;
