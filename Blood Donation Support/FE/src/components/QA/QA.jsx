import React, { useState } from 'react';
import './QA.css';
import AppLayout from '../../layouts/AppLayout';
import Footer from '../Footers/Footer';

export default function QA() {
  const qas = [
    { id: 1, question: "Ai có thể tham gia hiến máu?", answer: "Người khỏe mạnh từ 18–60 tuổi, cân nặng từ 45kg (nữ) hoặc 50kg (nam) trở lên, không mắc bệnh truyền nhiễm." },
    { id: 2, question: "Hiến máu có ảnh hưởng đến sức khỏe không?", answer: "Không. Cơ thể sẽ nhanh chóng tái tạo lượng máu đã hiến trong vài ngày." },
    { id: 3, question: "Trước khi hiến máu cần chuẩn bị gì?", answer: "Nên ngủ đủ giấc, ăn nhẹ, tránh rượu bia và thực phẩm dầu mỡ." },
    { id: 4, question: "Sau khi hiến máu cần làm gì?", answer: "Nghỉ ngơi 10–15 phút, uống nhiều nước, ăn uống đầy đủ." },
    { id: 5, question: "Tôi có thể hiến máu bao nhiêu lần mỗi năm?", answer: "Nam: 4 lần/năm, Nữ: 3 lần/năm." },
    { id: 6, question: "Hiến máu có đau không?", answer: "Chỉ đau nhẹ vài giây lúc chích kim, hoàn toàn an toàn." },
    { id: 7, question: "Thời gian hiến máu mất bao lâu?", answer: "Khoảng 30–45 phút bao gồm khám, hiến và nghỉ." },
    { id: 8, question: "Tôi có cần biết nhóm máu trước không?", answer: "Không cần. Nhân viên y tế sẽ xét nghiệm giúp bạn." },
    { id: 9, question: "Hiến máu ở đâu?", answer: "Tại bệnh viện, trung tâm truyền máu hoặc điểm hiến lưu động." },
    { id: 10, question: "Hiến máu có được giấy chứng nhận không?", answer: "Có, được cấp giấy chứng nhận có giá trị hỗ trợ máu khi cần." },
    { id: 11, question: "Tôi đang cảm thấy mệt có nên hiến máu không?", answer: "Không. Chỉ hiến khi cơ thể hoàn toàn khỏe mạnh." },
    { id: 12, question: "Phụ nữ đang trong chu kỳ kinh nguyệt có hiến máu được không?", answer: "Không nên. Hãy đợi vài ngày sau kỳ kinh." },
    { id: 13, question: "Có được ăn sáng trước khi hiến máu không?", answer: "Có, nhưng nên ăn nhẹ, tránh đồ nhiều dầu mỡ." },
    { id: 14, question: "Sau khi hiến máu có nên uống cà phê không?", answer: "Không nên ngay sau hiến, nên uống nước lọc, sữa." },
    { id: 15, question: "Đang dùng thuốc có hiến máu được không?", answer: "Tùy loại thuốc, nên hỏi nhân viên y tế trước." },
    { id: 16, question: "Tôi vừa xăm hình, có được hiến máu không?", answer: "Phải đợi ít nhất 6 tháng sau khi xăm." },
    { id: 17, question: "Sau khi hiến máu có cần ăn nhiều không?", answer: "Không cần quá nhiều, chỉ cần ăn đầy đủ chất." },
    { id: 18, question: "Có thể đăng ký hiến máu định kỳ không?", answer: "Có thể đăng ký nhắc lịch định kỳ trên hệ thống." },
    { id: 19, question: "Hiến máu có giúp ích gì cho cộng đồng?", answer: "Cứu sống người bệnh, mỗi lần hiến có thể giúp 3 người." },
    { id: 20, question: "Hiến máu có thể lây bệnh không?", answer: "Không. Dụng cụ hiến máu đều vô trùng và dùng 1 lần." }
  ];

  const [openId, setOpenId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(qas.length / itemsPerPage);

  const toggleAnswer = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setOpenId(null);
  };

  const currentQAs = qas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <AppLayout />
      <div className="qa-container mx-auto max-w-3xl px-4 py-6">
        <h1 className="qa-title text-2xl font-bold mb-6 text-center">Câu Hỏi & Trả Lời </h1>

        {currentQAs.map((qa) => (
          <div key={qa.id} className="qa-item border-b border-gray-300 py-4">
            <div
              className="qa-header cursor-pointer flex justify-between items-center"
              onClick={() => toggleAnswer(qa.id)}
            >
              <h2 className="qa-question font-semibold text-lg">{qa.question}</h2>
              <span className="qa-toggle text-xl text-gray-500">{openId === qa.id ? '▼' : '▶'}</span>
            </div>
            {openId === qa.id && (
              <p className="qa-answer mt-2 text-gray-700">{qa.answer}</p>
            )}
          </div>
        ))}

        {/* Pagination controls */}
        <div className="qa-pagination flex justify-center gap-2 mt-6">
          <button
            className="qa-page-btn px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`qa-page-number px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="qa-page-btn px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
          <div className="qa-h6">(Trang {currentPage}/{totalPages})</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
