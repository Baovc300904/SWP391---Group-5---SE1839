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
  Divider
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
  YoutubeOutlined,
  HeartOutlined
} from '@ant-design/icons';
import './style/Contact.css';

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
      message.success('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
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
      content: 'Hỗ trợ khẩn cấp',
      description: 'Hỗ trợ khẩn cấp và tư vấn'
    },
    {
      icon: <MailOutlined />,
      title: 'Email',
      content: 'support@hienmau.vn',
      description: 'Phản hồi nhanh chóng'
    },
    {
      icon: <EnvironmentOutlined />,
      title: 'Trụ sở chính',
      content: 'FPT University, Hà Nội',
      description: 'Làm việc tất cả các ngày trong tuần'
    },
    {
      icon: <CustomerServiceOutlined />,
      title: 'Tổng đài CSKH',
      content: 'Hỗ trợ đối tác',
      description: 'Hỗ trợ cơ sở y tế đối tác'
    }
  ];

  const workingHours = [
    { day: 'Thứ 2 - Thứ 6', time: 'Sáng - Tối' },
    { day: 'Thứ 7 - Chủ nhật', time: 'Sáng - Chiều' },
    { day: 'Ngày lễ', time: 'Sáng - Chiều' }
  ];

  const socialLinks = [
    { icon: <FacebookOutlined />, name: 'Facebook', color: '#1877f2' },
    { icon: <TwitterOutlined />, name: 'Twitter', color: '#1da1f2' },
    { icon: <InstagramOutlined />, name: 'Instagram', color: '#e4405f' },
    { icon: <YoutubeOutlined />, name: 'YouTube', color: '#ff0000' }
  ];

  const faqData = [
    {
      question: 'Làm thế nào để đăng ký hiến máu?',
      answer: 'Bạn có thể đăng ký trực tuyến qua website hoặc gọi hotline hỗ trợ.'
    },
    {
      question: 'Điều kiện để hiến máu là gì?',
      answer: 'Tuổi từ 18-60, cân nặng trên 45kg, sức khỏe tốt, không mắc bệnh truyền nhiễm.'
    },
    {
      question: 'Tần suất hiến máu bao lâu một lần?',
      answer: 'Nam giới: 3 tháng/lần, Nữ giới: 4 tháng/lần, tối đa 5 lần/năm.'
    },
    {
      question: 'Có được hưởng quyền lợi gì không?',
      answer: 'Có nhiều quyền lợi như khám sức khỏe miễn phí, ưu tiên khám chữa bệnh.'
    }
  ];

  return (
    <div className="contact-section">
      {/* Background Elements */}
      <div className="contact-background">
        <div className="floating-drop drop-1"></div>
        <div className="floating-drop drop-2"></div>
        <div className="floating-drop drop-3"></div>
      </div>

      <div className="contact-container">
        {/* Hero Section */}
        <div className="contact-header">
          <div className="contact-badge">
            <HeartOutlined />
            <span>Liên Hệ</span>
          </div>
          <Title level={1} className="contact-title">
            Liên hệ với <span>chúng tôi</span>
          </Title>
          <Paragraph className="contact-description">
            Chúng tôi luôn sẵn sàng hỗ trợ cơ sở y tế đối tác và người hiến máu 24/7. Hãy liên hệ với chúng tôi bất cứ khi nào bạn có thắc mắc!
          </Paragraph>
        </div>

        <Row gutter={[40, 40]}>
          {/* Contact Form */}
          <Col xs={24} lg={14}>
            <Card className="contact-form-card">
              <Title level={2} className="form-title">
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

                <Form.Item className="submit-item">
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    icon={<SendOutlined />}
                    className="submit-btn"
                  >
                    Gửi Tin Nhắn
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* Contact Info */}
          <Col xs={24} lg={10}>
            <Space direction="vertical" size="large" className="contact-info-space">
              {/* Contact Details */}
              <Card className="contact-info-card">
                <Title level={3} className="info-title">
                  Thông Tin Liên Hệ
                </Title>
                
                <Space direction="vertical" size="large" className="info-list">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="info-item">
                      <div className="info-icon">
                        {info.icon}
                      </div>
                      <div className="info-content">
                        <Text strong className="info-label">{info.title}</Text>
                        <br />
                        <Text className="info-value">{info.content}</Text>
                        <br />
                        <Text className="info-description">{info.description}</Text>
                      </div>
                    </div>
                  ))}
                </Space>
              </Card>

              {/* Working Hours */}
              <Card className="working-hours-card">
                <Title level={4} className="hours-title">
                  <ClockCircleOutlined />
                  Giờ Làm Việc
                </Title>
                
                <div className="hours-list">
                  {workingHours.map((schedule, index) => (
                    <div key={index} className="hours-item">
                      <Text className="hours-day">{schedule.day}</Text>
                      <Text strong className="hours-time">{schedule.time}</Text>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Social Media */}
              <Card className="social-card">
                <Title level={4} className="social-title">
                  Theo Dõi Chúng Tôi
                </Title>
                
                <Space size="large" className="social-buttons">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      shape="circle"
                      size="large"
                      icon={social.icon}
                      className="social-btn"
                      style={{
                        color: social.color,
                        borderColor: social.color
                      }}
                    />
                  ))}
                </Space>
              </Card>
            </Space>
          </Col>
        </Row>

        {/* FAQ Section */}
        <Card className="faq-card">
          <Title level={3} className="faq-title">
            Câu Hỏi <span>Thường Gặp</span>
          </Title>
          
          <Row gutter={[24, 24]}>
            {faqData.map((faq, index) => (
              <Col xs={24} md={12} key={index}>
                <div className="faq-item">
                  <Text strong className="faq-question">{faq.question}</Text>
                  <br />
                  <Text className="faq-answer">{faq.answer}</Text>
                  {index < faqData.length - 1 && <Divider />}
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
