import React from 'react';
import './TipSection.css'; // Đảm bảo bạn đã có CSS tương ứng
import shouldIcon from '../../../assets/images/icons/should-icon.png';
import warningIcon from '../../../assets/images/icons/warning-icon.png';
import nshouldIcon from '../../../assets/images/icons/nshould-icon.png';

export default function TipSection() {
  return (
    <div className="container-fluid tip-section-container my-4">
      <div className="row justify-content-center gx-2">
        {/* LEFT COLUMN: Title + "Nên" */}
        <div className="col-md-3 px-md-3">
          {/* Title */}
          <div className="tip-title-card px-mb-4" style={{ textAlign: 'left' }}>
            <h2>Những lời khuyên trước và sau khi hiến máu</h2>
          </div>

          {/* Nên */}
          <div className="tip-card should-card">
            <div className="tip-card-header">
              <span className="tip-icon">
                <img src={shouldIcon} alt="Nên" className="icon" />
              </span>
              <h3 className="tip-title">Nên:</h3>
            </div>
            <ul>
              <li>Ăn nhẹ và uống nhiều nước (300 - 500ml) trước khi hiến máu.</li>
              <li>Đè chặt miếng bông gòn cầm máu nơi kim chích 10 phút, giữ băng keo cá nhân trong 4 - 6 giờ.</li>
              <li>Nằm hoặc ngồi nghỉ tại chỗ 10 phút sau khi hiến máu.</li>
              <li>Nếu cảm thấy chóng mặt, buồn nôn hoặc choáng váng, hãy nằm xuống và nâng cao chân cho đến khi hết triệu chứng.</li>
              <li>Nếu bị bầm tím hoặc sưng, hãy chườm lạnh vào vùng bị thương.</li>
            </ul>
            <p className="doctor-info">Bác sĩ Ngô Văn Tân</p>
            <p className="doctor-role">Trưởng khoa Tiếp nhận hiến máu tại Bệnh viện Truyền máu Huyết học</p>
          </div>
        </div>

        {/* RIGHT COLUMN: Không nên + Lưu ý */}
        <div className="col-md-3 px-md-3">
          {/* Không nên */}
          <div className="tip-card avoid-card mb-4">
            <div className="tip-card-header">
              <span className="tip-icon">
                <img src={nshouldIcon} alt="Nên" className="icon" />
              </span>
              <h3 className="tip-title text-danger d-inline-block">Không nên:</h3>
            </div>
            <ul>
              <li>Uống sữa hoặc rượu bia trước khi hiến máu.</li>
              <li>Đi xa, làm việc nặng, hoặc tập thể thao cường độ cao trong cùng ngày hiến máu.</li>
            </ul>
            <p className="doctor-info">Bác sĩ Ngô Văn Tân</p>
            <p className="doctor-role">Trưởng khoa Tiếp nhận hiến máu tại Bệnh viện Truyền máu Huyết học</p>
          </div>

          {/* Lưu ý */}
          <div className="tip-card note-card">
            <div className="tip-card-header">
              <span className="tip-icon">
                <img src={warningIcon} alt="Lưu ý" className="icon" />
              </span>
              <h3 className="tip-title text-warning d-inline-block">Lưu ý:</h3>
            </div>
            <ul>
              <li>Nếu bị chảy máu tại chỗ chích:</li>
              <li>Giơ tay lên cao.</li>
              <li>Dùng tay kia ấn nhẹ vào miếng bông hoặc băng dính.</li>
              <li>Liên hệ với nhân viên y tế để được hỗ trợ nếu cần thiết.</li>
            </ul>
            <p className="doctor-info">Bác sĩ Ngô Văn Tân</p>
            <p className="doctor-role">Trưởng khoa Tiếp nhận hiến máu tại Bệnh viện Truyền máu Huyết học</p>
          </div>
        </div>
      </div>
    </div>
  );
}
