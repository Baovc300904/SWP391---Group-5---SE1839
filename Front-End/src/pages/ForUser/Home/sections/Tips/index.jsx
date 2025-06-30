import React from 'react';
import './TipSection.css';

const tips = [
  {
    id: 1,
    icon: '✅',
    title: 'Nên làm',
    items: [
      'Ngủ đủ 8 tiếng trước khi hiến máu',
      'Ăn sáng đầy đủ và uống nhiều nước',
      'Mang theo CMND/CCCD khi đến hiến máu',
      'Thông báo tiền sử bệnh tật với bác sĩ',
      'Nghỉ ngơi 15-20 phút sau khi hiến máu'
    ]
  },
  {
    id: 2,
    icon: '❌',
    title: 'Không nên làm',
    items: [
      'Uống rượu bia 24h trước hiến máu',
      'Hiến máu khi đang bị cảm lạnh, sốt',
      'Hiến máu khi đang dùng thuốc kháng sinh',
      'Tập thể dục nặng sau khi hiến máu',
      'Lái xe ngay sau khi hiến máu'
    ]
  },
  {
    id: 3,
    icon: '⚠️',
    title: 'Lưu ý quan trọng',
    items: [
      'Tuổi từ 18-60, cân nặng tối thiểu 45kg',
      'Khoảng cách giữa 2 lần hiến: Nam 3 tháng, Nữ 4 tháng',
      'Thông báo ngay nếu có triệu chứng bất thường',
      'Giữ băng gạc ít nhất 4-6 tiếng',
      'Liên hệ y tế nếu có biến chứng'
    ]
  }
];

const TipSection = () => {
  return (
    <section className="tips-section">
      <div className="tips-container">
        <div className="tips-header">
          <h2 className="tips-title">Hướng dẫn hiến máu an toàn</h2>
          <p className="tips-subtitle">
            Những điều cần biết để hiến máu an toàn và hiệu quả
          </p>
        </div>

        <div className="tips-grid">
          {tips.map((tip) => (
            <div key={tip.id} className={`tip-card ${tip.id === 2 ? 'warning' : tip.id === 3 ? 'important' : 'success'}`}>
              <div className="tip-header">
                <span className="tip-icon">{tip.icon}</span>
                <h3 className="tip-title">{tip.title}</h3>
              </div>
              <ul className="tip-list">
                {tip.items.map((item, index) => (
                  <li key={index} className="tip-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="tips-footer">
          <div className="emergency-contact">
            <h3>Liên hệ khẩn cấp</h3>
            <p>Hotline 24/7: <strong>1900 1234</strong></p>
            <p>Email: <strong>support@hienmau.vn</strong></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TipSection;
