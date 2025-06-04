import React from 'react'
import './FAQSection.css'; // Import your CSS file for styling
import { Card, CardContent } from "@/components/common/card";
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
              <h2> Tiêu chuẩn tham gia hiến máu❓ </h2>
            </div>

            {/* Các thẻ nhỏ: Cột 2 và 3 */}
            <div className="home-faq-card">
              <div className="home-faq-icon icon-red">
                <i className="fas fa-user-check"></i> 
              </div>
              <span className="home-faq-description">
                Người từ 18 đến 60 tuổi, cân nặng ≥ 45kg, không mắc bệnh truyền nhiễm.
              </span>
            </div>

                        {/* Thẻ chiếm 2 hàng bên phải */}
            <div className="home-faq-card home-faq-double">
              <div className="home-faq-icon icon-purple">
                <i className="fas fa-info-circle"></i>
              </div>
              <span className="home-faq-description">
                Nếu bạn có bất kỳ triệu chứng nào như sốt, ho, hoặc đang dùng thuốc điều trị, bạn nên hoãn hiến máu đến khi khỏe hẳn.
              </span>
            </div>

            {/* <div className="home-faq-card">
              <div className="home-faq-icon icon-green">
                <i className="fas fa-certificate"></i>
              </div>
              <span className="home-faq-description">
                Có. Sau khi hiến máu bạn sẽ nhận giấy chứng nhận từ Hội chữ thập đỏ.
              </span>
            </div> */}

            <div className="home-faq-card">
              <div className="home-faq-icon icon-blue">
                <i className="fas fa-tint"></i>
              </div>
              <span className="home-faq-description">
                Nam: mỗi 3 tháng/lần. Nữ: mỗi 4 tháng/lần.
              </span>
            </div>

            <div className="home-faq-card">
              <div className="home-faq-icon icon-orange">
                <i className="fas fa-bed"></i>
              </div>
              <span className="home-faq-description">
                Nên nghỉ tại chỗ 10–15 phút, uống nước và ăn nhẹ để hồi phục.
              </span>
            </div>

            <div className="home-faq-card">
              <div className="home-faq-icon icon-purple">
                <i className="fas fa-hospital-user"></i>
              </div>
              <span className="home-faq-description">
                Có. Bạn sẽ được kiểm tra mạch, huyết áp, cân nặng và sức khỏe tổng quát.
              </span>
            </div>

            <div className="home-faq-card">
              <div className="home-faq-icon icon-yellow">
                <i className="fas fa-apple-alt"></i>
              </div>
              <span className="home-faq-description">
                Có. Nên ăn nhẹ, tránh đồ dầu mỡ và không để bụng đói khi hiến máu.
              </span>
            </div>

            <div className="home-faq-card">
              <div className="home-faq-icon icon-red">
                <i className="fas fa-heartbeat"></i>
              </div>
              <span className="home-faq-description">
                Hiến máu giúp kích thích cơ thể sản sinh máu mới và kiểm tra sức khỏe miễn phí.
              </span>
            </div>

            {/* Thẻ 7 */}
            <div className="home-faq-card">
              <div className="home-faq-icon icon-blue">
                <i className="fas fa-user-shield"></i>
              </div>
              <span className="home-faq-description">
                Bạn cần từ 18 đến 60 tuổi, cân nặng tối thiểu 45kg và đủ điều kiện sức khỏe.
              </span>
            </div>

            {/* Thẻ 8 */}
            <div className="home-faq-card">
              <div className="home-faq-icon icon-orange">
                <i className="fas fa-calendar-check"></i>
              </div>
              <span className="home-faq-description">
                Bạn có thể đặt lịch hiến máu trước để tiết kiệm thời gian và tránh chờ đợi.
              </span>
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
