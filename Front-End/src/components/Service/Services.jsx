import React from 'react';
import './Services.css'; // nhớ tạo CSS nếu muốn style đẹp hơn

import AppLayout from '../../layouts/AppLayout';
import Footer from "../common/Footers/Footer";

export default function Services() {
  return (
    <>
    <AppLayout />
    <div className="services-container">
      <h1>Dịch vụ Hỗ trợ Hiến máu Tình nguyện của chúng tôi</h1>
      <p className="intro">
        Chúng tôi cung cấp nhiều dịch vụ nhằm hỗ trợ hiến máu tình nguyện và sức khỏe cộng đồng.
      </p>

      <div className="service-list">
        <div className="service-card">
          <h3>🩸 Các sự kiện hiến máu</h3>
          <p>
            Chúng tôi tổ chức các chiến dịch hiến máu định kỳ trên toàn quốc phối hợp với bệnh viện và chính quyền địa phương.
          </p>
        </div>

        <div className="service-card">
          <h3>📞 Đường dây hỗ trợ người hiến máu</h3>
          <p>
            Đường dây nóng 24/7 của chúng tôi luôn sẵn sàng giải đáp thắc mắc và hướng dẫn cho người hiến máu mới hoặc đã từng hiến.
          </p>
        </div>

        <div className="service-card">
          <h3>🎓 Giáo dục & Tuyên truyền</h3>
          <p>
            Chúng tôi tổ chức các buổi hội thảo và lớp tập huấn nhằm nâng cao nhận thức về tầm quan trọng của việc hiến máu cứu người.
          </p>
        </div>

        <div className="service-card">
          <h3>💳 Vinh danh người hiến máu</h3>
          <p>
            Người hiến máu sẽ nhận được giấy chứng nhận điện tử và những phần quà nhỏ nhằm ghi nhận đóng góp cho cộng đồng.
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
