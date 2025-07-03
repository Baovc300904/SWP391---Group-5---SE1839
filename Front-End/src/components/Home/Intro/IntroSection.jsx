/** IntroSection.jsx */
import React, { useState, useEffect } from 'react';
import './IntroSection.css';

const rightSlides = [
  {
    title: 'Được bồi dưỡng trực tiếp',
    content: (
      <ul>
        <li>
          Ăn nhẹ, nước uống tại chỗ: tương đương 30.000 đồng 
          (1 chai trà xanh không độ, 01 hộp chocopie 66gram, 01 hộp bánh Goute 35,5gram).
        </li>
        <li>Hỗ trợ chi phí đi lại (bằng tiền mặt): 50.000 đồng.</li>
        <li>Nhận phần quà tặng giá trị tương đương:
          <ul>
            <li>100.000đ khi hiến máu 250ml</li>
            <li>150.000đ khi hiến máu 350ml</li>
            <li>180.000đ khi hiến máu 450ml</li>
          </ul>
        </li>
      </ul>
    )
  },
  {
    title: 'Được cấp Giấy chứng nhận hiến máu tình nguyện',
    content: (
      <ul>
        <li>Giấy chứng nhận được trao sau mỗi lần hiến máu tình nguyện.</li>
        <li>Có giá trị để được truyền máu miễn phí tại các cơ sở y tế công lập.</li>
        <li>Xuất trình Giấy chứng nhận để truyền máu.</li>
        <li>Cơ sở y tế xác nhận số lượng máu đã truyền vào giấy chứng nhận.</li>
      </ul>
    )
  },
  {
    title: 'Được tư vấn về sức khoẻ',
    content: (
      <ul className="no-background">
        <li>Giải thích quy trình hiến máu và nguy cơ có thể xảy ra.</li>
        <li>Thông tin về triệu chứng nhiễm vi rút viêm gan, HIV,...</li>
        <li>Xét nghiệm sàng lọc HIV, Giang mai, viêm gan...</li>
        <li>Tư vấn chăm sóc sức khỏe sau khi hiến máu.</li>
        <li>Bảo mật thông tin khám và xét nghiệm.</li>
      </ul>
    )
  }
];

export default function IntroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % rightSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + rightSlides.length) % rightSlides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="intro-container">
      <div className="intro-left">
        <h2 className="intro-title">Quyền lợi của người hiến máu</h2>
        <p className="intro-description">Người hiến máu tình nguyện sẽ được những quyền lợi sau:</p>
      </div>

      <div className="intro-right-wrapper">
        <button onClick={handlePrev} className="arrow-btn left-arrow" aria-label="Trước">&#8249;</button>

        <div className="intro-right">
          <h4 className="fw-bold mb-3">{rightSlides[currentSlide].title}</h4>
          <div className="slide-content fade-in">{rightSlides[currentSlide].content}</div>
        </div>

        <button onClick={handleNext} className="arrow-btn right-arrow" aria-label="Tiếp">&#8250;</button>
      </div>
    </div>
  );
}