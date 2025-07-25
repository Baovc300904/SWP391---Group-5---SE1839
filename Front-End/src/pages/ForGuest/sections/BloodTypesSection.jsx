import { Card, Col, Row, Typography, Badge } from 'antd';
import { HeartOutlined, ExperimentOutlined, MedicineBoxOutlined, FireOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const BloodTypesSection = () => {
  const bloodTypes = [
    {
      type: 'Máu toàn phần',
      icon: <FireOutlined />,
      color: '#e74c3c',
      description: 'Hiến máu truyền thống, cung cấp đầy đủ các thành phần máu cần thiết cho cấp cứu và điều trị.',
      uses: ['Cấp cứu tai nạn', 'Phẫu thuật lớn', 'Chấn thương nặng'],
      duration: '10-15 phút',
      volume: '350-450ml',
      frequency: '3-4 tháng/lần'
    },
    {
      type: 'Tiểu cầu',
      icon: <ExperimentOutlined />,
      color: '#f39c12',
      description: 'Thu thập tiểu cầu để điều trị bệnh nhân ung thư, suy tủy xương và các bệnh máu hiếm.',
      uses: ['Bệnh nhân ung thư', 'Suy tủy xương', 'Bệnh máu hiếm'],
      duration: '90-120 phút',
      volume: 'Chỉ tiểu cầu',
      frequency: '2 tuần/lần'
    },
    {
      type: 'Huyết tương',
      icon: <MedicineBoxOutlined />,
      color: '#3498db',
      description: 'Thu thập huyết tương giàu protein để sản xuất thuốc cứu sống và điều trị bệnh hiếm.',
      uses: ['Sản xuất thuốc', 'Bệnh hiếm', 'Miễn dịch'],
      duration: '60-90 phút',
      volume: 'Chỉ huyết tương',
      frequency: '2 tuần/lần'
    },
    {
      type: 'Tế bào gốc',
      icon: <HeartOutlined />,
      color: '#9b59b6',
      description: 'Hiến tế bào gốc từ máu ngoại vi để cứu sống bệnh nhân bạch cầu và ung thư máu.',
      uses: ['Bạch cầu', 'Ung thư máu', 'Ghép tủy'],
      duration: '4-6 giờ',
      volume: 'Tế bào gốc',
      frequency: 'Theo yêu cầu'
    }
  ];

  return (
    <div style={{ 
      padding: '100px 20px',
      background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f4fd 100%)',
      position: 'relative'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 107, 107, 0.05) 0%, transparent 50%)
        `,
        zIndex: 0
      }} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <Badge count="Mới" style={{ marginBottom: '20px' }}>
            <Title level={2} style={{ 
              color: '#2c3e50', 
              fontSize: '42px', 
              marginBottom: '0',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🩸 Các loại hiến máu
            </Title>
          </Badge>
          <Paragraph style={{ 
            fontSize: '20px', 
            color: '#7f8c8d', 
            maxWidth: '700px', 
            margin: '20px auto 0 auto',
            lineHeight: '1.7'
          }}>
            Khám phá các hình thức hiến máu khác nhau - mỗi loại đều có ý nghĩa đặc biệt trong việc cứu sống
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {bloodTypes.map((type, index) => (
            <Col xs={24} md={12} key={index}>
              <Card 
                style={{ 
                  height: '100%',
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(20px)',
                  position: 'relative'
                }}
                styles={{ 
                  body: { 
                    padding: '40px 30px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }
                }}
                hoverable
              >
                {/* Icon background */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '100px',
                  height: '100px',
                  background: `linear-gradient(135deg, ${type.color}15, ${type.color}05)`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ fontSize: '30px', color: type.color, opacity: 0.3 }}>
                    {type.icon}
                  </div>
                </div>

                <div style={{
                  background: `linear-gradient(135deg, ${type.color}, ${type.color}dd)`,
                  borderRadius: '16px',
                  width: '70px',
                  height: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '25px',
                  boxShadow: `0 8px 25px ${type.color}40`
                }}>
                  <div style={{ fontSize: '32px', color: 'white' }}>
                    {type.icon}
                  </div>
                </div>

                <Title level={4} style={{ 
                  color: '#2c3e50', 
                  marginBottom: '15px',
                  fontSize: '24px',
                  fontWeight: '600'
                }}>
                  {type.type}
                </Title>
                
                <Paragraph style={{ 
                  color: '#7f8c8d', 
                  lineHeight: '1.7',
                  marginBottom: '25px',
                  flex: 1
                }}>
                  {type.description}
                </Paragraph>

                {/* Stats */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '12px',
                    marginBottom: '15px' 
                  }}>
                    <div style={{ 
                      background: `${type.color}10`, 
                      padding: '8px 12px', 
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Thời gian</div>
                      <div style={{ fontWeight: 'bold', color: type.color }}>{type.duration}</div>
                    </div>
                    <div style={{ 
                      background: `${type.color}10`, 
                      padding: '8px 12px', 
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Tần suất</div>
                      <div style={{ fontWeight: 'bold', color: type.color }}>{type.frequency}</div>
                    </div>
                  </div>
                  <div style={{ 
                    background: `${type.color}10`, 
                    padding: '8px 12px', 
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Lượng thu thập</div>
                    <div style={{ fontWeight: 'bold', color: type.color }}>{type.volume}</div>
                  </div>
                </div>

                {/* Uses */}
                <div>
                  <div style={{ fontSize: '12px', color: '#7f8c8d', marginBottom: '8px' }}>
                    Sử dụng cho:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {type.uses.map((use, useIndex) => (
                      <span
                        key={useIndex}
                        style={{
                          background: `${type.color}15`,
                          color: type.color,
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '500'
                        }}
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* CTA */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '60px',
          padding: '40px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          borderRadius: '20px',
          backdropFilter: 'blur(20px)'
        }}>
          <Title level={3} style={{ color: '#2c3e50', marginBottom: '15px' }}>
            Không chắc loại nào phù hợp với bạn? 🤔
          </Title>
          <Paragraph style={{ color: '#7f8c8d', fontSize: '16px', marginBottom: '0' }}>
            Đội ngũ y bác sĩ của chúng tôi sẽ tư vấn và hướng dẫn bạn chọn hình thức hiến máu phù hợp nhất
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default BloodTypesSection;
