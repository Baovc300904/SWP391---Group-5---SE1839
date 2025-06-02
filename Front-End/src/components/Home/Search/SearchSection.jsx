import React, { useState } from "react";
import { format } from "date-fns";
import MyDateRangePicker from "../HomeSearchs/MyDateRangePicker";
import posts from "../../../data/posts";

export default function SearchSection({ onSearchResults }) {
  const [dateRange, setDateRange] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [showSearchDetail, setShowSearchDetail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(posts);

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

    setResults(filtered);
    setSubmitted(true);

    // Gọi callback để đẩy kết quả lên Home và reset trang 1
    onSearchResults(filtered);

    alert(
      `Tìm lịch đặt từ ${
        dateRange?.startDate
          ? format(new Date(dateRange.startDate), "dd/MM/yyyy")
          : "..."
      } đến ${
        dateRange?.endDate
          ? format(new Date(dateRange.endDate), "dd/MM/yyyy")
          : "..."
      }\nTìm được ${filtered.length} bài viết phù hợp.`
    );
  };

  return (
    <div className="search-container container py-4">
      {/* Thanh search-bar nhỏ luôn hiển thị */}
      <div
        className="form-control rounded-pill mb-3 d-flex align-items-center"
        style={{ cursor: "text", minHeight: "38px" }}
        onClick={() => setShowSearchDetail(true)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setShowSearchDetail(true);
        }}
      >
        <span className="text-muted">Nhập từ khóa tìm kiếm...</span>
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

            {submitted && (
              <div
                className={`alert mt-3 small ${
                  results.length > 0 ? "alert-success" : "alert-danger"
                } rounded-3 py-2 px-3`}
              >
                {results.length > 0
                  ? `🔍 Đã tìm thấy ${results.length} lịch đặt phù hợp.`
                  : "❌ Không tìm thấy lịch đặt nào phù hợp."}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Kết quả tìm kiếm */}
      {showSearchDetail && (
        <div className="search-results row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-4">
          {results.map((item) => (
            <div key={item.id} className="col">
              <div className="card h-100 shadow-sm rounded-3 p-3">
                <h5 className="fw-semibold mb-2">{item.title}</h5>
                <p className="mb-1">
                  <strong>Địa điểm:</strong> {item.location}
                </p>
                <p className="mb-0">
                  <strong>Ngày:</strong> {format(new Date(item.date), "dd/MM/yyyy")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
