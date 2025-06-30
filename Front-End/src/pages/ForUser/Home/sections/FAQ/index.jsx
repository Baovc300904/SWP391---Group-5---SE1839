import React, { useState } from 'react';
import './FAQSection.css';

const faqs = [
  {
    id: 1,
    question: "Ai có thể hiến máu?",
    answer: "Người từ 18-60 tuổi, cân nặng trên 45kg, không mắc các bệnh truyền nhiễm, có sức khỏe tốt đều có thể hiến máu."
  },
  {
    id: 2,
    question: "Hiến máu có ảnh hưởng đến sức khỏe không?",
    answer: "Hiến máu không ảnh hưởng đến sức khỏe nếu thực hiện đúng quy trình và đảm bảo các điều kiện an toàn. Cơ thể sẽ tự bổ sung lượng máu đã hiến trong vòng vài tuần."
  },
  {
    id: 3,
    question: "Tần suất hiến máu như thế nào là an toàn?",
    answer: "Nam giới có thể hiến máu 3 tháng/lần, nữ giới 4 tháng/lần. Không nên hiến máu quá thường xuyên để đảm bảo sức khỏe."
  },
  {
    id: 4,
    question: "Cần chuẩn bị gì trước khi hiến máu?",
    answer: "Ngủ đủ giấc, ăn nhẹ trước khi hiến máu, không uống rượu bia, mang theo CMND/CCCD, đảm bảo tinh thần thoải mái."
  },
  {
    id: 5,
    question: "Quy trình hiến máu diễn ra như thế nào?",
    answer: "Quy trình gồm: Đăng ký, khám sàng lọc, xét nghiệm nhanh, hiến máu (khoảng 10-15 phút), nghỉ ngơi và ăn nhẹ sau hiến."
  },
  {
    id: 6,
    question: "Làm thế nào để đăng ký hiến máu?",
    answer: "Bạn có thể đăng ký trực tiếp tại các điểm hiến máu, đăng ký online qua website hoặc liên hệ tổng đài để được hướng dẫn chi tiết."
  }
];

const FAQSection = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="faq-section">
      <div className="faq-section__container">
        <div className="faq-section__header">
          <h2 className="faq-section__title">Câu hỏi thường gặp</h2>
          <p className="faq-section__subtitle">
            Những thông tin cần thiết về hiến máu nhân đạo
          </p>
        </div>

        <div className="faq-section__grid">
          {faqs.map((faq) => (
            <div 
              key={faq.id}
              className={`faq-section__item ${activeId === faq.id ? 'faq-section__item--active' : ''}`}
              onClick={() => toggleFAQ(faq.id)}
            >
              <div className="faq-section__question">
                <h3>{faq.question}</h3>
                <span className="faq-section__icon">
                  {activeId === faq.id ? '−' : '+'}
                </span>
              </div>
              <div className="faq-section__answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-section__footer">
          <p>Bạn có câu hỏi khác? <a href="/contact">Liên hệ với chúng tôi</a></p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
