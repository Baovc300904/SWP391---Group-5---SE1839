import React from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import AppLayout from "../../layouts/AppLayout";
import Footer from "../Footers/Footer";

export default function BloodDonation() {
  const location = useLocation();
  const results = location.state?.results || [];
  const dateRange = location.state?.dateRange;

  const startDateValue = dateRange?.startDate?.toISOString
    ? dateRange.startDate.toISOString()
    : dateRange?.startDate;

  const endDateValue = dateRange?.endDate?.toISOString
    ? dateRange.endDate.toISOString()
    : dateRange?.endDate;

  // Hàm xử lý khi người dùng nhấn nút Tham gia
  const handleJoin = (event) => {
    // Tạm thời hiện thông báo, bạn có thể thay bằng logic gửi API hoặc lưu localStorage...
    alert(`Bạn đã đăng ký tham gia sự kiện: "${event.title}" tại ${event.location} vào ngày ${format(new Date(event.date), "dd/MM/yyyy")}`);
  };

  return (
    <>
      <AppLayout />
      <div className="container py-4" style={{ marginTop: "1rem" }}>
        <h2 className="mb-3">Kết quả lịch hiến máu</h2>

        {startDateValue && endDateValue ? (
          <p>
            Từ ngày {format(new Date(startDateValue), "dd/MM/yyyy")} đến ngày{" "}
            {format(new Date(endDateValue), "dd/MM/yyyy")}
          </p>
        ) : (
          <p>Không có thông tin ngày đặt</p>
        )}

        {results.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-2">
            {results.map((item) => (
              <div key={item.id} className="col">
                <div className="card h-100 shadow-sm p-3 rounded-3 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-semibold">{item.title}</h5>
                    <p className="mb-1">
                      <strong>Địa điểm:</strong> {item.location}
                    </p>
                    <p className="mb-0">
                      <strong>Ngày:</strong>{" "}
                      {format(new Date(item.date), "dd/MM/yyyy")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleJoin(item)}
                    className="btn btn-danger mt-3 rounded-pill"
                  >
                    Tham gia
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-danger mt-3">Không tìm thấy lịch đặt nào phù hợp.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
  