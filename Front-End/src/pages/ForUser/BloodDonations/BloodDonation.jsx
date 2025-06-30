import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaExclamationCircle, FaSignInAlt, FaTimes } from "react-icons/fa"; // Added icons
import { safeFormatDate } from "../../../utils/dateUtils";
import SearchSection from "../Home/sections/Search/index"; // Import SearchSection từ index.jsx

/**
 * Displays a list of blood donation events and allows users to join events or prompts them to log in if not authenticated.
 *
 * Renders event search results based on a selected date range, provides a search bar for adjusting the date range, and manages user interactions for joining events, including modal prompts for login when necessary.
 */
export default function BloodDonation() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];
  const dateRange = location.state?.dateRange;

  const [searchDateRange, setSearchDateRange] = useState(dateRange);

  useEffect(() => {
    if (dateRange) {
      setSearchDateRange(dateRange); // Update search date range when date range changes
    }
  }, [dateRange]);

  const startDateValue = searchDateRange?.startDate?.toISOString
    ? searchDateRange.startDate.toISOString()
    : searchDateRange?.startDate;

  const endDateValue = searchDateRange?.endDate?.toISOString
    ? searchDateRange.endDate.toISOString()
    : searchDateRange?.endDate;

  const user = JSON.parse(localStorage.getItem('user')); // Check if the user is logged in

  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Hàm xử lý khi người dùng nhấn nút Tham gia
  const handleJoin = (event) => {
    if (!user) {
      // Show the login modal if user is not logged in
      setSelectedEvent(event);
      setShowModal(true);
    } else {
      alert(`Bạn đã đăng ký tham gia sự kiện: "${event.title}" tại ${event.location} vào ngày ${safeFormatDate(event.date)}`);
    }
  };

  // Handle the login modal actions
  const handleLogin = () => {
    navigate("/login"); // Redirect to login if user wants to login
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="search-container container py-4 gap-3 d-flex flex-column align-items-center">
        {/* Thanh tìm kiếm */}
        <div className="search-bar-wrapper w-100" style={{ maxWidth: 900 }}>
          <div className="search-bar d-flex align-items-center mb-4">
            <div className="search-input-wrapper position-relative flex-grow-1">
              <input
                type="text"
                className="search-input ps-5"
                placeholder="Từ ngày - Đến ngày"
                value={`${safeFormatDate(startDateValue)} - ${safeFormatDate(endDateValue)}`}
                readOnly
              />
            </div>
            <button onClick={() => navigate('/services/blood-donation')} className="search-button">
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      <div className="container py-4" style={{ marginTop: "1rem" }}>
        <h2 className="mb-3">Kết quả lịch hiến máu</h2>

        {startDateValue && endDateValue ? (
          <p>
            Từ ngày {safeFormatDate(startDateValue)} đến ngày{" "}
            {safeFormatDate(endDateValue)}
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
                      {safeFormatDate(item.date)}
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

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" aria-hidden="true" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <FaExclamationCircle className="modal-icon" />
                <h5 className="modal-title">Lưu ý</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Vui lòng đăng nhập để tham gia sự kiện: <strong>{selectedEvent?.title}</strong> tại {selectedEvent?.location} vào ngày {safeFormatDate(selectedEvent?.date)}.</p>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                {/* Cancel Button with Icon */}
                <button type="button" className="btn btn-light" onClick={handleCloseModal}>
                  <FaTimes className="me-1" />
                  Hủy
                </button>

                {/* Login Button with Icon */}
                <button type="button" className="btn btn-danger" onClick={handleLogin}>
                  <FaSignInAlt className="me-1" />
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
