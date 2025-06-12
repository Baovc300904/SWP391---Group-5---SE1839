import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from "@/components/common/card";
import './SlideSection.css';

export default function SlideSection() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="important-notes">
      <h2 className="notes-section-title">Lưu ý quan trọng</h2>

      {/* Ai có thể tham gia */}
      <Card className="info-card">
        <CardContent>
          <div className="info-header" onClick={() => toggleSection("whoCanDonate")}>
            <h3 className="info-title">Ai có thể tham gia hiến máu?</h3>
            {openSection === "whoCanDonate" ? <ChevronUp /> : <ChevronDown />}
          </div>
          {openSection === "whoCanDonate" && (
            <ul>
              <li>Tất cả mọi người từ 18 - 60 tuổi, thực sự tình nguyện hiến máu của mình để cứu chữa người bệnh.</li>
              <li>Cân nặng ít nhất là 45kg đối với phụ nữ, nam giới. Lượng máu hiến mỗi lần không quá 9ml/kg và không quá 500ml mỗi lần.</li>
              <li>Không bị nhiễm hoặc không có các hành vi lây nhiễm HIV và các bệnh lây nhiễm qua đường truyền máu khác.</li>
              <li>Thời gian giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ.</li>
              <li>Có giấy tờ tùy thân.</li>
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Ai không nên hiến */}
      <Card className="info-card">
        <CardContent>
          <div className="info-header" onClick={() => toggleSection("whoShouldNotDonate")}>
            <h3 className="info-title">Ai là người không nên hiến máu?</h3>
            {openSection === "whoShouldNotDonate" ? <ChevronUp /> : <ChevronDown />}
          </div>
          {openSection === "whoShouldNotDonate" && (
            <ul>
              <li>Người đã nhiễm hoặc đã thực hiện hành vi có nguy cơ nhiễm HIV, viêm gan B, viêm gan C, và các virus lây qua đường truyền máu.</li>
              <li>Người có các bệnh mãn tính: tim mạch, huyết áp, hô hấp, dạ dày…</li>
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Xét nghiệm gì */}
      <Card className="info-card">
        <CardContent>
          <div className="info-header" onClick={() => toggleSection("tests")}>
            <h3 className="info-title">Máu của tôi sẽ được làm những xét nghiệm gì?</h3>
            {openSection === "tests" ? <ChevronUp /> : <ChevronDown />}
          </div>
          {openSection === "tests" && (
            <ul>
              <li>Tất cả những đơn vị máu thu được sẽ được kiểm tra nhóm máu (hệ ABO, hệ Rh), HIV, virus viêm gan B, viêm gan C, giang mai, sốt rét.</li>
              <li>Bạn sẽ được thông báo kết quả, được giữ kín và được tư vấn (miễn phí) khi phát hiện ra các bệnh nhiễm trùng nói trên.</li>
            </ul>
          )}
        </CardContent>
      </Card>
    <div className="important-notes-warning">
          
    </div>
      
    </div>

  );
}
