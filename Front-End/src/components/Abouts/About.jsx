import React from 'react';
import { FaHeartbeat } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './About.css';


import AppLayout from '../../layouts/AppLayout';
import Footer from '../Footers/Footer';

export default function About() {
  return (
    <>
      <AppLayout />

      <div className="about-section">
        <div className="about-wrapper">
          <div className="about-content">
            <h1><FaHeartbeat className="heartbeat-icon" /> Về Chúng Tôi</h1>

            <p className="about-quote">
              "Mỗi giọt máu đều quý giá. Sự hiến tặng của bạn có thể mang lại cơ hội sống thứ hai cho ai đó."
            </p>

            <p>
              Chúng tôi là một tổ chức phi lợi nhuận cam kết khuyến khích và hỗ trợ việc hiến máu tình nguyện để cứu sống mọi người trên khắp cả nước.
            </p>
            <p>
              Sứ mệnh của chúng tôi là đảm bảo nguồn cung cấp máu ổn định, an toàn và kịp thời cho các bệnh viện và bệnh nhân cần máu. Chúng tôi tổ chức các chương trình hiến máu, nâng cao nhận thức và hỗ trợ người hiến máu ở mọi bước.
            </p>
            <p>
              Hãy tham gia cộng đồng những người hùng của chúng tôi và giúp cứu sống mọi người — từng giọt máu một.
            </p>

            <div className="about-contact-section">
              <button className="join-btn" onClick={() => alert('Cảm ơn bạn đã quan tâm!')}>
                Trở Thành Người Hiến Máu
              </button>

              <Link to="/contact" className="contact-link">
              Liên hệ với chúng tôi
              </Link>
            </div>
          </div>

          <div className="about-image-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
              alt="Hiến Máu"
              className="about-image"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}