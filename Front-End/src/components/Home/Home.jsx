import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Bell, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import postsData from "../../data/posts";
import AppLayout from "../../layouts/AppLayout";
import Footer from "../Footers/Footer";
{/* Import DateRangePicker */}
import MyDateRangePicker from "./HomeSearchs/MyDateRangePicker";

/* Import image cho slider */
import slideshow1 from "../../assets/images/slideshows/slideshow1.png";
import introPost from "../../assets/images/posts/introPost.jpg"; // Giới thiệu website

const Home = () => {
  // State quản lý khoảng ngày được chọn (startDate, endDate)
  const [dateRange, setDateRange] = useState(null);

  // Dữ liệu bài viết gốc
  const [posts, setPosts] = useState([]);

  // Bài viết sau khi lọc theo tìm kiếm
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Hiện thông báo
  const [showNotification, setShowNotification] = useState(false);

  // Giá trị nhập địa điểm tìm kiếm
  const [searchLocation, setSearchLocation] = useState("");

  const [showSearchDetail, setShowSearchDetail] = React.useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [results, setResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8; // hoặc số lượng bạn muốn hiển thị mỗi trang

  const sliderImages = [
    { src: slideshow1, alt: "banner1" },
    { src: "https://th.bing.com/th?id=OVFT.TCxQ0Ux7ts1AlMM1AB3lQS&pid=News&w=300&h=186&c=14&rs=2&qlt=90&dpr=1.5", alt: "banner2" },
  ];

  useEffect(() => {
    setPosts(postsData);
    setFilteredPosts(postsData);
    setShowNotification(true);
    setCurrentPage(1); // Reset current page khi dữ liệu posts được cập nhật
  }, []);

  // Hàm xử lý khi bấm nút Tìm kiếm
  const handleSearch = () => {
    let results = posts;
  
    if (dateRange && dateRange.startDate && dateRange.endDate) {
      const fromDate = new Date(dateRange.startDate);
      const toDate = new Date(dateRange.endDate);
      results = results.filter((post) => {
        const postDate = new Date(post.date);
        return postDate >= fromDate && postDate <= toDate;
      });
    }
  
    if (searchLocation.trim() !== "") {
      const keyword = searchLocation.toLowerCase();
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(keyword) ||
          post.content.toLowerCase().includes(keyword) ||
          (post.location && post.location.toLowerCase().includes(keyword))
      );
    }
  
    setFilteredPosts(results);
    setResults(results); // ⚠️ BẠN ĐÃ THIẾU DÒNG NÀY
    setSubmitted(true);  // ⚠️ Cập nhật để hiển thị thông báo kết quả
    setCurrentPage(1);
  
    alert(
      `Tìm lịch đặt từ ${
        dateRange?.startDate
          ? format(new Date(dateRange.startDate), "dd/MM/yyyy")
          : "..."
      } đến ${
        dateRange?.endDate
          ? format(new Date(dateRange.endDate), "dd/MM/yyyy")
          : "..."
      }\nTìm được ${results.length} bài viết phù hợp.`
    );
  };
  {/* Pagination logic */}
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = (filteredPosts.length > 0 ? filteredPosts : posts).slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil((filteredPosts.length > 0 ? filteredPosts : posts).length / postsPerPage);


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <>
      <AppLayout />
      <div className="container">
        {/* Notification */}
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="notification"
          >
            <Bell />
            Có bài viết mới từ cộng đồng hiến máu!
          </motion.div>
        )}

        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hero-section"
        >
          <h1 className="hero-title">
            Chào mừng đến với Hệ thống Hỗ trợ Hiến Máu
          </h1>
          <p className="hero-subtitle">
            Cùng nhau lan tỏa yêu thương, sẻ chia sự sống.
          </p>
          <p className="hero-description">
            Website Hỗ trợ Hiến Máu là nền tảng kết nối giữa những tấm lòng nhân ái với các trung tâm y tế trên toàn quốc. 
            Chúng tôi cung cấp thông tin minh bạch, cập nhật về các sự kiện hiến máu, giúp bạn dễ dàng đăng ký, tìm kiếm lịch hiến máu phù hợp, 
            cũng như chia sẻ câu chuyện đầy cảm xúc từ cộng đồng. Cùng nhau, chúng ta lan tỏa sự sống và nhân văn đến từng nhịp tim.
          </p>
        </motion.div>

        <div className="intro-container my-5 gap-4">
          <div className="row align-items-center p-4">
            {/* Text Section */}
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="intro-title mb-3">Chào mừng đến với Website của chúng tôi</h2>
              <p className="intro-description">
                Đây là nền tảng giúp bạn khám phá, tìm kiếm và kết nối với những thông tin mới nhất về các sự kiện, địa điểm
                và cộng đồng. Giao diện thân thiện, dễ sử dụng và luôn cập nhật dữ liệu một cách nhanh chóng và chính xác.
                Hãy cùng trải nghiệm và khám phá ngay hôm nay!
              </p>
            </div>

            {/* Image Section */}
            <div className="col-md-6 text-center" style={{ width: '600px', height: '400px' }}>
              <img
                src={introPost}
                alt="Giới thiệu website"
                className="img-fluid rounded shadow"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              />
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="slider-wrapper">
          <Slider {...sliderSettings}>
            {sliderImages.map((img, index) => (
              <img key={index} src={img.src} alt={img.alt} className="slider-image" />
            ))}
          </Slider>
        </div>

        {/* Info boxes */}
        <div className="info-boxes">
          <Card className="card mission">
            <CardContent>
              <h3 className="card-title">Sứ mệnh của chúng tôi</h3>
              <p>
                Hỗ trợ kết nối người hiến máu với các trung tâm y tế, lan tỏa
                giá trị nhân văn.
              </p>
            </CardContent>
          </Card>

          <Card className="card benefit">
            <CardContent>
              <h3 className="card-title">Lợi ích khi tham gia</h3>
              <p>
                Nhận thông báo nhanh, theo dõi lịch hiến máu, và góp phần cứu
                sống nhiều người.
              </p>
            </CardContent>
          </Card>

          <Card className="card activities">
            <CardContent>
              <h3 className="card-title">Các hoạt động nổi bật</h3>
              <p>
                Ngày hội hiến máu, chia sẻ câu chuyện, và các chương trình
                khuyến khích cộng đồng.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Video Section */}
        <section className="video-section">
          <h2 className="section-title">Video truyền cảm hứng</h2>
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/bxjZ511ChKY"
              title="Video kêu gọi hiến máu"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Search section */}
        <div className="search-container container py-4">
    
          {/* Thanh search-bar nhỏ luôn hiển thị */}
          <div
            className="form-control rounded-pill mb-3 d-flex align-items-center"
            style={{ cursor: "text", minHeight: "38px" }}
            onClick={() => setShowSearchDetail(true)}
            tabIndex={0} // để div có thể focus
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setShowSearchDetail(true);
            }}
          >
            <span className="text-muted">Nhập từ khóa tìm kiếm...</span>
          </div>

          {/* Phần chi tiết search chỉ hiển thị khi showSearchDetail = true */}
          {showSearchDetail && (
            <div className="card shadow-sm rounded-3 p-4 search-card">
              <h2 className="text-center fw-semibold mb-4">Tìm kiếm lịch đặt</h2>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-center align-items-center gap-3 mb-3 w-100">  
                  <MyDateRangePicker onChange={(range) => setDateRange(range)} />
                </div>

                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Nhập tên địa điểm hoặc từ khóa..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />

                <button onClick={handleSearch} className="btn btn-danger rounded-pill fw-semibold py-2">
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


        {/* FAQ Section */}
        <section className="home-faq-section">
          <div className="home-faq-grid">
            {/* Cột 1: Thẻ tiêu đề to */}
            <div className="home-faq-title-card">
              <h2>❓ Câu hỏi thường gặp</h2>
            </div>

            {/* Các thẻ nhỏ: Cột 2 và 3 */}
            <div className="home-faq-card">
              <div className="home-faq-icon">
                <i className="fas fa-user-check"></i>
              </div>
              <p>Ai có thể tham gia hiến máu?</p>
            </div>

            <div className="home-faq-card">
              <div className="home-faq-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <p>Tôi có được nhận giấy chứng nhận không?</p>
            </div>

            <div className="home-faq-card">
              <div className="home-faq-icon">
                <i className="fas fa-tint"></i>
              </div>
              <p>Bao lâu thì có thể hiến máu lần tiếp theo?</p>
            </div>

            <div className="home-faq-card">
              <div className="home-faq-icon">
                <i className="fas fa-bed"></i>
              </div>
              <p>Sau khi hiến máu có cần nghỉ ngơi không?</p>
            </div>

            <div className="home-faq-card">
              <div className="home-faq-icon">
                <i className="fas fa-hospital-user"></i>
              </div>
              <p>Có cần khám sức khỏe trước không?</p>
            </div>

            <div className="home-faq-card">
              <div className="home-faq-icon">
                <i className="fas fa-apple-alt"></i>
              </div>
              <p>Có nên ăn uống trước khi hiến máu?</p>
            </div>
          </div>
        </section>



        {/* Quick Stats Section */}
        <div className="home-quick-stats">
          <Card className="home-stat-card">
            <CardContent>
              <h3 className="home-stat-value">1,254+</h3>
              <p className="home-stat-label">Người tham gia</p>
            </CardContent>
          </Card>
          <Card className="home-stat-card">
            <CardContent>
              <h3 className="home-stat-value">3,785</h3>
              <p className="home-stat-label">Đơn vị máu tiếp nhận</p>
            </CardContent>
          </Card>
          <Card className="home-stat-card">
            <CardContent>
              <h3 className="home-stat-value">52</h3>
              <p className="home-stat-label">Trung tâm y tế liên kết</p>
            </CardContent>
          </Card>
        </div>

        {/* Blood Donor Stories */}
        <section className="home-donor-stories">
          <h2 className="home-section-title">Câu chuyện người hiến máu</h2>
          <Slider {...sliderSettings}>
            <div className="home-story-slide">
              <p>"Tôi từng cần máu để cứu sống người thân. Giờ đây tôi muốn đền đáp lại."</p>
              <strong>- Nguyễn Văn Minh</strong>
            </div>
            <div className="home-story-slide">
              <p>"Mỗi lần hiến máu là một lần tôi cảm thấy mình sống có ý nghĩa hơn."</p>
              <strong>- Trần Thị Hồng</strong>
            </div>
          </Slider>
        </section>

        {/* Community posts */}
        <section>
          <div className="posts-header">
            <h2 className="section-title">Bài viết cộng đồng</h2>
            {/* <Button variant="outline" className="add-post-button">
              <PlusCircle size={18} /> Thêm bài viết
            </Button> */}
          </div>

          <div className="community-posts-grid">
            {currentPosts.map((item) => (
              <Card key={item.id} className="community-post-card">
                <CardContent>
                  <img src={item.image} alt={item.title} className="post-thumbnail" />
                  <h3 className="post-title">{item.title}</h3>
                  <p className="post-content">{item.content}</p>
                  <p className="post-date">
                    Ngày: {format(new Date(item.date), "dd/MM/yyyy")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="pagination-controls">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Trang trước
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                variant={currentPage === i + 1 ? "default" : "outline"}
                className="pagination-button"
              >
                {i + 1}
              </Button>
            ))}

            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Trang sau
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Home;
