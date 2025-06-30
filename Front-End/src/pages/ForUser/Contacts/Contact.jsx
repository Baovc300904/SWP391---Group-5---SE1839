import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Heart, Send, CheckCircle } from 'lucide-react';
import './Contact.css';
import BackToTop from '../../../components/common/BackToTop';

/**
 * Renders a modern contact page for blood donation support, featuring contact information and a contact form.
 *
 * Displays validation errors for required fields and shows a thank-you message upon successful submission. 
 * Users can send another message after submitting.
 * 
 * @returns {JSX.Element} The contact page component.
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) newErrors.fullname = "Họ và tên là bắt buộc.";
    if (!formData.email.trim()) newErrors.email = "Email là bắt buộc.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Định dạng email không hợp lệ.";

    if (!formData.phone.trim()) newErrors.phone = "Số điện thoại là bắt buộc.";
    else if (!/^[0-9]{9,15}$/.test(formData.phone)) newErrors.phone = "Số điện thoại phải từ 9-15 chữ số.";

    if (!formData.subject.trim()) newErrors.subject = "Vui lòng chọn một chủ đề.";
    if (!formData.message.trim()) newErrors.message = "Tin nhắn không được để trống.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Thay thế bằng API call tại đây
      setSubmitted(true);
    }
  };

  const handleNewMessage = () => {
    setFormData({
      fullname: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <>
      <div className="contact-page">
        {/* Hero Section */}
        <div className="contact-hero">
          <div className="contact-hero-content">
            <div className="contact-hero-icon">
              <Heart size={48} />
            </div>
            <h1 className="contact-hero-title">Liên Hệ Với Chúng Tôi</h1>
            <p className="contact-hero-subtitle">
              Lan tỏa yêu thương, cứu sống mạng người.<br />
              Hãy để lại thông tin và tin nhắn. Chúng tôi sẽ liên hệ với bạn sớm nhất!
            </p>
          </div>
        </div>

        <div className="contact-main">
          <div className="contact-container">
            {/* Contact Information */}
            <div className="contact-info-section">
              <h2 className="contact-info-title">Thông Tin Liên Hệ</h2>
              <div className="contact-info-grid">
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Phone size={24} />
                  </div>
                  <div className="contact-info-content">
                    <h3>Điện Thoại</h3>
                    <p>+84 123 456 789</p>
                    <p>+84 987 654 321</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Mail size={24} />
                  </div>
                  <div className="contact-info-content">
                    <h3>Email</h3>
                    <p>info@hienmau.com</p>
                    <p>support@hienmau.com</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="contact-info-content">
                    <h3>Địa Chỉ</h3>
                    <p>123 Đường ABC, Quận 1</p>
                    <p>TP. Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Clock size={24} />
                  </div>
                  <div className="contact-info-content">
                    <h3>Giờ Làm Việc</h3>
                    <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                    <p>Thứ 7: 8:00 - 12:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <h2 className="contact-form-title">Gửi Tin Nhắn</h2>
              
              {!submitted ? (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fullname">Họ và Tên *</label>
                      <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        placeholder="Nhập họ và tên của bạn"
                        value={formData.fullname}
                        onChange={handleChange}
                        className={errors.fullname ? 'error' : ''}
                      />
                      {errors.fullname && <span className="error-message">{errors.fullname}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@vidu.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Số Điện Thoại *</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Nhập số điện thoại của bạn"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'error' : ''}
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">Chủ Đề *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={errors.subject ? 'error' : ''}
                      >
                        <option value="">-- Chọn một chủ đề --</option>
                        <option value="donation">Tôi muốn hiến máu</option>
                        <option value="request">Tôi cần máu</option>
                        <option value="volunteer">Tôi muốn làm tình nguyện viên</option>
                        <option value="feedback">Phản hồi / Khác</option>
                      </select>
                      {errors.subject && <span className="error-message">{errors.subject}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Tin Nhắn *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      placeholder="Bạn muốn chia sẻ điều gì? Hãy mô tả chi tiết..."
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? 'error' : ''}
                    />
                    {errors.message && <span className="error-message">{errors.message}</span>}
                  </div>

                  <button type="submit" className="contact-submit-btn">
                    <Send size={20} />
                    Gửi Tin Nhắn
                  </button>
                </form>
              ) : (
                <div className="contact-success">
                  <div className="success-icon">
                    <CheckCircle size={64} />
                  </div>
                  <h3>Cảm ơn bạn đã liên hệ!</h3>
                  <p>Chúng tôi đã nhận được tin nhắn của bạn và sẽ liên lạc trong thời gian sớm nhất.</p>
                  <button onClick={handleNewMessage} className="contact-submit-btn">
                    <Send size={20} />
                    Gửi tin nhắn khác
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Top Component */}
      <BackToTop />
    </>
  );
}