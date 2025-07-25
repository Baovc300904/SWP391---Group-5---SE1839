import { Card, Col, Row, Typography, Progress, Statistic } from 'antd';
import { 
  HeartOutlined, 
  SmileOutlined, 
  TrophyOutlined, 
  MedicineBoxOutlined,
  StarOutlined,
  GiftOutlined,
  ThunderboltOutlined,
  SafetyOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const BenefitsSection = () => {
  const healthBenefits = [
    {
      icon: <HeartOutlined />,
      title: 'Tốt cho tim mạch',
      description: 'Hiến máu giúp giảm nguy cơ bệnh tim mạch và đột quỵ lên đến 88%',
      color: '#e74c3c',
      stat: '88%'
    },
    {
      icon: <ThunderboltOutlined />,
      title: 'Tăng cường sức khỏe',
      description: 'Kích thích tạo máu mới, tăng cường hệ miễn dịch và cải thiện tuần hoàn',
      color: '#f39c12',
      stat: '100%'
    },
    {
      icon: <MedicineBoxOutlined />,
      title: 'Kiểm tra sức khỏe miễn phí',
      description: 'Được khám sàng lọc toàn diện và xét nghiệm máu miễn phí mỗi lần hiến',
      color: '#27ae60',
      stat: 'Miễn phí'
    },
    {
      icon: <SmileOutlined />,
      title: 'Cải thiện tâm lý',
      description: 'Cảm giác hạnh phúc và ý nghĩa khi biết mình đã cứu sống được người khác',
      color: '#3498db',
      stat: '95%'
    }
  ];

  const socialBenefits = [
    {
      icon: <TrophyOutlined />,
      title: 'Danh hiệu vinh dự',
      description: 'Nhận bằng khen, huy chương từ Bộ Y tế và chính quyền địa phương',
      rewards: ['Huy chương vàng', 'Bằng khen Bộ trưởng', 'Giấy chứng nhận']
    },
    {
      icon: <GiftOutlined />,
      title: 'Ưu đãi đặc biệt',
      description: 'Nhiều ưu đãi từ đối tác và doanh nghiệp dành cho người hiến máu',
      rewards: ['Giảm giá mua sắm', 'Khám bệnh ưu tiên', 'Quà tặng đặc biệt']
    },
    {
      icon: <SafetyOutlined />,
      title: 'Bảo hiểm miễn phí',
      description: 'Được bảo hiểm tai nạn trong quá trình hiến máu hoàn toàn miễn phí',
      rewards: ['Bảo hiểm 24/7', 'Chi trả nhanh', 'Hỗ trợ y tế']
    },
    {
      icon: <StarOutlined />,
      title: 'Cộng đồng danh giá',
      description: 'Tham gia cộng đồng những người hiến máu tình nguyện uy tín',
      rewards: ['Sự kiện đặc biệt', 'Gặp gỡ VIP', 'Mạng lưới rộng']
    }
  ];

  return (
    <div style={{ 
      padding: '100px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zM10 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        `,
        opacity: 0.5,
        animation: 'float 20s ease-in-out infinite'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <Title level={2} style={{ 
            color: 'white', 
            fontSize: '42px', 
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            🎁 Lợi ích khi hiến máu
          </Title>
          <Paragraph style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.9)', 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: '1.7',
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
          }}>
            Hiến máu không chỉ cứu người mà còn mang lại nhiều lợi ích tuyệt vời cho chính bạn
          </Paragraph>
        </div>

        {/* Health Benefits */}
        <div style={{ marginBottom: '80px' }}>
          <Title level={3} style={{ 
            color: 'white', 
            textAlign: 'center',
            marginBottom: '50px',
            fontSize: '28px'
          }}>
            💪 Lợi ích sức khỏe
          </Title>
          <Row gutter={[24, 24]}>
            {healthBenefits.map((benefit, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card 
                  style={{ 
                    height: '100%',
                    borderRadius: '20px',
                    border: 'none',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.3s ease'
                  }}
                  styles={{ 
                    body: { 
                      padding: '30px 20px',
                      textAlign: 'center',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }
                  }}
                  hoverable
                >
                  <div style={{
                    background: `linear-gradient(135deg, ${benefit.color}, ${benefit.color}dd)`,
                    borderRadius: '50%',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto',
                    boxShadow: `0 10px 30px ${benefit.color}40`
                  }}>
                    <div style={{ fontSize: '36px', color: 'white' }}>
                      {benefit.icon}
                    </div>
                  </div>
                  
                  <Title level={4} style={{ 
                    color: 'white', 
                    marginBottom: '15px',
                    fontSize: '18px'
                  }}>
                    {benefit.title}
                  </Title>
                  
                  <Paragraph style={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    flex: 1,
                    fontSize: '14px'
                  }}>
                    {benefit.description}
                  </Paragraph>

                  <Statistic 
                    value={benefit.stat}
                    valueStyle={{ 
                      color: benefit.color,
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Social Benefits */}
        <div>
          <Title level={3} style={{ 
            color: 'white', 
            textAlign: 'center',
            marginBottom: '50px',
            fontSize: '28px'
          }}>
            🏆 Lợi ích xã hội
          </Title>
          <Row gutter={[24, 24]}>
            {socialBenefits.map((benefit, index) => (
              <Col xs={24} md={12} lg={6} key={index}>
                <Card 
                  style={{ 
                    height: '100%',
                    borderRadius: '20px',
                    border: 'none',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.3s ease'
                  }}
                  styles={{ 
                    body: { 
                      padding: '30px 20px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }
                  }}
                  hoverable
                >
                  <div style={{
                    background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4)'
                  }}>
                    <div style={{ fontSize: '28px', color: '#f39c12' }}>
                      {benefit.icon}
                    </div>
                  </div>
                  
                  <Title level={4} style={{ 
                    color: 'white', 
                    marginBottom: '15px',
                    fontSize: '18px'
                  }}>
                    {benefit.title}
                  </Title>
                  
                  <Paragraph style={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    flex: 1,
                    fontSize: '14px'
                  }}>
                    {benefit.description}
                  </Paragraph>

                  <div style={{ marginTop: 'auto' }}>
                    {benefit.rewards.map((reward, rewardIndex) => (
                      <div
                        key={rewardIndex}
                        style={{
                          background: 'rgba(255,255,255,0.15)',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          marginBottom: '6px',
                          textAlign: 'center'
                        }}
                      >
                        {reward}
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Stats */}
        <div style={{
          marginTop: '80px',
          padding: '40px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          backdropFilter: 'blur(20px)',
          textAlign: 'center'
        }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={8}>
              <Statistic 
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Người được cứu sống</span>}
                value={180000}
                suffix="+"
                valueStyle={{ color: '#ffd700', fontSize: '32px' }}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic 
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Người hiến máu hạnh phúc</span>}
                value={95}
                suffix="%"
                valueStyle={{ color: '#ffd700', fontSize: '32px' }}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic 
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Lợi ích sức khỏe được chứng minh</span>}
                value={12}
                suffix="+"
                valueStyle={{ color: '#ffd700', fontSize: '32px' }}
              />
            </Col>
          </Row>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}
      </style>
    </div>
  );
};

export default BenefitsSection;
