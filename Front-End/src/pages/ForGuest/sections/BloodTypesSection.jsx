import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Spin, Tag, Modal, Descriptions, Space, Divider } from 'antd';
import { 
  HeartOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import './style/BloodTypesSection.css';

const { Title, Paragraph, Text } = Typography;

const BloodTypesSection = () => {
  const [bloodTypes, setBloodTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBloodType, setSelectedBloodType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchBloodTypes = async () => {
      try {
        const response = await getPublicBloodTypes();
        setBloodTypes(response.data || []);
        console.log('Blood types data loaded:', response.data?.length);
      } catch (error) {
        console.error('Error loading blood types:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBloodTypes();
  }, []);

  const getBloodTypeStatus = (bloodType) => {
    // Define rare blood types
    const rareBloodTypes = ['AB-', 'B-', 'A-', 'O-'];
    const isRare = rareBloodTypes.includes(bloodType.name);
    
    return {
      status: isRare ? 'hiếm' : 'bình thường',
      color: isRare ? '#ff4d4f' : '#52c41a',
      icon: isRare ? <ExclamationCircleOutlined /> : <CheckCircleOutlined />
    };
  };

  const getBloodTypeDetails = (bloodType) => {
    const details = {
      'A+': {
        frequency: 'Phổ biến',
        canDonateTo: ['A+', 'AB+'],
        canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
        characteristics: 'Nhóm máu A+ có kháng nguyên A và Rh+',
        compatibility: 'Tương thích với A+ và AB+',
        description: 'Nhóm máu A+ là một trong những nhóm máu phổ biến nhất ở Việt Nam.'
      },
      'A-': {
        frequency: 'Hiếm',
        canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
        canReceiveFrom: ['A-', 'O-'],
        characteristics: 'Nhóm máu A- có kháng nguyên A nhưng không có Rh+',
        compatibility: 'Có thể hiến cho tất cả nhóm A và AB',
        description: 'Nhóm máu A- rất quý vì có thể hiến cho nhiều nhóm máu khác.'
      },
      'B+': {
        frequency: 'Phổ biến',
        canDonateTo: ['B+', 'AB+'],
        canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
        characteristics: 'Nhóm máu B+ có kháng nguyên B và Rh+',
        compatibility: 'Tương thích với B+ và AB+',
        description: 'Nhóm máu B+ phổ biến ở châu Á và Việt Nam.'
      },
      'B-': {
        frequency: 'Hiếm',
        canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
        canReceiveFrom: ['B-', 'O-'],
        characteristics: 'Nhóm máu B- có kháng nguyên B nhưng không có Rh+',
        compatibility: 'Có thể hiến cho tất cả nhóm B và AB',
        description: 'Nhóm máu B- rất quý và luôn cần thiết.'
      },
      'AB+': {
        frequency: 'Phổ biến',
        canDonateTo: ['AB+'],
        canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        characteristics: 'Nhóm máu AB+ có cả kháng nguyên A, B và Rh+',
        compatibility: 'Chỉ có thể hiến cho AB+, nhưng nhận được từ tất cả',
        description: 'AB+ là "người nhận phổ quát" - có thể nhận máu từ tất cả nhóm.'
      },
      'AB-': {
        frequency: 'Rất hiếm',
        canDonateTo: ['AB+', 'AB-'],
        canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        characteristics: 'Nhóm máu AB- có kháng nguyên A, B nhưng không có Rh+',
        compatibility: 'Có thể hiến cho AB+ và AB-, nhận từ nhóm âm',
        description: 'AB- là nhóm máu hiếm nhất, rất cần thiết trong y tế.'
      },
      'O+': {
        frequency: 'Phổ biến',
        canDonateTo: ['A+', 'B+', 'AB+', 'O+'],
        canReceiveFrom: ['O+', 'O-'],
        characteristics: 'Nhóm máu O+ không có kháng nguyên A, B nhưng có Rh+',
        compatibility: 'Có thể hiến cho tất cả nhóm dương',
        description: 'O+ là "người hiến phổ quát" cho nhóm dương.'
      },
      'O-': {
        frequency: 'Hiếm',
        canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        canReceiveFrom: ['O-'],
        characteristics: 'Nhóm máu O- không có kháng nguyên A, B và Rh+',
        compatibility: 'Có thể hiến cho tất cả nhóm máu',
        description: 'O- là "người hiến phổ quát" - có thể hiến cho tất cả.'
      }
    };

    return details[bloodType.name] || {
      frequency: 'Không xác định',
      canDonateTo: [],
      canReceiveFrom: [],
      characteristics: 'Thông tin chi tiết chưa có',
      compatibility: 'Chưa có thông tin',
      description: bloodType.description || 'Thông tin chi tiết về nhóm máu này.'
    };
  };

  const handleCardClick = (bloodType) => {
    setSelectedBloodType(bloodType);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedBloodType(null);
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
            Các <span>nhóm máu</span> hiện có
          </Title>
          <Paragraph className="blood-types-description">
            Thông tin về các nhóm máu tại ngân hàng máu
          </Paragraph>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <Spin size="large" />
            <div style={{ marginTop: '16px', color: '#666' }}>Đang tải dữ liệu nhóm máu...</div>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {bloodTypes.map((bloodType, index) => {
              const statusInfo = getBloodTypeStatus(bloodType);
              return (
                <Col xs={24} sm={12} lg={6} key={index}>
                  <Card 
                    className="blood-type-card" 
                    hoverable
                    style={{ borderLeft: `4px solid ${statusInfo.color}` }}
                    onClick={() => handleCardClick(bloodType)}
                  >
                    <div className="blood-type-header">
                      <div className="blood-type-icon">
                        🩸
                      </div>
                      <div className="blood-type-info">
                        <Title level={3} className="blood-type-name">
                          {bloodType.name}
                        </Title>
                        <Paragraph className="blood-type-full-name">
                          {bloodType.fullName}
                        </Paragraph>
                      </div>
                    </div>

                    <div className="blood-type-status">
                      <Tag 
                        color={statusInfo.color}
                        icon={statusInfo.icon}
                        className="urgency-tag"
                      >
                        {statusInfo.status}
                      </Tag>
                    </div>

                    <div className="blood-type-description">
                      <Paragraph style={{ fontSize: '12px', color: '#666', margin: 0 }}>
                        {bloodType.description}
                      </Paragraph>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '12px' }}>
                      <Text style={{ fontSize: '12px', color: '#999' }}>
                        <InfoCircleOutlined /> Click để xem chi tiết
                      </Text>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}

        <div className="blood-types-footer">
          <Paragraph style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
            💡 <strong>Ghi chú:</strong> Thông tin được cập nhật liên tục từ các ngân hàng máu trên toàn quốc
          </Paragraph>
        </div>
      </div>

      {/* Blood Type Detail Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>🩸</span>
            <span>Chi tiết nhóm máu {selectedBloodType?.name}</span>
          </div>
        }
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        centered
      >
        {selectedBloodType && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <Space align="center" style={{ marginBottom: '16px' }}>
                <Title level={3} style={{ margin: 0 }}>
                  {selectedBloodType.name} - {selectedBloodType.fullName}
                </Title>
                <Tag 
                  color={getBloodTypeStatus(selectedBloodType).color}
                  icon={getBloodTypeStatus(selectedBloodType).icon}
                >
                  {getBloodTypeStatus(selectedBloodType).status}
                </Tag>
              </Space>
              <Paragraph style={{ fontSize: '16px', color: '#666' }}>
                {getBloodTypeDetails(selectedBloodType).description}
              </Paragraph>
            </div>

            <Divider />

            <Descriptions 
              title="Thông tin chi tiết" 
              bordered 
              column={1}
              size="middle"
            >
              <Descriptions.Item label="Tần suất xuất hiện">
                <Text strong>{getBloodTypeDetails(selectedBloodType).frequency}</Text>
              </Descriptions.Item>
              
              <Descriptions.Item label="Đặc điểm">
                <Text>{getBloodTypeDetails(selectedBloodType).characteristics}</Text>
              </Descriptions.Item>
              
              <Descriptions.Item label="Tính tương thích">
                <Text>{getBloodTypeDetails(selectedBloodType).compatibility}</Text>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card 
                  size="small" 
                  title={
                    <Space>
                      <UserOutlined style={{ color: '#52c41a' }} />
                      <span>Có thể hiến cho</span>
                    </Space>
                  }
                  style={{ borderColor: '#52c41a' }}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {getBloodTypeDetails(selectedBloodType).canDonateTo.map((type, index) => (
                      <Tag key={index} color="green" style={{ margin: '2px' }}>
                        {type}
                      </Tag>
                    ))}
                  </Space>
                </Card>
              </Col>
              
              <Col span={12}>
                <Card 
                  size="small" 
                  title={
                    <Space>
                      <MedicineBoxOutlined style={{ color: '#1890ff' }} />
                      <span>Có thể nhận từ</span>
                    </Space>
                  }
                  style={{ borderColor: '#1890ff' }}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {getBloodTypeDetails(selectedBloodType).canReceiveFrom.map((type, index) => (
                      <Tag key={index} color="blue" style={{ margin: '2px' }}>
                        {type}
                      </Tag>
                    ))}
                  </Space>
                </Card>
              </Col>
            </Row>

            <Divider />

            <div style={{ textAlign: 'center', padding: '16px', background: '#f6f6f6', borderRadius: '8px' }}>
              <SafetyOutlined style={{ fontSize: '24px', color: '#52c41a', marginBottom: '8px' }} />
              <br />
              <Text strong>Lưu ý quan trọng</Text>
              <br />
              <Text style={{ fontSize: '12px', color: '#666' }}>
                Thông tin này chỉ mang tính chất tham khảo. Trong thực tế, việc truyền máu 
                cần được thực hiện theo đúng quy trình y tế và kiểm tra chéo tại bệnh viện.
              </Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BloodTypesSection;
