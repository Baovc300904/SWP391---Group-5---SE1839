import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiCalendarEvent } from "react-icons/bi";
import MyDateRangePicker from "../HomeSearchs/MyDateRangePicker";
import events from "../../../data/events";
import "./SearchSection.css"; // Import your CSS file for styling

export default function SearchSection({ onSearchResults }) {
  const [dateRange, setDateRange] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [showSearchDetail, setShowSearchDetail] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    let filtered = events;

    if (dateRange?.startDate && dateRange?.endDate) {
      const fromDate = new Date(dateRange.startDate);
      const toDate = new Date(dateRange.endDate);
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= fromDate && eventDate <= toDate;
      });
    }

    if (searchLocation.trim() !== "") {
      const keyword = searchLocation.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(keyword) ||
          event.content.toLowerCase().includes(keyword) ||
          (event.location && event.location.toLowerCase().includes(keyword))
      );
    }

    navigate("/services/blood-donation", {
      state: { results: filtered, dateRange },
    });
  };

  return (
    <div className="search-container container py-4 gap-3 d-flex flex-column align-items-center">
      {/* Thanh tìm kiếm đơn giản */}
      <div className="search-bar-wrapper w-100" style={{ maxWidth: 900 }}>
        {/* Câu hỏi và icon lịch */}
        <div className="search-label mb-2 text-muted d-flex align-items-center gap-2">
          <BiCalendarEvent className="calendar-icon-title" />
          <span>Bạn cần đặt lịch vào thời gian nào?</span>
        </div>

        {/* Input Tìm kiếm */}
        <div className="search-bar d-flex align-items-center mb-4">
          <div className="search-input-wrapper position-relative flex-grow-1">
            <BiCalendarEvent className="calendar-icon" />
            <input
              type="text"
              className="search-input ps-5"
              placeholder="Từ ngày - Đến ngày"
              value={searchLocation}
              onFocus={() => setShowSearchDetail(true)}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>

          {/* Nút tìm kiếm */}
          <button onClick={handleSearch} className="search-button">
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Phần chi tiết bật khi focus vào input */}
      {showSearchDetail && (
        <div className="card shadow-sm rounded-3 p-4 search-card mt-4">
          <h5 className="text-center fw-semibold mb-4">Tìm kiếm nâng cao</h5>
          <div className="d-flex flex-column gap-3">
            <MyDateRangePicker onChange={setDateRange} />
            <button
              onClick={() => setShowSearchDetail(false)}
              className="btn btn-outline-secondary rounded-pill"
            >
              Đóng tìm kiếm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
