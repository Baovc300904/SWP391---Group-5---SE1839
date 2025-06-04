import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyDateRangePicker from "../HomeSearchs/MyDateRangePicker";
import events from "../../../data/events";

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
      <div className="search-bar d-flex align-items-center w-100" style={{ maxWidth: 600, margin: 'auto' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm theo địa điểm, từ khóa..."
          value={searchLocation}
          onFocus={() => setShowSearchDetail(true)}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="search-button"
        >
          Tìm kiếm
        </button>

        <style jsx>{`
          .search-bar {
            gap: 12px;
          }
          .search-input {
            flex-grow: 1;
            padding: 10px 20px;
            border-radius: 30px;
            border: 1.5px solid #ddd;
            font-size: 16px;
            transition: border-color 0.3s ease;
            outline: none;
          }
          .search-input:focus {
            border-color: #dc3545; /* màu đỏ */
            box-shadow: 0 0 8px rgba(220, 53, 69, 0.3);
          }
          .search-button {
            background-color: #dc3545;
            border: none;
            color: white;
            padding: 10px 24px;
            font-weight: 600;
            font-size: 16px;
            border-radius: 30px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .search-button:hover {
            background-color: #b02a37;
          }
        `}</style>
      </div>

      {/* Phần chi tiết bật khi focus vào input */}
      {showSearchDetail && (
        <div className="card shadow-sm rounded-3 p-4 search-card">
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
