import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Progress, Tag, Spin } from 'antd';
import { 
  HeartOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { getPublicBloodTypes } from '../../../services/publicService';
import './style/BloodTypesSection.css';

const { Title, Paragraph } = Typography;

const BloodTypesSection = () => {
  const [bloodTypes, setBloodTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBloodTypes = async () => {
      try {
        const response = await getPublicBloodTypes();
        setBloodTypes(response.data || []);
        console.log('✅ Blood types data loaded:', response.data?.length);
      } catch (error) {
        console.error('❌ Error loading blood types:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBloodTypes();
  }, []);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return '#ff4d4f';
      case 'high': return '#ff7a45';
      case 'medium': return '#faad14';
      case 'normal': return '#52c41a';
      default: return '#52c41a';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'critical': return <ExclamationCircleOutlined />;
      case 'high': return <WarningOutlined />;
      case 'medium': return <HeartOutlined />;
      case 'normal': return <CheckCircleOutlined />;
      default: return <CheckCircleOutlined />;
    }
  };

  const getAvailabilityPercent = (units) => {
    const maxUnits = 3500; // Maximum expected units
    return Math.min((units / maxUnits) * 100, 100);
  };

  return (
    <div className="blood-types-section">
      <div className="blood-types-background">
        <div className="floating-drop drop-1"></div>
        <div className="floating-drop drop-2"></div>
        <div className="floating-drop drop-3"></div>
      </div>

      <div className="blood-types-container">
        <div className="blood-types-header">
          <Title level={2} className="blood-types-title">
            Tình trạng nhóm máu hiện tại
          </Title>
          <Paragraph className="blood-types-description">
            Cập nhật thời gian thực về tình trạng các nhóm máu tại ngân hàng máu
          </Paragraph>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <Spin size="large" />
            <div style={{ marginTop: '16px', color: '#666' }}>Đang tải dữ liệu nhóm máu...</div>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {bloodTypes.map((bloodType, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card 
                  className="blood-type-card" 
                  hoverable
                  style={{ borderLeft: `4px solid ${getUrgencyColor(bloodType.urgency)}` }}
                >
                  <div className="blood-type-header">
                    <div className="blood-type-icon">
                      🩸
                    </div>
                    <div className="blood-type-info">
                      <Title level={3} className="blood-type-name">
                        {bloodType.type}
                      </Title>
                      <Paragraph className="blood-type-full-name">
                        {bloodType.name}
                      </Paragraph>
                    </div>
                  </div>

                  <div className="blood-type-status">
                    <Tag 
                      color={getUrgencyColor(bloodType.urgency)}
                      icon={getUrgencyIcon(bloodType.urgency)}
                      className="urgency-tag"
                    >
                      {bloodType.urgency === 'critical' && 'Cần gấp'}
                      {bloodType.urgency === 'high' && 'Cần nhiều'}
                      {bloodType.urgency === 'medium' && 'Bình thường'}
                      {bloodType.urgency === 'normal' && 'Đủ dùng'}
                    </Tag>
                  </div>

                  <div className="blood-type-availability">
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#666' }}>Hiện có: </span>
                      <span style={{ fontWeight: 'bold', color: getUrgencyColor(bloodType.urgency) }}>
                        {bloodType.units.toLocaleString()} đơn vị
                      </span>
                    </div>
                    
                    <Progress 
                      percent={getAvailabilityPercent(bloodType.units)} 
                      strokeColor={getUrgencyColor(bloodType.urgency)}
                      size="small"
                      showInfo={false}
                    />
                    
                    <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                      {bloodType.availability}
                    </div>
                  </div>

                  <div className="blood-type-description">
                    <Paragraph style={{ fontSize: '12px', color: '#666', margin: 0 }}>
                      {bloodType.description}
                    </Paragraph>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <div className="blood-types-footer">
          <Paragraph style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
            💡 <strong>Ghi chú:</strong> Thông tin được cập nhật liên tục từ các ngân hàng máu trên toàn quốc
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default BloodTypesSection;
