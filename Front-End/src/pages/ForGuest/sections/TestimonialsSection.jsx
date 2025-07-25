import { Card, Col, Row, Typography, Avatar, Rate } from 'antd';
import { UserOutlined, HeartFilled } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Nguyễn Minh Anh',
      age: 28,
      profession: 'Kỹ sư phần mềm',
      avatar: '👩‍💻',
      times: 12,
      quote: 'Mỗi lần hiến máu, tôi cảm thấy mình đã làm điều gì đó ý nghĩa. Được biết rằng máu của mình đã cứu sống một em bé, không có gì hạnh phúc hơn!',
      rating: 5,
      location: 'Hà Nội'
    },
    {
      name: 'Trần Văn Hùng',
      age: 35,
      profession: 'Bác sĩ',
      avatar: '👨‍⚕️',
      times: 25,
      quote: 'Là bác sĩ, tôi hiểu rõ giá trị của máu hiến tặng. Mỗi đơn vị máu có thể cứu sống 3 người. Đó là lý do tôi hiến máu đều đặn 20 năm qua.',
      rating: 5,
      location: 'TP.HCM'
    },
    {
      name: 'Lê Thị Mai',
      age: 24,
      profession: 'Sinh viên',
      avatar: '👩‍🎓',
      times: 8,
      quote: 'Ban đầu tôi hơi sợ, nhưng quy trình rất chuyên nghiệp và an toàn. Giờ tôi đã thuyết phục được cả gia đình tham gia hiến máu cùng!',
      rating: 5,
      location: 'Đà Nẵng'
    },
    {
      name: 'Phạm Đức Long',
      age: 42,
      profession: 'Giáo viên',
      avatar: '👨‍🏫',
      times: 30,
      quote: 'Hiến máu không chỉ giúp người khác mà còn giúp tôi khỏe mạnh hơn. Các bác sĩ nói tim mạch tôi rất tốt nhờ hiến máu đều đặn.',
      rating: 5,
      location: 'Cần Thơ'
    },
    {
      name: 'Võ Thị Lan',
      age: 31,
      profession: 'Nhân viên văn phòng',
      avatar: '👩‍💼',
      times: 15,
      quote: 'Tôi có nhóm máu O- hiếm, nên việc hiến máu càng ý nghĩa. Ứng dụng BloodConnect giúp tôi được thông báo khi có ca cấp cứu cần máu.',
      rating: 5,
      location: 'Hải Phòng'
    },
    {
      name: 'Hoàng Văn Nam',
      age: 26,
      profession: 'Kỹ thuật viên',
      avatar: '👨‍🔧',
      times: 10,
      quote: 'Sau khi hiến máu, tôi được khám sức khỏe miễn phí và phát hiện sớm một vấn đề nhỏ. Cảm ơn hệ thống đã giúp tôi chăm sóc sức khỏe tốt hơn!',
      rating: 5,
      location: 'Bình Dương'
    }
  ];

  return (
    <div style={{ 
      padding: '100px 20px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <Title level={2} style={{ 
            color: '#2c3e50', 
            fontSize: '42px', 
            marginBottom: '20px',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            💬 Chia sẻ từ cộng đồng
          </Title>
          <Paragraph style={{ 
            fontSize: '20px', 
            color: '#7f8c8d', 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Nghe những câu chuyện truyền cảm hứng từ những người hiến máu tình nguyện
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {testimonials.map((testimonial, index) => (
            <Col xs={24} md={12} lg={8} key={index}>
              <Card 
                style={{ 
                  height: '100%',
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  background: 'white',
                  position: 'relative'
                }}
                styles={{ 
                  body: { 
                    padding: '30px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }
                }}
                hoverable
              >
                {/* Quote mark */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontSize: '40px',
                  color: '#667eea',
                  opacity: 0.2,
                  fontFamily: 'serif'
                }}>
                  "
                </div>

                {/* User info */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '20px' 
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    marginRight: '15px',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                  }}>
                    {testimonial.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Title level={5} style={{ 
                      margin: 0, 
                      color: '#2c3e50',
                      fontSize: '18px'
                    }}>
                      {testimonial.name}
                    </Title>
                    <div style={{ 
                      color: '#7f8c8d', 
                      fontSize: '14px',
                      marginBottom: '5px'
                    }}>
                      {testimonial.profession}, {testimonial.age} tuổi
                    </div>
                    <div style={{ 
                      color: '#667eea', 
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      📍 {testimonial.location} • ❤️ {testimonial.times} lần hiến
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div style={{ marginBottom: '15px' }}>
                  <Rate 
                    disabled 
                    defaultValue={testimonial.rating} 
                    character={<HeartFilled />}
                    style={{ color: '#e74c3c', fontSize: '16px' }}
                  />
                </div>

                {/* Quote */}
                <Paragraph style={{ 
                  color: '#5a6c7d', 
                  lineHeight: '1.7',
                  fontStyle: 'italic',
                  flex: 1,
                  margin: 0,
                  fontSize: '15px'
                }}>
                  "{testimonial.quote}"
                </Paragraph>

                {/* Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  Người hiến máu tình nguyện
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Stats summary */}
        <div style={{
          marginTop: '60px',
          padding: '40px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '24px',
          color: 'white',
          textAlign: 'center'
        }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={8}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>
                4.9/5
              </div>
              <div style={{ color: 'rgba(255,255,255,0.8)' }}>
                Đánh giá trung bình
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>
                15,000+
              </div>
              <div style={{ color: 'rgba(255,255,255,0.8)' }}>
                Đánh giá tích cực
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>
                98%
              </div>
              <div style={{ color: 'rgba(255,255,255,0.8)' }}>
                Khuyến nghị cho bạn bè
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
