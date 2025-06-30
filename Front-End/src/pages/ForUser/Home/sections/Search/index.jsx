import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, MapPin } from "lucide-react";
import MyDateRangePicker from "../../../../../components/common/MyDateRangePicker/MyDateRangePicker";
import events from "../../../../../data/events";
import "./SearchSection.css";

/**
 * Renders a modern search interface for filtering events by date range and location keyword.
 *
 * Allows users to input a location or keyword and select a date range to filter events. 
 * Displays an advanced search panel with a date range picker when the input is focused. 
 * Upon searching, navigates to the results page with the filtered events and selected date range.
 */

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
          event.description.toLowerCase().includes(keyword) ||
          (event.location && event.location.toLowerCase().includes(keyword))
      );
    }

    navigate("/services/blood-donation", {
      state: { results: filtered, dateRange },
    });
  };

  return (
    <section className="search-section">
      <div className="search-container">
        {/* Header */}
        <div className="search-header">
          <h2 className="search-title">
            <Search size={28} />
            Tìm kiếm sự kiện hiến máu
          </h2>
          <p className="search-subtitle">
            Tìm kiếm các sự kiện hiến máu gần bạn hoặc theo thời gian mong muốn
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-input-container">
            <div className="search-field">
              <MapPin className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Nhập địa điểm hoặc từ khóa..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            
            <div className="search-field">
              <Calendar className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Chọn khoảng thời gian"
                value={dateRange ? `${dateRange.startDate} - ${dateRange.endDate}` : ""}
                onFocus={() => setShowSearchDetail(true)}
                readOnly
              />
            </div>

            <button onClick={handleSearch} className="search-button">
              <Search size={20} />
              Tìm kiếm
            </button>
          </div>
        </div>

        {/* Advanced Search Panel */}
        {showSearchDetail && (
          <div className="search-advanced-panel">
            <div className="search-advanced-header">
              <h3>Tìm kiếm nâng cao</h3>
              <button
                onClick={() => setShowSearchDetail(false)}
                className="close-button"
              >
                ×
              </button>
            </div>
            
            <div className="search-advanced-content">
              <div className="date-picker-section">
                <label>Chọn khoảng thời gian:</label>
                <MyDateRangePicker onChange={setDateRange} />
              </div>
              
              <div className="search-actions">
                <button
                  onClick={handleSearch}
                  className="search-button-primary"
                >
                  <Search size={18} />
                  Tìm kiếm ngay
                </button>
                <button
                  onClick={() => setShowSearchDetail(false)}
                  className="search-button-secondary"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
