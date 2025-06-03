import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyDateRangePicker from "../HomeSearchs/MyDateRangePicker";
import posts from "../../../data/posts";

export default function SearchSection({ onSearchResults }) {
  const [dateRange, setDateRange] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [showSearchDetail, setShowSearchDetail] = useState(false);
  const navigate = useNavigate();

  const toggleSearchDetail = () => {
    setShowSearchDetail((prev) => {
      const newVal = !prev;
      // Nếu bạn muốn reset hoặc xử lý khác khi đóng khung tìm kiếm, làm ở đây
      return newVal;
    });
  };

  const handleSearch = () => {
    let filtered = posts;

    if (dateRange && dateRange.startDate && dateRange.endDate) {
      const fromDate = new Date(dateRange.startDate);
      const toDate = new Date(dateRange.endDate);
      filtered = filtered.filter((post) => {
        const postDate = new Date(post.date);
        return postDate >= fromDate && postDate <= toDate;
      });
    }

    if (searchLocation.trim() !== "") {
      const keyword = searchLocation.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(keyword) ||
          post.content.toLowerCase().includes(keyword) ||
          (post.location && post.location.toLowerCase().includes(keyword))
      );
    }

    // Chuyển hướng sang trang /services/blood-donation và truyền data
    navigate("/services/blood-donation", { state: { results: filtered, dateRange } });
  };

  return (
    <div className="search-container container py-4">
      <div className="mb-3 d-flex justify-content-end">
        <button
          onClick={toggleSearchDetail}
          className={`btn ${
            showSearchDetail ? "btn-secondary" : "btn-outline-primary"
          } rounded-pill fw-semibold px-4 py-2`}
        >
          {showSearchDetail ? "Đóng" : "Tìm kiếm"}
        </button>
      </div>

      {showSearchDetail && (
        <div className="card shadow-sm rounded-3 p-4 search-card">
          <h2 className="text-center fw-semibold mb-4">Tìm kiếm lịch đặt</h2>

          <div className="d-flex flex-column gap-3">
            <div className="d-flex justify-content-center align-items-center gap-3 mb-3 w-100">
              <MyDateRangePicker onChange={setDateRange} />
            </div>

            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Nhập tên địa điểm hoặc từ khóa..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />

            <button
              onClick={handleSearch}
              className="btn btn-danger rounded-pill fw-semibold py-2"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
