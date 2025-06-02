import React from 'react'
import './FAQSection.css'; // Import your CSS file for styling
import { Card, CardContent } from "@/components/ui/card";
import Slider from 'react-slick';
import '../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../node_modules/slick-carousel/slick/slick-theme.css';

export default function FAQSection() {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <>
        <section className="home-faq-section">
          <div className="home-faq-grid">
            {/* Cột 1: Thẻ tiêu đề to */}
            <div className="home-faq-title-card">
              <h2>❓ Câu hỏi thường gặp</h2>
            </div>

            {/* Các thẻ nhỏ: Cột 2 và 3 */}
            <div className="home-faq-card">
              <div className="home-faq-icon">
                <i className="fas fa-user-check"></i>
              </div>
              <p>Ai có thể tham gia hiến máu?</p>
            </div>

            <div className="home-faq-card">
              <div className="home-faq-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <p>Tôi có được nhận giấy chứng nhận không?</p>
            </div>

            <div className="home-faq-card">
              <div className="home-faq-icon">
                <i className="fas fa-tint"></i>
              </div>
              <p>Bao lâu thì có thể hiến máu lần tiếp theo?</p>
            </div>

            <div className="home-faq-card">
              <div className="home-faq-icon">
                <i className="fas fa-bed"></i>
              </div>
              <p>Sau khi hiến máu có cần nghỉ ngơi không?</p>
            </div>

            <div className="home-faq-card">
              <div className="home-faq-icon">
                <i className="fas fa-hospital-user"></i>
              </div>
              <p>Có cần khám sức khỏe trước không?</p>
            </div>

            <div className="home-faq-card">
              <div className="home-faq-icon">
                <i className="fas fa-apple-alt"></i>
              </div>
              <p>Có nên ăn uống trước khi hiến máu?</p>
            </div>
          </div>
        </section>

        <div className="home-quick-stats">
          <Card className="home-stat-card">
            <CardContent>
              <h3 className="home-stat-value">1,254+</h3>
              <p className="home-stat-label">Người tham gia</p>
            </CardContent>
          </Card>
          <Card className="home-stat-card">
            <CardContent>
              <h3 className="home-stat-value">3,785</h3>
              <p className="home-stat-label">Đơn vị máu tiếp nhận</p>
            </CardContent>
          </Card>
          <Card className="home-stat-card">
            <CardContent>
              <h3 className="home-stat-value">52</h3>
              <p className="home-stat-label">Trung tâm y tế liên kết</p>
            </CardContent>
          </Card>
        </div>

        <section className="home-donor-stories">
          <h2 className="home-section-title">Câu chuyện người hiến máu</h2>
          <Slider {...sliderSettings}>
            <div className="home-story-slide">
              <p>"Tôi từng cần máu để cứu sống người thân. Giờ đây tôi muốn đền đáp lại."</p>
              <strong>- Nguyễn Văn Minh</strong>
            </div>
            <div className="home-story-slide">
              <p>"Mỗi lần hiến máu là một lần tôi cảm thấy mình sống có ý nghĩa hơn."</p>
              <strong>- Trần Thị Hồng</strong>
            </div>
          </Slider>
        </section>
    </>
  )
}
