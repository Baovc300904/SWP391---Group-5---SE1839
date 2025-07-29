import { Card, Timeline, Avatar, Typography } from 'antd';
import { UserOutlined, MedicineBoxOutlined, HeartOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ProcessTimelineSection = () => {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
      padding: '80px 20px' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={2} style={{ color: '#2c3e50', fontSize: '36px', marginBottom: '20px' }}>
            Quy trình hiến máu đơn giản
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#7f8c8d', maxWidth: '600px', margin: '0 auto' }}>
            Chỉ với 4 bước đơn giản, bạn đã có thể tham gia cứu sống nhiều người
          </Paragraph>
        </div>

        <Timeline
          mode="alternate"
          style={{ padding: '40px 0' }}
          items={[
            {
              dot: <Avatar style={{ background: '#667eea' }} icon={<UserOutlined />} />,
              children: (
                <Card style={{ borderRadius: '15px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                  <Title level={4} style={{ color: '#2c3e50', marginBottom: '10px' }}>Đăng ký tài khoản</Title>
                  <Paragraph style={{ margin: 0, color: '#7f8c8d' }}>
                    Tạo tài khoản và cung cấp thông tin cá nhân cơ bản để tham gia hệ thống
                  </Paragraph>
                </Card>
              )
            },
            {
              dot: <Avatar style={{ background: '#ff6b6b' }} icon={<MedicineBoxOutlined />} />,
              children: (
                <Card style={{ borderRadius: '15px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                  <Title level={4} style={{ color: '#2c3e50', marginBottom: '10px' }}>Khám sàng lọc</Title>
                  <Paragraph style={{ margin: 0, color: '#7f8c8d' }}>
                    Kiểm tra sức khỏe tổng quát để đảm bảo an toàn cho người hiến và người nhận
                  </Paragraph>
                </Card>
              )
            },
            {
              dot: <Avatar style={{ background: '#2ed573' }} icon={<HeartOutlined />} />,
              children: (
                <Card style={{ borderRadius: '15px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                  <Title level={4} style={{ color: '#2c3e50', marginBottom: '10px' }}>Hiến máu</Title>
                  <Paragraph style={{ margin: 0, color: '#7f8c8d' }}>
                    Quy trình hiến máu an toàn, nhanh chóng với đội ngũ y bác sĩ chuyên nghiệp
                  </Paragraph>
                </Card>
              )
            },
            {
              dot: <Avatar style={{ background: '#ffa726' }} icon={<CheckCircleOutlined />} />,
              children: (
                <Card style={{ borderRadius: '15px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                  <Title level={4} style={{ color: '#2c3e50', marginBottom: '10px' }}>Nhận chứng nhận</Title>
                  <Paragraph style={{ margin: 0, color: '#7f8c8d' }}>
                    Nhận giấy chứng nhận hiến máu và theo dõi lịch sử hiến máu trên hệ thống
                  </Paragraph>
                </Card>
              )
            }
          ]}
        />
      </div>
    </div>
  );
};

export default ProcessTimelineSection;
