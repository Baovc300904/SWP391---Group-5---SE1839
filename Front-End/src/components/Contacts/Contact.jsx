import React, { useState } from 'react';
import './Contact.css';
import AppLayout from '../../layouts/AppLayout';
import Footer from "../common/Footers/Footer";

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
      <AppLayout />
      <div className="contact-container">
        <div className="contact-content">
          <h2 className="contact-title">Hỗ Trợ Hiến Máu</h2>
          <p className="contact-description">
            Lan tỏa yêu thương, cứu sống mạng người.<br />
            Hãy để lại thông tin liên lạc và tin nhắn. Chúng tôi sẽ liên hệ với bạn!
          </p>

          {!submitted ? (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="fullname">Họ và Tên</label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Nhập họ và tên của bạn"
                value={formData.fullname}
                onChange={handleChange}
              />
              {errors.fullname && <span className="error">{errors.fullname}</span>}

              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email@vidu.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}

              <label htmlFor="phone">Số Điện Thoại</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Nhập số điện thoại của bạn"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}

              <label htmlFor="subject">Chủ Đề</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="">-- Chọn một chủ đề --</option>
                <option value="donation">Tôi muốn hiến máu</option>
                <option value="request">Tôi cần máu</option>
                <option value="volunteer">Tôi muốn làm tình nguyện viên</option>
                <option value="feedback">Phản hồi / Khác</option>
              </select>
              {errors.subject && <span className="error">{errors.subject}</span>}

              <label htmlFor="message">Tin Nhắn</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Bạn muốn chia sẻ điều gì?"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <span className="error">{errors.message}</span>}

              <button type="submit" className="contact-btn">Gửi</button>
            </form>
          ) : (
            <div className="contact-thank-you">
              <h3>Cảm ơn bạn đã liên hệ!</h3>
              <p>Chúng tôi sẽ liên lạc với bạn sớm nhất có thể.</p>
              <button onClick={handleNewMessage} className="contact-btn">Gửi tin nhắn khác</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}