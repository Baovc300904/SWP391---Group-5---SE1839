import React, { useState } from 'react';
import { 
  Typography, 
  Row, 
  Col, 
  Card, 
  Form, 
  Input, 
  Button, 
  Space, 
  message,
  Divider,
  Timeline
} from 'antd';
import { 
  PhoneOutlined, 
  MailOutlined, 
  EnvironmentOutlined,
  ClockCircleOutlined,
  CustomerServiceOutlined,
  SendOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 24h.');
      form.resetFields();
    } catch (error) {
      message.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <PhoneOutlined />,
      title: 'Hotline 24/7',
      content: '1900 1234',
      description: 'Hỗ trợ khẩn cấp và tư vấn'
    },
    {
      icon: <MailOutlined />,
      title: 'Email',
      content: 'support@hienmau.vn',
      description: 'Phản hồi trong 4-6 giờ'
    },
    {
      icon: <EnvironmentOutlined />,
      title: 'Địa chỉ',
      content: 'FPT University, Hà Nội',
      description: 'Thứ 2 - Chủ nhật: 7:00 - 22:00'
    },
    {
      icon: <CustomerServiceOutlined />,
      title: 'Tổng đài CSKH',
      content: '1800 2468',
      description: 'Hỗ trợ người dùng'
    }
  ];

  const workingHours = [
    { day: 'Thứ 2 - Thứ 6', time: '07:00 - 22:00' },
    { day: 'Thứ 7 - Chủ nhật', time: '08:00 - 20:00' },
    { day: 'Ngày lễ', time: '09:00 - 18:00' }
  ];

  const socialLinks = [
    { icon: <FacebookOutlined />, name: 'Facebook', color: '#1877f2' },
    { icon: <TwitterOutlined />, name: 'Twitter', color: '#1da1f2' },
    { icon: <InstagramOutlined />, name: 'Instagram', color: '#e4405f' },
    { icon: <YoutubeOutlined />, name: 'YouTube', color: '#ff0000' }
  ];

  return (
    <div style={{ 
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={1} style={{ 
            color: '#fff', 
            fontSize: '3.5rem',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Liên Hệ Với Chúng Tôi
          </Title>
          <Paragraph style={{ 
            fontSize: '1.2rem', 
            color: '#fff',
            maxWidth: '800px',
            margin: '0 auto',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}>
            Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Hãy liên hệ với chúng tôi bất cứ khi nào bạn có thắc mắc!
          </Paragraph>
        </div>

        <Row gutter={[40, 40]}>
          {/* Contact Form */}
          <Col xs={24} lg={14}>
            <Card style={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              height: 'fit-content'
            }}>
              <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
                Gửi Tin Nhắn
              </Title>
              
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                size="large"
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      label="Họ và tên"
                      rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                      <Input placeholder="Nhập họ và tên của bạn" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' }
                      ]}
                    >
                      <Input placeholder="Nhập email của bạn" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="phone"
                      label="Số điện thoại"
                      rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                      <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="subject"
                      label="Chủ đề"
                      rules={[{ required: true, message: 'Vui lòng nhập chủ đề!' }]}
                    >
                      <Input placeholder="Chủ đề tin nhắn" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="message"
                  label="Nội dung"
                  rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                >
                  <TextArea 
                    rows={6} 
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                  />
                </Form.Item>

                <Form.Item style={{ textAlign: 'center', marginTop: '30px' }}>
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    icon={<SendOutlined />}
                    style={{
                      background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '0 40px',
                      height: '50px',
                      fontSize: '16px'
                    }}
                  >
                    Gửi Tin Nhắn
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* Contact Info */}
          <Col xs={24} lg={10}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* Contact Details */}
              <Card style={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}>
                <Title level={3} style={{ marginBottom: '25px' }}>
                  Thông Tin Liên Hệ
                </Title>
                
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  {contactInfo.map((info, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <div style={{ 
                        fontSize: '1.5rem', 
                        color: '#f5576c',
                        marginRight: '15px',
                        marginTop: '5px'
                      }}>
                        {info.icon}
                      </div>
                      <div>
                        <Text strong style={{ fontSize: '16px' }}>{info.title}</Text>
                        <br />
                        <Text style={{ fontSize: '15px', color: '#1890ff' }}>{info.content}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '13px' }}>{info.description}</Text>
                      </div>
                    </div>
                  ))}
                </Space>
              </Card>

              {/* Working Hours */}
              <Card style={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}>
                <Title level={4} style={{ marginBottom: '20px' }}>
                  <ClockCircleOutlined style={{ marginRight: '10px', color: '#f5576c' }} />
                  Giờ Làm Việc
                </Title>
                
                {workingHours.map((schedule, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: index < workingHours.length - 1 ? '1px solid #f0f0f0' : 'none'
                  }}>
                    <Text>{schedule.day}</Text>
                    <Text strong style={{ color: '#f5576c' }}>{schedule.time}</Text>
                  </div>
                ))}
              </Card>

              {/* Social Media */}
              <Card style={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}>
                <Title level={4} style={{ marginBottom: '20px' }}>
                  Theo Dõi Chúng Tôi
                </Title>
                
                <Space size="large">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      shape="circle"
                      size="large"
                      icon={social.icon}
                      style={{
                        color: social.color,
                        borderColor: social.color,
                        background: 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = social.color;
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = social.color;
                      }}
                    />
                  ))}
                </Space>
              </Card>
            </Space>
          </Col>
        </Row>

        {/* FAQ Section */}
        <Card style={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          marginTop: '40px'
        }}>
          <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>
            Câu Hỏi Thường Gặp
          </Title>
          
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Text strong>Làm thế nào để đăng ký hiến máu?</Text>
                  <br />
                  <Text type="secondary">
                    Bạn có thể đăng ký trực tuyến qua website hoặc gọi hotline 1900 1234.
                  </Text>
                </div>
                <Divider />
                <div>
                  <Text strong>Điều kiện để hiến máu là gì?</Text>
                  <br />
                  <Text type="secondary">
                    Tuổi từ 18-60, cân nặng trên 45kg, sức khỏe tốt, không mắc bệnh truyền nhiễm.
                  </Text>
                </div>
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Text strong>Tần suất hiến máu bao lâu một lần?</Text>
                  <br />
                  <Text type="secondary">
                    Nam giới: 3 tháng/lần, Nữ giới: 4 tháng/lần, tối đa 5 lần/năm.
                  </Text>
                </div>
                <Divider />
                <div>
                  <Text strong>Có được hưởng quyền lợi gì không?</Text>
                  <br />
                  <Text type="secondary">
                    Có nhiều quyền lợi như khám sức khỏe miễn phí, ưu tiên khám chữa bệnh.
                  </Text>
                </div>
              </Space>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
